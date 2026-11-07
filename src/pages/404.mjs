import { pageHero } from '../parts.mjs';

export default function notFound(ctx) {
  const { u, icons } = ctx;
  const body = `
${pageHero(ctx, { eyebrow: '404 · Page not found', title: ['Quiet corner,', 'wrong door'], intro: 'That page doesn’t exist or may have moved. Head back to the studio homepage or browse the weekly timetable.', art: 'd' })}
<section class="section" style="padding-top:0">
  <div class="container"><div class="hero__actions"><a class="btn" href="${u('index.html')}">Back to home</a><a class="link-arrow" href="${u('schedule.html')}">View schedule ${icons.arrow}</a></div></div>
</section>`;
  return { title: 'Page not found', active: '', description: 'Page not found · Define Pilates Studio.', body };
}
