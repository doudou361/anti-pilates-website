import { memberships, packs, introOffer, faqs, currency } from '../data/site.mjs';
import { pageHero, ctaBand, faqList } from '../parts.mjs';
import { esc, money } from '../layout.mjs';

export default function memberships_(ctx) {
  const { u, icons } = ctx;
  const plans = memberships.map((m) => `<article class="plan reveal${m.featured ? ' is-featured' : ''}" id="${m.id}">
    ${m.featured ? '<span class="plan__flag">Most loved</span>' : ''}
    <h3>${esc(m.name)}</h3>
    <p class="plan__price">${money(m.price)}<small>/month</small></p>
    <p class="plan__note">${esc(m.note)}</p>
    <ul>${m.features.map((f) => `<li>${icons.check}<span>${esc(f)}</span></li>`).join('')}</ul>
    <a class="btn" href="${u('contact.html')}?plan=${m.id}">Choose ${esc(m.name)}</a></article>`).join('');

  const packHtml = [...packs, null].map((p) => p
    ? `<article class="pack reveal"><h3>${esc(p.name)}</h3><p class="pack__price">${money(p.price)}</p><p>${esc(p.note)}</p><p>${esc(p.valid)}</p><a class="link-arrow" href="${u('schedule.html')}">Book ${ctx.icons.arrow}</a></article>`
    : `<article class="pack pack--intro reveal"><h3>${esc(introOffer.name)}</h3><p class="pack__price">${money(introOffer.price)}</p><p>${esc(introOffer.note)}</p><p>${esc(introOffer.valid)}</p><a class="link-arrow" href="${u('schedule.html')}">Start now ${ctx.icons.arrow}</a></article>`).join('');

  const body = `
${pageHero(ctx, { eyebrow: 'Memberships', title: ['Simple, fair', 'pricing'], intro: 'Choose a monthly rhythm or pay as you go. Every option includes mats, props, towels and filtered water.', art: 'b' })}
<section class="section" style="padding-top:1rem">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">Monthly</p><h2 class="h-caps">Memberships</h2></div><p class="section__lead">Prices are provisional examples. Edit them in <code>src/data/site.mjs</code>.</p></div>
    <div class="plans">${plans}</div>
  </div>
</section>
<section class="section" style="background:var(--oat)">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">Flexible</p><h2 class="h-caps">Class packs &amp; first steps</h2></div></div>
    <div class="packs">${packHtml}</div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">Policies</p><h2 class="h-caps">The small print, kindly</h2></div></div>
    <div class="policy">
      <div><h3>Booking</h3><p>Reserve classes online up to 14 days ahead. Small groups mean we cap every class.</p></div>
      <div><h3>Cancelling</h3><p>Cancel or reschedule up to 12 hours before class at no cost. Later cancellations use a credit.</p></div>
      <div><h3>Pausing</h3><p>Travelling or unwell? Freeze your membership once a year. Just let us know.</p></div>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container"><div class="section__head section__head--center"><div><p class="eyebrow">Questions</p><h2 class="h-caps">Frequently asked</h2></div></div>${faqList(faqs)}</div>
</section>
${ctaBand(ctx)}`;
  return { title: 'Memberships & Pricing', active: 'memberships', description: 'Monthly Pilates memberships, class packs and a first-steps offer at Define Pilates Studio.', body };
}
