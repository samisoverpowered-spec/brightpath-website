// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pricing-card, .included-card, .faq-item, .free-trial-banner').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
    observer.observe(el);
  });
});

// Cursor glow
const glow = document.createElement('div');
glow.id = 'cursor-glow';
document.body.appendChild(glow);
let gX = 0, gY = 0, cX = 0, cY = 0;
document.addEventListener('mousemove', e => { gX = e.clientX; gY = e.clientY; glow.style.opacity = '1'; });
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
(function loop() { cX += (gX-cX)*0.1; cY += (gY-cY)*0.1; glow.style.left=cX+'px'; glow.style.top=cY+'px'; requestAnimationFrame(loop); })();
