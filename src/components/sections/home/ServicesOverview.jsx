import { Link } from 'react-router-dom'
import Section from '../../ui/Section'
import Eyebrow from '../../ui/Eyebrow'
import Button from '../../ui/Button'
import Reveal from '../../ui/Reveal'
import ServiceList from '../../ui/ServiceList'
import { SUPPORTING_CAPABILITIES } from '../../../data/services'

export default function ServicesOverview() {
  return (
    <Section surface="white" aria-labelledby="services-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>01 — What we build</Eyebrow>
            <h2 id="services-heading" className="type-h2 mt-5">How we help teams move forward</h2>
            <p className="mt-4 max-w-[44ch] text-slate">
              Most projects combine more than one. Wherever we can, the examples link to products we have already built.
            </p>
            <Button to="/services" variant="link" arrow className="mt-6">All services</Button>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <ServiceList />
          <Reveal className="mt-10 border-t border-mist pt-6">
            <p className="type-label text-slate">Also</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SUPPORTING_CAPABILITIES.map((c) => (
                <li key={c.id} className="rounded-control border border-mist px-3 py-1.5 text-sm font-medium">{c.title}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate">
              Curious how it fits together? <Link to="/about" className="text-horizon underline underline-offset-4">Read how we work.</Link>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
