import { brand } from '../data/site.mjs';
import { pageHero, ctaBand } from '../parts.mjs';
import { esc } from '../layout.mjs';

export default function contact(ctx) {
  const { u, icons } = ctx;
  const q = encodeURIComponent(`${brand.mapsQuery} ${brand.address.join(' ')}`);
  const body = `
${pageHero(ctx, { eyebrow: 'Contact', title: ['Come and', 'say hello'], intro: 'Questions about classes, memberships or your first visit? Write to us or drop by during opening hours.', art: 'a' })}
<section class="section" style="padding-top:1rem">
  <div class="container contact">
    <div class="reveal">
      <div class="info-block"><h2>Visit</h2><address>${brand.address.map(esc).join('<br>')}</address>
        <div class="map" role="img" aria-label="Stylised map placeholder showing the studio location">
          <svg class="roads" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#D9D4C7" stroke-width="10"><path d="M-10 70 C 90 60 140 110 230 100 S 360 70 420 90"/><path d="M120 -10 C 130 80 110 160 150 260"/><path d="M-10 190 L 420 160"/></g><g fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"><path d="M-10 70 C 90 60 140 110 230 100 S 360 70 420 90"/><path d="M120 -10 C 130 80 110 160 150 260"/><path d="M-10 190 L 420 160"/></g><path d="M250 120 q 40 -20 80 10 t 70 -10 v 140 h -150z" fill="#E4DFD1" opacity=".6"/></svg>
          <div class="map__pin">${icons.pin}<span>${brand.name} Studio</span></div>
        </div>
        <p style="margin-top:.8rem"><a class="link-arrow" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Open in maps ${icons.arrow}</a></p>
      </div>
      <div class="info-block"><h2>Opening hours</h2><ul class="hours">${brand.hours.map(([d, h]) => `<li><span>${d}</span><span>${h}</span></li>`).join('')}</ul></div>
      <div class="info-block"><h2>Get in touch</h2><p><a href="mailto:${brand.email}">${brand.email}</a></p><p><a href="tel:${brand.phone.replace(/\s/g, '')}">${brand.phone}</a></p><p><a class="icon-link" href="${brand.instagram}" target="_blank" rel="noopener">${icons.insta} Instagram</a></p></div>
    </div>
    <div class="form-panel reveal">
      <h2 class="h-caps">Send a message</h2>
      <form data-demo-form="contact" novalidate>
        <div class="field"><label for="c-name">Full name</label><input id="c-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="c-topic">I’m interested in</label><select id="c-topic" name="topic"><option>My first class</option><option>A membership</option><option>Prenatal Pilates</option><option>Workshops &amp; retreats</option><option>Something else</option></select></div>
        <div class="field"><label for="c-msg">Message</label><textarea id="c-msg" name="message" required></textarea></div>
        <button class="btn" type="submit">Send message</button>
        <p class="form-status form-note" role="status" aria-live="polite"></p>
        <p class="demo-note"><b>Demo:</b> this form is not connected to a mail service yet.</p>
      </form>
    </div>
  </div>
</section>
${ctaBand(ctx)}`;
  return { title: 'Contact', active: 'contact', description: 'Visit, call or write to Define Pilates Studio. Opening hours, address and contact form.', body };
}
