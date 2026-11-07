// Inline SVG helpers: ginkgo botanicals, line icons, circular badge.
const INK = '#2F3B2D';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n) => Math.round(n * 10) / 10;

/** Ginkgo leaf outline + radial veins, drawn at origin (stem at 0,0, fan pointing up). */
function leaf({ size = 100, spread = 62, veins = 17, stroke = 0.8, fill = 'none' }) {
  const pts = [];
  const steps = 70;
  for (let i = 0; i <= steps; i++) {
    const deg = -spread + (2 * spread * i) / steps;
    const notch = 20 * Math.exp(-Math.pow(deg / 5.5, 2));
    const scallop = 1.8 * Math.sin(deg * 0.55);
    const r = size * (1 - 0.1 * Math.pow(Math.abs(deg) / spread, 2)) - notch * (size / 100) + scallop;
    const a = (deg * Math.PI) / 180;
    pts.push([r * Math.sin(a), -r * Math.cos(a)]);
  }
  const outline = `M0 0 L${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L')} Z`;
  let lines = '';
  for (let i = 0; i <= veins; i++) {
    const p = pts[Math.round((i / veins) * steps)];
    lines += `M0 0 L${f(p[0] * 0.97)} ${f(p[1] * 0.97)} `;
  }
  return `<path d="${outline}" fill="${fill}" stroke="${INK}" stroke-width="${stroke}" stroke-linejoin="round"/><path d="${lines}" fill="none" stroke="${INK}" stroke-width="${stroke * 0.55}" opacity=".75"/>`;
}

function blob(cx, cy, r, color, opacity, seed) {
  const rand = rng(seed);
  const n = 9;
  const p = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.7 + rand() * 0.45);
    p.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${f(mid(p[n - 1], p[0])[0])} ${f(mid(p[n - 1], p[0])[1])}`;
  for (let i = 0; i < n; i++) {
    const m = mid(p[i], p[(i + 1) % n]);
    d += ` Q${f(p[i][0])} ${f(p[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return `<path d="${d} Z" fill="${color}" opacity="${opacity}" filter="url(#rough)"/>`;
}

const PRESETS = {
  // top-right cluster: large, with olive/grey washes
  a: {
    vb: '0 0 420 420',
    blobs: [[300, 130, 70, '#B9B38A', 0.55, 3], [250, 190, 55, '#A9A7A3', 0.6, 8], [350, 60, 40, '#D9B8AD', 0.45, 5]],
    stem: 'M10 380 C 90 330 160 270 215 215 S 330 120 380 40',
    leaves: [[215, 215, -28, 110, 'none'], [265, 160, 24, 96, '#E9E3D3'], [330, 100, -8, 120, 'none'], [150, 270, -62, 80, 'none']],
  },
  // left cluster: rose washes
  b: {
    vb: '0 0 360 360',
    blobs: [[110, 190, 62, '#E0BDB1', 0.7, 11], [70, 230, 40, '#CFA79B', 0.5, 14], [210, 120, 48, '#BDB894', 0.4, 2]],
    stem: 'M30 330 C 90 300 150 260 190 190 S 250 90 270 40',
    leaves: [[190, 190, -38, 105, 'none'], [235, 120, 18, 92, '#F2E3DC'], [130, 250, -78, 78, 'none']],
  },
  // lower cluster: olive/grey
  c: {
    vb: '0 0 360 360',
    blobs: [[190, 190, 70, '#C9C4A4', 0.5, 21], [120, 240, 50, '#A9A7A3', 0.45, 9], [250, 120, 36, '#D9B8AD', 0.4, 6]],
    stem: 'M340 330 C 280 300 220 260 170 200 S 90 100 60 30',
    leaves: [[170, 200, 34, 104, 'none'], [115, 135, -20, 90, '#E8E2D0'], [215, 250, 70, 80, 'none']],
  },
  // delicate single sprig (used small)
  d: {
    vb: '0 0 240 240',
    blobs: [[130, 100, 44, '#E0BDB1', 0.55, 31]],
    stem: 'M20 220 C 80 190 120 150 140 100 S 170 40 190 14',
    leaves: [[140, 100, -14, 82, 'none'], [100, 160, -58, 62, 'none']],
  },
};

export function botanical(variant = 'a', cls = '') {
  const p = PRESETS[variant];
  const leaves = p.leaves
    .map(([x, y, rot, size, fill]) => `<g transform="translate(${x} ${y}) rotate(${rot})">${leaf({ size, fill })}</g>`)
    .join('');
  const stem = `<path d="${p.stem}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`;
  const dots = `<circle cx="${p.vb.split(' ')[2] * 0.62}" cy="${p.vb.split(' ')[3] * 0.4}" r="1.6" fill="${INK}"/>`;
  return `<svg class="botanical ${cls}" viewBox="${p.vb}" aria-hidden="true" focusable="false">${p.blobs.map((b) => blob(...b)).join('')}${stem}${leaves}${dots}</svg>`;
}

/** Hidden defs (rough watercolour edge) – include once per page. */
export const svgDefs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<filter id="rough" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/></filter>
</defs></svg>`;

const S = 'fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"';
export const icons = {
  reformer: `<svg viewBox="0 0 48 48" ${S} aria-hidden="true"><rect x="5" y="25" width="38" height="6" rx="1.5"/><path d="M8 31v6M40 31v6M12 25l6-8h7M32 25h6"/><path d="M12 21h8" opacity=".6"/><circle cx="36" cy="18" r="2.2"/></svg>`,
  mat: `<svg viewBox="0 0 48 48" ${S} aria-hidden="true"><circle cx="14" cy="28" r="7"/><circle cx="14" cy="28" r="3"/><path d="M14 21h24a4 4 0 0 1 0 14H14"/><path d="M12 14c3-2 6-2 9 0" opacity=".6"/></svg>`,
  tower: `<svg viewBox="0 0 48 48" ${S} aria-hidden="true"><path d="M10 40V8M38 40V8M10 8h28M10 40h28"/><path d="M18 8v14M30 8v10M18 22l-3 4M30 18l3 4"/><path d="M14 31h20" opacity=".6"/></svg>`,
  barre: `<svg viewBox="0 0 48 48" ${S} aria-hidden="true"><path d="M7 20h34M11 20v20M37 20v20M7 20c-2 0-2-3 0-3h34c2 0 2 3 0 3"/><path d="M22 40c0-5 4-5 4-10" opacity=".6"/></svg>`,
  prenatal: `<svg viewBox="0 0 48 48" ${S} aria-hidden="true"><circle cx="24" cy="29" r="12"/><path d="M12 29c4-3 8-4 12-4s8 1 12 4" opacity=".6"/><circle cx="24" cy="12" r="3.2"/></svg>`,
  restore: `<svg viewBox="0 0 48 48" ${S} aria-hidden="true"><path d="M24 40c-10-3-14-12-12-22 8 1 14 5 14 13"/><path d="M24 40c10-3 14-12 12-22-8 1-14 5-14 13"/><path d="M24 40V22"/></svg>`,
  arrow: `<svg viewBox="0 0 24 10" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M0 5h22M18 1l4 4-4 4"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 10" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M24 5H2M6 1L2 5l4 4"/></svg>`,
  close: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M3 3l14 14M17 3L3 17"/></svg>`,
  insta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  check: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>`,
};

/** Circular rotating-text badge like the reference "yoga association" seal. */
export function badge(text = 'DEFINE * PILATES STUDIO * STRENGTH SOFTENED *') {
  return `<svg class="badge" viewBox="0 0 200 200" role="img" aria-label="Define Pilates Studio seal">
<defs><path id="badgeCircle" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"/></defs>
<text><textPath href="#badgeCircle" startOffset="0" textLength="486">${text}</textPath></text>
<g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" transform="translate(100 104)">
<path d="M0 22 C-2 4 -3 -8 0 -22 C3 -8 2 4 0 22Z"/><path d="M0 22 C-14 20 -28 8 -30 -6 C-16 -6 -4 4 0 22Z"/><path d="M0 22 C14 20 28 8 30 -6 C16 -6 4 4 0 22Z"/><path d="M-26 26h52" opacity=".6"/></g></svg>`;
}
