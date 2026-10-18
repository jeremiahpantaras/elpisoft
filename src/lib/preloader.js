import { gsap } from './gsap'

/**
 * Exit of the branded preloader. The overlay itself is static HTML in index.html, with a CSS-only entrance, so it
 * paints with the page before this bundle loads; index.html also holds the 4 s hard cap that removes it if the app
 * never gets here. Ownership: CSS animates .pl-logo, .pl-line, .pl-accent and .pl-tagline; this timeline animates only
 * .pl-stage, .pl-edge and #preloader. The official logo is never touched, only the stage that contains it.
 */
export const PRELOADER = {
  minVisibleMs: 950, // from the start of page load, so the entrance has time to finish
  minVisibleReducedMs: 500,
  stageOut: 0.35, // seconds
  liftStart: 0.15,
  lift: 0.7,
  fadeReduced: 0.25,
}

let started = false

/** Plays the exit once, after hydration. Safe to call repeatedly (StrictMode) and when there is no overlay. */
export function finishPreloader() {
  if (started || typeof window === 'undefined') return
  started = true
  const html = document.documentElement
  const overlay = document.getElementById('preloader')
  if (!overlay || !html.classList.contains('is-preloading')) return

  const safety = window.__elpisoftPreloader
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Restores scrolling and interaction.
  const release = () => {
    html.classList.remove('preload-lock')
    const root = document.getElementById('root')
    if (root) root.inert = false
  }
  const cleanup = () => {
    release()
    overlay.remove()
    html.classList.remove('is-preloading')
    window.dispatchEvent(new Event('elpisoft:preloader-done'))
  }

  let tl
  let timer
  const onPageShow = (event) => {
    // Restored from the back/forward cache: drop the overlay immediately instead of replaying it.
    if (event.persisted) {
      clearTimeout(timer)
      tl?.kill()
      cleanup()
    }
  }
  window.addEventListener('pageshow', onPageShow)

  const failOpen = () => {
    clearTimeout(timer)
    tl?.kill()
    window.removeEventListener('pageshow', onPageShow)
    if (safety?.done) safety.done()
    else cleanup()
  }

  const minVisible = reduce ? PRELOADER.minVisibleReducedMs : PRELOADER.minVisibleMs
  timer = setTimeout(() => {
    try {
      if (!overlay.isConnected) return // the safety timer already removed it
      clearTimeout(safety?.timer) // the exit takes over; it lasts well under a second
      const done = () => {
        window.removeEventListener('pageshow', onPageShow)
        cleanup()
      }
      tl = gsap.timeline({ onComplete: done })
      if (reduce) {
        tl.add(release, 0).to(overlay, { autoAlpha: 0, duration: PRELOADER.fadeReduced, ease: 'none' }, 0)
      } else {
        tl.to(overlay.querySelector('.pl-stage'), { autoAlpha: 0, y: -16, duration: PRELOADER.stageOut, ease: 'power2.in' }, 0)
          .set(overlay.querySelector('.pl-edge'), { autoAlpha: 1 }, 0.1)
          .add(release, PRELOADER.liftStart) // the page is usable, and the hero sun starts rising, as the overlay lifts
          .to(overlay, { yPercent: -100, duration: PRELOADER.lift, ease: 'power3.inOut' }, PRELOADER.liftStart)
      }
    } catch {
      failOpen()
    }
  }, Math.max(0, minVisible - performance.now()))
}
