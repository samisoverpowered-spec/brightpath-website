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

// ===================== PRE-SCROLL TO PLAN FROM URL =====================
const params = new URLSearchParams(window.location.search);
const pkgParam = params.get('pkg');
if (pkgParam === 'bundle') {
  document.getElementById('pkg-bundle')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.getElementById('pkg-bundle')?.classList.add('ring-highlight');
}
if (pkgParam === 'single') {
  document.getElementById('pkg-single')?.classList.add('ring-highlight');
}

// ===================== ENQUIRY MODAL =====================
const pmodal         = document.getElementById('pmodal');
const pmodalClose    = document.getElementById('pmodal-close');
const pmodalPlanName = document.getElementById('pmodal-plan-name');
const pmodalPlanPrice= document.getElementById('pmodal-plan-price');
const pmodalForm     = document.getElementById('pmodal-notify-form');
const pmodalSuccess  = document.getElementById('pmodal-success');
const pmodalError    = document.getElementById('pmodal-error');

// Tracks which plan was clicked
let activePlan = '';

function openModal(planId) {
  const card  = document.querySelector('[data-plan-id="' + planId + '"]')?.closest('.book-package-card');
  const name  = card?.querySelector('h2')?.textContent.trim() || '';
  const price = 'CA$' + (card?.querySelector('.bpc-amount')?.textContent.trim() || '');

  pmodalPlanName.textContent  = name;
  pmodalPlanPrice.textContent = price;
  activePlan = name + ' — ' + price;

  // Reset form to initial state
  pmodalForm.reset();
  pmodalForm.style.display    = '';
  pmodalSuccess.style.display = 'none';
  if (pmodalError) pmodalError.style.display = 'none';

  pmodal.style.display = 'flex';
  requestAnimationFrame(() => pmodal.classList.add('pmodal-visible'));
  document.body.style.overflow = 'hidden';
  // Focus first field
  setTimeout(() => document.getElementById('pmodal-name')?.focus(), 280);
}

function closeModal() {
  pmodal.classList.remove('pmodal-visible');
  setTimeout(() => {
    pmodal.style.display = 'none';
    document.body.style.overflow = '';
  }, 220);
}

// Open on plan button click
document.querySelectorAll('.book-pay-btn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.planId));
});

// Close triggers
pmodalClose.addEventListener('click', closeModal);
pmodal.addEventListener('click', e => { if (e.target === pmodal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Submit enquiry form — sends to /api/contact, emails samuelwang77@outlook.com
pmodalForm.addEventListener('submit', async e => {
  e.preventDefault();

  const name      = document.getElementById('pmodal-name').value.trim();
  const email     = document.getElementById('pmodal-email-input').value.trim();
  const goals     = document.getElementById('pmodal-goals').value.trim();
  const program   = document.getElementById('pmodal-program').value.trim();
  const level     = document.getElementById('pmodal-level').value;
  const frequency = document.getElementById('pmodal-frequency').value;
  const notes     = document.getElementById('pmodal-notes').value.trim();

  if (!name || !email || !goals || !program || !level) {
    showModalError('Please fill in all required fields (marked with *).');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showModalError('Please enter a valid email address.');
    return;
  }

  // Loading state
  const submitBtn  = document.getElementById('pmodal-submit');
  const submitText = submitBtn.querySelector('.pmodal-submit-text');
  const submitLoad = submitBtn.querySelector('.pmodal-submit-loading');
  submitText.style.display = 'none';
  submitLoad.style.display = 'flex';
  submitBtn.disabled = true;
  if (pmodalError) pmodalError.style.display = 'none';

  try {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, plan: activePlan, goals, program, level, frequency, notes }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');

    // Success
    pmodalForm.style.display    = 'none';
    pmodalSuccess.style.display = 'flex';
  } catch (err) {
    showModalError(err.message || 'Failed to send. Please try again.');
  } finally {
    submitText.style.display = '';
    submitLoad.style.display = 'none';
    submitBtn.disabled = false;
  }
});

function showModalError(msg) {
  if (!pmodalError) return;
  pmodalError.textContent    = msg;
  pmodalError.style.display  = 'block';
  pmodalError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================== SCROLL ANIMATIONS =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.book-package-card, .book-faq-item').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`;
    observer.observe(el);
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
  cX += (gX - cX) * 0.1; cY += (gY - cY) * 0.1;
  glow.style.left = cX + 'px'; glow.style.top = cY + 'px';
  requestAnimationFrame(loop);
})();
