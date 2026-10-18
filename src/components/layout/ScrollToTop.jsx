import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Library-mode routers do not restore scroll: reset to top on navigation, or scroll to the #hash target.
 * On a page change the target does not exist yet (the old page is still fading out), so keep looking for it for
 * about a second instead of checking once.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }
    const id = decodeURIComponent(hash.slice(1))
    let frames = 0
    let raf
    const seek = () => {
      const target = document.getElementById(id)
      if (target) target.scrollIntoView()
      else if (frames++ < 60) raf = requestAnimationFrame(seek)
    }
    raf = requestAnimationFrame(seek)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
