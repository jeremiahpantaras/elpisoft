import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { PROJECTS } from '../../data/projects'
import { CaseStudyLink, ProjectLink, ProjectMedia } from './ProjectCard'
import { EASE } from '../../lib/motion'

/** Table-like index of every project. Rows expand to show the screenshot, description and link (M10). */
export default function ProjectIndex() {
  const reduce = useReducedMotion()
  const { hash } = useLocation()
  const [openSlug, setOpenSlug] = useState(null)

  // Deep links such as /work#satoru open the matching row.
  useEffect(() => {
    const slug = decodeURIComponent(hash.slice(1)).replace(/^index-/, '')
    if (PROJECTS.some((p) => p.slug === slug && !p.featured)) setOpenSlug(slug)
  }, [hash])

  return (
    <ul className="border-b border-mist">
      {PROJECTS.map((project, i) => {
        const open = openSlug === project.slug
        const panelId = `panel-${project.slug}`
        return (
          <li key={project.slug} id={project.featured ? `index-${project.slug}` : project.slug} className="scroll-mt-24 border-t border-mist">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenSlug(open ? null : project.slug)}
                className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-5 text-left sm:grid-cols-[3.5rem_1fr_1.4fr_auto]"
              >
                <span className="type-label text-slate">{String(i + 1).padStart(2, '0')}</span>
                <span className="type-h3">{project.title}</span>
                <span className="hidden text-slate sm:block">{project.summary}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={`transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <Motion.div
                  id={panelId}
                  role="region"
                  aria-label={project.title}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                >
                  <div className="grid gap-6 pb-8 pt-1 sm:pl-[3.5rem] md:grid-cols-[minmax(0,22rem)_1fr] md:gap-8">
                    <ProjectMedia project={project} tone="light" />
                    <div>
                      <p className="max-w-[60ch] text-slate">{project.description}</p>
                      <ul className="type-label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-slate">
                        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                      </ul>
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
                        <CaseStudyLink project={project} tone="light" />
                        <ProjectLink project={project} tone="light" />
                      </div>
                    </div>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
