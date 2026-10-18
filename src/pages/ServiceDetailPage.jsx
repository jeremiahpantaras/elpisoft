import PageIntro from '../components/ui/PageIntro'
import Section from '../components/ui/Section'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import ProjectCard from '../components/ui/ProjectCard'
import Button from '../components/ui/Button'
import Approach from '../components/sections/home/Approach'
import ClosingCta from '../components/sections/ClosingCta'
import { PROJECTS, projectPath, projectsForService } from '../data/projects'
import { lowerFirst, servicePath } from '../data/services'

/**
 * One page per core service. Every block is drawn from facts already on the site (the service's own copy,
 * the real projects tagged with it, and the delivery process), so nothing here is invented.
 * Optional fields: `challenges` ("Problems this solves"), `offerGroups` (grouped offer, replacing the plain list) and
 * `caseStudySlug` (a link to the project page that shows this service in practice).
 */
export default function ServiceDetailPage({ service }) {
  const projects = projectsForService(service.id)
  const caseStudy = service.caseStudySlug ? PROJECTS.find((p) => p.slug === service.caseStudySlug) : null
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title={service.h1}
        crumbs={[{ name: 'Services', path: '/services' }, { name: service.h1, path: servicePath(service) }]}
      >
        {service.intro}
      </PageIntro>

      {service.challenges && (
        <Section surface="cloud" aria-labelledby="challenges-heading">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Why it matters</Eyebrow>
              <h2 id="challenges-heading" className="type-h2 mt-5">Problems this solves</h2>
            </Reveal>
            <ul className="lg:col-span-7 lg:col-start-6">
              {service.challenges.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.05} className="border-t border-mist py-4 first:border-t-0 first:pt-0">
                  <p className="type-body-lg">{item}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section surface="white" aria-labelledby="includes-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow>What this includes</Eyebrow>
            <h2 id="includes-heading" className="type-h2 mt-5">What we can build for you</h2>
          </Reveal>
          {service.offerGroups ? (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
              {service.offerGroups.map((group, i) => (
                <Reveal key={group.title} delay={i * 0.06} className="border-t border-navy pt-6">
                  <h3 className="type-h3">{group.title}</h3>
                  <p className="type-label mt-2 text-slate">{group.note}</p>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => <li key={item} className="text-slate">{item}</li>)}
                  </ul>
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="lg:col-span-7 lg:col-start-6">
              {service.deliverables.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.05} className="border-t border-mist py-5 first:border-t-0 first:pt-0">
                  <h3 className="type-h3">{item}</h3>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {projects.length > 0 && (
        <Section surface="deep" aria-labelledby="projects-heading">
          <Reveal>
            <Eyebrow tone="dark">Our work</Eyebrow>
            <h2 id="projects-heading" className="type-h1 mt-5">Projects that show this work</h2>
            {caseStudy && (
              <Button to={projectPath(caseStudy)} variant="outline-dark" arrow className="mt-6">
                Read the {caseStudy.title} case study
              </Button>
            )}
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Approach surface="cloud" eyebrow="How a project runs" heading="A clear process, with no surprises" />
      <ClosingCta heading={`Need ${lowerFirst(service.title)}?`} />
    </>
  )
}
