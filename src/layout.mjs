import { brand, nav, currency, classes, memberships } from './data/site.mjs';
import { svgDefs, icons, badge, botanical } from './svg.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const money = (n) => `${currency}${n}`;

export function makeCtx(base, manifest) {
  const u = (p) => base + p;

  /** Responsive webp image with intrinsic size (prevents layout shift). */
  const img = (name, { alt = '', sizes = '100vw', cls = '', eager = false, pos = '' } = {}) => {
    const m = manifest[name];
    if (!m) throw new Error(`Missing image in manifest: ${name}`);
    const style = pos ? ` style="object-position:${pos}"` : '';
    return `<img${cls ? ` class="${cls}"` : ''} src="${u(`img/${name}.webp`)}" srcset="${u(`img/${name}-640.webp`)} 640w, ${u(`img/${name}.webp`)} ${m.w}w" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}${style}>`;
  };

  const logo = (extra = '') => `<a class="logo ${extra}" href="${u('index.html')}" aria-label="${brand.name} ${brand.descriptor}, home"><span class="logo__mark" aria-hidden="true">D</span><span class="logo__word" aria-hidden="true">${brand.name}</span></a>`;

  const header = (active) => `<header class="site-header" data-header>
  <div class="header__inner">
    ${logo()}
    <nav class="nav" id="site-nav" aria-label="Primary">
      <ul>${nav.map((n) => `<li><a href="${u(n.href)}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul>
      <div class="nav__foot"><a class="btn btn--light" href="${u('schedule.html')}">Book a class</a><p>${esc(brand.address.join(', '))}</p></div>
    </nav>
    <div class="header__actions">
      <a class="link-underline" href="${u('schedule.html')}">Book class</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span></button>
    </div>
  </div>
</header>`;

  const footer = () => `<footer class="site-footer">
  ${botanical('c', 'footer__botanical')}
  <div class="container footer__grid">
    <div class="footer__brand">
      <div class="lockup lockup--light">
        <span class="lockup__word">${brand.name}</span>
        <span class="lockup__sub"><i></i>STUDIO<i></i></span>
      </div>
      <p>${esc(brand.tagline)} A boutique Pilates studio for mindful, precise movement.</p>
      <form class="newsletter" data-demo-form="newsletter" novalidate>
        <label for="nl-email" class="sr-only">Email address</label>
        <input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required>
        <button type="submit">Subscribe</button>
        <p class="form-note" role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="footer__col"><h2>Explore</h2><ul>${nav.map((n) => `<li><a href="${u(n.href)}">${n.label}</a></li>`).join('')}</ul></div>
    <div class="footer__col"><h2>Visit</h2><address>${brand.address.map(esc).join('<br>')}</address>
      <ul class="hours">${brand.hours.map(([d, h]) => `<li><span>${d}</span><span>${h}</span></li>`).join('')}</ul></div>
    <div class="footer__col"><h2>Connect</h2><ul><li><a href="mailto:${brand.email}">${brand.email}</a></li><li><a href="tel:${brand.phone.replace(/\s/g, '')}">${brand.phone}</a></li><li><a class="icon-link" href="${brand.instagram}" target="_blank" rel="noopener">${icons.insta}Instagram</a></li></ul></div>
    <div class="footer__badge">${badge()}</div>
  </div>
  <div class="container footer__legal"><p>© <span data-year>2026</span> ${brand.name} ${brand.descriptor}. Demo content — all names, prices and times are placeholders.</p><p><a href="${u('design-system.html')}">Brand &amp; design system</a></p></div>
</footer>`;

  return { u, img, logo, header, footer, icons, botanical, badge, money, esc };
}

export function shell({ title, description, active = '', body, base = '', ctx, bodyClass = '', ogImage = 'img/hero-reformer.webp' }) {
  const t = title ? `${title} · ${brand.name} ${brand.descriptor}` : `${brand.name} ${brand.descriptor} · ${brand.tagline}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#FAF8F4">
<script>document.documentElement.classList.add('js')</script>
<meta property="og:title" content="${esc(t)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:image" content="${base}${ogImage}">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}fonts/cormorant-garamond-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}fonts/lato-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}css/main.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${svgDefs}
${ctx.header(active)}
<main id="main">
${body}
</main>
${ctx.footer()}
<script type="module" src="${base}js/main.js"></script>
</body>
</html>`;
}
