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

// ===================== CANCELLED BANNER =====================
const params = new URLSearchParams(window.location.search);
if (params.get('cancelled') === '1') {
  const banner = document.getElementById('cancelled-banner');
  if (banner) banner.style.display = 'flex';
  // Clean URL
  window.history.replaceState({}, '', window.location.pathname);
}
document.getElementById('close-cancelled')?.addEventListener('click', () => {
  document.getElementById('cancelled-banner').style.display = 'none';
});

// ===================== PRE-SELECT PACKAGE FROM URL =====================
const pkgParam = params.get('pkg');
if (pkgParam === 'bundle') {
  document.getElementById('pkg-bundle')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.getElementById('pkg-bundle')?.classList.add('ring-highlight');
}
if (pkgParam === 'single') {
  document.getElementById('pkg-single')?.classList.add('ring-highlight');
}

// ===================== STRIPE CHECKOUT =====================
async function checkout(pkg) {
  const btn          = document.getElementById(`pay-${pkg}`);
  const btnText      = btn.querySelector('.pay-btn-text');
  const btnLoading   = btn.querySelector('.pay-btn-loading');
  const errorEl      = document.getElementById('payment-error');
  const errorText    = document.getElementById('payment-error-text');

  // Loading state
  btnText.style.display    = 'none';
  btnLoading.style.display = 'flex';
  btn.disabled             = true;
  if (errorEl) errorEl.style.display = 'none';

  try {
    const res = await fetch('/api/create-checkout-session', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ package: pkg }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Server error');
    }

    const { url } = await res.json();
    window.location.href = url;

  } catch (err) {
    console.error('Checkout error:', err);
    btnText.style.display    = 'flex';
    btnLoading.style.display = 'none';
    btn.disabled             = false;

    if (errorEl) {
      errorText.textContent = `Payment error: ${err.message}. Please try again or contact hello@brightpathenglish.com`;
      errorEl.style.display = 'flex';
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

document.getElementById('pay-single')?.addEventListener('click', () => checkout('single'));
document.getElementById('pay-bundle')?.addEventListener('click', () => checkout('bundle'));

// ===================== SCROLL ANIMATIONS =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.book-package-card, .ft-card, .ft-content').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
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
