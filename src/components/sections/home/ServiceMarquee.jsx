import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import Container from '../../ui/Container'
import { MARQUEE_ITEMS } from '../../../data/services'

// Each half of the track repeats the list so one half is always wider than the widest screen.
const REPEATS_PER_HALF = 2
const COPIES = REPEATS_PER_HALF * 2

/**
 * Slow right-to-left strip of the services Elpisoft offers (see MARQUEE_ITEMS: derived from the service data, never
 * hand-typed). Plain text, not links, so there are no moving click targets. The first copy is the accessible list;
 * every other copy is aria-hidden so screen readers hear each service once. Motion is CSS (see index.css).
 */
export default function ServiceMarquee() {
  const [paused, setPaused] = useState(false)
  return (
    <section aria-label="Services we offer" className={`marquee border-y border-mist bg-cloud${paused ? ' is-paused' : ''}`}>
      <Container className="flex items-center gap-3 py-4 md:py-5">
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
          <div className="marquee-track">
            {Array.from({ length: COPIES }, (_, copy) => (
              <ul
                key={copy}
                className="marquee-copy flex shrink-0 items-center"
                {...(copy === 0 ? {} : { 'aria-hidden': 'true' })}
              >
                {MARQUEE_ITEMS.map((item) => (
                  <li key={item} className="type-label flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-slate">
                    {item}
                    <span aria-hidden="true" className="bg-dawn block size-1.5 rounded-full" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play scrolling services' : 'Pause scrolling services'}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-mist text-navy hover:border-navy motion-reduce:hidden"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </Container>
    </section>
  )
}
