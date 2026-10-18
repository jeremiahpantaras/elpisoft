// Renders noon.html to the final 1080x1350 PNG.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const OUT = process.argv[2] || path.join(__dirname, 'out');
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'noon.html'));
  await p.waitForFunction(() => window.READY === true);
  const file = path.join(OUT, 'elpisoft-brand-awareness-2026-10-19-12nn.png');
  await p.locator('#poster').screenshot({ path: file });
  // report any text that overflows its box or the safe area
  const issues = await p.evaluate(() => [...document.querySelectorAll('h1,.sub,.cta,.url,.tag,.label')].map(e => { const r = e.getBoundingClientRect(); return [e.className || e.tagName, Math.round(r.left), Math.round(r.right), Math.round(r.top), Math.round(r.bottom)]; }));
  console.log(JSON.stringify(issues));
  await b.close();
})();
