import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'
import Logo from '../brand/Logo'
import Container from '../ui/Container'
import MessagingLinks from '../ui/MessagingLinks'
import { BRAND } from '../../config/brand'
import { NAV_LINKS } from './nav'
import { SERVICES, servicePath } from '../../data/services'

const SOCIALS = [
  { label: 'Facebook', href: BRAND.socials.facebook, icon: Facebook },
  { label: 'Instagram', href: BRAND.socials.instagram, icon: Instagram },
  { label: 'LinkedIn', href: BRAND.socials.linkedin, icon: Linkedin },
]

const linkCls = 'inline-flex min-h-8 items-center text-white/75 transition-colors hover:text-white motion-reduce:transition-none'

export default function SiteFooter() {
  return (
    <footer className="on-dark bg-deep-navy text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] lg:gap-8">
        <div>
          <Link to="/" className="inline-block rounded-control">
            <Logo variant="reversed" height={36} />
          </Link>
          <p className="mt-5 max-w-xs text-white/75">{BRAND.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="type-label text-amber">Explore</h2>
          <ul className="mt-4 space-y-1">
            {[{ label: 'Home', to: '/' }, ...NAV_LINKS, { label: 'Privacy Policy', to: '/privacy-policy' }].map(({ label, to }) => (
              <li key={to}><Link to={to} className={linkCls}>{label}</Link></li>
            ))}
          </ul>
          <h2 className="type-label mt-8 text-amber">Services</h2>
          <ul className="mt-4 space-y-1">
            {SERVICES.map((service) => (
              <li key={service.slug}><Link to={servicePath(service)} className={linkCls}>{service.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="type-label text-amber">Contact</h2>
          <ul className="mt-4 space-y-1">
            <li><a href={`mailto:${BRAND.contact.email}`} className={`${linkCls} break-all`}>{BRAND.contact.email}</a></li>
            <li><a href={`tel:${BRAND.contact.phoneRaw}`} className={linkCls}>{BRAND.contact.phone}</a></li>
            <li><MessagingLinks variant="inline" /></li>
            <li className="pt-1 text-white/75">{BRAND.contact.addressLine1}<br />{BRAND.contact.addressLine2}</li>
          </ul>
        </div>

        <div>
          <h2 className="type-label text-amber">Follow</h2>
          <ul className="mt-4 space-y-1">
            {SOCIALS.map(({ label, href, icon }) => {
              const Icon = icon
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkCls} gap-2`}>
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              )
            })}
            <li>
              <a href={`mailto:${BRAND.contact.email}`} className={`${linkCls} gap-2`}>
                <Mail size={16} aria-hidden="true" />
                Email
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container>
        <p className="border-t border-white/10 py-6 text-sm text-white/60" suppressHydrationWarning>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </Container>
    </footer>
  )
}
