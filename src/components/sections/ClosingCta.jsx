import { useRef } from 'react'
import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import BookCallButton from '../ui/BookCallButton'
import SplitHeading from '../ui/SplitHeading'
import SunriseMark from '../brand/SunriseMark'
import { gsap, useGSAP, NO_MOTION_PREF, failSafePlay } from '../../lib/gsap'
import { BRAND } from '../../config/brand'

/** Closing call to action. The band's bottom edge is the horizon; the sun rises once (M8). */
export default function ClosingCta({ heading = 'Have a project in mind?' }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(NO_MOTION_PREF, () => {
        const sun = root.current.querySelector('[data-sun]')
        gsap.set(sun, { y: 46 })
        const tween = gsap.to(sun, {
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        })
        const stopFailSafe = failSafePlay(root.current, tween)
        return () => { stopFailSafe(); tween.scrollTrigger?.kill(); tween.kill() }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="on-dark relative overflow-hidden bg-navy pb-44 pt-16 text-white sm:pb-24 md:py-24 xl:py-32">
      <Container className="relative z-10">
        <div className="max-w-[640px]">
          <Eyebrow tone="dark">Start a project</Eyebrow>
          <SplitHeading as="h2" className="type-h1 mt-5">{heading}</SplitHeading>
          <p className="type-body-lg mt-5 max-w-[52ch] text-white/75">
            Tell us what you are trying to build. We will reply with honest next steps and a realistic view of timing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookCallButton location="closing" />
            <Button to="/contact" variant="outline-dark">Send a message</Button>
          </div>
          <p className="mt-6 text-white/75">
            Or email us at{' '}
            <a href={`mailto:${BRAND.contact.email}`} className="break-all font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white">
              {BRAND.contact.email}
            </a>
          </p>
        </div>
      </Container>
      <SunriseMark
        part="sun"
        className="pointer-events-none absolute -right-6 bottom-0 w-[250px] sm:w-[340px] lg:right-[4%] lg:w-[460px]"
      />
    </section>
  )
}
