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

// ===================== PAYMENT MODAL =====================
const pmodal          = document.getElementById('pmodal');
const pmodalClose     = document.getElementById('pmodal-close');
const pmodalPlanName  = document.getElementById('pmodal-plan-name');
const pmodalPlanPrice = document.getElementById('pmodal-plan-price');
const pmodalInstr     = document.getElementById('pmodal-instructions');
const pmodalForm      = document.getElementById('pmodal-notify-form');
const pmodalSuccess   = document.getElementById('pmodal-success');
const pmodalSelect    = document.getElementById('pmodal-plan-select');

// Map plan IDs to their select-option values
const PLAN_SELECT_MAP = {
  single: 'Single Session — CA$40',
  bundle: '5-Session Bundle — CA$170',
  term:   'Full Term Plan — CA$500',
};

function openModal(planId) {
  // Grab live text from the card so it reflects the active language
  const card  = document.querySelector('[data-plan-id="' + planId + '"]')?.closest('.book-package-card');
  const name  = card?.querySelector('h2')?.textContent.trim() || '';
  const price = 'CA$' + (card?.querySelector('.bpc-amount')?.textContent.trim() || '');

  pmodalPlanName.textContent  = name;
  pmodalPlanPrice.textContent = price;

  // Pre-select this plan in the notify form
  if (pmodalSelect) {
    for (let i = 0; i < pmodalSelect.options.length; i++) {
      if (pmodalSelect.options[i].value === PLAN_SELECT_MAP[planId]) {
        pmodalSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Reset to instructions view
  pmodalInstr.style.display   = '';
  pmodalForm.style.display    = 'none';
  pmodalSuccess.style.display = 'none';

  pmodal.style.display = 'flex';
  requestAnimationFrame(() => pmodal.classList.add('pmodal-visible'));
  document.body.style.overflow = 'hidden';
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

// Copy email to clipboard
document.querySelectorAll('.pmodal-copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = orig; }, 1600);
    }).catch(() => {
      // Fallback for browsers without clipboard API
      prompt('Copy this email address:', btn.dataset.copy);
    });
  });
});

// Show notify form
document.getElementById('pmodal-notify-trigger').addEventListener('click', () => {
  pmodalInstr.style.display = 'none';
  pmodalForm.style.display  = 'block';
});

// Submit notify form — composes a mailto so the notification lands in the owner's inbox
pmodalForm.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('pmodal-name').value.trim();
  const email = document.getElementById('pmodal-email-input').value.trim();
  const plan  = pmodalSelect.value;

  if (!name || !email || !plan) return;

  const subject = encodeURIComponent('Payment Notification: ' + plan);
  const body    = encodeURIComponent(
    'Hi,\n\n' +
    'A student has sent payment and is waiting for booking confirmation.\n\n' +
    'Name:  ' + name  + '\n' +
    'Email: ' + email + '\n' +
    'Plan:  ' + plan  + '\n\n' +
    'Please reply to their email to confirm the booking.\n'
  );

  window.open('mailto:hello@pomeloEnglish.com?subject=' + subject + '&body=' + body, '_self');

  // Show success state
  pmodalForm.style.display    = 'none';
  pmodalSuccess.style.display = 'flex';
});

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
