import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import BookCallButton from '../ui/BookCallButton'
import { ProjectMedia } from '../ui/ProjectCard'
import { SERVICE_FAMILIES, servicesInFamily, capabilitiesInFamily, servicePath } from '../../data/services'
import { INDUSTRIES, FEATURED_INDUSTRY_PROJECT, industryPath } from '../../data/industries'
import { PROJECTS } from '../../data/projects'
import { EASE } from '../../lib/motion'

/* ------------------------------------------------------------------------------------------------
 * Desktop navigation (lg and up)
 * ---------------------------------------------------------------------------------------------- */
const barLink =
  'relative inline-flex items-center gap-1 py-2 text-[0.9375rem] font-medium text-navy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-navy after:transition-transform after:duration-300 motion-reduce:after:transition-none'
const barState = (active) => (active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100')

export function DesktopNav({ items, mega }) {
  const { pathname } = useLocation()
  const { openId, triggerProps, close } = mega
  return (
    <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
      {items.map((item) => (
        <li key={item.label}>
          {item.menu ? (
            <>
              <button
                type="button"
                className={`${barLink} ${barState(openId === item.menu || pathname.startsWith(item.to))}`}
                {...triggerProps(item.menu)}
              >
                {item.label}
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`transition-transform duration-200 motion-reduce:transition-none ${openId === item.menu ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openId === item.menu && (
                  <PanelShell id={item.menu} label={item.menu === 'services' ? 'Services menu' : 'Industry menu'}>
                    {item.menu === 'services' ? <ServicesPanel onNavigate={close} /> : <IndustryPanel onNavigate={close} />}
                  </PanelShell>
                )}
              </AnimatePresence>
            </>
          ) : (
            <NavLink to={item.to} className={({ isActive }) => `${barLink} ${barState(isActive)}`}>{item.label}</NavLink>
          )}
        </li>
      ))}
    </ul>
  )
}

function PanelShell({ id, label, children }) {
  const reduce = useReducedMotion()
  return (
    <Motion.div
      id={`mega-${id}`}
      role="region"
      aria-label={label}
      className="absolute inset-x-0 top-full border-b border-mist bg-cloud shadow-[0_16px_40px_-24px_rgba(14,27,61,0.35)]"
      initial={reduce ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.12 } }}
      transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-8 py-10">{children}</div>
    </Motion.div>
  )
}

const itemClass =
  'block -mx-3 rounded-control px-3 py-2.5 transition-colors hover:bg-white focus-visible:bg-white aria-[current=page]:bg-white aria-[current=page]:shadow-[inset_3px_0_0_#FFB020] motion-reduce:transition-none'

function MenuIntro({ label, heading, text, allTo, allLabel, location, children }) {
  return (
    <div className="col-span-3 pr-6">
      <p className="type-label text-slate">{label}</p>
      <p className="type-h3 mt-3">{heading}</p>
      {text && <p className="mt-3 text-sm text-slate">{text}</p>}
      <Link to={allTo} className="group mt-5 inline-flex min-h-8 items-center gap-1 font-semibold text-horizon underline underline-offset-4">
        {allLabel}
        <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
      </Link>
      <div className="mt-4"><BookCallButton location={location} /></div>
      {children}
    </div>
  )
}

function ServicesPanel({ onNavigate }) {
  const { pathname } = useLocation()
  return (
    <div className="grid grid-cols-12 gap-x-8">
      <MenuIntro
        label="What we build"
        heading="From first idea to dependable software"
        text="Custom software, web and mobile apps, automation and practical AI, planned with you and built to last."
        allTo="/services"
        allLabel="All services"
        location="menu-services"
      />
      <div className="col-span-9 grid grid-cols-4 gap-x-6">
        {SERVICE_FAMILIES.map((family) => (
          <div key={family.id}>
            <p className="type-label text-slate">{family.name}</p>
            <ul className="mt-3 space-y-1">
              {servicesInFamily(family.id).map((service) => {
                const to = servicePath(service)
                return (
                  <li key={service.slug}>
                    <Link to={to} onClick={onNavigate} aria-current={pathname === to ? 'page' : undefined} className={itemClass}>
                      <span className="font-semibold text-navy">
                        {service.title}
                        {service.isNew && <span className="type-label ml-2 rounded-[4px] bg-amber px-1.5 py-0.5 text-[10px] text-navy">New</span>}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-slate">{service.deliverables.join(' · ')}</span>
                    </Link>
                  </li>
                )
              })}
              {capabilitiesInFamily(family.id).map((capability) => (
                <li key={capability.id}>
                  <Link to={`/services#${capability.id}`} onClick={onNavigate} className={itemClass}>
                    <span className="font-semibold text-navy">{capability.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function IndustryPanel({ onNavigate }) {
  const featured = PROJECTS.find((p) => p.slug === FEATURED_INDUSTRY_PROJECT)
  return (
    <div className="grid grid-cols-12 gap-x-8">
      <MenuIntro
        label="Industries"
        heading="Software shaped around how your industry works"
        allTo="/industries"
        allLabel="All industries"
        location="menu-industry"
      >
        {featured && (
          <Link to={`/work#${featured.slug}`} onClick={onNavigate} className="group mt-6 block rounded-media border border-mist bg-white p-3 transition-colors hover:border-navy motion-reduce:transition-none">
            <ProjectMedia project={featured} tone="light" className="!aspect-[16/7]" />
            <p className="type-label mt-3 text-slate">Our work</p>
            <p className="mt-1 text-sm font-semibold text-navy">{featured.title}</p>
            <p className="text-[0.8125rem] leading-snug text-slate">{featured.summary}</p>
          </Link>
        )}
      </MenuIntro>
      <ul className="col-span-9 grid grid-cols-4 content-start gap-x-6 gap-y-2">
        {INDUSTRIES.map((industry) => (
          <li key={industry.slug}>
            <Link to={industryPath(industry)} onClick={onNavigate} className={itemClass}>
              <span className="font-semibold text-navy">{industry.name}</span>
              {industry.menuExamples.map((example) => (
                <span key={example} className="mt-0.5 block text-[0.8125rem] leading-snug text-slate">{example}</span>
              ))}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------------------------------------
 * Mobile navigation (below lg): accordions inside the full-screen sheet.
 * ---------------------------------------------------------------------------------------------- */
function Accordion({ id, label, open, onToggle, children }) {
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-mist">
      <button
        type="button"
        id={`acc-${id}`}
        aria-expanded={open}
        aria-controls={`acc-panel-${id}`}
        onClick={onToggle}
        className="type-h2 flex min-h-14 w-full items-center justify-between py-4 text-left text-navy"
      >
        {label}
        <ChevronDown size={22} aria-hidden="true" className={`transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <Motion.div
            id={`acc-panel-${id}`}
            role="region"
            aria-labelledby={`acc-${id}`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
          >
            <div className="pb-5 pt-1">{children}</div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const sheetLink = 'block min-h-11 py-2.5 text-lg font-semibold text-navy'

export function MobileNav({ items, onNavigate }) {
  const [openKey, setOpenKey] = useState(null)
  const toggle = (key) => setOpenKey((current) => (current === key ? null : key))
  return (
    <>
      {items.map((item) =>
        item.menu === 'services' ? (
          <Accordion key={item.label} id="services" label={item.label} open={openKey === 'services'} onToggle={() => toggle('services')}>
            {SERVICE_FAMILIES.map((family) => (
              <div key={family.id} className="mt-4 first:mt-0">
                <p className="type-label text-slate">{family.name}</p>
                {servicesInFamily(family.id).map((service) => (
                  <Link key={service.slug} to={servicePath(service)} onClick={onNavigate} className={sheetLink}>
                    {service.title}
                    {service.isNew && <span className="type-label ml-2 rounded-[4px] bg-amber px-1.5 py-0.5 text-[10px] text-navy">New</span>}
                  </Link>
                ))}
                {capabilitiesInFamily(family.id).map((capability) => (
                  <Link key={capability.id} to={`/services#${capability.id}`} onClick={onNavigate} className={sheetLink}>{capability.title}</Link>
                ))}
              </div>
            ))}
            <Link to="/services" onClick={onNavigate} className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-horizon underline underline-offset-4">
              All services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Accordion>
        ) : item.menu === 'industry' ? (
          <Accordion key={item.label} id="industry" label={item.label} open={openKey === 'industry'} onToggle={() => toggle('industry')}>
            {INDUSTRIES.map((industry) => (
              <Link key={industry.slug} to={industryPath(industry)} onClick={onNavigate} className={sheetLink}>{industry.name}</Link>
            ))}
            <Link to="/industries" onClick={onNavigate} className="mt-2 inline-flex min-h-11 items-center gap-1 font-semibold text-horizon underline underline-offset-4">
              All industries <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Accordion>
        ) : (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) => `type-h2 block min-h-14 border-b border-mist py-4 ${isActive ? 'text-horizon' : 'text-navy'}`}
          >
            {item.label}
          </NavLink>
        ),
      )}
    </>
  )
}
