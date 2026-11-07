import { posts } from '../data/site.mjs';
import { fmtDate, journalCards, ctaBand } from '../parts.mjs';
import { esc } from '../layout.mjs';

export default function article(ctx, post) {
  const { u, img, icons } = ctx;
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const body = `
<article class="article">
  <header class="article__head">
    <p class="article__meta">${esc(post.category)} · ${fmtDate(post.date)} · ${post.read} min read</p>
    <h1 class="display">${esc(post.title)}</h1>
    <p class="lead" style="margin-inline:auto">${esc(post.excerpt)}</p>
  </header>
  <figure class="article__hero">${img(post.image, { alt: '', sizes: '(min-width:1000px) 1000px, 100vw', eager: true })}</figure>
  <div class="prose">
    ${post.body.map((p) => `<p>${esc(p)}</p>`).join('')}
    <p class="prose__note">By ${esc(post.author)}. Placeholder article text for the Define demo site.</p>
  </div>
  <p class="article__back"><a class="link-arrow" href="${u('journal.html')}">${icons.arrowLeft} Back to journal</a></p>
</article>
<section class="section" style="padding-top:0"><div class="container"><div class="section__head"><div><p class="eyebrow">Keep reading</p><h2 class="h-caps">More from the journal</h2></div></div>${journalCards(ctx, others)}</div></section>
${ctaBand(ctx)}`;
  return { title: post.title, active: 'journal', description: post.excerpt, body };
}
