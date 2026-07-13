import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const required = [
  'index.html',
  'claims/index.html',
  'methodology/index.html',
  'sources/index.html',
  'about/index.html',
  'newsletter/index.html',
  'newsletter/thanks/index.html',
  'submit-claim/index.html',
  'submit-claim/thanks/index.html',
  'corrections/index.html',
  'privacy/index.html',
  'terms/index.html',
  'disclosure/index.html',
  'assets/evidence-grid.svg',
  'assets/favicon.svg',
  'assets/og-card.png',
  'styles/main.css',
  'scripts/main.js',
  'robots.txt',
  'sitemap.xml',
];
for (const relative of required) await access(path.join(dist, relative));

const forbidden = ['.env.example', '.git', '.github', 'docs', 'tests', 'package.json', 'package-lock.json', 'netlify.toml'];
const publishedRoot = new Set(await readdir(dist));
for (const relative of forbidden) {
  assert.equal(publishedRoot.has(relative), false, `source-only path leaked into dist: ${relative}`);
}

for (const [relative, name, honeypot, action] of [
  ['newsletter/index.html', 'mfc-newsletter', 'company-website', '/newsletter/thanks/'],
  ['submit-claim/index.html', 'mfc-claim', 'fax-number', '/submit-claim/thanks/'],
]) {
  const html = await readFile(path.join(dist, relative), 'utf8');
  assert.match(html, /method="POST"/, `${relative}: POST retained`);
  assert.match(html, /data-netlify="true"/, `${relative}: Netlify marker retained`);
  assert.match(html, new RegExp(`name="form-name" value="${name}"`), `${relative}: hidden form name retained`);
  assert.match(html, new RegExp(`netlify-honeypot="${honeypot}"`), `${relative}: honeypot retained`);
  assert.match(html, new RegExp(`name="${honeypot}"`), `${relative}: honeypot field retained`);
  assert.match(html, new RegExp(`action="${action}"`), `${relative}: success action retained`);
}

console.log(`Verified isolated deploy artifact with ${required.length} required files and both Netlify forms.`);
