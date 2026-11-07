import { classes, schedule, memberships, posts, instructors, faqs, spaceSlides, principles, brand, days } from './data/site.mjs';
import { esc, money } from './layout.mjs';

export const classById = Object.fromEntries(classes.map((c) => [c.id, c]));
export const instructorById = Object.fromEntries(instructors.map((i) => [i.id, i]));

export const stagger = (a, b, { tag = 'h2', cls = '' } = {}) => `<${tag} class="display stagger ${cls}"><span>${a}</span><span>${b}</span></${tag}>`;

/** "Mon · Wed · Fri" for a class, derived from the schedule. */
export function classDays(id) {
  const order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const ds = [...new Set(schedule.filter((s) => s.classId === id).map((s) => s.day))].sort((x, y) => order.indexOf(x) - order.indexOf(y));
  return ds.join(' · ');
}
export const times = (id) => {
  const t = schedule.filter((s) => s.classId === id).map((s) => s.time).sort();
  return t.length ? `${t[0]} – ${t[t.length - 1]}` : '';
};

export const fmtDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function classRows(ctx) {
  return `<ul class="rows">${classes.map((c) => `<li><a class="row" href="${ctx.u('classes.html')}#${c.id}">
    <span class="row__name">${esc(c.name)}</span>
    <span class="row__meta">${esc(c.room)} · ${esc(c.level)}</span>
    <span class="row__time">${classDays(c.id)}<small>${times(c.id)}</small></span>
    <span class="row__len">${c.duration} min</span>
    <span class="row__arrow" aria-hidden="true">${ctx.icons.arrow}</span></a></li>`).join('')}</ul>`;
}

export function pricingGrid(ctx) {
  return `<div class="pricing">${memberships.map((m) => `<article class="pricing__cell${m.featured ? ' is-featured' : ''}">
    <h3>${esc(m.name)}</h3><p class="pricing__note">${esc(m.note)}</p>
    <p class="pricing__price">${money(m.price)}<small>/month</small></p>
    <a class="pricing__cta" href="${ctx.u('memberships.html')}#${m.id}">Order now ${ctx.icons.arrow}</a></article>`).join('')}</div>`;
}

export function journalCards(ctx, list = posts) {
  return `<div class="cards">${list.map((p, i) => `<article class="card reveal" style="--d:${i * 80}ms">
    <a class="card__media" href="${ctx.u(`journal/${p.slug}.html`)}" tabindex="-1" aria-hidden="true">${ctx.img(p.image, { alt: '', sizes: '(min-width:900px) 30vw, 90vw' })}<span class="card__date"><b>${new Date(p.date).getUTCDate()}</b>${new Date(p.date).toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })}</span></a>
    <p class="card__meta">${esc(p.category)} · ${p.read} min read</p>
    <h3 class="card__title"><a href="${ctx.u(`journal/${p.slug}.html`)}">${esc(p.title)}</a></h3>
    <p class="card__text">${esc(p.excerpt)}</p></article>`).join('')}</div>`;
}

export const faqList = (items = faqs) => `<div class="faq">${items.map((f) => `<details><summary>${esc(f.q)}<span aria-hidden="true"></span></summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;

export function carousel(ctx) {
  return `<div class="carousel" data-carousel aria-roledescription="carousel" aria-label="Inside the studio">
  <div class="carousel__track" tabindex="0" aria-label="Studio photos. Use the arrow keys to move between slides." data-track>
    ${spaceSlides.map((s, i) => `<figure class="slide" aria-roledescription="slide" aria-label="${i + 1} of ${spaceSlides.length}">
      <div class="slide__img">${ctx.img(s.image, { alt: s.title, sizes: '(min-width:900px) 62vw, 88vw' })}</div>
      <figcaption><span class="slide__n">0${i + 1}</span><b>${esc(s.title)}</b><span>${esc(s.text)}</span></figcaption></figure>`).join('')}
  </div>
  <div class="carousel__controls">
    <div class="carousel__progress" aria-hidden="true"><i data-bar></i></div>
    <p class="carousel__count" aria-live="polite"><span data-current>01</span> / 0${spaceSlides.length}</p>
    <button class="round-btn" type="button" data-prev aria-label="Previous slide">${ctx.icons.arrowLeft}</button>
    <button class="round-btn" type="button" data-next aria-label="Next slide">${ctx.icons.arrow}</button>
  </div></div>`;
}

export function ctaBand(ctx, { title = ['Begin where', 'you are'], text = 'New to Define? Your first three classes are on us at a gentle price. No experience needed, only curiosity.', btn = 'Book First Steps', href = 'schedule.html' } = {}) {
  return `<section class="cta band band--dark">
  ${ctx.botanical('d', 'cta__botanical')}
  <div class="container cta__inner reveal">
    <p class="eyebrow">New here?</p>
    ${stagger(title[0], title[1], { cls: 'display--light' })}
    <p class="cta__text">${esc(text)}</p>
    <div class="cta__actions"><a class="btn btn--light" href="${ctx.u(href)}">${btn}</a><a class="link-arrow link-arrow--light" href="${ctx.u('memberships.html')}">See memberships ${ctx.icons.arrow}</a></div>
  </div></section>`;
}

export function pageHero(ctx, { eyebrow, title, intro, art = 'a' }) {
  return `<section class="page-hero">
  ${ctx.botanical(art, 'page-hero__botanical')}
  <div class="container page-hero__inner">
    <p class="eyebrow">${esc(eyebrow)}</p>
    ${stagger(title[0], title[1], { tag: 'h1', cls: 'display--xl' })}
    ${intro ? `<p class="lead">${esc(intro)}</p>` : ''}
  </div></section>`;
}
