# Elpisoft website

> **Software built on hope.**

The company website for Elpisoft, a custom software studio in Bacolod City, Philippines.
Built with React 19, Vite 7 and Tailwind CSS v4.

## Stack

- [React 19](https://react.dev/) and [React Router 7](https://reactrouter.com/) (library mode)
- [Tailwind CSS v4](https://tailwindcss.com/), with tokens defined in `src/index.css`
- [GSAP](https://gsap.com/) (`useGSAP`, ScrollTrigger, SplitText) for the hero sequence and scroll-linked effects
- [Motion for React](https://motion.dev/) (`motion/react`) for UI transitions and interaction state
- [Lucide](https://lucide.dev/) icons
- Plus Jakarta Sans and JetBrains Mono, self-hosted through Fontsource

## Getting started

```bash
npm install
npm run dev      # development server
npm run lint     # ESLint
npm run build    # production build (client bundle, server bundle, then prerenders every page)
npm run check:seo  # validate the built pages, sitemap and metadata (run after a build)
npm run preview  # serve the production build
```

## Structure

```
src/
  config/brand.js        identity, contact details, asset paths (single source of truth)
  data/                  services, projects, process, values, team
  lib/gsap.js            the only place GSAP plugins are registered
  lib/motion.js          shared timing tokens
  components/brand/      Logo (official master files) and SunriseMark (sun-over-horizon graphic)
  components/layout/     header, footer, skip link, scroll handling, per-route metadata
  components/ui/         buttons, sections, project cards, contact form, reveal helpers
  components/sections/   homepage sections and the closing call to action
  seo/                   route metadata (single source), head tags, JSON-LD, sitemap
  entry-server.js        server render used by the build-time prerender
  pages/                 one file per route
scripts/                 prerender.mjs (per-page HTML + sitemap), check-seo.mjs
docs/seo.md              how SEO works here, and the owner checklist
public/brand/            master logo SVGs used by the site
```

## Brand rules in code

These come from the Elpisoft Brand Guidelines v1.0.

- Use `Elpisoft` in running text. The lowercase `elpisoft` appears only inside the logo artwork.
- Render the logo only from the master files in `public/brand/` via `<img>` (never inline, recolour, animate or add effects), using the version that matches the background.
- Colours are the eight brand tokens in `src/index.css`. The Dawn gradient (`bg-dawn`, 45°, coral to amber) is used sparingly.
- Do not set Coral or Amber text on light backgrounds (contrast). Use Navy on Coral.
- GSAP and Motion must never animate the same element. GSAP owns hero, scroll-linked and horizon effects (marked with `data-*` hooks). Motion owns everything else.
- Every animation must degrade to a complete static page under `prefers-reduced-motion`.

## Book a call

The Book a call buttons open a Google Calendar appointment-schedule page (Google Meet). Set its link in the
`VITE_BOOKING_URL` environment variable; until then they link to the Contact page. See `docs/booking.md`.

## Contact form

The form posts to Formspree (endpoint in `src/config/brand.js`) with the fields `name`, `email`, `subject`, `message` and the `_gotcha` honeypot.
