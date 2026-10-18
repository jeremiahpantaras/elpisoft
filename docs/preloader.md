# Branded preloader

A short brand introduction on every full page load (first visit, refresh, direct entry to any URL). It does not play on client-side route changes, and nothing is stored in the browser: a refresh is a new document, so it plays again.

## How it works

- **Overlay: `index.html`.** Static HTML and CSS in the page template, so it appears with the first paint, before the JavaScript bundle arrives, and is in every prerendered page (including the 404). It sits outside `#root`, so React never renders or hydrates it.
- **Entrance: CSS only.** Logo fade, horizon line, Dawn accent and tagline rise run from the inline `#preloader-css`.
- **Exit: GSAP, `src/lib/preloader.js`.** `finishPreloader()` is called once from `useClientBehaviours` in `src/App.jsx`, when the app has hydrated. The overlay lifts away on a Dawn edge, and the hero sunrise (held paused behind it, see `.preload-lock` in `src/index.css`) starts as it lifts.
- **Safety net: inline script in `index.html`.** If the app never starts, the overlay is removed after `MAX_MS` (4 s), scrolling and interaction are restored, and the prerendered page is already underneath.

## Behaviour

| Situation | Result |
|---|---|
| Normal load | about 1.8 s: 0.95 s minimum from the start of the load, then a 0.85 s exit |
| Slow network or failing bundle | removed at 4 s at the latest |
| Reduced motion | static logo and tagline, a 0.25 s fade, finished by about 0.75 s |
| JavaScript disabled | never shown (the overlay is `display: none` until a script adds `html.is-preloading`) |
| Back/forward cache restore | removed immediately, not replayed |
| While visible | scroll locked (`html.preload-lock`), `#root` is `inert`, overlay is `aria-hidden` and has nothing focusable |

## Changing it

- Exit timing: `PRELOADER` in `src/lib/preloader.js`.
- Hard cap (`MAX_MS`) and entrance timing (CSS durations): `index.html`.

## Logo rules (Brand Guidelines p11–13)

The overlay uses the official stacked reversed logo, `public/brand/elpisoft_stacked_reversed.svg`, a verbatim copy of the master in the brand kit. Never edit, inline or redraw it, and never add transforms, filters or shadows to `.pl-logo`. Only the whole stage that contains it is faded and moved on exit. The horizon line sits outside the logo's clear space (x = the height of the sun). The tagline is a separate element and is never part of the logo artwork.
