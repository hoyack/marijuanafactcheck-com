import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist', 'artifacts', 'playwright-report', 'test-results']);
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full));
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = await walk(root);
assert.ok(pages.length >= 11, 'expected complete route set including custom 404');
const broken = [];
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const rel = path.relative(root, file);
  assert.match(html, /<title>[^<]+<\/title>/, `${rel}: title`);
  assert.match(html, /<meta name="description" content="[^"]+">/, `${rel}: description`);
  assert.match(html, /<link rel="canonical" href="https:\/\/marijuanafactcheck\.com\//, `${rel}: canonical`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${rel}: one h1`);
  assert.match(html, /&copy; <span data-year>2026<\/span> Hoyack\. All rights reserved\./, `${rel}: Hoyack footer`);
  assert.match(html, /Not medical or legal advice\./, `${rel}: medical/legal boundary`);
  assert.match(html, /<script defer data-domain="marijuanafactcheck\.com" src="https:\/\/plausible\.io\/js\/script\.js"><\/script>/, `${rel}: Plausible analytics`);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1].split('#')[0].split('?')[0];
    if (!url || /^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const target = url.startsWith('/') ? path.join(root, url) : path.resolve(path.dirname(file), url);
    let candidate = target;
    try {
      if ((await stat(target)).isDirectory()) candidate = path.join(target, 'index.html');
      await stat(candidate);
    } catch { broken.push(`${rel}: ${m[1]}`); }
  }
}
assert.deepEqual(broken, [], `broken links:\n${broken.join('\n')}`);

const home = await readFile(path.join(root, 'index.html'), 'utf8');
assert.match(home, /<title>Marijuana Fact Check \| Evidence-Graded Cannabis Claims<\/title>/);
assert.match(home, /<h1>Every cannabis claim gets a grade/);
assert.match(home, /Browse the evidence database/);
assert.match(home, /Subscribe to evidence updates/);
assert.ok((home.match(/class="grade-badge\b/g) || []).length >= 3, 'expected at least three grade-badged sample claims');

const claims = await readFile(path.join(root, 'claims/index.html'), 'utf8');
assert.ok((claims.match(/data-claim-card/g) || []).length >= 4, 'expected at least four claim cards');

const newsletter = await readFile(path.join(root, 'newsletter/index.html'), 'utf8');
assert.match(newsletter, /name="source" value="marijuanafactcheck"/);
assert.match(newsletter, /name="offer" value="evidence-newsletter"/);
assert.match(newsletter, /method="POST"/);
assert.match(newsletter, /action="https:\/\/formsubmit\.co\/hello@hoyack\.com"/);
assert.match(newsletter, /name="_honey"/);
assert.match(newsletter, /name="bot-field"/);
assert.match(newsletter, /name="privacy-consent"/);
assert.match(newsletter, /name="_subject" value="MFC newsletter subscription"/);
assert.match(newsletter, /name="_next" value="https:\/\/marijuanafactcheck\.com\/newsletter\/thanks\/\?subscribed=1"/);

const newsletterThanks = await readFile(path.join(root, 'newsletter/thanks/index.html'), 'utf8');
assert.match(newsletterThanks, /data-conversion-view="newsletter_subscribed" data-conversion-param="subscribed"/, 'thank-you must guard conversion with param');

const submitClaim = await readFile(path.join(root, 'submit-claim/index.html'), 'utf8');
assert.match(submitClaim, /name="source" value="marijuanafactcheck"/);
assert.match(submitClaim, /name="offer" value="claim-submission"/);
assert.match(submitClaim, /name="_honey"/);
assert.match(submitClaim, /name="bot-field"/);
assert.match(submitClaim, /name="claim_text"/);
assert.match(submitClaim, /name="claim_source"/);

const claimThanks = await readFile(path.join(root, 'submit-claim/thanks/index.html'), 'utf8');
assert.match(claimThanks, /data-conversion-view="claim_submitted" data-conversion-param="submitted"/, 'thank-you must guard conversion with param');

const clientScript = await readFile(path.join(root, 'scripts/main.js'), 'utf8');
assert.match(clientScript, /window\.plausible\s*=\s*window\.plausible\s*\|\|\s*function/, 'analytics queue must exist');
assert.match(clientScript, /new URLSearchParams\(location\.search\)/, 'view conversions must require form-success query marker');

const privacy = await readFile(path.join(root, 'privacy/index.html'), 'utf8');
assert.match(privacy, /FormSubmit/, 'privacy notice must name the form processor');
assert.match(privacy, /Plausible/, 'privacy notice must name the analytics provider');

const notFound = await readFile(path.join(root, '404.html'), 'utf8');
assert.match(notFound, /<meta name="robots" content="noindex,follow">/, '404 must be noindexed');
assert.match(notFound, /<h1>No evidence for that route<\/h1>/, '404 must explain the missing route');

for (const required of ['README.md', '.env.example', 'netlify.toml', 'robots.txt', 'sitemap.xml', 'scripts/build.mjs', 'docs/CONCEPT.md', 'docs/CRO.md', 'docs/REVENUE.md', 'docs/CONTENT-LOOP.md', 'docs/DEPLOYMENT.md', 'docs/ANALYTICS.md', 'docs/ARCHITECTURE.md', 'docs/ASSET-PROVENANCE.md']) await stat(path.join(root, required));

const cro = await readFile(path.join(root, 'docs/CRO.md'), 'utf8');
assert.match(cro, /Growth\/Revenue Operations/, 'CRO brief must name the lead-response owner');
assert.match(cro, /one business day/, 'CRO brief must define the first-touch SLA');
assert.match(cro, /`newsletter_submit`.*`newsletter_subscribed`/s, 'CRO brief must map intent to authoritative conversion');

const analytics = await readFile(path.join(root, 'docs/ANALYTICS.md'), 'utf8');
assert.match(analytics, /Plausible/, 'analytics runbook must reflect production instrumentation');
assert.match(analytics, /FormSubmit/, 'analytics runbook must reflect the production form path');

const architecture = await readFile(path.join(root, 'docs/ARCHITECTURE.md'), 'utf8');
assert.doesNotMatch(architecture, /Netlify Forms/, 'architecture must not claim retired form path');

const deployment = await readFile(path.join(root, 'docs/DEPLOYMENT.md'), 'utf8');
assert.match(deployment, /try_files \$uri \$uri\/ =404/, 'K3s runbook must reject unknown routes');
assert.match(deployment, /error_page 404 \/404\.html/, 'K3s runbook must serve the custom 404');

const readme = await readFile(path.join(root, 'README.md'), 'utf8');
assert.doesNotMatch(readme, /uses Netlify Forms/, 'README must not claim retired form path');

const netlify = await readFile(path.join(root, 'netlify.toml'), 'utf8');
assert.match(netlify, /publish = "dist"/, 'Netlify must publish isolated dist');
assert.match(netlify, /form-action 'self' https:\/\/formsubmit\.co/, 'CSP must permit the production form endpoint');
assert.match(netlify, /from = "\/\*"\s+to = "\/404\.html"\s+status = 404/, 'Netlify catch-all must return a real 404');

const buildScript = await readFile(path.join(root, 'scripts/build.mjs'), 'utf8');
assert.match(buildScript, /\['404\.html', '404\.html'\]/, 'deploy artifact must include the custom 404');

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
assert.equal(pkg.scripts.build, 'node scripts/build.mjs', 'production build command');
assert.match(pkg.scripts['test:all'], /npm run build/, 'full suite must build the publish artifact');
assert.match(pkg.scripts['test:all'], /SITE_DIR=dist npm test/, 'full suite must browser-test dist');

console.log(`Static validation passed for ${pages.length} pages, locked copy, forms, legal boundary, links, deploy isolation, and handoff docs.`);
