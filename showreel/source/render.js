// usage: node render.js stills 1,2.5,7   |   node render.js video <fps> <workers>
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const FFMPEG = require('ffmpeg-static');
const URL = 'file://' + path.join(__dirname, 'stage/index.html');

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERROR', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await page.goto(URL);
  await page.waitForFunction(() => window.READY === true, null, { timeout: 30000 });
  return page;
}

(async () => {
  const [mode, a1, a2, only] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security', '--force-color-profile=srgb'] });
  if (mode === 'stills') {
    const page = await openPage(browser);
    fs.mkdirSync(path.join(__dirname, 'stills'), { recursive: true });
    for (const t of a1.split(',').map(Number)) {
      await page.evaluate(t => window.renderAt(t), t);
      await page.screenshot({ path: path.join(__dirname, 'stills', `t${t.toFixed(2)}.jpg`), type: 'jpeg', quality: 85 });
    }
    await browser.close(); return;
  }
  const fps = Number(a1 || 30), workers = Number(a2 || 4);
  const dur = await (await openPage(browser)).evaluate(() => window.DURATION);
  const total = Math.ceil(dur * fps);
  const per = Math.ceil(total / workers);
  fs.mkdirSync(path.join(__dirname, 'parts'), { recursive: true });
  const t0 = Date.now();
  await Promise.all(Array.from({ length: workers }, async (_, w) => {
    if (only != null && String(w) !== only) return;
    const start = w * per, end = Math.min(total, start + per);
    const page = await openPage(browser);
    const cdp = await page.context().newCDPSession(page);
    const out = path.join(__dirname, 'parts', `p${w}.mp4`);
    const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(fps), out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = start; f < end; f++) {
      await page.evaluate(([t, fps]) => window.renderAt(t, fps), [f / fps, fps]);
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 94, optimizeForSpeed: true });
      const buf = Buffer.from(data, 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (w === 0 && f % 60 === 0) console.log(`w0 ${f - start}/${end - start}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }));
  fs.writeFileSync(path.join(__dirname, 'parts', 'list.txt'), Array.from({ length: workers }, (_, w) => `file 'p${w}.mp4'`).join('\n'));
  console.log('done in', ((Date.now() - t0) / 1000).toFixed(0), 's, frames', total);
  await browser.close();
})();
