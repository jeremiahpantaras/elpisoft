import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

/* ------------------------------------------------------------------------------------------------
 * Behaviour: one hook owns open/close for the desktop mega-menus.
 *
 *  - Mouse: hovering a trigger opens it after 80 ms (intent delay). Leaving the WHOLE header (bar + panel, which
 *    is a DOM descendant of the header) closes it after 200 ms, so crossing the gap between trigger and panel
 *    never closes it. Moving to the other trigger switches immediately.
 *  - Click / Enter / Space: toggles, and "pins" it open (hover-opened menus become pinned on click rather than
 *    toggling shut). Touch and pen never use hover.
 *  - Closes on: Escape (focus returns to the trigger), outside pointer press, focus leaving the header, route
 *    change, page scroll (> 24 px), and the viewport shrinking below the desktop breakpoint.
 * ---------------------------------------------------------------------------------------------- */
export function useMegaMenu() {
  const { key: locationKey } = useLocation()
  const [openId, setOpenId] = useState(null)
  const openRef = useRef(null)
  const pinnedRef = useRef(false)
  const timers = useRef({ open: null, close: null })
  const triggers = useRef({})
  const headerRef = useRef(null)

  const set = useCallback((id, pin = false) => {
    openRef.current = id
    pinnedRef.current = id ? pin : false
    setOpenId(id)
  }, [])

  const clearTimers = useCallback(() => {
    clearTimeout(timers.current.open)
    clearTimeout(timers.current.close)
  }, [])

  const close = useCallback(
    (returnFocus = false) => {
      clearTimers()
      const was = openRef.current
      set(null)
      if (returnFocus && was) triggers.current[was]?.focus()
    },
    [clearTimers, set],
  )

  // Route (or hash) change closes the menu.
  useEffect(() => {
    close()
  }, [locationKey, close])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && openRef.current) close(true)
    }
    const onPointerDown = (e) => {
      if (openRef.current && headerRef.current && !headerRef.current.contains(e.target)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = (e) => { if (!e.matches) close() }
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      mq.removeEventListener('change', onMq)
      clearTimers()
    }
  }, [close, clearTimers])

  // Scrolling the page away from an open menu dismisses it.
  useEffect(() => {
    if (!openId) return undefined
    const y0 = window.scrollY
    const onScroll = () => { if (Math.abs(window.scrollY - y0) > 24) close() }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [openId, close])

  const triggerProps = (id) => ({
    ref: (el) => { triggers.current[id] = el },
    'aria-expanded': openId === id,
    'aria-controls': `mega-${id}`,
    onPointerEnter: (e) => {
      if (e.pointerType !== 'mouse') return
      clearTimers()
      if (openRef.current) set(id, pinnedRef.current)
      else timers.current.open = setTimeout(() => set(id, false), 80)
    },
    onPointerLeave: (e) => {
      if (e.pointerType === 'mouse') clearTimeout(timers.current.open)
    },
    onClick: (e) => {
      clearTimers()
      if (openRef.current === id) {
        // Keyboard activation (detail 0) or an already pinned menu toggles shut; a hover-opened one is pinned.
        if (pinnedRef.current || e.detail === 0) close()
        else pinnedRef.current = true
      } else {
        set(id, true)
      }
    },
  })

  const headerProps = {
    ref: headerRef,
    onPointerEnter: (e) => {
      if (e.pointerType === 'mouse') clearTimeout(timers.current.close)
    },
    onPointerLeave: (e) => {
      if (e.pointerType !== 'mouse' || !openRef.current || pinnedRef.current) return
      timers.current.close = setTimeout(() => close(), 200)
    },
    // Focus moving anywhere other than the open menu's own trigger or panel closes it (Tabbing on to the next
    // top-level item, or out of the header).
    onBlur: (e) => {
      const open = openRef.current
      const next = e.relatedTarget
      if (!open || !next) return
      const inMenu = triggers.current[open]?.contains(next) || document.getElementById(`mega-${open}`)?.contains(next)
      if (!inMenu) close()
    },
  }

  return { openId, triggerProps, headerProps, close }
}
