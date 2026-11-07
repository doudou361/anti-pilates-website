// Define · site behaviour. Vanilla ES module, no dependencies.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- header ---------- */
const header = $('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
}
const toggle = $('.menu-toggle');
if (toggle) {
  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  $$('#site-nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  matchMedia('(min-width: 1061px)').addEventListener('change', (m) => m.matches && setOpen(false));
}

/* ---------- footer year ---------- */
$$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- reveal on scroll ---------- */
const reveals = $$('.reveal');
if (reveals.length) {
  if (reduceMotion || !('IntersectionObserver' in window)) reveals.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }
}

/* ---------- swipe carousel ---------- */
$$('[data-carousel]').forEach((root) => {
  const track = $('[data-track]', root);
  const slides = $$('.slide', track);
  const prev = $('[data-prev]', root), next = $('[data-next]', root);
  const bar = $('[data-bar]', root), cur = $('[data-current]', root);
  const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
  const index = () => Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    const i = index();
    cur.textContent = String(i + 1).padStart(2, '0');
    bar.style.transform = `scaleX(${max > 0 ? Math.max(0.12, track.scrollLeft / max) : 1})`;
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft > max - 4;
  };
  const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  addEventListener('resize', update);
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  // mouse drag (touch uses native swipe)
  let down = false, startX = 0, startLeft = 0, moved = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  addEventListener('pointermove', (e) => {
    if (!down) return;
    moved = e.clientX - startX;
    track.scrollLeft = startLeft - moved;
  });
  addEventListener('pointerup', () => {
    if (!down) return;
    down = false; track.classList.remove('is-dragging');
    const i = Math.round(track.scrollLeft / step());
    track.scrollTo({ left: i * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  update();
});

/* ---------- demo forms (no backend connected) ---------- */
const planParam = new URLSearchParams(location.search).get('plan');
if (planParam && $('#c-topic')) {
  $('#c-topic').value = 'A membership';
  const msg = $('#c-msg');
  if (msg && !msg.value) msg.value = `Hello Define — I’d like to join on the ${planParam.charAt(0).toUpperCase() + planParam.slice(1)} membership.`;
}
$$('[data-demo-form]').forEach((form) => {
  const note = $('.form-note, .form-status', form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email;
    if (email && !email.checkValidity()) { if (note) note.textContent = 'Please enter a valid email address.'; email.focus(); return; }
    if (form.dataset.demoForm === 'contact') {
      const name = form.elements.name?.value || '', msg = form.elements.message?.value || '';
      if (!name.trim() || !msg.trim()) { note.textContent = 'Please add your name and a message.'; return; }
    }
    if (note) note.textContent = 'Thank you. This is a demo form, so nothing was sent. Connect a form service to go live.';
    form.reset();
  });
});

/* ---------- schedule + booking ---------- */
const dataEl = $('#schedule-data');
if (dataEl) {
  const { classes, instructors, schedule, days } = JSON.parse(dataEl.textContent);
  const cById = Object.fromEntries(classes.map((c) => [c.id, c]));
  const iById = Object.fromEntries(instructors.map((i) => [i.id, i]));
  const sById = Object.fromEntries(schedule.map((s) => [s.id, s]));
  const KEY = 'define.bookings';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage unavailable */ } };
  const fmt = (d, o) => d.toLocaleDateString('en-GB', o);
  const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const occurrences = (slot, count = 4) => {
    const out = [];
    const dow = days.find((d) => d.id === slot.day).index;
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (let i = 0; i < 60 && out.length < count; i++) {
      if (d.getDay() === dow) {
        const [h, m] = slot.time.split(':').map(Number);
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m);
        if (start > now) out.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }
    return out;
  };

  const board = $('#board');
  const chips = $$('.chip[data-filter]');
  const tabs = $$('.daytab');
  const cols = $$('.day', board);
  let filter = 'all';

  // date labels per weekday column
  cols.forEach((col) => {
    const dayId = col.dataset.day;
    const first = schedule.find((s) => s.day === dayId);
    const next = occurrences(first, 1)[0];
    const label = next ? fmt(next, { day: 'numeric', month: 'short' }) : '';
    $('[data-date]', col).textContent = label;
    const tab = tabs.find((t) => t.dataset.day === dayId);
    if (tab) $('[data-tabdate]', tab).textContent = next ? next.getDate() : '';
  });

  const applyFilter = () => {
    $$('.slot', board).forEach((s) => { s.hidden = filter !== 'all' && s.dataset.class !== filter; });
    cols.forEach((col) => {
      const any = $$('.slot', col).some((s) => !s.hidden);
      $('.day__empty', col).hidden = any;
    });
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === filter)));
  };
  chips.forEach((c) => c.addEventListener('click', () => { filter = c.dataset.filter; applyFilter(); history.replaceState(null, '', filter === 'all' ? location.pathname : `?class=${filter}`); }));
  const qp = new URLSearchParams(location.search).get('class');
  if (qp && cById[qp]) filter = qp;
  applyFilter();

  // day tabs (compact layouts)
  const today = new Date().getDay();
  const defaultDay = days.find((d) => d.index === today)?.id || 'Mon';
  const selectDay = (id) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.day === id)));
    cols.forEach((c) => c.classList.toggle('is-active', c.dataset.day === id));
  };
  tabs.forEach((t) => t.addEventListener('click', () => selectDay(t.dataset.day)));
  tabs.forEach((t, i) => t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      n.focus(); selectDay(n.dataset.day);
    }
  }));
  selectDay(defaultDay);

  // booking dialog
  const dlg = $('#booking-dialog');
  const form = $('form', dlg);
  const done = $('#booking-done', dlg);
  const sum = $('#booking-sum', dlg);
  const dateSel = $('#b-date', dlg);
  let currentSlot = null, lastFocus = null, lastBooking = null;

  const openBooking = (slotId, trigger) => {
    currentSlot = sById[slotId];
    lastFocus = trigger;
    const c = cById[currentSlot.classId], ins = iById[currentSlot.instructorId];
    $('#booking-title', dlg).textContent = c.name;
    sum.innerHTML = `<dt>When</dt><dd>${days.find((d) => d.id === currentSlot.day).label}, ${currentSlot.time}</dd><dt>Instructor</dt><dd>${ins.name}</dd><dt>Room</dt><dd>${c.room} · ${c.duration} min</dd><dt>Level</dt><dd>${c.level}</dd>`;
    dateSel.innerHTML = occurrences(currentSlot).map((d) => `<option value="${isoDate(d)}">${fmt(d, { weekday: 'long', day: 'numeric', month: 'long' })}</option>`).join('');
    form.hidden = false; done.hidden = true;
    $$('.err', form).forEach((e) => (e.textContent = ''));
    dlg.showModal();
    $('#b-name').focus();
  };
  $$('.slot', board).forEach((s) => s.addEventListener('click', () => openBooking(s.dataset.id, s)));
  $('.dialog__close', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => lastFocus && lastFocus.focus());

  const ics = (b) => {
    const c = cById[sById[b.slotId].classId];
    const [h, m] = b.time.split(':').map(Number);
    const start = new Date(`${b.date}T00:00:00`); start.setHours(h, m);
    const end = new Date(start.getTime() + c.duration * 60000);
    const z = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Define Pilates Studio//Demo//EN', 'BEGIN:VEVENT', `UID:${b.id}@define.demo`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(start)}`, `DTEND:${z(end)}`, `SUMMARY:${c.name} at Define`, `LOCATION:${c.room}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  };
  const download = (b) => {
    const url = URL.createObjectURL(new Blob([ics(b)], { type: 'text/calendar' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'define-class.ics' });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 500);
  };
  $('#booking-ics').addEventListener('click', () => lastBooking && download(lastBooking));
  $('#booking-finish').addEventListener('click', () => dlg.close());
  ['#b-name', '#b-email'].forEach((sel) => $(sel, form).addEventListener('input', (e) => { $('.err', e.target.closest('.field')).textContent = ''; }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#b-name'), email = $('#b-email');
    let ok = true;
    const setErr = (el, msg) => { $('.err', el.closest('.field')).textContent = msg; if (msg) ok = false; };
    setErr(name, name.value.trim().length < 2 ? 'Please enter your name.' : '');
    setErr(email, email.checkValidity() && email.value ? '' : 'Please enter a valid email.');
    if (!ok) return;
    const b = { id: `b${Date.now()}`, slotId: currentSlot.id, date: dateSel.value, time: currentSlot.time, name: name.value.trim(), email: email.value.trim(), guests: Number($('#b-guests').value) };
    const all = load(); all.push(b); save(all);
    lastBooking = b;
    $('#booking-done-text').textContent = `${cById[currentSlot.classId].name} · ${fmt(new Date(`${b.date}T12:00`), { weekday: 'long', day: 'numeric', month: 'long' })} at ${b.time}. A confirmation would be emailed to ${b.email}.`;
    form.hidden = true; done.hidden = false;
    form.reset();
    renderMine();
  });

  const mine = $('#mybookings'), list = $('#mybookings-list');
  function renderMine() {
    const all = load().filter((b) => sById[b.slotId] && new Date(`${b.date}T${b.time}`) > new Date());
    mine.hidden = all.length === 0;
    list.innerHTML = '';
    all.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).forEach((b) => {
      const s = sById[b.slotId], c = cById[s.classId];
      const li = document.createElement('div');
      li.className = 'booking-item';
      li.innerHTML = `<div><b>${c.name}</b><small>${fmt(new Date(`${b.date}T12:00`), { weekday: 'long', day: 'numeric', month: 'long' })} · ${b.time} · ${b.guests} ${b.guests > 1 ? 'guests' : 'guest'}</small></div><div><button type="button" data-ics>Add to calendar</button> &nbsp; <button type="button" data-del>Cancel</button></div>`;
      $('[data-del]', li).addEventListener('click', () => { save(load().filter((x) => x.id !== b.id)); renderMine(); });
      $('[data-ics]', li).addEventListener('click', () => download(b));
      list.append(li);
    });
  }
  renderMine();
}
