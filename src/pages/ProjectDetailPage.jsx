import { Link } from 'react-router-dom'
import PageIntro from '../components/ui/PageIntro'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import ClosingCta from '../components/sections/ClosingCta'
import { SERVICES, servicePath } from '../data/services'
import { INDUSTRIES, industryPath } from '../data/industries'
import { projectPath } from '../data/projects'

const linkCls = 'font-semibold text-horizon underline underline-offset-4'

/** A screenshot that opens full size in a new tab (no script lightbox). Dimensions are set to avoid layout shift. */
function Shot({ shot, priority = false, tone = 'light' }) {
  return (
    <figure>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        className={`block overflow-hidden rounded-media border bg-white ${tone === 'dark' ? 'border-white/10' : 'border-mist'}`}
      >
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="h-auto w-full"
        />
        <span className="sr-only">(opens the full-size image in a new tab)</span>
      </a>
      <figcaption className={`type-caption mt-3 ${tone === 'dark' ? 'text-white/75' : 'text-slate'}`}>{shot.caption}</figcaption>
    </figure>
  )
}

/**
 * A project's own page, driven by `project.caseStudy` (see projects.js). Every statement comes from what the
 * screenshots show, and the page says plainly that this is an Elpisoft product: no clients, results or technology.
 */
export default function ProjectDetailPage({ project }) {
  const { caseStudy } = project
  const [hero, ...rest] = caseStudy.gallery
  const services = SERVICES.filter((s) => project.services.includes(s.id))
  const industries = INDUSTRIES.filter((i) => caseStudy.industrySlugs.includes(i.slug))

  return (
    <>
      <PageIntro
        eyebrow="Our work"
        title={project.title}
        crumbs={[{ name: 'Work', path: '/work' }, { name: project.title, path: projectPath(project) }]}
      >
        <p>{caseStudy.intro}</p>
        <p className="type-label mt-4 text-slate">Elpisoft product · Web application · No public link</p>
      </PageIntro>

      <section className="bg-cloud pb-16 md:pb-24">
        <Container><Shot shot={hero} priority /></Container>
      </section>

      <Section surface="white" aria-labelledby="problem-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow>The problem</Eyebrow>
            <h2 id="problem-heading" className="type-h2 mt-5">The problem it addresses</h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
            <p className="type-body-lg max-w-[56ch] text-slate">{caseStudy.problem}</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-10 border-t border-mist pt-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow>The system</Eyebrow>
            <h2 className="type-h2 mt-5">What we built</h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
            <p className="type-body-lg max-w-[56ch] text-slate">{caseStudy.built}</p>
          </Reveal>
        </div>
      </Section>

      <Section surface="cloud" aria-labelledby="capabilities-heading">
        <Reveal>
          <Eyebrow>What it does</Eyebrow>
          <h2 id="capabilities-heading" className="type-h2 mt-5">Capabilities shown in the screens</h2>
        </Reveal>
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudy.capabilityGroups.map((group, i) => (
            <Reveal as="li" key={group.title} delay={(i % 3) * 0.06} className="border-t border-navy pt-6">
              <h3 className="type-h3">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => <li key={item} className="text-slate">{item}</li>)}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section surface="deep" aria-labelledby="screens-heading">
        <Reveal>
          <Eyebrow tone="dark">The screens</Eyebrow>
          <h2 id="screens-heading" className="type-h1 mt-5">A closer look</h2>
          <p className="mt-4 max-w-[52ch] text-white/75">Select a screen to view it full size.</p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {rest.map((shot, i) => (
            <Reveal key={shot.src} delay={(i % 2) * 0.06} className={i === 0 ? 'md:col-span-2' : ''}>
              <Shot shot={shot} tone="dark" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="white" aria-labelledby="value-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Why it helps</Eyebrow>
            <h2 id="value-heading" className="type-h2 mt-5">What this means for your business</h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul>
              {caseStudy.value.map((point, i) => (
                <Reveal as="li" key={point} delay={i * 0.05} className="border-t border-mist py-5 first:border-t-0 first:pt-0">
                  <p className="type-body-lg">{point}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8 space-y-3 border-t border-mist pt-6 text-slate">
              <p>
                Services used:{' '}
                {services.map((service, i) => (
                  <span key={service.slug}>
                    {i > 0 && ', '}
                    <Link to={servicePath(service)} className={linkCls}>{service.title}</Link>
                  </span>
                ))}
              </p>
              {industries.length > 0 && (
                <p>
                  Industry:{' '}
                  {industries.map((industry, i) => (
                    <span key={industry.slug}>
                      {i > 0 && ', '}
                      <Link to={industryPath(industry)} className={linkCls}>{industry.name}</Link>
                    </span>
                  ))}
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta heading="Need an inventory system like this?" />
    </>
  )
}
