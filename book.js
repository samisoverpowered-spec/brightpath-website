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
// Payments coming soon — redirect to contact form for now
function checkout(pkg) {
  const errorEl   = document.getElementById('payment-error');
  const errorText = document.getElementById('payment-error-text');
  if (errorEl && errorText) {
    errorText.textContent = 'Online payments are coming soon! In the meantime, please book via our contact form and we\'ll arrange payment directly. Email: hello@brightpathenglish.com';
    errorEl.style.display = 'flex';
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.getElementById('pay-single')?.addEventListener('click', () => checkout('single'));
document.getElementById('pay-bundle')?.addEventListener('click', () => checkout('bundle'));
document.getElementById('pay-term')?.addEventListener('click', () => checkout('term'));

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
