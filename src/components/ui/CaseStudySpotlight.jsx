import Section from './Section'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import Button from './Button'
import BookCallButton from './BookCallButton'
import { ProjectMedia } from './ProjectCard'
import { projectPath } from '../../data/projects'

/** Full-width spotlight for a project that has its own case-study page, shown at the top of /work. */
export default function CaseStudySpotlight({ project }) {
  const headingId = `spotlight-${project.slug}`
  return (
    <Section surface="white" aria-labelledby={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <ProjectMedia project={project} tone="light" />
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-5">
          <Eyebrow>Case study</Eyebrow>
          <h2 id={headingId} className="type-h2 mt-5">{project.title}</h2>
          <p className="mt-4 max-w-[52ch] text-slate">{project.description}</p>
          <ul className="type-label mt-5 flex flex-wrap gap-x-4 gap-y-1 text-slate">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button to={projectPath(project)} arrow>
              Read the case study
              <span className="sr-only"> for {project.title}</span>
            </Button>
            <BookCallButton variant="outline" location="work-spotlight">Discuss a similar system</BookCallButton>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
