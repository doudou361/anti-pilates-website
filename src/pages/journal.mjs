import { posts } from '../data/site.mjs';
import { pageHero, journalCards, fmtDate, ctaBand } from '../parts.mjs';

export default function journal(ctx) {
  const body = `
${pageHero(ctx, { eyebrow: 'Journal', title: ['Read & be', 'inspired'], intro: 'Notes from the studio on movement, breath and the quiet details of a well-lived week.', art: 'c' })}
<section class="section" style="padding-top:1rem"><div class="container">${journalCards(ctx, posts).replace('class="cards"', 'class="cards cards--all"')}</div></section>
${ctaBand(ctx)}`;
  return { title: 'Journal', active: 'journal', description: 'Articles on Pilates, breath, movement and studio life from Define Pilates Studio.', body };
}
