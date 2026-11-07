// End-to-end browser verification across desktop, tablet & mobile viewports.
// Requires preview server running (npm start). Usage: node scripts/verify.mjs [outDir]
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const OUT = process.argv[2] || '';
if (OUT) mkdirSync(OUT, { recursive: true });
const shot = async (page, name) => { if (OUT) await page.screenshot({ path: `${OUT}/${name}` }); };

const exe = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);
const BASE = 'http://localhost:4173';
const browser = await chromium.launch({ executablePath: exe });
const errors = [];

function attachCheckers(page, label) {
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${label}] console: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e}`));
  page.on('requestfailed', (r) => errors.push(`[${label}] reqfail: ${r.url()}`));
}

const pages = [
  'index.html', 'studio.html', 'classes.html', 'schedule.html',
  'memberships.html', 'journal.html', 'contact.html', 'design-system.html',
  'journal/strength-softened.html', '404.html',
];

for (const width of [1440, 1080, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  attachCheckers(page, `w${width}`);
  for (const path of pages) {
    await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')));
    await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 10000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.equal(overflow, 0, `Horizontal overflow (${overflow}px) on ${path} at ${width}px`);
  }
  await page.close();
}
console.log('✓ All 10 pages pass 0px overflow & 100% loaded images across 1440 / 1080 / 768 / 390px');

// Desktop user journeys
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  attachCheckers(page, 'desktop');

  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await shot(page, 'v-home-hero-1440.png');

  assert.equal(await page.textContent('[data-current]'), '01');
  await page.click('[data-next]');
  await page.waitForTimeout(500);
  assert.equal(await page.textContent('[data-current]'), '02');
  await page.focus('[data-track]');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  assert.equal(await page.textContent('[data-current]'), '03');
  console.log('✓ Carousel button + keyboard navigation verified (01 -> 02 -> 03)');

  await page.locator('.split').scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await shot(page, 'v-home-split-1440.png');

  await page.goto(`${BASE}/design-system.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')));
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await page.locator('.logo-board').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await shot(page, 'v-ds-logos-1440.png');
  await page.locator('.light-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await shot(page, 'v-ds-light-1440.png');

  await page.goto(`${BASE}/memberships.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in')));
  await page.locator('.packs').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await shot(page, 'v-packs-1440.png');

  await page.click('#signature .btn');
  await page.waitForLoadState('networkidle');
  assert.equal(await page.inputValue('#c-topic'), 'A membership');
  assert.match(await page.inputValue('#c-msg'), /Signature membership/);
  await page.fill('#c-name', 'Claire Laurent');
  await page.fill('#c-email', 'claire@example.com');
  await page.click('.form-panel button[type="submit"]');
  assert.match(await page.textContent('.form-status'), /demo form/i);
  console.log('✓ Membership -> Contact prefill & demo submission verified');

  await page.goto(`${BASE}/schedule.html?class=reformer`, { waitUntil: 'networkidle' });
  assert.equal(await page.getAttribute('.chip[data-filter="reformer"]', 'aria-pressed'), 'true');
  const visibleClasses = await page.$$eval('.slot:not([hidden])', (els) => [...new Set(els.map((e) => e.dataset.class))]);
  assert.deepEqual(visibleClasses, ['reformer']);

  await page.click('.slot:not([hidden])');
  await page.waitForSelector('#booking-dialog[open]');
  await page.click('#booking-dialog button[type="submit"]');
  assert.match(await page.textContent('#booking-dialog .err'), /name/i);
  await page.fill('#b-name', 'Claire Laurent');
  await page.fill('#b-email', 'claire@example.com');
  await shot(page, 'v-booking-modal.png');
  await page.click('#booking-dialog button[type="submit"]');
  await page.waitForSelector('#booking-done:not([hidden])');
  await shot(page, 'v-booking-confirmed.png');
  await page.click('#booking-finish');
  assert.equal(await page.isVisible('#mybookings'), true);
  assert.match(await page.textContent('#mybookings-list'), /Reformer Flow/);
  await page.click('#mybookings-list [data-del]');
  assert.equal(await page.isHidden('#mybookings'), true);
  console.log('✓ Schedule filter, booking dialog validation, confirmation, persistence & cancel verified');

  await page.close();

  // 404 check in its own isolated page (expected HTTP 404 logs a browser resource message)
  const p404 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await p404.goto(`${BASE}/non-existent-route`);
  assert.equal(res.status(), 404);
  assert.match(await p404.textContent('h1'), /Quiet corner/i);
  await p404.close();
  console.log('✓ 404 fallback verified');
}

// Mobile user journeys
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  attachCheckers(page, 'mobile');

  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await shot(page, 'v-mob-hero.png');

  await page.click('.menu-toggle');
  await page.waitForTimeout(450);
  assert.equal(await page.getAttribute('.menu-toggle', 'aria-expanded'), 'true');
  await shot(page, 'v-mob-nav.png');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(450);
  assert.equal(await page.getAttribute('.menu-toggle', 'aria-expanded'), 'false');
  console.log('✓ Mobile drawer open + Escape close verified');

  await page.locator('.split').scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await shot(page, 'v-mob-split.png');

  await page.goto(`${BASE}/schedule.html`, { waitUntil: 'networkidle' });
  await shot(page, 'v-mob-schedule.png');

  await page.close();
}

await browser.close();
assert.equal(errors.length, 0, `Browser errors detected:\n${errors.join('\n')}`);
console.log('✓ Zero console, page, or network errors across all tests!');
