/* ════════════════════════════════════════════
   KRISTEN MIKESKA — Portfolio Scripts
════════════════════════════════════════════ */

// ── MOBILE NAV TOGGLE ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ══════════════════════════════════════════
// LIGHTBOX
// ══════════════════════════════════════════
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');
const lbPrev   = document.getElementById('lb-prev');
const lbNext   = document.getElementById('lb-next');

let lbImages  = [];
let lbCurrent = 0;

function getLightboxImages() {
  return Array.from(document.querySelectorAll(
    '.portfolio-card:not(.hidden):not(.stats-showcase):not(.pub-project-card)'
  ))
    .map(card => {
      const imgs = card.querySelectorAll('img');
      if (!imgs.length) return null;
      const img = imgs[imgs.length - 1];
      return { src: img.src, alt: img.alt };
    })
    .filter(Boolean);
}

function showLbImage(index) {
  if (!lbImages.length) return;
  lbCurrent = (index + lbImages.length) % lbImages.length;
  lbImg.src = lbImages[lbCurrent].src;
  lbImg.alt = lbImages[lbCurrent].alt;
  lbPrev.style.display = lbImages.length > 1 ? 'flex' : 'none';
  lbNext.style.display = lbImages.length > 1 ? 'flex' : 'none';
}

function openLightbox(src, alt) {
  lbImages  = getLightboxImages();
  lbCurrent = lbImages.findIndex(i => i.src === src);
  if (lbCurrent === -1) lbCurrent = 0;
  showLbImage(lbCurrent);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

if (lightbox) {
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => showLbImage(lbCurrent - 1));
  lbNext.addEventListener('click',  () => showLbImage(lbCurrent + 1));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', e => {
  if (pubModal && pubModal.classList.contains('open')) {
    if (e.key === 'Escape') closePubModal();
    return;
  }
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showLbImage(lbCurrent - 1);
  if (e.key === 'ArrowRight') showLbImage(lbCurrent + 1);
});

// Wire up non-publication card clicks
document.querySelectorAll('.portfolio-card').forEach(card => {
  if (card.classList.contains('stats-showcase')) return;
  if (card.classList.contains('video-card')) return;
  if (card.classList.contains('pub-project-card')) return;

  if (card.classList.contains('web-card')) {
    card.addEventListener('click', () => {
      const url = (card.dataset.url || '').trim();
      if (url) {
        window.open(url, '_blank', 'noopener');
      } else {
        const img = card.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      }
    });
    return;
  }

  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (img) openLightbox(img.src, img.alt);
  });
});

// ══════════════════════════════════════════
// PROJECT MODAL (Publication + Graphic Design)
// ══════════════════════════════════════════
const pubModal      = document.getElementById('pub-modal');
const pmTitle       = document.getElementById('pm-title');
const pmCatTag      = document.getElementById('pm-cat-tag');
const pmScroll      = document.getElementById('pm-scroll');
const pmCloseBtn    = document.getElementById('pm-close-btn');
const pmBeforeBtn   = document.getElementById('pm-before-btn');
const pmIssuuBtn    = document.getElementById('pm-issuu-btn');
const pmDescription = document.getElementById('pm-description');

const ISSUU = {
  jan2026: 'https://issuu.com/spjst/docs/vestnik_2026.01',
  feb2026: 'https://issuu.com/spjst/docs/vestnik_2026.02',
  mar2026: 'https://issuu.com/spjst/docs/vestnik_2026.03',
  apr2026: 'https://issuu.com/spjst/docs/vestnik_2026.04',
  may2026: 'https://issuu.com/spjst/docs/vestnik_2026.05',
};

const projectData = {
  // ── 2026 VESTNIK ──
  'car-show-2026': {
    category: 'Publication Design',
    title: '2026 Car Show',
    issuu: ISSUU.apr2026,
    pages: [
      'assets/vestnik/2026carshowlayout-pg1.png',
      'assets/vestnik/2026carshowlayout-pg2.png',
      'assets/vestnik/2026carshowlayout-pg3.png',
    ],
    before: ['assets/befores/2024carshowlayout.png'],
  },
  'scholarships-2026': {
    category: 'Publication Design',
    title: '2026 Scholarships',
    issuu: ISSUU.may2026,
    pages: [
      'assets/vestnik/scholarshiplayout-pg1-april2026.png',
      'assets/vestnik/scholarshiplayout-pg2-april2026.png',
      'assets/vestnik/scholarshiplayout-pg3-april2026.png',
    ],
    before: [
      'assets/befores/scholarshiplayout-BEFORE-april2025.png',
      'assets/befores/scholarshiplayout-BEFORE-april2025-pg2.png',
    ],
  },
  'valentines-2026': {
    category: 'Publication Design',
    title: '2026 Valentines',
    issuu: ISSUU.feb2026,
    pages: [
      'assets/vestnik/2026vestnikvalentines-pg1.png',
      'assets/vestnik/2026vestnikvalentines-pg2.png',
    ],
    before: ['assets/befores/vestnikvalentines-2024.png'],
  },
  'anniversary-2026': {
    category: 'Publication Design',
    title: 'Anniversary Celebration — March 2026',
    issuu: ISSUU.mar2026,
    pages: ['assets/vestnik/anniversarycelebration-march2026.png'],
    before: [],
  },
  'district7-2026': {
    category: 'Publication Design',
    title: 'District 7 Rally — April 2026',
    issuu: ISSUU.may2026,
    pages: ['assets/vestnik/district7rally-layout-april2026vestnik.png'],
    before: ['assets/befores/Rally BEFORE.png'],
  },
  'tarok-2026': {
    category: 'Publication Design',
    title: '2026 Tarok Tournament',
    issuu: ISSUU.mar2026,
    pages: ['assets/vestnik/2026taroktournament.png'],
    before: ['assets/befores/taroktournament-before.png'],
  },
  'toca-2026': {
    category: 'Publication Design',
    title: 'TOCA — April 2026',
    issuu: ISSUU.may2026,
    pages: ['assets/vestnik/tocalayout-april2026.png'],
    before: [],
  },
  'easter-2026': {
    category: 'Publication Design',
    title: 'Czech Easter Traditions — 2026',
    issuu: ISSUU.mar2026,
    description: 'A two-page spread celebrating Czech Easter traditions — layout and original article written by Kristen.',
    pages: ['assets/vestnik/czecheaster2026.png'],
    before: [],
  },
  'guidebook-2026': {
    category: 'Graphic Design',
    title: '2026 Showcase Guidebook',
    description: 'Full redesign of the annual Showcase program book — refreshed layout, typography, and visual system across 27 pages. Scroll through the full book below.',
    pages: Array.from({ length: 27 }, (_, i) => `assets/guidebook/2026-pg${i + 1}.png`),
    before: Array.from({ length: 25 }, (_, i) => `assets/guidebook/before-pg${i + 1}.png`),
  },

  // ── 2025 VESTNIK ──
  'gala-2025': {
    category: 'Publication Design',
    title: '2025 Czech National Gala',
    pages: ['assets/vestnik/2025 Czech National Gala Spread.png'],
    before: [],
  },
  'showcase-2025': {
    category: 'Publication Design',
    title: 'Youth Showcase 2025',
    pages: [
      'assets/vestnik/Youth Showcase Spread 1.png',
      'assets/vestnik/Youth Showcase Spread 2.png',
      'assets/vestnik/Youth Showcase Spread 3.png',
      'assets/vestnik/Youth Showcase Spread 4.png',
      'assets/vestnik/Youth Showcase Spread 5.png',
    ],
    before: [
      'assets/befores/Youth Showcase Spread BEFORE.png',
      'assets/befores/Youth Showcase Spread BEFORE 1.png',
      'assets/befores/Youth Showcase Spread BEFORE 2.png',
      'assets/befores/Youth Showcase Spread BEFORE 3.png',
    ],
  },
  'graduates-2025': {
    category: 'Publication Design',
    title: 'Graduates 2025',
    pages: [
      'assets/vestnik/Graduates Spread 1.png',
      'assets/vestnik/Graduates Spread 2.png',
    ],
    before: [],
  },
  'summercamp-2025': {
    category: 'Publication Design',
    title: 'Summer Camp 2025',
    pages: [
      'assets/vestnik/Summer Camp 6.23 1.png',
      'assets/vestnik/Summer Camp 6.23 2.png',
    ],
    before: [
      'assets/befores/Summer Camp Spread BEFORE.png',
      'assets/befores/Summer Camp Spread 2 BEFORE.png',
    ],
  },
  'bbq-2025': {
    category: 'Publication Design',
    title: 'BBQ 2025',
    pages: [
      'assets/vestnik/BBQ Spread 1.png',
      'assets/vestnik/BBQ Spread 2.png',
    ],
    before: [
      'assets/befores/BBQ BEFORE 1.png',
      'assets/befores/BBQ BEFORE 2.png',
    ],
  },
  'polka-2025': {
    category: 'Publication Design',
    title: 'National Polka Festival 2025',
    pages: ['assets/vestnik/2025 National Polka Festival.png'],
    before: [],
  },
  'retirement-2025': {
    category: 'Publication Design',
    title: 'Retirement Spread — 2025',
    description: 'A two-page tribute spread honoring an employee who dedicated nearly 60 years to the organization — celebrating a remarkable career milestone.',
    pages: ['assets/vestnik/Retirement Spread.png'],
    before: [],
  },
  'royalty-christmas-2025': {
    category: 'Publication Design',
    title: 'Royalty — Temple Christmas Parade',
    description: 'A one-page buildout featuring the SPJST Royalty program at the 2025 Temple Christmas Parade.',
    pages: ['assets/vestnik/Royalty Christmas Spread 12.08.png'],
    before: [],
  },
  'czmonth-2025': {
    category: 'Publication Design',
    title: 'Czech Heritage Month Activities',
    description: 'In October, the Vestnik celebrates Czech Heritage Month by holding a drawing readers enter by participating in different activities. Based on a random drawing, winners are sent various Czech-themed prizes! I designed the full three issue activity set, as well as the prize designs sent to winners. Prizes were printed on dish towels and flat, circular ornaments.',
    pages: [
      'assets/vestnik/1st Czech Month Activity.png',
      'assets/vestnik/2nd Czech Month Activity.png',
      'assets/vestnik/3rd Czech Month Activity.png',
      'assets/prizes/ornament-1.png',
      'assets/prizes/ornament-2.png',
      'assets/prizes/ornament-3.png',
      'assets/prizes/ornament-4.png',
      'assets/prizes/dishtowel-1.png',
      'assets/prizes/dishtowel-2.png',
      'assets/prizes/dishtowel-3.png',
    ],
    before: [
      'assets/befores/Czech Activity BEFORE.png',
      'assets/befores/Czech Activity 2 BEFORE.png',
    ],
  },

  // ── GRAPHIC DESIGN ──
  'gala-gd': {
    category: 'Graphic Design',
    title: 'Czech National Day Texas Gala — 2025',
    description: 'Full event design suite for the Czech Heritage Museum\'s 2025 Czech National Day Texas Gala — a fundraising event that raised $3,000 with significant attendance. Includes social graphics, ticket promotion post, and the web banner used on the CHM site.',
    pages: [
      'assets/graphic-design/gala-social1.png',
      'assets/graphic-design/gala-social2.png',
      'assets/graphic-design/gala-social3.png',
      'assets/graphic-design/gala-banner.png',
    ],
    before: [],
  },
  'carshow-gd': {
    category: 'Graphic Design',
    title: '2026 Car Show Design Suite',
    description: 'Full promotional package for the 2026 SPJST Car Show — social graphics, event header banner, t-shirt design, and thank you cards. All pieces share a cohesive visual identity built around the event branding.',
    pages: [
      'assets/graphic-design/carshow-social1.png',
      'assets/graphic-design/carshow-social2.png',
      'assets/graphic-design/carshow-social3.png',
      'assets/graphic-design/carshow-social4.png',
      'assets/graphic-design/carshow-header.png',
      'assets/graphic-design/carshow-tshirt.png',
      'assets/graphic-design/carshow-thankyou.png',
    ],
    before: [],
  },
  'svacina-gd': {
    category: 'Graphic Design',
    title: 'Sunday Afternoon Svacina',
    description: 'Complete visual identity for the Czech Heritage Museum\'s recurring Sunday Afternoon Svacina event — flyer, social graphic, outside sign, and matching Vestnik spread. A full multi-channel design system from a single event.',
    pages: [
      'assets/graphic-design/svacina-flyer.png',
      'assets/graphic-design/svacina-social.png',
      'assets/graphic-design/svacina-sign.png',
      'assets/graphic-design/svacina-vestnik.png',
    ],
    before: [],
  },
};

let pmShowingBefore  = false;
let pmCurrentProject = null;

function renderPubPages(images) {
  pmScroll.innerHTML = '';
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = pmCurrentProject ? (projectData[pmCurrentProject].title || '') : '';
    img.className = 'pm-page-img';
    img.loading = 'lazy';
    pmScroll.appendChild(img);
  });
  pmScroll.scrollTop = 0;
}

function openPubModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  pmCurrentProject = projectId;
  pmShowingBefore  = false;

  pmTitle.textContent = data.title;
  if (pmCatTag) pmCatTag.textContent = data.category || 'Publication Design';

  if (data.description && pmDescription) {
    pmDescription.innerHTML = `<p>${data.description}</p>`;
    pmDescription.classList.remove('hidden');
  } else if (pmDescription) {
    pmDescription.classList.add('hidden');
    pmDescription.innerHTML = '';
  }

  if (data.issuu && pmIssuuBtn) {
    pmIssuuBtn.classList.remove('hidden');
    pmIssuuBtn.onclick = () => window.open(data.issuu, '_blank', 'noopener');
  } else if (pmIssuuBtn) {
    pmIssuuBtn.classList.add('hidden');
  }

  if (data.before && data.before.length > 0 && pmBeforeBtn) {
    pmBeforeBtn.classList.remove('hidden');
    pmBeforeBtn.classList.remove('active');
    pmBeforeBtn.textContent = 'View Before';
  } else if (pmBeforeBtn) {
    pmBeforeBtn.classList.add('hidden');
  }

  renderPubPages(data.pages);
  pubModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePubModal() {
  pubModal.classList.remove('open');
  document.body.style.overflow = '';
  pmCurrentProject = null;
  pmShowingBefore  = false;
  setTimeout(() => {
    pmScroll.innerHTML = '';
    if (pmDescription) { pmDescription.innerHTML = ''; pmDescription.classList.add('hidden'); }
  }, 350);
}

if (pubModal) {
  pmCloseBtn.addEventListener('click', closePubModal);
  pubModal.addEventListener('click', e => {
    if (e.target === pubModal) closePubModal();
  });

  pmBeforeBtn.addEventListener('click', () => {
    const data = projectData[pmCurrentProject];
    if (!data) return;
    pmShowingBefore = !pmShowingBefore;
    if (pmShowingBefore) {
      pmBeforeBtn.textContent = 'View After';
      pmBeforeBtn.classList.add('active');
      renderPubPages(data.before);
    } else {
      pmBeforeBtn.textContent = 'View Before';
      pmBeforeBtn.classList.remove('active');
      renderPubPages(data.pages);
    }
  });
}

document.querySelectorAll('.pub-project-card').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.project;
    if (projectId) openPubModal(projectId);
  });
});

// ══════════════════════════════════════════
// PORTFOLIO FILTER
// ══════════════════════════════════════════
const filterBtns      = document.querySelectorAll('.filter-btn');
const portfolioCards  = document.querySelectorAll('.portfolio-card');
const pubGroupLabels  = document.querySelectorAll('.pub-group-label');
const sectionDividers = document.querySelectorAll('.section-divider');
const webGroupLabels  = document.querySelectorAll('.web-group-label');

function applyFilter(filter) {
  filterBtns.forEach(btn =>
    btn.classList.toggle('active', btn.dataset.filter === filter)
  );
  portfolioCards.forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
  });
  pubGroupLabels.forEach(label =>
    label.classList.toggle('hidden', filter !== 'publication')
  );
  webGroupLabels.forEach(label =>
    label.classList.toggle('hidden', filter !== 'all' && filter !== 'web')
  );
  sectionDividers.forEach(div => {
    div.classList.toggle('hidden', filter !== 'all' && div.dataset.section !== filter);
  });
  lbImages = getLightboxImages();
}

filterBtns.forEach(btn =>
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter))
);

function filterAndScroll(category) {
  applyFilter(category);
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ══════════════════════════════════════════
// ANIMATED STAT COUNTERS
// ══════════════════════════════════════════
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const step   = target / (1600 / 16);
  let current  = 0;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(current);
  }, 16);
}

const statsStrip = document.querySelector('.stats-strip');
let countersRun  = false;
if (statsStrip) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !countersRun) {
      countersRun = true;
      document.querySelectorAll('.stat-number').forEach(animateCounter);
    }
  }, { threshold: 0.3 }).observe(statsStrip);
}

// ══════════════════════════════════════════
// CHART BAR ANIMATION
// ══════════════════════════════════════════
const showcase = document.querySelector('.stats-showcase');
if (showcase) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) showcase.classList.add('animated');
  }, { threshold: 0.2 }).observe(showcase);
}

// ══════════════════════════════════════════
// SCROLL FADE-IN
// ══════════════════════════════════════════
const fadeTargets = document.querySelectorAll(
  '.about-inner, .portfolio-header, .portfolio-card, .job-card, .contact-inner, h2, .section-tag'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

fadeTargets.forEach(el => fadeObserver.observe(el));
