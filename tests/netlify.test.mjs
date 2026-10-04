import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const forms = [["newsletter", "mfc-newsletter", "subscribed"], ["submit-claim", "mfc-claim", "submitted"]];
for (const [route, name, query] of forms) {
 const html=readFileSync(`dist/${route}/index.html`, 'utf8');
 const tag=html.match(/<form\b[^>]*>/)[0];
 assert.ok(tag.includes(`name="${name}"`), `${route}: stable form name`);
 assert.match(tag, /method="POST"/, `${route}: POST`);
 assert.match(tag, /data-netlify="true"/, `${route}: native detection`);
 assert.match(tag, /netlify-honeypot="bot-field"/, `${route}: honeypot declaration`);
 assert.ok(tag.includes(`action="/${route}/thanks/?${query}=1"`), `${route}: same-origin success route`);
 assert.ok(html.includes(`type="hidden" name="form-name" value="${name}"`), `${route}: form identity`);
 assert.match(html, /name="bot-field"/, `${route}: honeypot input`);
 assert.match(html, /name="privacy-consent"[^>]*required/, `${route}: consent`);
 assert.doesNotMatch(html, /formsubmit|name="_(honey|subject|next)"/i, `${route}: retired provider removed`);
 const thanks=readFileSync(`dist/${route}/thanks/index.html`,'utf8');
 assert.match(thanks, /name="robots" content="noindex,follow"/, `${route}: noindex success page`);
}
assert.doesNotMatch(readFileSync('netlify.toml','utf8'), /formsubmit/i);
console.log(`Verified ${forms.length} built Netlify form contracts (NOT hosted submission proof).`);
