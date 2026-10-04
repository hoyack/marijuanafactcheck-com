import assert from 'node:assert/strict';
import {access,readdir,readFile} from 'node:fs/promises';
import './netlify.test.mjs';
const required=['index.html','404.html','_headers','_redirects','claims/index.html','methodology/index.html','sources/index.html','newsletter/index.html','newsletter/thanks/index.html','submit-claim/index.html','submit-claim/thanks/index.html','corrections/index.html','privacy/index.html','terms/index.html','disclosure/index.html','styles/main.css','scripts/main.js','robots.txt','sitemap.xml'];
for(const file of required)await access(`dist/${file}`);
const published=new Set(await readdir('dist'));
for(const forbidden of ['.env.example','.git','.github','docs','tests','package.json','package-lock.json','netlify.toml'])assert.equal(published.has(forbidden),false,`source-only path leaked: ${forbidden}`);
assert.match(await readFile('dist/404.html','utf8'), /name="robots" content="noindex,follow"/);
console.log(`Verified ${required.length} required publish files and source isolation; hosted submissions still unverified.`);
