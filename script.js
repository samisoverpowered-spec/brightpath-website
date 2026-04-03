// ===================== SCROLL PROGRESS BAR =====================
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ===================== SESSION TIMER =====================
const timerEl = document.querySelector('.session-time');
if (timerEl) {
  let secs = 32 * 60 + 14;
  setInterval(() => {
    secs++;
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);
}

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===================== HAMBURGER MENU =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===================== CONTACT FORM =====================
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add('error');
  if (error) error.textContent = message;
}
function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.remove('error');
  if (error) error.textContent = '';
}
function validateForm() {
  let valid = true;
  clearError('firstName','firstNameError'); clearError('lastName','lastNameError');
  clearError('email','emailError'); clearError('service','serviceError');
  if (!document.getElementById('firstName').value.trim()) { showError('firstName','firstNameError','Please enter your first name.'); valid = false; }
  if (!document.getElementById('lastName').value.trim())  { showError('lastName','lastNameError','Please enter your last name.'); valid = false; }
  const email = document.getElementById('email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email','emailError','Please enter a valid email address.'); valid = false; }
  if (!document.getElementById('service').value) { showError('service','serviceError','Please select a service.'); valid = false; }
  return valid;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validateForm()) return;
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;
  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    formSuccess.classList.add('anim-scale-in');
  }, 1500);
});

['firstName','lastName','email','service'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input',  () => clearError(id, id + 'Error'));
    el.addEventListener('change', () => clearError(id, id + 'Error'));
  }
});

// ===================== HERO PARALLAX =====================
const shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  shapes.forEach((s, i) => {
    const speed = [0.18, 0.10, 0.14][i] || 0.1;
    s.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

// ===================== COUNTER ANIMATION =====================
function animateCounter(el, target, duration = 1600) {
  const isDecimal = target % 1 !== 0;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = isDecimal
      ? current.toFixed(1) + (el.dataset.suffix || '')
      : Math.floor(current) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ===================== SCROLL REVEAL ENGINE =====================
// Each element gets a data-reveal attribute: fade-up | fade-left | fade-right | fade-down | scale | rotate
const revealMap = {
  'fade-up':    { from: 'translateY(48px)',            opacity: 0 },
  'fade-down':  { from: 'translateY(-40px)',           opacity: 0 },
  'fade-left':  { from: 'translateX(-60px)',           opacity: 0 },
  'fade-right': { from: 'translateX(60px)',            opacity: 0 },
  'scale':      { from: 'scale(0.85)',                 opacity: 0 },
  'rotate':     { from: 'rotate(-6deg) scale(0.9)',    opacity: 0 },
};

function applyReveal(el, type, delay = 0) {
  const r = revealMap[type] || revealMap['fade-up'];
  el.style.opacity = '0';
  el.style.transform = r.from;
  el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
  el.dataset.revealPending = '1';
}

function triggerReveal(el) {
  el.style.opacity = '1';
  el.style.transform = 'none';
  delete el.dataset.revealPending;

  // Fire counter if needed
  if (el.dataset.counter) {
    animateCounter(el, parseFloat(el.dataset.counter));
  }
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.revealPending) {
      triggerReveal(entry.target);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {

  // --- Section headers: tag fades down, title fades up, subtitle fades up slower ---
  document.querySelectorAll('.section-tag').forEach(el => {
    applyReveal(el, 'fade-down', 0);
    revealObserver.observe(el);
  });
  document.querySelectorAll('.section-title').forEach(el => {
    applyReveal(el, 'fade-up', 0.1);
    revealObserver.observe(el);
  });
  document.querySelectorAll('.section-subtitle').forEach(el => {
    applyReveal(el, 'fade-up', 0.2);
    revealObserver.observe(el);
  });

  // --- Service cards: staggered fade-up ---
  document.querySelectorAll('.service-card').forEach((el, i) => {
    applyReveal(el, 'fade-up', i * 0.08);
    revealObserver.observe(el);
  });

  // --- Steps: alternating left/right ---
  document.querySelectorAll('.step').forEach((el, i) => {
    applyReveal(el, i % 2 === 0 ? 'fade-left' : 'fade-right', i * 0.12);
    revealObserver.observe(el);
  });

  // --- Tutor cards: scale in ---
  document.querySelectorAll('.tutor-card').forEach((el, i) => {
    applyReveal(el, 'scale', i * 0.12);
    revealObserver.observe(el);
  });

  // --- Testimonials: stagger fade-up ---
  document.querySelectorAll('.testimonial-card').forEach((el, i) => {
    applyReveal(el, 'fade-up', i * 0.09);
    revealObserver.observe(el);
  });

  // --- Trust items: staggered fade-up ---
  document.querySelectorAll('.trust-item').forEach((el, i) => {
    applyReveal(el, 'fade-up', i * 0.05);
    revealObserver.observe(el);
  });

  // --- Contact points: fade-left ---
  document.querySelectorAll('.contact-point').forEach((el, i) => {
    applyReveal(el, 'fade-left', i * 0.12);
    revealObserver.observe(el);
  });

  // --- Contact form wrapper: fade-right ---
  const formWrapper = document.querySelector('.contact-form-wrapper');
  if (formWrapper) { applyReveal(formWrapper, 'fade-right', 0.15); revealObserver.observe(formWrapper); }

  // --- Contact info text block: fade-left ---
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) { applyReveal(contactInfo, 'fade-left', 0); revealObserver.observe(contactInfo); }

  // --- Hero stats counters ---
  document.querySelectorAll('.stat-number').forEach(el => {
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^\d.]/g, ''));
    const suffix = text.replace(/[\d.]/g, '');
    if (!isNaN(num)) {
      el.dataset.counter = num;
      el.dataset.suffix = suffix;
      el.textContent = '0' + suffix;
      applyReveal(el, 'scale', 0.3);
      revealObserver.observe(el);
    }
  });

  // --- Tutors CTA ---
  const tutorsCta = document.querySelector('.tutors-cta');
  if (tutorsCta) { applyReveal(tutorsCta, 'fade-up', 0.1); revealObserver.observe(tutorsCta); }

  // --- Hero content ---
  const heroBadge   = document.querySelector('.badge');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-subtitle');
  const heroActions = document.querySelector('.hero-actions');
  const heroStats   = document.querySelector('.hero-stats');
  const heroVisual  = document.querySelector('.hero-visual');

  if (heroBadge)   { applyReveal(heroBadge,   'fade-down',  0.1);  revealObserver.observe(heroBadge); }
  if (heroTitle)   { applyReveal(heroTitle,   'fade-up',    0.25); revealObserver.observe(heroTitle); }
  if (heroSub)     { applyReveal(heroSub,     'fade-up',    0.4);  revealObserver.observe(heroSub); }
  if (heroActions) { applyReveal(heroActions, 'fade-up',    0.52); revealObserver.observe(heroActions); }
  if (heroStats)   { applyReveal(heroStats,   'fade-up',    0.65); revealObserver.observe(heroStats); }
  if (heroVisual)  { applyReveal(heroVisual,  'fade-right', 0.35); revealObserver.observe(heroVisual); }

  // --- Footer cols ---
  document.querySelectorAll('.footer-col').forEach((el, i) => {
    applyReveal(el, 'fade-up', i * 0.1);
    revealObserver.observe(el);
  });
  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) { applyReveal(footerBrand, 'fade-left', 0); revealObserver.observe(footerBrand); }
});

// ===================== ACTIVE NAV HIGHLIGHT =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ===================== BUTTON MAGNETIC HOVER =====================
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===================== CURSOR GLOW =====================
const glow = document.createElement('div');
glow.id = 'cursor-glow';
document.body.appendChild(glow);

let glowX = 0, glowY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  glowX = e.clientX;
  glowY = e.clientY;
  glow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

function animateGlow() {
  curX += (glowX - curX) * 0.1;
  curY += (glowY - curY) * 0.1;
  glow.style.left = curX + 'px';
  glow.style.top  = curY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===================== CARD TILT ON HOVER =====================
document.querySelectorAll('.service-card, .tutor-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const tiltX = y * -8;
    const tiltY = x * 8;
    this.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    this.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.25s ease, opacity 0.65s cubic-bezier(0.16,1,0.3,1)';
  });
});
