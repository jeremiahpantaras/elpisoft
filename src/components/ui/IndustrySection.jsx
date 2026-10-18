import { Link } from 'react-router-dom'
import Section from './Section'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import BookCallButton from './BookCallButton'
import { ProjectMedia } from './ProjectCard'
import { SERVICES, servicePath } from '../../data/services'
import { PROJECTS, projectPath } from '../../data/projects'

/**
 * One industry on the Industries page. Industries with `evidence` show the Elpisoft-built projects related to them
 * (these are Elpisoft's own products, never described as client work). Capability-only industries make no claim
 * about past projects and end with an invitation to talk.
 */
export default function IndustrySection({ industry, index, surface }) {
  const services = SERVICES.filter((s) => industry.serviceIds.includes(s.id))
  const projects = PROJECTS.filter((p) => industry.projectSlugs.includes(p.slug))
  return (
    <Section surface={surface} id={industry.slug} className="scroll-mt-20" aria-labelledby={`h-${industry.slug}`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{String(index + 1).padStart(2, '0')} — Industry</Eyebrow>
            <h2 id={`h-${industry.slug}`} className="type-h2 mt-5">{industry.name}</h2>
            {industry.note && <p className="mt-4 max-w-[36ch] text-sm text-slate">{industry.note}</p>}
          </div>
        </Reveal>

        <div className="space-y-10 lg:col-span-8">
          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal>
              <h3 className="type-label text-slate">Common challenges</h3>
              <ul className="mt-4">
                {industry.challenges.map((c) => (
                  <li key={c} className="border-t border-mist py-3 first:border-t-0 first:pt-0">{c}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="type-label text-slate">What we can build</h3>
              <ul className="mt-4">
                {industry.solutions.map((s) => (
                  <li key={s} className="border-t border-mist py-3 first:border-t-0 first:pt-0 font-semibold">{s}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <h3 className="type-label text-slate">Services that help</h3>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={servicePath(service)} className="inline-flex min-h-8 items-center font-semibold text-horizon underline underline-offset-4">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {projects.length > 0 ? (
            <Reveal>
              <h3 className="type-label text-slate">Related work</h3>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link to={project.caseStudy ? projectPath(project) : `/work#${project.slug}`} className="group block">
                      <ProjectMedia project={project} tone="light" />
                      <p className="mt-3 font-semibold text-navy underline-offset-4 group-hover:underline">{project.title}</p>
                      <p className="text-sm text-slate">{project.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal className="border-t border-mist pt-6">
              <p className="max-w-[56ch] text-slate">Planning something for {industry.name.toLowerCase()}? Tell us what you need and we will suggest honest next steps.</p>
              <div className="mt-4"><BookCallButton variant="outline" location={`industry-${industry.slug}`} /></div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  )
}
