import PageIntro from '../components/ui/PageIntro'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectIndex from '../components/ui/ProjectIndex'
import CaseStudySpotlight from '../components/ui/CaseStudySpotlight'
import ClosingCta from '../components/sections/ClosingCta'
import { CASE_STUDIES, FEATURED_PROJECTS, PROJECTS } from '../data/projects'

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="02 — Work" title="Things we have built">
        A selection of products we have designed, built and shipped, from financial tools to public-safety systems.
      </PageIntro>

      {CASE_STUDIES.map((project) => <CaseStudySpotlight key={project.slug} project={project} />)}

      <Section surface="deep" aria-labelledby="featured-projects">
        <h2 id="featured-projects" className="sr-only">Featured projects</h2>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="cloud" aria-labelledby="all-projects">
        <Reveal>
          <h2 id="all-projects" className="type-h2">All {PROJECTS.length} projects</h2>
          <p className="mt-3 max-w-[56ch] text-slate">Select a project to see more.</p>
        </Reveal>
        <div className="mt-10"><ProjectIndex /></div>
      </Section>

      <ClosingCta heading="Have something in mind?" />
    </>
  )
}
