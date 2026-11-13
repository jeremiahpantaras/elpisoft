// Validates the built site in dist/ (run after `npm run build`): `npm run check:seo`
// Reads only the generated files, so it needs no server and no dependencies. Exits non-zero on any failure.
import fs from 'node:fs'
import path from 'node:path'

const dist = path.join(process.cwd(), 'dist')
const ORIGIN = 'https://www.elpisoft.com'
const failures = []
const ok = (cond, msg) => { if (!cond) failures.push(msg); console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`) }
const read = (f) => fs.readFileSync(path.join(dist, f), 'utf8')
const one = (re, s) => { const m = [...s.matchAll(re)]; return m.length === 1 ? m[0][1] : null }

// sitemap -> list of canonical URLs
const sitemap = read('sitemap.xml')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
ok(urls.length > 0 && /^<\?xml/.test(sitemap) && sitemap.includes('http://www.sitemaps.org/schemas/sitemap/0.9'), 'sitemap.xml is well-formed XML with the sitemap namespace')
ok(urls.every((u) => u.startsWith(`${ORIGIN}/`)), 'sitemap URLs all use the preferred origin (https://www.elpisoft.com)')
ok(new Set(urls).size === urls.length, 'sitemap has no duplicate URLs')
ok(!/lastmod|changefreq|priority/.test(sitemap), 'sitemap carries no invented lastmod/changefreq/priority')

const robots = read('robots.txt')
ok(/^Sitemap: https:\/\/www\.elpisoft\.com\/sitemap\.xml$/m.test(robots) && !/^Disallow:\s*\S/m.test(robots), 'robots.txt declares the sitemap and blocks nothing')

const titles = new Set()
const descriptions = new Set()
for (const url of urls) {
  const p = url.replace(ORIGIN, '') || '/'
  const file = p === '/' ? 'index.html' : `${p.slice(1)}.html`
  ok(fs.existsSync(path.join(dist, file)), `${p}: prerendered file exists (${file})`)
  if (!fs.existsSync(path.join(dist, file))) continue
  const html = read(file)
  const head = html.slice(0, html.indexOf('</head>'))
  const body = html.slice(html.indexOf('<div id="root">'))
  const title = one(/<title>(.*?)<\/title>/g, head)
  const desc = one(/<meta name="description" content="(.*?)"/g, head)
  ok(title && desc, `${p}: exactly one title and one meta description`)
  ok(one(/<link rel="canonical" href="(.*?)"/g, head) === url && one(/<meta property="og:url" content="(.*?)"/g, head) === url, `${p}: canonical and og:url equal the sitemap URL`)
  ok(one(/<meta name="robots" content="(.*?)"/g, head) === 'index, follow', `${p}: indexable (index, follow)`)
  ok(one(/<meta property="og:image" content="(.*?)"/g, head)?.startsWith(`${ORIGIN}/`), `${p}: og:image is absolute on the preferred origin`)
  ok((body.match(/<h1[\s>]/g) ?? []).length === 1, `${p}: exactly one <h1> in the server-rendered HTML`)
  ok(!/style="[^"]*opacity:\s*0[^.\d]/.test(body), `${p}: no server-rendered content hidden by inline opacity:0`)
  titles.add(title)
  descriptions.add(desc)
  for (const [, json] of head.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    let doc
    try { doc = JSON.parse(json) } catch { doc = null }
    ok(doc && doc['@context'] === 'https://schema.org', `${p}: JSON-LD parses`)
  }
}
ok(titles.size === urls.length, 'every page has a unique title')
ok(descriptions.size === urls.length, 'every page has a unique description')

// Unlisted pages: reachable by URL, never in the sitemap, always noindex.
for (const p of ['/sta-catalina']) {
  const file = `${p.slice(1)}.html`
  ok(fs.existsSync(path.join(dist, file)), `${p}: unlisted page is prerendered (${file})`)
  if (!fs.existsSync(path.join(dist, file))) continue
  const head = read(file).slice(0, read(file).indexOf('</head>'))
  ok(/<meta name="robots" content="noindex"/.test(head) && !/rel="canonical"/.test(head), `${p}: unlisted page is noindex with no canonical`)
  ok(!urls.some((u) => u.endsWith(p)), `${p}: unlisted page is not in the sitemap`)
}

const notFound = read('404.html')
ok(/<meta name="robots" content="noindex"/.test(notFound) && !/rel="canonical"/.test(notFound), '404.html is noindex with no canonical')

// Brand consistency in everything shipped
const everything = ['index.html', '404.html', ...urls.map((u) => (u.replace(ORIGIN, '') === '/' ? null : `${u.replace(`${ORIGIN}/`, '')}.html`)).filter(Boolean)].map(read).join('\n')
ok(!/cosdevsph\.vercel\.app|cosedevs\.com|Beacon Development|ElpiSoft|Elpi Soft/.test(everything), 'no old-brand or old-domain strings in the generated pages')

console.log(`\n${failures.length ? `${failures.length} FAILED` : 'all SEO checks passed'}`)
process.exit(failures.length ? 1 : 0)
