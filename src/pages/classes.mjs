import { classes, instructors, brand } from '../data/site.mjs';
import { pageHero, ctaBand, classDays, times } from '../parts.mjs';
import { esc } from '../layout.mjs';

export default function classesPage(ctx) {
  const { u, img, icons } = ctx;
  const rows = classes.map((c) => `
<article class="class-row" id="${c.id}">
  <div class="class-row__media reveal"><figure>${img(c.image, { alt: `${c.name} at Define`, sizes: '(min-width:860px) 40vw, 90vw' })}</figure></div>
  <div class="class-row__body reveal">
    <p class="class-row__tag">${esc(c.tag)}</p>
    <h2 class="display">${esc(c.name)}</h2>
    <p class="class-row__text">${esc(c.blurb)}</p>
    <dl class="facts">
      <div><dt>Level</dt><dd>${esc(c.level)}</dd></div>
      <div><dt>Duration</dt><dd>${c.duration} minutes</dd></div>
      <div><dt>Intensity</dt><dd><span class="dots" role="img" aria-label="${c.intensity} out of 5">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= c.intensity ? 'on' : ''}"></i>`).join('')}</span></dd></div>
      <div><dt>Equipment</dt><dd>${esc(c.equipment)}</dd></div>
      <div><dt>Room</dt><dd>${esc(c.room)}</dd></div>
      <div><dt>When</dt><dd>${classDays(c.id)}</dd></div>
    </dl>
    <ul class="checks">${c.expect.map((e) => `<li>${icons.check}<span>${esc(e)}</span></li>`).join('')}</ul>
    <p class="small-caps" style="color:var(--khaki);margin-bottom:1.4rem">Best for · <span style="color:var(--forest);letter-spacing:.04em;text-transform:none;font-weight:400;font-size:.92rem">${esc(c.bestFor)}</span></p>
    <div class="class-row__actions"><a class="btn" href="${u(`schedule.html?class=${c.id}`)}">Book ${esc(c.name)}</a><a class="link-arrow" href="${u('memberships.html')}">Pricing ${icons.arrow}</a></div>
  </div>
</article>`).join('');

  const body = `
${pageHero(ctx, { eyebrow: 'Classes', title: ['Move with', 'intention'], intro: 'Six classes, one philosophy. Choose the rhythm that suits your body today, then grow into the next.', art: 'a' })}
<section class="section" style="padding-top:1rem"><div class="container">${rows}</div></section>

<section class="section level-guide">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">Find your fit</p><h2 class="h-caps">Which class is right for me?</h2></div></div>
    <div class="table-wrap"><table class="level-table">
      <thead><tr><th scope="col">If you are…</th><th scope="col">Start with</th><th scope="col">Then try</th></tr></thead>
      <tbody>
        <tr><td>Brand new to Pilates</td><td>Mat Foundations</td><td>Reformer Flow (all levels)</td></tr>
        <tr><td>Returning after a break</td><td>Reformer Flow</td><td>Barre Line</td></tr>
        <tr><td>Strong and experienced</td><td>Tower Sculpt</td><td>Reformer Flow (advanced cues)</td></tr>
        <tr><td>Pregnant or postnatal</td><td>Prenatal Pilates</td><td>Restore &amp; Stretch</td></tr>
        <tr><td>Stiff, tired or stressed</td><td>Restore &amp; Stretch</td><td>Mat Foundations</td></tr>
      </tbody></table></div>
  </div>
</section>
${ctaBand(ctx)}`;

  return { title: 'Classes', active: 'classes', description: 'Reformer Flow, Mat Foundations, Tower Sculpt, Barre Line, Prenatal Pilates and Restore & Stretch at Define Pilates Studio.', body };
}
