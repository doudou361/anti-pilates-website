import { existsSync } from 'node:fs';
// Dev helper: node scripts/shot.mjs <path> <out.png> [width=1440] [height=900] [full=1|0|tiles]
// Uses the locally installed Chrome via playwright-core. Needs the preview server running (npm start).
import { chromium } from 'playwright-core';
const [path = 'index.html', out = 'shot.png', w = '1440', h = '900', full = '1'] = process.argv.slice(2);
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find((p) => existsSync);
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errors = [];
p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
p.on('pageerror', (e) => errors.push(String(e)));
p.on('requestfailed', (r) => errors.push('REQ FAIL ' + r.url()));
await p.goto('http://localhost:4173/' + path, { waitUntil: 'networkidle' });
await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')));
await p.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => console.log('some images did not load'));
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in')));
await p.waitForTimeout(900);
if (full === 'tiles') {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  let n = 0;
  for (let y = 0; y < H; y += +h) {
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(450);
    await p.screenshot({ path: out.replace('.png', '-' + String(n++).padStart(2, '0') + '.png') });
  }
  console.log('tiles:', n);
} else await p.screenshot({ path: out, fullPage: full === '1' });
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('overflowX:', overflow, 'errors:', errors.length ? errors : 'none');
await b.close();


