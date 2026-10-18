import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import { capabilitiesInFamily, lowerFirst, servicePath, servicesInFamily } from '../../data/services'
import { industriesForService, industryPath } from '../../data/industries'

/** One service family on the Services page: its services (linked to their own pages) or, for design and care, its anchored capabilities. */
export default function ServiceFamilySection({ family, index, surface }) {
  const services = servicesInFamily(family.id)
  const capabilities = capabilitiesInFamily(family.id)
  return (
    <Section surface={surface} aria-labelledby={`family-${family.id}`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{String(index + 1).padStart(2, '0')} — {family.name}</Eyebrow>
            <h2 id={`family-${family.id}`} className="type-h2 mt-5">{family.name}</h2>
            <p className="mt-4 max-w-[36ch] text-slate">{family.purpose}</p>
          </div>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {services.map((service, i) => {
            // "Used in" lists only industries where Elpisoft has built related products; capability-only industries live on /industries.
            const industries = industriesForService(service.id).filter((industry) => industry.evidence).slice(0, 4)
            return (
              <Reveal as="li" key={service.slug} delay={(i % 2) * 0.06} className="border-t border-navy pt-6">
                <h3 className="type-h3">
                  <Link to={servicePath(service)} className="underline-offset-4 hover:underline">{service.title}</Link>
                  {service.isNew && <span className="type-label ml-3 align-middle rounded-[4px] bg-amber px-1.5 py-0.5 text-[10px] text-navy">New</span>}
                </h3>
                <p className="mt-3 text-slate">{service.summary}</p>
                <ul className="type-label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-slate">
                  {service.deliverables.map((d) => <li key={d}>{d}</li>)}
                </ul>
                {industries.length > 0 && (
                  <p className="mt-4 text-sm text-slate">
                    Used in:{' '}
                    {industries.map((industry, idx) => (
                      <span key={industry.slug}>
                        {idx > 0 && ', '}
                        <Link to={industryPath(industry)} className="font-semibold text-horizon underline underline-offset-4">{industry.name}</Link>
                      </span>
                    ))}
                  </p>
                )}
                <Link to={servicePath(service)} className="group mt-5 inline-flex min-h-8 items-center gap-1 font-semibold text-horizon underline underline-offset-4">
                  Explore {lowerFirst(service.title)}
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
                </Link>
              </Reveal>
            )
          })}
          {capabilities.map((capability, i) => (
            <Reveal as="li" key={capability.id} delay={(i % 2) * 0.06} id={capability.id} className="scroll-mt-24 border-t border-navy pt-6">
              <h3 className="type-h3">{capability.title}</h3>
              <p className="mt-3 text-slate">{capability.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
