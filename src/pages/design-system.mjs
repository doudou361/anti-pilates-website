import { icons } from '../svg.mjs';
import { pageHero } from '../parts.mjs';

const colors = [
  ['Warm ivory', '#FAF8F4', 'Page background', '#FAF8F4'], ['Oat', '#F0EBE1', 'Soft panels', '#F0EBE1'], ['Sand', '#D9D4C7', 'Image backdrops', '#D9D4C7'],
  ['Khaki', '#A7A27A', 'Accent, eyebrow, logo letters', '#A7A27A'], ['Dusty rose', '#D9B8AD', 'Botanical wash, highlights', '#D9B8AD'], ['Blush', '#EBD9D1', 'Soft rose fill', '#EBD9D1'],
  ['Natural wood', '#B58F66', 'Material accent', '#B58F66'], ['Olive', '#44503F', 'Secondary dark', '#44503F'], ['Forest', '#2F3B2D', 'Headings, dark bands', '#2F3B2D'], ['Deep forest', '#232C21', 'Footer', '#232C21'],
];

export default function designSystem(ctx) {
  const { img, icons: ic, botanical, badge } = ctx;
  const body = `
${pageHero(ctx, { eyebrow: 'Brand & design system', title: ['Typography,', 'palette & light'], intro: 'Three details carry the mood. Typography gives the studio its voice, the palette gives it warmth, and light does the most to make strength feel soft.', art: 'b' })}

<section class="ds-block"><div class="container">
  <p class="eyebrow">01 · Brand</p><h2 class="h-caps">Logo</h2><p class="lead">A Didone wordmark with a hairline “Studio” descriptor. The monogram echoes the circular mark in the original references.</p>
  <div class="logo-board">
    <div class="logo-tile"><img src="brand/define-logo.svg" alt="Define Studio logo, dark on ivory" width="320" height="180"></div>
    <div class="logo-tile logo-tile--dark"><img src="brand/define-logo-light.svg" alt="Define Studio logo, light on forest" width="320" height="180"></div>
    <div class="logo-tile logo-tile--oat"><img src="brand/define-monogram.svg" alt="Define monogram" width="180" height="180" style="width:150px"></div>
    <div class="logo-tile logo-tile--oat"><img src="brand/define-oval.svg" alt="Define arch oval lockup" width="140" height="230" style="width:120px"></div>
    <div class="logo-tile"><div class="footer__badge" style="color:var(--khaki)">${badge()}</div></div>
    <div class="logo-tile logo-tile--dark"><img src="brand/define-logo-disc.svg" alt="Define Studio on cream disc" width="200" height="200" style="width:170px"></div>
  </div>
</div></section>

<section class="ds-block"><div class="container">
  <p class="eyebrow">02 · Palette</p><h2 class="h-caps">Colour</h2><p class="lead">Warm ivory leads. Dusty rose, olive and natural wood are quiet accents, never loud fills.</p>
  <div class="swatches">${colors.map(([n, h, u, bg]) => `<div class="swatch"><i style="background:${bg}"></i><div><b>${n}</b><span>${h}</span><span>${u}</span></div></div>`).join('')}</div>
</div></section>

<section class="ds-block"><div class="container">
  <p class="eyebrow">03 · Voice</p><h2 class="h-caps">Typography</h2><p class="lead">Cormorant Garamond in tall, quiet capitals for headlines; Lato for clear, small body text. Bodoni Moda is reserved for the logo.</p>
  <div class="type-spec">
    <div class="type-card"><small>Display · Cormorant Garamond 500</small><p class="big">Pilates<br>Studio</p><p class="alpha">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789</p></div>
    <div class="type-card"><small>Body · Lato 400 / 700</small><p class="big" style="font-family:var(--font-body);font-size:2.2rem;text-transform:none;font-weight:300">Precise and easy to understand.</p><p class="body">Strength, given a softer visual expression, while keeping the experience precise and clear. Small, uppercase labels use wide tracking for calm structure.</p></div>
  </div>
  <div class="scale">
    <div><span>Display XL</span><p class="display display--xl" style="font-size:clamp(2.4rem,6vw,5rem)">Moments</p></div>
    <div><span>Display</span><p class="display" style="font-size:3rem">Classes schedule</p></div>
    <div><span>Heading</span><p class="h-caps">Pilates classes monthly prices</p></div>
    <div><span>Eyebrow</span><p class="eyebrow" style="margin:0">Step inside</p></div>
    <div><span>Body</span><p>Lato 16 / 1.7. Muted forest-grey on ivory.</p></div>
  </div>
</div></section>

<section class="ds-block"><div class="container">
  <p class="eyebrow">04 · Atmosphere</p><h2 class="h-caps">Light</h2><p class="lead">The photography is always soft, side-lit and slightly warm. Light is the one detail that turns strength into calm.</p>
  <div class="light-grid">
    <figure class="light-card light-card--a">${img('studio-interior', { alt: '', sizes: '(min-width:860px) 30vw, 90vw', pos: '15% 50%' })}<div><h3>Morning</h3><p>Warm, low and golden through arched glass.</p></div></figure>
    <figure class="light-card light-card--b">${img('studio-detail', { alt: '', sizes: '(min-width:860px) 30vw, 90vw' })}<div><h3>Grain</h3><p>Raking light that shows the oak.</p></div></figure>
    <figure class="light-card light-card--c">${img('class-barre', { alt: '', sizes: '(min-width:860px) 30vw, 90vw' })}<div><h3>Veil</h3><p>Diffused light through sheer linen.</p></div></figure>
  </div>
</div></section>

<section class="ds-block"><div class="container">
  <p class="eyebrow">05 · Form</p><h2 class="h-caps">Shape &amp; botanicals</h2><p class="lead">Arches, ovals and pills soften every frame. Ginkgo line drawings and rough watercolour washes sit at the page edges.</p>
  <div class="shapes">
    <div class="shape"><i style="width:120px;height:160px;border-radius:999px 999px 0 0"></i>Arch</div>
    <div class="shape"><i style="width:90px;height:150px;border-radius:999px"></i>Oval</div>
    <div class="shape"><i style="width:160px;height:64px;border-radius:999px"></i>Pill</div>
    <div class="shape"><i style="width:160px;height:100px"></i>Frame</div>
    <div class="ds-bot">${botanical('a', '')}</div>
  </div>
</div></section>

<section class="ds-block"><div class="container">
  <p class="eyebrow">06 · Interface</p><h2 class="h-caps">Components</h2>
  <div class="demo-row" style="margin-bottom:2rem"><a class="btn" href="#">Primary</a><a class="btn btn--ghost" href="#">Ghost</a><span class="band band--dark" style="padding:1rem;display:inline-block"><a class="btn btn--light" href="#">On dark</a></span><a class="link-arrow" href="#">Text link ${ic.arrow}</a><a class="link-underline" href="#">Book class</a></div>
  <div class="demo-row" style="margin-bottom:2rem"><button class="chip" aria-pressed="true">Selected</button><button class="chip" aria-pressed="false">Default</button><div class="field" style="min-width:260px;margin:0"><label for="ds-in">Input</label><input id="ds-in" placeholder="Your email"></div></div>
  <div class="ds-icons">${['reformer', 'mat', 'tower', 'barre', 'prenatal', 'restore'].map((n) => `<span>${ic[n]}${n}</span>`).join('')}</div>
</div></section>`;
  return { title: 'Brand & Design System', active: '', description: 'The Define brand: logo, palette, typography, light, shapes and components.', body };
}
