/**
 * Primary navigation. Items with `menu` open a mega-menu (desktop) or an accordion (mobile); the rest are links.
 * The Book a call CTA is rendered separately, after these items.
 */
export const NAV = [
  { label: 'Services', menu: 'services', to: '/services' },
  { label: 'Industry', menu: 'industry', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** Plain links, used by the footer. */
export const NAV_LINKS = NAV.map(({ label, to }) => ({ label: label === 'Industry' ? 'Industries' : label, to }))
