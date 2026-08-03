import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const required = [
  'index.html',
  '404.html',
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

for (const [relative, name, honeypot, nextPath, intent] of [
  ['newsletter/index.html', 'mfc-newsletter', 'company-website', 'newsletter/thanks/', 'newsletter_submit'],
  ['submit-claim/index.html', 'mfc-claim', 'fax-number', 'submit-claim/thanks/', 'claim_submit'],
]) {
  const html = await readFile(path.join(dist, relative), 'utf8');
  assert.match(html, /method="POST"/, `${relative}: POST retained`);
  assert.match(html, /action="https:\/\/formsubmit\.co\/hello@hoyack\.com"/, `${relative}: delivery endpoint retained`);
  assert.match(html, new RegExp(`name="form-name" value="${name}"`), `${relative}: hidden form name retained`);
  assert.match(html, /name="_honey"/, `${relative}: provider honeypot retained`);
  assert.match(html, new RegExp(`name="${honeypot}"`), `${relative}: secondary honeypot retained`);
  assert.match(html, new RegExp(`name="_next" value="https://marijuanafactcheck\\.com/${nextPath}\\?submitted=1"`), `${relative}: guarded success redirect retained`);
  assert.match(html, new RegExp(`<form[^>]+data-conversion="${intent}"`), `${relative}: validated intent event retained`);
  assert.match(html, /name="source" value="mfc"/, `${relative}: source tag retained`);
  assert.match(html, /name="offer" value="mfc-media"/, `${relative}: offer tag retained`);
}

for (const [relative, event] of [
  ['newsletter/thanks/index.html', 'newsletter_requested'],
  ['submit-claim/thanks/index.html', 'claim_submitted'],
]) {
  const html = await readFile(path.join(dist, relative), 'utf8');
  assert.match(html, new RegExp(`<body data-success-event="${event}">`), `${relative}: authoritative success event retained`);
}

const notFound = await readFile(path.join(dist, '404.html'), 'utf8');
assert.match(notFound, /<meta name="robots" content="noindex,follow">/, '404 is noindexed');

console.log(`Verified isolated deploy artifact with ${required.length} required files, Plausible, guarded FormSubmit conversions, and a custom 404.`);
