import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const routes = [
  ['/', 'Marijuana Fact Check'],
  ['/claims/', 'Evidence Claims'],
  ['/methodology/', 'Methodology'],
  ['/sources/', 'Source Register'],
  ['/newsletter/', 'Evidence Newsletter'],
  ['/newsletter/thanks/', 'Subscribed'],
  ['/submit-claim/', 'Submit a Claim'],
  ['/submit-claim/thanks/', 'Claim Submitted'],
  ['/privacy/', 'Privacy Notice'],
  ['/terms/', 'Terms of Use'],
  ['/disclosure/', 'Disclosure'],
  ['/corrections/', 'Corrections'],
];
const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

async function startLocalServer() {
  const siteRoot = resolve(process.env.SITE_DIR || '.');
  const rootPrefix = siteRoot.endsWith(sep) ? siteRoot : `${siteRoot}${sep}`;
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      let target = resolve(siteRoot, pathname.replace(/^\/+/, ''));
      if (target !== siteRoot && !target.startsWith(rootPrefix)) {
        response.writeHead(403).end('Forbidden');
        return;
      }
      if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
      const body = await readFile(target);
      response.writeHead(200, { 'content-type': contentTypes.get(extname(target)) || 'application/octet-stream' });
      response.end(body);
    } catch {
      const body = await readFile(resolve(siteRoot, '404.html'));
      response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      response.end(body);
    }
  });
  await new Promise((accept, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', accept);
  });
  const address = server.address();
  return { server, base: `http://127.0.0.1:${address.port}` };
}

let localServer;
let base = process.env.BASE_URL;
if (!base) {
  const local = await startLocalServer();
  localServer = local.server;
  base = local.base;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', err => errors.push(err.message));

try {
  for (const [pathname, expected] of routes) {
    const response = await page.goto(`${base}${pathname}`, { waitUntil: 'networkidle' });
    const status = response.status();
    const expectedStatus = pathname === '/nonexistent' ? 404 : 200;
    assert.equal(status, expectedStatus, `${pathname}: expected ${expectedStatus}, got ${status}`);
    const title = await page.title();
    assert.ok(title.includes(expected), `${pathname}: title "${title}" should contain "${expected}"`);
  }

  // Verify 404 returns real 404 status
  const notFoundResponse = await page.goto(`${base}/nonexistent`, { waitUntil: 'networkidle' });
  assert.equal(notFoundResponse.status(), 404, 'unknown route must return 404');

  // Home page checks
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  const homeGradeBadges = await page.$$eval('.grade-badge', els => els.length);
  assert.ok(homeGradeBadges >= 3, `home page should show at least 3 grade badges, got ${homeGradeBadges}`);

  // Claims page
  await page.goto(`${base}/claims/`, { waitUntil: 'networkidle' });
  const claimCards = await page.$$eval('[data-claim-card]', els => els.length);
  assert.ok(claimCards >= 4, `claims page should have at least 4 claim cards, got ${claimCards}`);

  // Search filter on claims
  const searchInput = await page.$('[data-claim-search]');
  assert.ok(searchInput, 'claims page must have search input');

  // Newsletter form
  await page.goto(`${base}/newsletter/`, { waitUntil: 'networkidle' });
  const newsletterForm = await page.$('form[action*="formsubmit.co"]');
  assert.ok(newsletterForm, 'newsletter must use FormSubmit');
  const honeypotFields = await page.$$eval('input[name="_honey"], input[name="bot-field"]', els => els.length);
  assert.equal(honeypotFields, 2, 'newsletter form must have two honeypot fields');

  // Submit-claim form
  await page.goto(`${base}/submit-claim/`, { waitUntil: 'networkidle' });
  const claimForm = await page.$('form[action*="formsubmit.co"]');
  assert.ok(claimForm, 'submit-claim must use FormSubmit');

  // Thank-you page conversion guards
  await page.goto(`${base}/newsletter/thanks/?subscribed=1`, { waitUntil: 'networkidle' });
  const subView = await page.$('[data-conversion-view]');
  assert.ok(subView, 'newsletter thanks must have conversion view element');

  await page.goto(`${base}/submit-claim/thanks/?submitted=1`, { waitUntil: 'networkidle' });
  const claimView = await page.$('[data-conversion-view]');
  assert.ok(claimView, 'submit-claim thanks must have conversion view element');

  // Policy pages load
  for (const policy of ['/privacy/', '/terms/', '/disclosure/', '/corrections/']) {
    await page.goto(`${base}${policy}`, { waitUntil: 'networkidle' });
    const h1 = await page.$('h1');
    assert.ok(h1, `${policy}: must have h1`);
  }

  // 404 noindex
  await page.goto(`${base}/nonexistent`, { waitUntil: 'networkidle' });
  const robots = await page.$eval('meta[name="robots"]', el => el.content);
  assert.ok(robots.includes('noindex'), '404 robots meta must include noindex');

  assert.deepEqual(errors, [], `browser errors:\n${errors.join('\n')}`);
  console.log(`Browser tests passed: ${routes.length} routes verified.`);
} finally {
  await browser.close();
  if (localServer) await new Promise(resolve => localServer.close(resolve));
}
