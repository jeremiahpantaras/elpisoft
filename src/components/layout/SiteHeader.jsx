import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Logo from '../brand/Logo'
import BookCallButton from '../ui/BookCallButton'
import { DesktopNav, MobileNav } from './MegaMenu'
import { useMegaMenu } from './useMegaMenu'
import { NAV } from './nav'
import { DUR } from '../../lib/motion'

export default function SiteHeader() {
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const mega = useMegaMenu()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const megaOpen = mega.openId !== null

  // M3: hide on scroll down, show on scroll up. Never hides under reduced motion, or while a menu is open.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 8)
    setHidden(!reduce && !open && !megaOpen && y > 120 && y > prev)
  })

  useEffect(() => setOpen(false), [pathname])

  // Mobile menu: lock body scroll, trap focus, close on Escape, return focus to the toggle.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const panel = menuRef.current
    const focusables = () => panel.querySelectorAll('a[href], button:not([disabled])')
    focusables()[0]?.focus()
    const toggle = buttonRef.current
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab') return
      // DOM order is: toggle, then the panel. Cycle toggle -> panel links -> toggle.
      const items = [toggle, ...focusables()]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  return (
    <>
      <Motion.header
        {...mega.headerProps}
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: DUR.fast + 0.05, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 border-b bg-cloud/90 backdrop-blur transition-colors duration-200 motion-reduce:transition-none ${
          scrolled || open || megaOpen ? 'border-mist' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link to="/" className="rounded-control" onClick={() => setOpen(false)}>
            <Logo height={32} />
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-6 xl:gap-8">
            <DesktopNav items={NAV} mega={mega} />
            {/* Always visible except on very narrow phones, where the mobile menu carries it. */}
            <BookCallButton location="header" className="max-[379px]:hidden!" />
          </nav>

          <button
            ref={buttonRef}
            type="button"
            className="-mr-2 inline-flex size-12 items-center justify-center rounded-control text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </Motion.header>

      {/* Dims the page behind an open desktop menu; clicking it closes the menu. */}
      <AnimatePresence>
        {megaOpen && (
          <Motion.div
            aria-hidden="true"
            className="fixed inset-0 z-40 hidden bg-navy/10 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            onClick={() => mega.close()}
          />
        )}
      </AnimatePresence>

      {/* M4: mobile menu. Sibling of the header: backdrop-filter and transforms on the header would
          otherwise become the containing block for this fixed panel. */}
      <AnimatePresence>
        {open && (
          <Motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-label="Menu"
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-cloud px-4 pb-10 pt-4 sm:px-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              <MobileNav items={NAV} onNavigate={() => setOpen(false)} />
              <BookCallButton location="mobile-menu" className="mt-8 w-full" />
            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
