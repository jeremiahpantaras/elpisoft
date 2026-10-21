import PageIntro from '../components/ui/PageIntro'
import Section from '../components/ui/Section'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import SplitHeading from '../components/ui/SplitHeading'
import Approach from '../components/sections/home/Approach'
import Values from '../components/sections/home/Values'
import ClosingCta from '../components/sections/ClosingCta'
import { TEAM } from '../data/team'
import { BRAND } from '../config/brand'

const NAME_PARTS = [
  { label: 'Greek · ἐλπίς', title: 'Elpis', body: 'Hope: the expectation that tomorrow can be better than today.' },
  { label: 'English', title: 'Soft', body: 'Software: the craft we use to turn that expectation into reality.' },
]

/** Approved portrait, or a neutral initials tile (decorative: the name is the heading below) until one is supplied. */
function TeamPortrait({ member }) {
  if (member.image) {
    return (
      <img
        src={member.image}
        alt={`Portrait of ${member.name}`}
        width="720"
        height="720"
        loading="lazy"
        decoding="async"
        className="aspect-square w-full max-w-[320px] rounded-media border border-mist object-cover object-top sm:max-w-none"
      />
    )
  }
  return (
    <div
      aria-hidden="true"
      className="flex aspect-square w-full max-w-[320px] items-center justify-center rounded-media border border-mist bg-white sm:max-w-none"
    >
      <span className="type-h1 text-navy">{member.initials}</span>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="03 — About" title={`About ${BRAND.name}`}>
        <p>
          {BRAND.name} is a custom software studio in Bacolod City, Negros Island. We build reliable, human-centred software
          that helps people and businesses move forward with confidence.
        </p>
      </PageIntro>

      <Section surface="white" aria-labelledby="name-heading">
        <Eyebrow>Our name</Eyebrow>
        <SplitHeading as="h2" className="type-h1 mt-5">Two words. One promise.</SplitHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {NAME_PARTS.map((part, i) => (
            <Reveal key={part.title} delay={i * 0.06} className="border-t border-mist pt-5">
              <p className="type-label text-slate">{part.label}</p>
              <p className="type-h1 mt-3">{part.title}</p>
              <p className="mt-3 text-slate">{part.body}</p>
            </Reveal>
          ))}
          <Reveal delay={0.12} className="border-t-2 border-navy pt-5">
            <p className="type-label text-slate">{BRAND.name}</p>
            <p className="type-h3 mt-3">Software that gives people reasons to be hopeful.</p>
          </Reveal>
        </div>
        <span id="name-heading" className="sr-only">Our name</span>
      </Section>

      <Values surface="cloud" eyebrow="Mission and values" showNameNote={false} showVision />
      <Approach surface="white" eyebrow="How we work" heading="A clear process, with no surprises" />

      <Section surface="cloud" aria-labelledby="team-heading">
        <Reveal>
          <Eyebrow>The team</Eyebrow>
          <h2 id="team-heading" className="type-h2 mt-5">The people behind the work</h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal as="li" key={member.id} delay={i * 0.06}>
              <TeamPortrait member={member} />
              <h3 className="type-h3 mt-5">{member.name}</h3>
              <p className="mt-1 font-semibold text-slate">{member.role}</p>
              <ul className="type-label mt-3 space-y-1 text-slate">
                {member.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
              {member.portfolio && (
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-8 items-center font-semibold text-horizon underline underline-offset-4"
                >
                  Portfolio<span className="sr-only"> of {member.name} (opens in a new tab)</span>
                </a>
              )}
            </Reveal>
          ))}
        </ul>
      </Section>
      <ClosingCta />
    </>
  )
}
