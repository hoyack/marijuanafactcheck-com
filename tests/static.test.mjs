import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'artifacts', 'dist', 'playwright-report', 'test-results']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = await walk(root);
assert.ok(pages.length >= 13, 'expected complete route set');
const broken = [];
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(root, file);
  assert.match(html, /<title>[^<]+<\/title>/, `${relative}: title`);
  assert.match(html, /<meta name="description" content="[^"]+">/, `${relative}: description`);
  assert.match(html, /<link rel="canonical" href="https:\/\/marijuanafactcheck\.com\//, `${relative}: canonical`);
  assert.match(html, /<meta property="og:image" content="https:\/\/marijuanafactcheck\.com\/assets\/og-card\.png">/, `${relative}: raster social card`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${relative}: one h1`);
  assert.match(html, /© <span data-year>2026<\/span> Hoyack\. All rights reserved\./, `${relative}: footer`);
  assert.match(html, /Not medical or legal advice\./, `${relative}: disclaimer boundary`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1].split('#')[0].split('?')[0];
    if (!url || /^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const target = url.startsWith('/') ? path.join(root, url) : path.resolve(path.dirname(file), url);
    let candidate = target;
    try {
      if ((await stat(target)).isDirectory()) candidate = path.join(target, 'index.html');
      await stat(candidate);
    } catch {
      broken.push(`${relative}: ${match[1]}`);
    }
  }
}
assert.deepEqual(broken, [], `broken links:\n${broken.join('\n')}`);

const home = await readFile(path.join(root, 'index.html'), 'utf8');
assert.match(home, /<h1>Claims, graded — not hyped<\/h1>/);
assert.equal((home.match(/class="claim-card /g) || []).length, 6);

for (const formPath of ['newsletter/index.html', 'submit-claim/index.html']) {
  const form = await readFile(path.join(root, formPath), 'utf8');
  assert.match(form, /data-netlify="true"/);
  assert.match(form, /netlify-honeypot=/);
  assert.match(form, /name="source" value="mfc"/);
  assert.match(form, /name="offer" value="mfc-media"/);
  assert.match(form, /id="privacy-consent"/);
}

for (const thanksPath of ['newsletter/thanks/index.html', 'submit-claim/thanks/index.html']) {
  const thanks = await readFile(path.join(root, thanksPath), 'utf8');
  assert.match(thanks, /<meta name="robots" content="noindex,follow">/, `${thanksPath}: noindex confirmation page`);
}

const socialCard = await readFile(path.join(root, 'assets/og-card.png'));
assert.deepEqual([...socialCard.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], 'social card is PNG');
assert.equal(socialCard.readUInt32BE(16), 1200, 'social card width');
assert.equal(socialCard.readUInt32BE(20), 630, 'social card height');

console.log(`Static checks passed for ${pages.length} pages, claim records, SEO, compliance copy, forms, and local links.`);
