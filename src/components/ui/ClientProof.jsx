import { useId } from 'react'
import { BRAND } from '../../config/brand'
import { PORTRAITS } from '../../data/portraits'

const STAR_POINTS = '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'

/** One star, 0 (empty), 0.5 (half) or 1 (full). Brand colours: Dawn Amber filled, Mist empty. Decorative. */
function Star({ fill }) {
  const clip = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-[1.125rem]">
      <polygon points={STAR_POINTS} fill="#E4E1D9" />
      {fill >= 1 && <polygon points={STAR_POINTS} fill="#FFB020" />}
      {fill > 0 && fill < 1 && (
        <>
          <clipPath id={clip}><rect x="0" y="0" width="12" height="24" /></clipPath>
          <polygon points={STAR_POINTS} fill="#FFB020" clipPath={`url(#${clip})`} />
        </>
      )}
    </svg>
  )
}

// Neutral, illustrated stand-ins (head, shoulders, a hairline) in approved palette colours. No real people.
const PLACEHOLDERS = [
  { bg: '#E4E1D9', ink: '#0E1B3D', hair: 'M7 14c0-6 4-9 9-9s9 3 9 9c-3-3-6-4-9-4s-6 1-9 4z' },
  { bg: '#0E1B3D', ink: '#FFB020', hair: 'M8 14c1-5 4-8 8-8s7 3 8 8c-2-2-5-3-8-3s-6 1-8 3z' },
  { bg: '#2F5DE6', ink: '#F7F5F0', hair: 'M6 17c-1-8 4-12 10-12s11 4 10 12c-1-4-4-7-10-7s-9 3-10 7z' },
  { bg: '#FFB020', ink: '#0E1B3D', hair: 'M7 13c1-5 5-8 9-8s8 3 9 8c-3-2-6-3-9-3s-6 1-9 3z' },
  { bg: '#F7F5F0', ink: '#5A6377', hair: 'M8 15c0-6 3-10 8-10s8 4 8 10c-2-4-5-5-8-5s-6 1-8 5z' },
]

function Avatar({ index, src }) {
  const shared = 'size-10 shrink-0 rounded-full ring-2 ring-white sm:size-11'
  if (src) return <img src={src} alt="" width="88" height="88" loading="lazy" decoding="async" className={`${shared} bg-mist object-cover object-[50%_20%]`} />
  const p = PLACEHOLDERS[index % PLACEHOLDERS.length]
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={shared}>
      <rect width="32" height="32" fill={p.bg} />
      <path d="M3 32c1-7 6-10 13-10s12 3 13 10z" fill={p.ink} opacity="0.9" />
      <circle cx="16" cy="13" r="6.2" fill={p.ink} />
      <path d={p.hair} fill={p.bg} opacity="0.35" />
    </svg>
  )
}

/**
 * Hero social proof: overlapping portraits, the client count and the average client rating, with a quiet shimmer
 * across the stack (CSS, see .client-proof-shine in index.css; off for reduced motion). The figures come from
 * BRAND.socialProof. The portraits are illustrative and the component says so. The count and rating are plain
 * text, readable without the photos.
 */
export default function ClientProof() {
  const { clients, rating, maxRating } = BRAND.socialProof
  const avatars = PORTRAITS.length ? PORTRAITS : PLACEHOLDERS.map(() => null)
  const stars = Array.from({ length: maxRating }, (_, i) => Math.min(1, Math.max(0, Math.round((rating - i) * 2) / 2)))
  return (
    <div data-hero-proof className="mt-9">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="client-proof-shine relative isolate flex shrink-0 -space-x-3 overflow-hidden rounded-full border border-mist bg-white/70 p-1" aria-hidden="true">
          {avatars.map((src, i) => <Avatar key={i} index={i} src={src} />)}
        </div>
        <div>
          <p className="text-[0.9375rem] font-semibold leading-tight text-navy">{clients} clients served</p>
          <p className="mt-1 flex items-center gap-2 text-[0.8125rem] leading-tight text-slate">
            <span className="flex" aria-hidden="true">{stars.map((fill, i) => <Star key={i} fill={fill} />)}</span>
            <span aria-hidden="true">{rating.toFixed(1)} / {maxRating} client rating</span>
            <span className="sr-only">Average client rating: {rating.toFixed(1)} out of {maxRating}</span>
          </p>
        </div>
      </div>
      <p className="type-caption mt-2 text-slate">Portraits are illustrative.</p>
    </div>
  )
}
