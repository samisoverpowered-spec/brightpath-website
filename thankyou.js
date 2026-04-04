// ===================== LOAD ORDER SUMMARY FROM STRIPE =====================
async function loadSessionDetails() {
  const params    = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const pkg       = params.get('pkg');
  const summaryEl = document.getElementById('ty-summary');
  const subtitleEl = document.getElementById('ty-subtitle');

  if (!sessionId) {
    // No session ID — show generic success
    summaryEl.innerHTML = `
      <div class="ty-summary-label">Purchase</div>
      <div class="ty-summary-row">
        <span class="ty-summary-name">Pomelo English Session</span>
        <span class="ty-summary-badge">✓ Paid</span>
      </div>`;
    return;
  }

  try {
    const res  = await fetch(`/api/session/${sessionId}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // Update subtitle
    if (subtitleEl) {
      subtitleEl.textContent = `Hi ${data.customer_name}! Your ${data.sessions > 1 ? data.sessions + ' sessions are' : 'session is'} confirmed. Now pick your time below.`;
    }

    summaryEl.innerHTML = `
      <p class="ty-summary-label">Order Summary</p>
      <div class="ty-summary-row">
        <span class="ty-summary-name">${data.package_label}</span>
        <span class="ty-summary-amount">CA$${data.amount_total}</span>
      </div>
      <div class="ty-summary-meta">
        <span>${data.sessions} session${data.sessions > 1 ? 's' : ''} · 60 min each</span>
        <span class="ty-summary-badge">✓ Paid</span>
        <span>Receipt sent to ${data.customer_email}</span>
      </div>`;
  } catch (err) {
    console.error('Could not load session details:', err);
    // Graceful fallback
    summaryEl.innerHTML = `
      <p class="ty-summary-label">Order Summary</p>
      <div class="ty-summary-row">
        <span class="ty-summary-name">Pomelo English Tutoring Session</span>
        <span class="ty-summary-badge">✓ Paid</span>
      </div>
      <div class="ty-summary-meta"><span>Receipt sent to your email</span></div>`;
  }
}

loadSessionDetails();

// ===================== SCROLL ANIMATIONS =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='none'; observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ty-expect-card, .ty-summary, .ty-next-steps, .ty-calendly-section').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    observer.observe(el);
  });
});
