const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'stage/index.html'));
  await p.waitForFunction(() => window.READY === true);
  await p.evaluate(() => { renderAt(57.9); document.getElementById('hud').style.visibility = 'hidden'; document.getElementById('grain').style.opacity = '.04'; });
  await p.screenshot({ path: process.argv[2], type: 'jpeg', quality: 92 });
  await b.close();
})();
