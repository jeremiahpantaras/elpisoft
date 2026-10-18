import { Link } from 'react-router-dom'
import PageIntro from '../components/ui/PageIntro'
import Container from '../components/ui/Container'
import IndustrySection from '../components/ui/IndustrySection'
import ClosingCta from '../components/sections/ClosingCta'
import { INDUSTRIES } from '../data/industries'

export default function IndustriesPage() {
  return (
    <>
      <PageIntro eyebrow="02 — Industries" title="Industries we build for">
        Every industry has its own way of working. Find yours to see the problems we can help with and what we can
        build.
      </PageIntro>

      <div className="border-y border-mist bg-cloud">
        <Container>
          <nav aria-label="Jump to an industry">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 py-3">
              {INDUSTRIES.map((industry) => (
                <li key={industry.slug}>
                  <Link to={`/industries#${industry.slug}`} className="inline-flex min-h-9 items-center text-sm font-semibold text-navy underline-offset-4 hover:underline">
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {INDUSTRIES.map((industry, i) => (
        <IndustrySection key={industry.slug} industry={industry} index={i} surface={i % 2 === 0 ? 'white' : 'cloud'} />
      ))}

      <ClosingCta heading="Don’t see your industry?" />
    </>
  )
}
