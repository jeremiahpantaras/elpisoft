# SEO: how it works, and what only the owner can do

Production origin: **https://www.elpisoft.com** (preferred host: `www`, HTTPS, no trailing slash).

## How the site is built for search

The site is a React single-page app, but it is **prerendered at build time**: every public page is written as
its own complete HTML file, so search engines and link-preview bots get the right title, description,
canonical, structured data and content without running JavaScript. The browser then hydrates the page.

```
npm run build
  1. vite build                       client bundle -> dist/
  2. vite build --ssr src/entry-server.js   server bundle -> dist-server/ (temporary)
  3. node scripts/prerender.mjs       one HTML file per route, 404.html, sitemap.xml
npm run check:seo                     validates dist/ (run after a build)
```

| Concern | Where it lives |
|---|---|
| Every page's title, description, indexability, breadcrumbs | `src/seo/routeMeta.js` (the single source) |
| Services, families, industries (menus, pages and marquee all read these) | `src/data/services.js`, `src/data/industries.js` |
| `<head>` tags for a page | `src/seo/head.js` |
| JSON-LD (Organization + WebSite on `/`; BreadcrumbList + Service on service pages) | `src/seo/jsonld.js` |
| `sitemap.xml` (generated at build, indexable routes only, no invented `lastmod`) | `src/seo/sitemap.js` |
| Client-side `<head>` updates during navigation | `src/components/layout/PageMeta.jsx` |
| URL rules: clean URLs, no trailing slash, real 404 | `vercel.json` (`cleanUrls`, `trailingSlash: false`) |
| Static `robots.txt` (allows everything, declares the sitemap) | `public/robots.txt` |
| Company name, contact details, socials (feeds the JSON-LD) | `src/config/brand.js` |

### Adding a page
1. Add the route to `ROUTES` in `src/seo/routeMeta.js` (title, description; `crumbs` if it shows breadcrumbs).
2. Add the `<Route>` in `src/App.jsx` and create the page component.
3. Build. The page now has its own HTML, canonical, sitemap entry and (if it has `crumbs`) BreadcrumbList.
4. Run `npm run check:seo`.

Never edit a sitemap by hand, never set `<title>`/meta tags inside a page component, and only mark a page
`indexable: false` if it should stay out of search (the 404 page already is).

### Rules that keep the markup honest
- Structured data uses only facts already visible on the site. No ratings, reviews, awards, employee counts,
  founding dates or `LocalBusiness` (there is no visitable office).
- `Organization.sameAs` mirrors `BRAND.socials`. Change the handles in `brand.js` and the schema follows.
- BreadcrumbList is emitted only on pages that show visible breadcrumbs.
- No hreflang: there is one English site. Add it only when real alternate-language or regional pages exist.
- Prerendered content is visible without JavaScript. Entrance animations (`Reveal`, the hero) must never leave
  server-rendered content hidden; see the comments in `Reveal.jsx` and `HomeHero.jsx`.

## Owner actions (need accounts, DNS or dashboards)

### Before the next deploy
1. **Vercel -> Project -> Firewall (done: Attack Mode is off and Bot Protection was turned off; re-check
   before turning Bot Protection back on).** Link-preview fetchers for WhatsApp, Telegram and Viber are not on Vercel's
   verified-bot list. If Attack Mode (or the Bot Protection ruleset in challenge mode) is on, they get a
   "Vercel Security Checkpoint" page (HTTP 429) instead of the site, and humans wait through a challenge.
   Turn Attack Mode off (Vercel recommends it only during an attack), or add WAF bypass rules for the user
   agents `WhatsApp`, `TelegramBot`, `Viber`, `Slackbot`, `Discordbot`.
2. **Subdomains.** `recivo`, `epuno`, `incognito`, `jeremiah` and `kr1stik` `.elpisoft.com` are linked from the
   Work and About pages but did not resolve in DNS when checked. Add each domain to its Vercel project and
   create the DNS records, or those links will be dead.
3. **Vercel -> Domains.** Make `elpisoft.com` redirect permanently (308) to `www.elpisoft.com`. Add the old
   `*.cosedevs.com` hosts as permanent redirects to their `elpisoft.com` equivalents, and keep `cosedevs.com`
   registered.

### Accounts and verification (nothing here can be done from the repository)
1. **Google Search Console:** add a *Domain* property for `elpisoft.com` (DNS TXT record), then submit
   `https://www.elpisoft.com/sitemap.xml`. Use URL Inspection on `/`, `/about`, `/work` and a service page to
   confirm Google fetches the correct HTML.
2. **Bing Webmaster Tools:** import the site from Search Console and submit the same sitemap.
3. **Conversions:** the site sends `contact_form_submit` and `contact_click` (`channel`: email, phone, whatsapp,
   telegram, viber) to Vercel Web Analytics. Custom events need a Pro or Enterprise Vercel plan; on other plans the
   calls are ignored. If GA4 is wanted later it needs a consent banner first.
4. **Profiles:** rename the existing Instagram, LinkedIn and Facebook pages to Elpisoft (renaming keeps
   followers). `socials` in `src/config/brand.js` currently holds *temporary* handles (`instagram.com/elpisoft`,
   `linkedin.com/company/elpisoft`); once the accounts are renamed, confirm they match, or update them.
   They also feed the Organization `sameAs` data, so they must point at the real, official profiles.
5. **Business directories** (Clutch, The Manifest, DesignRush, GoodFirms): same name, description, logo and
   contact details as the site; reviews only from real clients through each platform's own process.
6. **Google Business Profile: not eligible while the business is remote-only** (it needs a visitable location or
   in-person service). Do not create one with a home or virtual-office address.

## Post-deployment checklist (in priority order)
1. `curl -I https://www.elpisoft.com/about` gives 200; `/about/` and `/about.html` give 308 to `/about`; an
   unknown URL gives **404**. (This site's rules were tested against an emulation of Vercel's behaviour; confirm
   on a real preview deployment before promoting it.)
2. A WhatsApp / Telegram / Viber / Facebook / LinkedIn share of the homepage shows the title, description and
   image. Platforms cache previews, so use their debugger tools (Facebook Sharing Debugger, LinkedIn Post
   Inspector) to refresh.
3. Google Rich Results Test and Schema.org Validator accept the homepage and a service page.
4. Search Console: sitemap status "Success", the 12 URLs discovered, no soft-404 or canonical conflicts.
5. PageSpeed Insights (mobile) on `/`: note lab LCP, CLS and the Vercel checkpoint effect on real users.
6. After 2 to 4 weeks: branded queries in Search Console (regex filter `elpi`) and the country report.

## Content that needs facts from the owner (not invented)
The service pages use only facts already on the site. Stronger pages need real input: typical timelines and
scope, the technology actually used per service, case-study detail (problem, approach, what shipped) and
permission to name clients, a current Recivo screenshot (the existing one shows the old brand), contracting and
payment terms for overseas clients, and a legal review of `/privacy-policy` (the old `/privacy` URL redirects there permanently via `vercel.json`). A UAE-facing page should wait until there
is genuine UAE experience or presence to describe.
