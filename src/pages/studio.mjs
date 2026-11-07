import { instructors, faqs, brand } from '../data/site.mjs';
import { pageHero, ctaBand, faqList, carousel } from '../parts.mjs';
import { esc } from '../layout.mjs';

export default function studio(ctx) {
  const { u, img, icons } = ctx;
  const body = `
${pageHero(ctx, { eyebrow: 'The studio', title: ['A quiet room', 'for strong bodies'], intro: 'Define was designed around a simple belief: you move better when the space around you is calm, warm and full of light.', art: 'b' })}

<section class="section" style="padding-top:1rem">
  <div class="container story">
    <div class="story__imgs reveal">
      <figure>${img('studio-interior', { alt: 'The main studio with arched windows and oak reformers', sizes: '(min-width:900px) 50vw, 90vw' })}</figure>
      <figure>${img('studio-detail', { alt: 'Detail of an oak reformer with cream strap', sizes: '(min-width:900px) 22vw, 40vw' })}</figure>
    </div>
    <div class="story__text reveal">
      <p class="eyebrow">Our story</p>
      <h2 class="h-caps">Strength, given a softer expression</h2>
      <p>Define began as a one-room studio with a handful of reformers and a clear idea: precise Pilates doesn’t have to feel clinical or loud. It can feel like coming home.</p>
      <p>We use natural oak, lime plaster and tall arched windows so the room itself helps you slow down. Classes are small, instruction is exact and every person is seen.</p>
      <p>Whether you are taking your first class or your thousandth, you are welcome here.</p>
    </div>
  </div>
</section>

<section class="section" style="background:var(--oat)">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">Take a look inside</p><h2 class="h-caps">The rooms</h2></div></div>
  </div>
  ${carousel(ctx)}
</section>

<section class="section">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">The team</p><h2 class="h-caps">Teachers you will come to trust</h2></div></div>
    <div class="team">${instructors.map((p, i) => `<article class="person reveal" style="--d:${i * 90}ms"><div class="person__img">${img(p.image, { alt: `${p.name}, ${p.role}`, sizes: '(min-width:900px) 30vw, 80vw' })}</div><h3>${esc(p.name)}</h3><p class="person__role">${esc(p.role)}</p><p>${esc(p.bio)}</p><p class="person__focus">${esc(p.focus)}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section" style="background:var(--oat)">
  <div class="container">
    <div class="section__head section__head--center"><div><p class="eyebrow">Before you visit</p><h2 class="h-caps">What to bring</h2></div></div>
    <div class="bring">
      <div class="bring__item"><h3>Comfortable clothes</h3><p>Fitted layers you can move in. Fitted tops make alignment easier to see and cue.</p></div>
      <div class="bring__item"><h3>Grip socks</h3><p>Required for reformer and tower. Available at reception if you forget.</p></div>
      <div class="bring__item"><h3>A little time</h3><p>Arrive ten minutes early for your first class so we can set you up properly.</p></div>
      <div class="bring__item"><h3>Nothing else</h3><p>Mats, props, towels and filtered water are all provided.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head section__head--center"><div><p class="eyebrow">Good to know</p><h2 class="h-caps">Frequently asked</h2></div></div>
    ${faqList(faqs)}
  </div>
</section>
${ctaBand(ctx)}`;
  return { title: 'The Studio', active: 'studio', description: 'Meet Define: a calm, light-filled Pilates studio with oak reformers, small classes and expert teachers.', body, ogImage: 'img/studio-interior.webp' };
}
