// Static build: src/pages/*.mjs  ->  dist/*.html, plus fonts, css, js, images.
//   node scripts/build.mjs
import { mkdirSync, rmSync, cpSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { makeCtx, shell } from '../src/layout.mjs';
import { posts } from '../src/data/site.mjs';

const root = process.cwd();
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// static assets
cpSync(join(root, 'public'), dist, { recursive: true });

// self-hosted fonts (from @fontsource, OFL licensed)
mkdirSync(join(dist, 'fonts'), { recursive: true });
const fontFiles = [
  ['cormorant-garamond', 'cormorant-garamond-latin-400-normal'], ['cormorant-garamond', 'cormorant-garamond-latin-500-normal'],
  ['cormorant-garamond', 'cormorant-garamond-latin-600-normal'], ['cormorant-garamond', 'cormorant-garamond-latin-500-italic'],
  ['lato', 'lato-latin-300-normal'], ['lato', 'lato-latin-400-normal'], ['lato', 'lato-latin-700-normal'],
  ['bodoni-moda', 'bodoni-moda-latin-400-normal'], ['bodoni-moda', 'bodoni-moda-latin-500-normal'],
];
for (const [pkg, file] of fontFiles) {
  cpSync(join(root, 'node_modules/@fontsource', pkg, 'files', `${file}.woff2`), join(dist, 'fonts', `${file}.woff2`));
}

const manifestPath = join(dist, 'img', 'manifest.json');
if (!existsSync(manifestPath)) throw new Error('Run `npm run images` first (public/img/manifest.json missing).');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const pageFiles = readdirSync(join(root, 'src/pages')).filter((f) => f.endsWith('.mjs') && !f.startsWith('_'));
for (const file of pageFiles) {
  const name = file.replace('.mjs', '');
  const mod = (await import(pathToFileURL(join(root, 'src/pages', file)).href)).default;
  const ctx = makeCtx('', manifest);
  const page = mod(ctx);
  writeFileSync(join(dist, `${name}.html`), shell({ ...page, ctx, bodyClass: `page-${name}` }));
  console.log('page', `${name}.html`);
}

// journal articles
mkdirSync(join(dist, 'journal'), { recursive: true });
const article = (await import(pathToFileURL(join(root, 'src/pages/_article.mjs')).href)).default;
for (const post of posts) {
  const ctx = makeCtx('../', manifest);
  const page = article(ctx, post);
  writeFileSync(join(dist, 'journal', `${post.slug}.html`), shell({ ...page, ctx, base: '../', bodyClass: 'page-article', ogImage: `img/${post.image}.webp` }));
  console.log('page', `journal/${post.slug}.html`);
}
console.log('build ok ->', dist);
