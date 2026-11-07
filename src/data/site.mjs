// ─────────────────────────────────────────────────────────────────────────────
//  DEFINE · single source of truth for content.
//  Everything below is PROVISIONAL placeholder copy – edit freely, then `npm run build`.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: 'Define',
  descriptor: 'Pilates Studio',
  tagline: 'Strength, softened.',
  email: 'hello@definestudio.example',
  phone: '+00 000 000 000',
  address: ['12 Atelier Lane', 'Your City, 00000'],
  instagram: 'https://www.instagram.com/',
  mapsQuery: 'Define Pilates Studio',
  hours: [
    ['Monday – Friday', '06:30 – 20:30'],
    ['Saturday', '08:00 – 14:00'],
    ['Sunday', '09:00 – 13:00'],
  ],
};

/** One place to change the currency symbol and every price on the site. */
export const currency = '$';

export const nav = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'studio', label: 'Studio', href: 'studio.html' },
  { key: 'classes', label: 'Classes', href: 'classes.html' },
  { key: 'schedule', label: 'Schedule', href: 'schedule.html' },
  { key: 'memberships', label: 'Memberships', href: 'memberships.html' },
  { key: 'journal', label: 'Journal', href: 'journal.html' },
  { key: 'contact', label: 'Contact', href: 'contact.html' },
];

export const instructors = [
  {
    id: 'lina', name: 'Lina Marceau', role: 'Founder & lead instructor', image: 'instructor-1',
    focus: 'Reformer · Classical foundations',
    bio: 'Lina founded Define around one idea: that precise movement should feel generous, never harsh. She teaches the reformer with a quiet, exacting eye and a lot of breath.',
  },
  {
    id: 'sofia', name: 'Sofia Reyes', role: 'Mat & barre instructor', image: 'instructor-2',
    focus: 'Mat · Barre · Mobility',
    bio: 'Sofia brings a dancer’s sense of line to the mat. Her classes are light on talk, rich in detail, and always leave room to grow at your own pace.',
  },
  {
    id: 'amara', name: 'Amara Cole', role: 'Tower & prenatal specialist', image: 'instructor-3',
    focus: 'Tower · Prenatal · Postnatal',
    bio: 'Amara works with spring resistance and pregnancy-safe progressions, helping clients rebuild deep strength with patience and warmth.',
  },
];

export const classes = [
  {
    id: 'reformer', name: 'Reformer Flow', tag: 'Our signature', level: 'All levels', duration: 55, intensity: 3,
    equipment: 'Reformer', room: 'Studio A', image: 'class-reformer', icon: 'reformer',
    blurb: 'A continuous, spring-loaded sequence that links strength, length and breath. Smooth, precise and quietly challenging.',
    expect: ['Full-body sequence on the reformer', 'Small groups for hands-on adjustments', 'Springs and props adapted to your level'],
    bestFor: 'Posture, deep core strength and long, lean tone.',
  },
  {
    id: 'mat', name: 'Mat Foundations', tag: 'Start here', level: 'Beginner', duration: 50, intensity: 2,
    equipment: 'Mat · Small props', room: 'Studio B', image: 'class-mat', icon: 'mat',
    blurb: 'The classical vocabulary, taught slowly. Learn the fundamentals of breath, pelvic placement and core control.',
    expect: ['Clear breakdown of every exercise', 'Light props: ring, band and ball', 'Plenty of modifications'],
    bestFor: 'First-timers, returning to movement, building a base.',
  },
  {
    id: 'tower', name: 'Tower Sculpt', tag: 'Spring resistance', level: 'Intermediate', duration: 55, intensity: 4,
    equipment: 'Tower · Springs', room: 'Studio A', image: 'studio-detail', icon: 'tower',
    blurb: 'Vertical springs and bars add resistance and support. Sculpting work for legs, glutes, shoulders and back.',
    expect: ['Spring-based strength work', 'Focus on alignment under load', 'A balanced, grounded finish'],
    bestFor: 'Experienced movers looking for more challenge.',
  },
  {
    id: 'barre', name: 'Barre Line', tag: 'Dancer’s detail', level: 'All levels', duration: 45, intensity: 3,
    equipment: 'Barre · Light weights', room: 'Studio B', image: 'class-barre', icon: 'barre',
    blurb: 'Pilates principles meet the ballet barre: small, controlled movements that build endurance and elegant posture.',
    expect: ['Isometric holds and fluid pulses', 'Light weights and resistance bands', 'Long stretches to close'],
    bestFor: 'Lower-body endurance, balance and poise.',
  },
  {
    id: 'prenatal', name: 'Prenatal Pilates', tag: 'Pregnancy-safe', level: 'All stages', duration: 50, intensity: 2,
    equipment: 'Mat · Ball', room: 'Studio B', image: 'class-prenatal', icon: 'prenatal',
    blurb: 'Gentle, supportive strengthening for every trimester, with attention to the pelvic floor, breath and back comfort.',
    expect: ['Trimester-aware modifications', 'Pelvic floor and breath focus', 'Please share medical clearance'],
    bestFor: 'Expectant mothers and early postnatal movement.',
  },
  {
    id: 'restore', name: 'Restore & Stretch', tag: 'Slow & deep', level: 'All levels', duration: 45, intensity: 1,
    equipment: 'Mat · Bolsters', room: 'Studio B', image: 'hero-reformer', icon: 'restore',
    blurb: 'Slow mobility, myofascial release and deep breathing to undo the week and reset the nervous system.',
    expect: ['Long, supported holds', 'Gentle spinal mobility', 'Guided breath to finish'],
    bestFor: 'Recovery days, stress relief and stiffness.',
  },
];

// [day, time, classId, instructorId, spots]
const slots = [
  ['Mon', '07:00', 'reformer', 'lina', 8], ['Mon', '09:30', 'mat', 'sofia', 10], ['Mon', '12:15', 'tower', 'amara', 6], ['Mon', '18:30', 'barre', 'sofia', 10],
  ['Tue', '07:00', 'barre', 'sofia', 10], ['Tue', '09:30', 'reformer', 'lina', 8], ['Tue', '17:30', 'restore', 'amara', 12], ['Tue', '19:00', 'reformer', 'lina', 8],
  ['Wed', '07:00', 'mat', 'sofia', 10], ['Wed', '10:00', 'prenatal', 'amara', 8], ['Wed', '12:15', 'reformer', 'lina', 8], ['Wed', '18:30', 'tower', 'amara', 6],
  ['Thu', '07:00', 'reformer', 'lina', 8], ['Thu', '09:30', 'barre', 'sofia', 10], ['Thu', '17:30', 'mat', 'sofia', 10], ['Thu', '19:00', 'restore', 'amara', 12],
  ['Fri', '07:00', 'tower', 'amara', 6], ['Fri', '09:30', 'reformer', 'lina', 8], ['Fri', '12:15', 'mat', 'sofia', 10], ['Fri', '17:30', 'barre', 'sofia', 10],
  ['Sat', '09:00', 'reformer', 'lina', 8], ['Sat', '10:30', 'prenatal', 'amara', 8], ['Sat', '12:00', 'restore', 'amara', 12],
  ['Sun', '09:30', 'mat', 'sofia', 10], ['Sun', '11:00', 'reformer', 'lina', 8],
];
export const days = [
  { id: 'Mon', label: 'Monday', short: 'Mon', index: 1 }, { id: 'Tue', label: 'Tuesday', short: 'Tue', index: 2 },
  { id: 'Wed', label: 'Wednesday', short: 'Wed', index: 3 }, { id: 'Thu', label: 'Thursday', short: 'Thu', index: 4 },
  { id: 'Fri', label: 'Friday', short: 'Fri', index: 5 }, { id: 'Sat', label: 'Saturday', short: 'Sat', index: 6 },
  { id: 'Sun', label: 'Sunday', short: 'Sun', index: 0 },
];
export const schedule = slots.map(([day, time, classId, instructorId, spots], i) => ({ id: `s${i + 1}`, day, time, classId, instructorId, spots }));

/** Monthly memberships (shown on the home page 2×2 grid and the memberships page). */
export const memberships = [
  { id: 'essential', name: 'Essential', note: '4 classes per month', price: 89, features: ['Any class, any day', 'Book 7 days ahead', 'Freeze once per year'] },
  { id: 'signature', name: 'Signature', note: '8 classes per month', price: 149, features: ['Any class, any day', 'Book 10 days ahead', 'Bring a friend once a month'], featured: true },
  { id: 'unlimited', name: 'Unlimited', note: 'Every class, every day', price: 219, features: ['Unlimited classes', 'Book 14 days ahead', 'Studio towel service'] },
  { id: 'prenatal', name: 'Prenatal', note: '6 classes per month', price: 139, features: ['Prenatal & postnatal classes', 'Flexible rescheduling', 'Medical clearance on file'] },
];
export const packs = [
  { id: 'dropin', name: 'Drop-in', note: 'One class', price: 32, valid: 'Use within 30 days' },
  { id: 'five', name: '5 Pack', note: 'Five classes', price: 145, valid: 'Valid for 3 months' },
  { id: 'ten', name: '10 Pack', note: 'Ten classes', price: 270, valid: 'Valid for 6 months' },
];
export const introOffer = { name: 'First Steps', note: '3 classes for new clients', price: 59, valid: 'Valid for 30 days' };

export const principles = [
  { title: 'Precision', text: 'Every cue is considered. Small groups mean real attention and clear progress.' },
  { title: 'Breath', text: 'Movement follows breath, so strength comes with ease rather than strain.' },
  { title: 'Softness', text: 'We give strength a gentler expression: calm rooms, natural materials, no shouting.' },
];

export const faqs = [
  { q: 'I have never done Pilates. Where should I start?', a: 'Begin with Mat Foundations or an All-levels Reformer Flow. Arrive ten minutes early and tell your instructor it is your first time. They will guide you.' },
  { q: 'What should I wear and bring?', a: 'Fitted, comfortable clothing and grip socks (available at the studio). We provide mats, props and filtered water.' },
  { q: 'How does cancellation work?', a: 'Cancel or reschedule up to 12 hours before class at no cost. Later cancellations use one class credit.' },
  { q: 'Is Pilates safe during pregnancy?', a: 'Often yes, with the right modifications. Please share medical clearance from your provider before joining Prenatal Pilates.' },
  { q: 'Can I try a class before committing?', a: 'Yes. Our First Steps offer gives new clients three classes within 30 days.' },
];

export const posts = [
  {
    slug: 'strength-softened', title: 'Why strength can be soft', category: 'Philosophy', date: '2026-10-28', author: 'Lina Marceau', image: 'journal-2', read: 4,
    excerpt: 'The best strength is quiet. A note on why precision and gentleness belong together.',
    body: [
      'We tend to picture strength as loud: heavy, fast, effortful. Pilates suggests another version, where strength shows up as control, as length, as the ability to move without bracing.',
      'At Define, we cue less force and more intention. The result is a body that feels supported rather than clenched, and a mind that has room to follow the breath.',
      'If you are new, start slowly. Your first month is about learning to feel your centre, not to chase intensity.',
    ],
  },
  {
    slug: 'first-reformer-class', title: 'Your first reformer class: what to expect', category: 'Guide', date: '2026-10-14', author: 'Sofia Reyes', image: 'class-reformer', read: 5,
    excerpt: 'Springs, straps, carriages: a gentle walkthrough of your first fifty-five minutes.',
    body: [
      'The reformer looks complicated until you lie down on it. Your instructor will set the springs for you and show every movement before you try it.',
      'Expect to work the whole body: legs, arms, core and back, in a flowing sequence. You will move the carriage with control rather than speed.',
      'Arrive ten minutes early, wear fitted clothing, and remember that no one is watching you but you.',
    ],
  },
  {
    slug: 'the-room-the-light', title: 'The room, the oak, the light', category: 'Studio notes', date: '2026-09-30', author: 'The Define team', image: 'studio-detail', read: 3,
    excerpt: 'Why we chose raw oak, lime plaster and tall windows for the studio.',
    body: [
      'A Pilates studio should help you slow down before you move. That is why the walls are warm, the floors are oak and the windows are tall enough to let morning light travel across the room.',
      'We chose natural materials that age well and feel good underfoot, and equipment finished in the same wood so the space reads as one calm whole.',
      'Come and see it for yourself. The light is best at 09:30.',
    ],
  },
  {
    slug: 'three-minute-reset', title: 'A three-minute breath reset', category: 'At home', date: '2026-09-12', author: 'Amara Cole', image: 'journal-1', read: 2,
    excerpt: 'Lateral breathing in three steps, to use at your desk or before sleep.',
    body: [
      'Sit tall, place your hands on the sides of your ribs, and inhale as if you were widening them against your palms.',
      'Exhale slowly through the mouth, drawing the lower belly gently in. Repeat for ten breaths.',
      'Finish by letting your shoulders drop. Notice what changed.',
    ],
  },
];

export const spaceSlides = [
  { image: 'studio-interior', title: 'The studio', text: 'Arched windows, lime plaster and oak. Light that moves with the day.' },
  { image: 'hero-reformer', title: 'The reformer room', text: 'Eight reformers, made in natural oak with cream straps.' },
  { image: 'studio-detail', title: 'The detail', text: 'Brass, leather and grain. Equipment you want to touch.' },
  { image: 'class-barre', title: 'The barre corner', text: 'A quiet corner beside the tall window for barre and stretching.' },
  { image: 'journal-1', title: 'The after', text: 'Tea, linen and ten minutes to land softly before you leave.' },
];

export const retreat = {
  title: 'Workshops & Retreats',
  text: 'Our next seaside weekend is in the planning stage. Join the list and be first to hear.',
  image: 'retreat-cliff',
};
