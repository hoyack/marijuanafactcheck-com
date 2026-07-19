import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
const publish = [
  ['index.html', 'index.html'], ['404.html', '404.html'], ['claims', 'claims'],
  ['methodology', 'methodology'], ['sources', 'sources'], ['newsletter', 'newsletter'],
  ['submit-claim', 'submit-claim'], ['privacy', 'privacy'], ['terms', 'terms'],
  ['disclosure', 'disclosure'], ['corrections', 'corrections'],
  ['assets', 'assets'], ['styles', 'styles'], ['scripts/main.js', 'scripts/main.js'],
  ['robots.txt', 'robots.txt'], ['sitemap.xml', 'sitemap.xml']
];
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const [source, target] of publish) {
  const destination = path.join(out, target);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(root, source), destination, { recursive: true });
}
console.log(`Built isolated static artifact with ${publish.length} entries in dist/.`);
