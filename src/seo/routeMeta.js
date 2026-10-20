import { BRAND } from '../config/brand'
import { SERVICES, servicePath } from '../data/services'
import { CASE_STUDIES, projectPath } from '../data/projects'

/**
 * Single source of truth for every public page's SEO metadata.
 * Consumed by: the router (App.jsx), client-side tag updates (PageMeta), the build-time prerender
 * (head tags, JSON-LD, sitemap). Add a page here and it appears in all of them.
 *
 * indexable: false keeps a page out of the sitemap and emits noindex.
 * crumbs: visible breadcrumb trail (Home is implied); BreadcrumbList data is only emitted where the page
 * actually shows breadcrumbs.
 */
const NAME = BRAND.name

export const ROUTES = [
  {
    path: '/',
    title: `${NAME} — Custom software, web and mobile development`,
    description:
      'Elpisoft is a software studio in Bacolod City, Philippines. We build custom software, web and mobile apps, automation and practical AI, and work with clients remotely.',
  },
  {
    path: '/services',
    title: `Software development services — ${NAME}`,
    description:
      'Custom software, web apps, inventory management systems, mobile apps, automation and AI solutions, planned and built by Elpisoft with honest timelines and ongoing support.',
  },
  ...SERVICES.map((service) => ({
    path: servicePath(service),
    title: service.metaTitle,
    description: service.metaDescription,
    crumbs: [{ name: 'Services', path: '/services' }, { name: service.h1, path: servicePath(service) }],
    service,
  })),
  {
    path: '/industries',
    title: `Industries we build software for — ${NAME}`,
    description:
      'Software for finance, retail, education, public safety, healthcare, logistics, hospitality and real estate: the problems Elpisoft can help with and what we can build.',
  },
  {
    path: '/work',
    title: `Projects and case studies — ${NAME}`,
    description:
      'Selected work from Elpisoft: inventory management, lending, receipts, budgeting, anonymous feedback and emergency-response systems built for the web and mobile.',
  },
  ...CASE_STUDIES.map((project) => ({
    path: projectPath(project),
    title: project.caseStudy.metaTitle,
    description: project.caseStudy.metaDescription,
    crumbs: [{ name: 'Work', path: '/work' }, { name: project.title, path: projectPath(project) }],
  })),
  {
    path: '/about',
    title: `About ${NAME} — Software studio in Bacolod City, Philippines`,
    description:
      'Elpisoft builds reliable, human-centred software from Bacolod City, Philippines. Meet the team, and read how we work and what we believe.',
  },
  {
    path: '/contact',
    title: `Contact ${NAME} — Start a software project`,
    description:
      'Tell Elpisoft what you want to build. Send a message, email us, or chat on WhatsApp, Telegram or Viber, and we will reply with honest next steps.',
  },
  {
    path: '/privacy-policy',
    title: `Privacy Policy — ${NAME}`,
    description:
      'How Elpisoft collects, uses and protects personal information under the Philippine Data Privacy Act of 2012 (RA 10173), and how to exercise your rights.',
    crumbs: [{ name: 'Privacy Policy', path: '/privacy-policy' }],
  },
].map((route) => ({ indexable: true, crumbs: null, ...route }))

/** Served as 404.html with a real 404 status, and used for unknown client-side routes. */
export const NOT_FOUND = {
  path: '/404',
  title: `Page not found — ${NAME}`,
  description: 'This page could not be found.',
  indexable: false,
  crumbs: null,
}

export const normalizePath = (pathname = '/') => {
  const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export const getRouteMeta = (pathname) => {
  const path = normalizePath(pathname)
  return ROUTES.find((r) => r.path === path) ?? NOT_FOUND
}

export const absoluteUrl = (path) => `${BRAND.siteUrl}${path === '/' ? '/' : path}`
