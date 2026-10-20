import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion as Motion, useReducedMotion } from 'motion/react'
import SkipLink from './components/layout/SkipLink'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import ScrollToTop from './components/layout/ScrollToTop'
import PageMeta from './components/layout/PageMeta'
import Home from './pages/Home'
import AboutPage from './pages/aboutPage'
import WorkPage from './pages/workPage'
import ServicesPage from './pages/servicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import IndustriesPage from './pages/IndustriesPage'
import ContactPage from './pages/contactPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import { SERVICES, servicePath } from './data/services'
import { CASE_STUDIES, projectPath } from './data/projects'
import { ScrollTrigger } from './lib/gsap'
import { markHydrated } from './lib/hydration'
import { finishPreloader } from './lib/preloader'
import { contactChannelFor, trackEvent } from './lib/analytics'

// M9: route transition is opacity only, so layout and ScrollTrigger offsets never shift mid-fade.
function AnimatedRoutes() {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Motion.main
        id="main"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          {SERVICES.map((service) => (
            <Route key={service.slug} path={servicePath(service)} element={<ServiceDetailPage service={service} />} />
          ))}
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/work" element={<WorkPage />} />
          {CASE_STUDIES.map((project) => (
            <Route key={project.slug} path={projectPath(project)} element={<ProjectDetailPage project={project} />} />
          ))}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Motion.main>
    </AnimatePresence>
  )
}

// Client-only behaviours. Effects never run during server rendering.
function useClientBehaviours() {
  useEffect(() => {
    // Anything from here on is a client-side render: entrance animations may play for on-screen content.
    markHydrated()
    // The branded preloader (static HTML in index.html) exits now that the app is interactive. Runs once per document.
    finishPreloader()

    // Page height changes after first paint (lazy images, font swaps, route changes) would leave
    // ScrollTrigger start/end positions stale, so re-measure whenever the document resizes.
    let timer
    const ro = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    ro.observe(document.body)

    // Conversion measurement: one delegated listener counts clicks on contact channels (no personal data).
    const onClick = (event) => {
      const link = event.target.closest?.('a[href]')
      const channel = link && contactChannelFor(link.getAttribute('href'))
      if (channel) trackEvent('contact_click', { channel })
    }
    document.addEventListener('click', onClick)

    return () => {
      clearTimeout(timer)
      ro.disconnect()
      document.removeEventListener('click', onClick)
    }
  }, [])
}

/** The whole site, without a router: the caller supplies BrowserRouter (client) or StaticRouter (prerender). */
export default function AppShell() {
  useClientBehaviours()
  return (
    <MotionConfig reducedMotion="user">
      <PageMeta />
      <SkipLink />
      <ScrollToTop />
      <SiteHeader />
      <AnimatedRoutes />
      <SiteFooter />
    </MotionConfig>
  )
}
