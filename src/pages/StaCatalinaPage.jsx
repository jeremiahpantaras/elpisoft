import Section from '../components/ui/Section'

const VIDEO = '/media/sta-catalina.mp4'
const POSTER = '/media/sta-catalina-poster.jpg'

/**
 * Unlisted video page (/sta-catalina). It is deliberately not linked from the header, footer, menus or sitemap, and the
 * route is noindex (see routeMeta.js); it is reached only by its URL. The files live in public/media/.
 */
export default function StaCatalinaPage() {
  return (
    <Section surface="deep" className="pt-32 md:pt-40 xl:pt-40" aria-labelledby="sta-catalina-heading">
      <h1 id="sta-catalina-heading" className="type-h1">STA. CATALINA</h1>
      <div className="mt-8 overflow-hidden rounded-media border border-white/10 bg-black">
        <video
          className="block aspect-video w-full"
          controls
          playsInline
          preload="metadata"
          poster={POSTER}
          width="1920"
          height="1080"
          aria-label="STA. CATALINA video"
        >
          <source src={VIDEO} type="video/mp4" />
          Your browser cannot play this video. <a href={VIDEO} className="underline">Open the video file</a>.
        </video>
      </div>
    </Section>
  )
}
