import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projectPath } from '../../data/projects'

/**
 * Screenshot or logo tile. Titles are always visible below the media, never hover-only.
 * imageFit: 'contain' shows a very wide screenshot whole on the Cloud tile instead of cropping it (default is to fill the frame).
 */
export function ProjectMedia({ project, tone = 'dark', className = '' }) {
  const { image, imageKind, imageAlt, imageFit } = project
  const contain = imageFit === 'contain'
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-media border ${tone === 'dark' ? 'border-white/10' : 'border-mist'} ${contain ? 'bg-cloud' : 'bg-white'} ${className}`}>
      {image && imageKind === 'screenshot' && (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          width="1600"
          height="1000"
          className={
            contain
              ? 'h-full w-full object-contain'
              : 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
          }
        />
      )}
      {image && imageKind === 'logo' && (
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="mx-auto h-full w-auto object-contain p-[12%]" />
      )}
      {!image && (
        <div className="flex h-full items-center justify-center bg-mist">
          <span className="type-label text-slate">{project.title}</span>
        </div>
      )}
    </div>
  )
}

/** Project link on Deep Navy (Amber, 9.2:1) or on light surfaces (Horizon Blue). */
export function ProjectLink({ project, tone = 'dark' }) {
  const color = tone === 'dark' ? 'text-amber' : 'text-horizon'
  if (!project.link) {
    return <span className={`type-caption ${tone === 'dark' ? 'text-white/60' : 'text-slate'}`}>{project.linkLabel}</span>
  }
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex min-h-8 items-center gap-1 font-semibold underline underline-offset-4 ${color}`}
    >
      {project.linkLabel}
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
      />
      <span className="sr-only"> ({project.title}, opens in a new tab)</span>
    </a>
  )
}

/** Internal link to a project's own page; renders nothing for projects without a case study. */
export function CaseStudyLink({ project, tone = 'dark', className = '' }) {
  if (!project.caseStudy) return null
  const color = tone === 'dark' ? 'text-amber' : 'text-horizon'
  return (
    <Link
      to={projectPath(project)}
      className={`group/case inline-flex min-h-8 items-center gap-1 font-semibold underline underline-offset-4 ${color} ${className}`}
    >
      Read the case study
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/case:translate-x-1 motion-reduce:transition-none"
      />
      <span className="sr-only"> for {project.title}</span>
    </Link>
  )
}

/** Featured project, set for a navy surface. */
export default function ProjectCard({ project }) {
  return (
    <article id={project.slug} className="group scroll-mt-24">
      <ProjectMedia project={project} />
      <h3 className="type-h3 mt-5 text-white">{project.title}</h3>
      <p className="mt-2 max-w-[60ch] text-white/75">{project.description}</p>
      <ul className="type-label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-white/60">
        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
        <CaseStudyLink project={project} />
        <ProjectLink project={project} />
      </div>
    </article>
  )
}
