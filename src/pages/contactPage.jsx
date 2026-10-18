import { Mail, MapPin, Phone } from 'lucide-react'
import PageIntro from '../components/ui/PageIntro'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/ui/ContactForm'
import MessagingLinks from '../components/ui/MessagingLinks'
import { BRAND } from '../config/brand'
import { PROCESS } from '../data/process'

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="04 — Contact" title="Start a project">
        Tell us what you are trying to build. We will reply with honest next steps and a realistic view of timing.
      </PageIntro>

      <Section surface="white">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-12 lg:col-span-4 lg:col-start-9">
            <Reveal id="call" className="scroll-mt-28">
              <h2 className="type-h3">Prefer to write or call?</h2>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <Mail size={20} className="mt-0.5 shrink-0 text-slate" aria-hidden="true" />
                  <a href={`mailto:${BRAND.contact.email}`} className="break-all font-semibold text-horizon underline underline-offset-4">{BRAND.contact.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-slate" aria-hidden="true" />
                  <a href={`tel:${BRAND.contact.phoneRaw}`} className="font-semibold text-horizon underline underline-offset-4">{BRAND.contact.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-slate" aria-hidden="true" />
                  <span className="text-slate">{BRAND.contact.addressLine1}<br />{BRAND.contact.addressLine2}</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.04}>
              <h2 className="type-h3">Message us</h2>
              <p className="mt-2 text-slate">Chat on the same number: {BRAND.contact.phone}</p>
              <MessagingLinks className="mt-4" />
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="type-h3">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {PROCESS.map((step) => (
                  <li key={step.number} className="grid grid-cols-[2.5rem_1fr]">
                    <span className="type-label pt-1 text-slate">{step.number}</span>
                    <span className="font-semibold">{step.title}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
