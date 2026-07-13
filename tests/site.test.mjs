import assert from 'node:assert/strict';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

const routes = [
  '/',
  '/claims/',
  '/methodology/',
  '/sources/',
  '/about/',
  '/newsletter/',
  '/submit-claim/',
  '/corrections/',
  '/privacy/',
  '/terms/',
  '/disclosure/',
  '/newsletter/thanks/',
  '/submit-claim/thanks/',
];
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

let server;
let base = process.env.BASE_URL;
if (!base) {
  const root = path.resolve(process.env.SITE_ROOT || process.cwd());
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let file = path.resolve(root, `.${pathname}`);
      if (!file.startsWith(`${root}${path.sep}`) && file !== root) throw new Error('invalid path');
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
      response.end(body);
    } catch {
      const body = await readFile(path.join(root, '404.html'));
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(body);
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  base = `http://127.0.0.1:${address.port}`;
}
base = base.replace(/\/$/, '');
await mkdir('artifacts', { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${route} 200`);
      assert.equal(await page.locator('h1').count(), 1, `${route} one h1`);
    }
    assert.deepEqual(errors, [], `console errors ${viewport.width}: ${errors.join('; ')}`);

    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/home-${viewport.width}.png`, fullPage: true });
    if (viewport.width < 500) {
      await page.locator('[data-nav-toggle]').click();
      assert.ok((await page.locator('[data-nav-menu]').getAttribute('class')).includes('open'));
    }
    await page.close();
  }

  const form = await browser.newPage();
  await form.goto(`${base}/newsletter/`);
  for (const id of ['name', 'email', 'privacy-consent']) {
    assert.ok(await form.locator(`#${id}`).count(), `missing ${id}`);
  }
  assert.equal(await form.locator('input[name="source"]').getAttribute('value'), 'mfc');
  assert.equal(await form.locator('input[name="offer"]').getAttribute('value'), 'mfc-media');
  assert.equal(await form.locator('form[name="mfc-newsletter"]').getAttribute('data-conversion'), 'newsletter_submit');
  await form.close();

  const analytics = await browser.newPage();
  await analytics.route('https://plausible.io/js/script.js', (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  for (const [route, event] of [
    ['/newsletter/thanks/', 'newsletter_requested'],
    ['/submit-claim/thanks/', 'claim_submitted'],
  ]) {
    await analytics.goto(base + route, { waitUntil: 'networkidle' });
    assert.deepEqual(await analytics.evaluate(() => (window.plausible.q || []).map((args) => args[0])), [], `${route} direct visit does not convert`);

    await analytics.goto(`${base}${route}?submitted=1`, { waitUntil: 'networkidle' });
    assert.deepEqual(await analytics.evaluate(() => (window.plausible.q || []).map((args) => args[0])), [event], `${route} guarded success converts once`);
    assert.equal(new URL(analytics.url()).search, '', `${route} success marker removed`);

    await analytics.reload({ waitUntil: 'networkidle' });
    assert.deepEqual(await analytics.evaluate(() => (window.plausible.q || []).map((args) => args[0])), [], `${route} refresh does not reconvert`);
  }

  const notFoundResponse = await analytics.goto(`${base}/definitely-not-a-route`, { waitUntil: 'networkidle' });
  assert.equal(notFoundResponse.status(), 404, 'unknown routes return 404');
  assert.equal(await analytics.locator('h1').count(), 1, 'custom 404 has one h1');
  assert.equal(await analytics.locator('meta[name="robots"]').getAttribute('content'), 'noindex,follow', 'custom 404 is noindexed');
  await analytics.close();
} finally {
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}

console.log(`Verified ${routes.length} routes at desktop/mobile, guarded conversions, custom 404, menu, forms, and zero console errors.`);
