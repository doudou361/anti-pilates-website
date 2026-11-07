import { classes, instructors, schedule, days } from '../data/site.mjs';
import { pageHero, classById, instructorById } from '../parts.mjs';
import { esc } from '../layout.mjs';

const tone = { reformer: 'rose', mat: 'sage', tower: 'wood', barre: 'sand', prenatal: 'rose', restore: 'sage' };

export default function schedulePage(ctx) {
  const { icons } = ctx;
  const board = days.map((d) => {
    const slots = schedule.filter((s) => s.day === d.id).sort((a, b) => a.time.localeCompare(b.time));
    return `<section class="day" data-day="${d.id}" aria-labelledby="day-${d.id}">
      <div class="day__head"><b id="day-${d.id}">${d.short}</b><span data-date></span></div>
      <div class="day__list">${slots.map((s) => {
        const c = classById[s.classId];
        const low = s.spots <= 6;
        return `<button type="button" class="slot slot--${tone[c.id]}" data-id="${s.id}" data-class="${c.id}" data-low="${low}" aria-label="Book ${esc(c.name)}, ${d.label} at ${s.time} with ${esc(instructorById[s.instructorId].name)}">
          <span class="slot__time">${s.time}</span><span class="slot__name">${esc(c.name)}</span><span class="slot__by">${esc(instructorById[s.instructorId].name.split(' ')[0])} · ${c.duration} min</span><span class="slot__spots">${s.spots} spots</span></button>`;
      }).join('')}<p class="day__empty" hidden>No classes</p></div></section>`;
  }).join('');

  const dialog = `<dialog class="dialog" id="booking-dialog" aria-labelledby="booking-title">
  <div class="dialog__inner">
    <button class="dialog__close" type="button" aria-label="Close booking">${icons.close}</button>
    <form method="dialog" novalidate>
      <p class="eyebrow">Reserve your spot</p>
      <h2 id="booking-title">Class</h2>
      <dl class="dialog__sum" id="booking-sum"></dl>
      <div class="field"><label for="b-date">Date</label><select id="b-date" name="date"></select></div>
      <div class="field--row">
        <div class="field"><label for="b-name">Full name</label><input id="b-name" name="name" autocomplete="name" required><span class="err" role="alert"></span></div>
        <div class="field"><label for="b-guests">Spots</label><select id="b-guests" name="guests"><option value="1">1 person</option><option value="2">2 people</option></select></div>
      </div>
      <div class="field"><label for="b-email">Email</label><input id="b-email" name="email" type="email" autocomplete="email" required><span class="err" role="alert"></span></div>
      <div class="dialog__foot"><button class="btn" type="submit">Confirm booking</button></div>
      <p class="demo-note"><b>Demo:</b> no payment is taken and nothing is emailed. Bookings are saved only in this browser.</p>
    </form>
    <div class="dialog__done" id="booking-done" hidden>
      <div class="tick">${icons.check}</div>
      <h2>You’re booked</h2>
      <p id="booking-done-text"></p>
      <p>Arrive ten minutes early. You can cancel up to 12 hours before class.</p>
      <div class="class-row__actions" style="justify-content:center;margin-top:1.4rem"><button class="btn" type="button" id="booking-ics">Add to calendar</button><button class="btn btn--ghost" type="button" id="booking-finish">Done</button></div>
    </div>
  </div></dialog>`;

  const json = JSON.stringify({ classes: classes.map(({ id, name, room, duration, level }) => ({ id, name, room, duration, level })), instructors: instructors.map(({ id, name }) => ({ id, name })), schedule, days }).replace(/</g, '\\u003c');

  const body = `
${pageHero(ctx, { eyebrow: 'Schedule & booking', title: ['Choose your', 'moment'], intro: 'Pick a class from the weekly timetable and reserve your spot in under a minute. Small groups, so places go quickly.', art: 'c' })}
<section class="section" style="padding-top:1rem">
  <div class="container">
    <div class="toolbar">
      <div class="chips" role="group" aria-label="Filter by class type">
        <button class="chip" type="button" data-filter="all" aria-pressed="true">All classes</button>
        ${classes.map((c) => `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="false">${esc(c.name.split(' ')[0])}</button>`).join('')}
      </div>
      <p class="week-note">Weekly timetable · times are local</p>
    </div>
    <div class="daytabs" role="tablist" aria-label="Day of the week">
      ${days.map((d) => `<button class="daytab" role="tab" data-day="${d.id}" aria-selected="false">${d.short}<b data-tabdate></b></button>`).join('')}
    </div>
    <div class="board" id="board">${board}</div>

    <section class="mybookings" id="mybookings" hidden aria-labelledby="mb-title">
      <h2 class="h-caps" id="mb-title">Your upcoming bookings</h2>
      <div id="mybookings-list"></div>
      <p class="demo-note">Saved in this browser only (demo).</p>
    </section>
  </div>
</section>
${dialog}
<script type="application/json" id="schedule-data">${json}</script>`;
  return { title: 'Schedule & Booking', active: 'schedule', description: 'Weekly class timetable and online booking for Define Pilates Studio.', body };
}
