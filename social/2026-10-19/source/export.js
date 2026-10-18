// Renders master.html at 2160x2160 and cuts the four 1080x1080 tiles from that single master image.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path'), fs = require('fs');
const FF = require('ffmpeg-static');
const OUT = process.argv[2] || path.join(__dirname, 'out');
const base = 'elpisoft-services-2026-10-19';
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const p = await b.newPage({ viewport: { width: 2160, height: 2160 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'master.html'));
  await p.waitForFunction(() => window.READY === true);
  const master = path.join(OUT, `${base}-master.png`);
  await p.locator('#master').screenshot({ path: master });
  await b.close();
  const crops = [[0, 0], [1080, 0], [0, 1080], [1080, 1080]];
  crops.forEach(([x, y], i) => execFileSync(FF, ['-y', '-loglevel', 'error', '-i', master, '-vf', `crop=1080:1080:${x}:${y}`, path.join(OUT, `${base}-tile-${i + 1}.png`)]));
  console.log('ok', OUT);
})();
