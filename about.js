// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===================== HAMBURGER =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ===================== SCROLL REVEAL =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'none';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Different animation directions for different elements
const reveals = [
  { sel: '.section-tag, .section-title, .section-subtitle, .about-hero-title, .about-hero-sub', dir: 'fade-up', base: 0 },
  { sel: '.mission-card',    dir: 'fade-left',  base: 0 },
  { sel: '.value-card',      dir: 'fade-up',    base: 0 },
  { sel: '.tl-left .tl-card',  dir: 'fade-left',  base: 0 },
  { sel: '.tl-right .tl-card', dir: 'fade-right', base: 0 },
  { sel: '.tl-year',         dir: 'scale',      base: 0 },
  { sel: '.credential',      dir: 'fade-up',    base: 0 },
  { sel: '.founder-quote-card', dir: 'scale',   base: 0 },
  { sel: '.about-stat-card', dir: 'scale',      base: 0 },
  { sel: '.founder-photo-wrap', dir: 'scale',   base: 0 },
];

const fromMap = {
  'fade-up':    'translateY(36px)',
  'fade-left':  'translateX(-40px)',
  'fade-right': 'translateX(40px)',
  'scale':      'scale(0.88)',
};

document.addEventListener('DOMContentLoaded', () => {
  reveals.forEach(({ sel, dir, base }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      // Skip if already being animated
      if (el.dataset.animated) return;
      el.dataset.animated = '1';
      el.style.opacity    = '0';
      el.style.transform  = fromMap[dir];
      el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${base + i * 0.08}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${base + i * 0.08}s`;
      observer.observe(el);
    });
  });
});

// ===================== CURSOR GLOW =====================
const glow = document.createElement('div');
glow.id = 'cursor-glow';
document.body.appendChild(glow);
let gX = 0, gY = 0, cX = 0, cY = 0;
document.addEventListener('mousemove', e => { gX = e.clientX; gY = e.clientY; glow.style.opacity = '1'; });
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
(function loop() {
  cX += (gX - cX) * 0.1;
  cY += (gY - cY) * 0.1;
  glow.style.left = cX + 'px';
  glow.style.top  = cY + 'px';
  requestAnimationFrame(loop);
})();

// ===================== COUNTER ANIMATION (hero stats) =====================
function animateCounter(el, target, suffix, duration = 1600) {
  const start = performance.now();
  const update = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target % 1 !== 0 ? (target * eased).toFixed(1) : Math.floor(target * eased);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const numEl = e.target.querySelector('.about-stat-num');
      if (!numEl || numEl.dataset.counted) return;
      numEl.dataset.counted = '1';
      const raw    = numEl.textContent;
      const num    = parseFloat(raw.replace(/[^\d.]/g, ''));
      const suffix = raw.replace(/[\d.]/g, '');
      if (!isNaN(num)) animateCounter(numEl, num, suffix);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stat-card').forEach(c => statObserver.observe(c));

// ===================== CARD TILT =====================
document.querySelectorAll('.mission-card, .value-card, .tl-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    this.style.transform  = `perspective(600px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-5px)`;
    this.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform  = '';
    this.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.28s ease, opacity 0.65s ease';
  });
});
