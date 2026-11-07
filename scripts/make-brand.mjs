// Generates outlined (font-independent) SVG logo files into public/brand + public/favicon.svg
//   node scripts/make-brand.mjs
import opentype from 'opentype.js';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const load = (p) => {
  const b = readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const fp = (pkg, file) => `node_modules/@fontsource/${pkg}/files/${file}.woff`;
const bodoni = load(fp('bodoni-moda', 'bodoni-moda-latin-500-normal'));
const cormorant = load(fp('cormorant-garamond', 'cormorant-garamond-latin-500-normal'));
const lato = load(fp('lato', 'lato-latin-700-normal'));

const INK = '#2F3B2D', KHAKI = '#A7A27A', IVORY = '#FAF8F4', CREAM = '#F5F0E4';
const r2 = (n) => Math.round(n * 100) / 100;

function cmdsToD(commands) {
  let d = '';
  for (const c of commands) {
    if (c.type === 'M') d += `M${r2(c.x)} ${r2(c.y)}`;
    else if (c.type === 'L') d += `L${r2(c.x)} ${r2(c.y)}`;
    else if (c.type === 'Q') d += `Q${r2(c.x1)} ${r2(c.y1)} ${r2(c.x)} ${r2(c.y)}`;
    else if (c.type === 'C') d += `C${r2(c.x1)} ${r2(c.y1)} ${r2(c.x2)} ${r2(c.y2)} ${r2(c.x)} ${r2(c.y)}`;
    else if (c.type === 'Z') d += 'Z';
  }
  if (d.includes('NaN')) throw new Error('Generated SVG path contains NaN');
  return d;
}

/** Outlined text laid out glyph-by-glyph with optional tracking (em units). */
function text(font, str, x, y, size, { fill, spacing = 0, anchor = 'start' }) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(str);
  const advances = glyphs.map((g, i) => {
    const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
    return (g.advanceWidth + kern) * scale + (i < glyphs.length - 1 ? spacing * size : 0);
  });
  const w = advances.reduce((a, b) => a + b, 0);
  let cursor = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  const x0 = cursor;
  let d = '';
  glyphs.forEach((g, i) => {
    d += cmdsToD(g.getPath(cursor, y, size).commands);
    cursor += advances[i];
  });
  return { svg: `<path d="${d}" fill="${fill}"/>`, w, x0 };
}

function lockup({ ink, accent, w = 360, cx = w / 2, y0 = 0 }) {
  const word = text(bodoni, 'Define', cx, y0 + 118, 118, { fill: ink, spacing: -0.025, anchor: 'middle' });
  const sub = text(lato, 'STUDIO', cx, y0 + 170, 15, { fill: accent, spacing: 0.5, anchor: 'middle' });
  const gap = 18, len = 62, ly = y0 + 165;
  const rules = `<path d="M${r2(sub.x0 - gap - len)} ${ly}H${r2(sub.x0 - gap)}M${r2(sub.x0 + sub.w + gap)} ${ly}H${r2(sub.x0 + sub.w + gap + len)}" stroke="${accent}" stroke-width="1" fill="none"/>`;
  return word.svg + sub.svg + rules;
}

const svg = (vb, inner, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${title}"><title>${title}</title>${inner}</svg>\n`;

mkdirSync('public/brand', { recursive: true });

// 1 + 2: primary lockups
writeFileSync('public/brand/define-logo.svg', svg('0 0 360 200', lockup({ ink: INK, accent: KHAKI }), 'Define Studio'));
writeFileSync('public/brand/define-logo-light.svg', svg('0 0 360 200', lockup({ ink: IVORY, accent: KHAKI }), 'Define Studio'));

// 3: cream disc badge (echoes the supplied logo: dark ring, cream disc, crisp wordmark with generous margin)
{
  const body = `<circle cx="100" cy="100" r="99" fill="${INK}"/><circle cx="100" cy="100" r="92" fill="${CREAM}"/><g transform="translate(100 102) scale(.43) translate(-180 -100)">${lockup({ ink: INK, accent: '#6E6A49' })}</g>`;
  writeFileSync('public/brand/define-logo-disc.svg', svg('0 0 200 200', body, 'Define Studio'));
}

// 4: monogram ring
function monogram(ink, bg = '') {
  const d = text(bodoni, 'D', 70, 92, 76, { fill: ink, anchor: 'middle' });
  return `${bg}<circle cx="70" cy="70" r="66" fill="none" stroke="${ink}" stroke-width="1.6"/>${d.svg}`;
}
writeFileSync('public/brand/define-monogram.svg', svg('0 0 140 140', monogram(INK), 'Define monogram'));

// 5: arch oval "DE / FINE" (echoes the reference's YO / GA oval)
{
  const a = text(cormorant, 'DE', 62, 110, 44, { fill: KHAKI, anchor: 'middle', spacing: 0.03 });
  const b = text(cormorant, 'FINE', 76, 156, 44, { fill: KHAKI, anchor: 'middle', spacing: 0.03 });
  const inner = `<rect x="2" y="2" width="136" height="226" rx="68" fill="none" stroke="${KHAKI}" stroke-width="1.4"/>${a.svg}${b.svg}`;
  writeFileSync('public/brand/define-oval.svg', svg('0 0 140 230', inner, 'Define arch oval'));
}

// favicon
{
  const d = text(bodoni, 'D', 32, 43, 36, { fill: INK, anchor: 'middle' });
  writeFileSync('public/favicon.svg', svg('0 0 64 64', `<circle cx="32" cy="32" r="31" fill="${IVORY}" stroke="${INK}" stroke-width="1.4"/>${d.svg}`, 'Define'));
}
console.log('brand files written');
