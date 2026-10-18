import { Link } from 'react-router-dom'
import PageIntro from '../components/ui/PageIntro'
import Section from '../components/ui/Section'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import ServiceFamilySection from '../components/ui/ServiceFamilySection'
import Approach from '../components/sections/home/Approach'
import ClosingCta from '../components/sections/ClosingCta'
import { SERVICE_FAMILIES } from '../data/services'
import { INDUSTRIES, industryPath } from '../data/industries'

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="01 — Services" title="What we build">
        From first idea to dependable software: we design, build and support products that solve real problems. Most
        projects combine more than one of the services below.
      </PageIntro>

      {SERVICE_FAMILIES.map((family, i) => (
        <ServiceFamilySection key={family.id} family={family} index={i} surface={i % 2 === 0 ? 'white' : 'cloud'} />
      ))}

      <Section surface="deep" aria-labelledby="industries-teaser">
        <Reveal>
          <Eyebrow tone="dark">Industries</Eyebrow>
          <h2 id="industries-teaser" className="type-h1 mt-5">Built for your industry</h2>
          <p className="type-body-lg mt-4 max-w-[52ch] text-white/75">
            Every industry has its own way of working. See the problems we can help with and what we can build.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <li key={industry.slug} className="border-t border-white/20">
              <Link to={industryPath(industry)} className="block min-h-11 py-4 font-semibold text-white underline-offset-4 hover:underline">
                {industry.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/industries" className="mt-6 inline-flex min-h-11 items-center font-semibold text-amber underline underline-offset-4">
          See all industries
        </Link>
      </Section>

      <Approach surface="white" eyebrow="How we work" heading="A clear process, with no surprises" />
      <ClosingCta heading="Let’s talk about what you need." />
    </>
  )
}
