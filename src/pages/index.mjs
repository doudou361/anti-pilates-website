import { brand, classes, instructors, principles, retreat, posts } from '../data/site.mjs';
import { stagger, classRows, pricingGrid, journalCards, carousel, ctaBand } from '../parts.mjs';

export default function home(ctx) {
  const { u, img, icons, botanical } = ctx;
  const lina = instructors[0];
  const sofia = instructors[1];
  const strip = ['reformer', 'mat', 'tower', 'prenatal'].map((id) => classes.find((c) => c.id === id));

  const body = `
<section class="hero">
  ${botanical('a', 'hero__art hero__art--tr')}
  ${botanical('b', 'hero__art hero__art--ml')}
  <div class="container hero__inner">
    <h1 class="hero__title display"><span>Pilates Studio</span><span>${brand.name}</span></h1>
    <div class="hero__side">
      <p class="hero__by">By ${brand.name} · ${brand.tagline}</p>
      <p class="hero__intro">Feel the space before you step inside. Reformer, mat and tower classes in a calm, light-filled studio, led with precision and care.</p>
      <div class="hero__actions"><a class="btn" href="${u('schedule.html')}">Book a class</a><a class="link-arrow" href="${u('classes.html')}">Explore classes ${icons.arrow}</a></div>
    </div>
    <figure class="hero__media">${img('hero-reformer', { alt: 'A woman stretching on a natural oak Pilates reformer in a bright ivory studio', sizes: '(min-width:1100px) 800px, 100vw', eager: true, pos: '68% 50%' })}</figure>
  </div>
</section>

<section class="strip" aria-label="What we teach">
  <div class="container strip__grid">
    ${strip.map((c, i) => `<a class="strip__item reveal" style="--d:${i * 90}ms" href="${u('classes.html')}#${c.id}"><span class="strip__icon">${icons[c.icon]}</span><h2>${c.name}</h2><p>${c.blurb.split('. ')[0].replace(/\.$/, '')}.</p></a>`).join('')}
  </div>
</section>

<section class="section section--space" aria-labelledby="space-title">
  <div class="container section__head">
    <div><p class="eyebrow">Step inside</p><h2 class="display stagger" id="space-title"><span>The space, before</span><span>you arrive</span></h2></div>
    <div><p class="section__lead">Swipe through the rooms, the light and the details that set the mood for every class.</p><p style="margin-top:.8rem"><a class="link-arrow" href="${u('design-system.html')}">Typography, palette &amp; light ${icons.arrow}</a></p></div>
  </div>
  ${carousel(ctx)}
</section>

<section class="section founder">
  <div class="container founder__grid">
    <div class="founder__img reveal">${img(lina.image, { alt: `${lina.name}, ${lina.role}`, sizes: '(min-width:900px) 38vw, 80vw' })}</div>
    <div class="founder__text reveal">
      <p class="eyebrow">Meet the founder</p>
      <h2 class="h-caps">${lina.name}</h2>
      <p class="founder__role">${lina.role}</p>
      <p>${lina.bio}</p>
      <p>We keep classes small, our cues clear and our rooms quiet, so that every person who walks in feels seen, and every movement is learned well.</p>
      <a class="link-arrow" href="${u('studio.html')}">About the studio ${icons.arrow}</a>
    </div>
  </div>
</section>

<section class="band band--dark statement" aria-label="Our promise">
  ${botanical('c', 'statement__art')}
  <div class="container">
    <p class="statement__text display display--light reveal">
      <span>Build your <i class="pill">${img('class-reformer', { alt: '', sizes: '120px', pos: '50% 35%' })}</i> core</span>
      <span>Move <i class="pill pill--wide">${img('studio-interior', { alt: '', sizes: '200px' })}</i> with care</span>
      <span>Nurture your strength</span>
    </p>
  </div>
</section>

<section class="split" aria-labelledby="method-title">
  <div class="split__panel split__panel--oat">${img(sofia.image, { alt: `${sofia.name} in the studio`, sizes: '(min-width:900px) 50vw, 100vw', pos: '50% 18%' })}<p class="split__cap">${sofia.role} <b>${sofia.name}</b></p></div>
  <div class="oval" aria-hidden="true"><span>DE</span><span>FINE</span></div>
  <div class="split__panel split__panel--sand"><div class="split__arch">${img('class-mat', { alt: 'Mat Pilates teaser on a cream mat', sizes: '(min-width:900px) 24vw, 70vw' })}</div></div>
</section>

<section class="section principles">
  <div class="container">
    <div class="section__head section__head--center"><div><p class="eyebrow">Our method</p><h2 class="h-caps" id="method-title">Strength, expressed softly</h2></div></div>
    <div class="principles__grid">${principles.map((p, i) => `<div class="principle reveal" style="--d:${i * 90}ms"><span class="principle__n">0${i + 1}</span><h3>${p.title}</h3><p>${p.text}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section schedule-preview">
  <div class="container">
    <div class="section__head">${stagger('Classes', 'schedule')}<a class="link-arrow" href="${u('schedule.html')}">Full timetable ${icons.arrow}</a></div>
    <div class="reveal">${classRows(ctx)}</div>
  </div>
</section>

<section class="section pricing-section">
  <div class="container pricing-section__grid">
    <div class="pricing-section__intro reveal">
      <h2 class="h-caps">Pilates classes<br>monthly prices</h2>
      <p>Simple memberships that fit your rhythm. All include access to every studio, filtered water and mat, prop and towel hire.</p>
      <a class="btn" href="${u('memberships.html')}">See all options</a>
    </div>
    <div class="reveal">${pricingGrid(ctx)}</div>
  </div>
</section>

<section class="section mosaic-section" aria-label="In class">
  <div class="container mosaic">
    <figure class="mosaic__arch reveal"><div class="mosaic__archimg">${img('class-reformer', { alt: 'Kneeling lunge on the reformer', sizes: '(min-width:900px) 30vw, 90vw' })}</div><figcaption>Studio A · All levels <b>Reformer Flow</b></figcaption></figure>
    <figure class="mosaic__t reveal">${img('class-mat', { alt: 'Mat Pilates', sizes: '(min-width:900px) 18vw, 45vw' })}</figure>
    <figure class="mosaic__t reveal">${img('class-barre', { alt: 'Barre stretch by the arched window', sizes: '(min-width:900px) 18vw, 45vw' })}</figure>
    <figure class="mosaic__t reveal">${img('class-prenatal', { alt: 'Prenatal Pilates on a ball', sizes: '(min-width:900px) 18vw, 45vw' })}</figure>
    <figure class="mosaic__t reveal">${img('journal-2', { alt: 'Dried botanicals in a ceramic vase', sizes: '(min-width:900px) 18vw, 45vw' })}</figure>
  </div>
</section>

<section class="retreat" aria-label="Workshops and retreats">
  <div class="container retreat__inner">
    <h2 class="display retreat__title">${retreat.title.split(' & ')[0]}<br><span>&amp; ${retreat.title.split(' & ')[1]}</span></h2>
    <figure class="retreat__media">${img(retreat.image, { alt: 'A woman sitting calmly on a sandstone headland above a misty sea', sizes: '(min-width:1100px) 1000px, 100vw', pos: '50% 45%' })}</figure>
    <p class="retreat__text">${retreat.text}</p>
    <a class="link-arrow" href="${u('contact.html')}">Join the list ${icons.arrow}</a>
  </div>
</section>

<section class="section journal-section">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">Journal</p><h2 class="h-caps">Read &amp; be inspired</h2></div><a class="link-arrow" href="${u('journal.html')}">All articles ${icons.arrow}</a></div>
    ${journalCards(ctx, posts.slice(0, 3))}
  </div>
</section>

${ctaBand(ctx)}`;

  return {
    title: '', active: 'home',
    description: 'Define is a boutique Pilates studio: reformer, mat, tower, barre and prenatal classes in a calm, light-filled space. Strength, softened.',
    body,
  };
}
