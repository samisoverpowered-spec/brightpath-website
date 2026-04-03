// ===================== STEP NAVIGATION =====================
let currentStep = 1;

const steps      = [1, 2, 3];
const stepEls    = steps.map(n => document.getElementById(`step-${n}`));
const indicators = document.querySelectorAll('.step-ind');
const lines      = document.querySelectorAll('.step-ind-line');

function goToStep(n, goingBack = false) {
  stepEls[currentStep - 1].classList.remove('active', 'going-back');
  currentStep = n;
  const el = stepEls[currentStep - 1];
  el.classList.add('active');
  if (goingBack) el.classList.add('going-back');
  else el.classList.remove('going-back');

  // Update indicators
  indicators.forEach((ind, i) => {
    ind.classList.remove('active', 'done');
    if (i + 1 < currentStep) ind.classList.add('done');
    if (i + 1 === currentStep) ind.classList.add('active');
  });

  // Update connector lines
  lines.forEach((line, i) => {
    line.classList.toggle('filled', i + 1 < currentStep);
  });

  // Re-trigger done icon (checkmark)
  indicators.forEach(ind => {
    if (ind.classList.contains('done')) {
      ind.querySelector('.step-ind-num').textContent = '✓';
    } else {
      ind.querySelector('.step-ind-num').textContent = ind.dataset.step;
    }
  });
}

// Next buttons
document.getElementById('next-1').addEventListener('click', () => {
  if (validateStep1()) goToStep(2);
});
document.getElementById('next-2').addEventListener('click', () => {
  if (validateStep2()) goToStep(3);
});
document.getElementById('back-1').addEventListener('click', () => goToStep(1, true));
document.getElementById('back-2').addEventListener('click', () => goToStep(2, true));

// ===================== PASSWORD STRENGTH =====================
const pwInput  = document.getElementById('su-password');
const pwFill   = document.getElementById('pw-fill');
const pwLabel  = document.getElementById('pw-label');
const togglePw = document.getElementById('toggle-pw');

pwInput.addEventListener('input', () => {
  const val = pwInput.value;
  let strength = 0;
  if (val.length >= 8)              strength++;
  if (/[A-Z]/.test(val))            strength++;
  if (/[0-9]/.test(val))            strength++;
  if (/[^A-Za-z0-9]/.test(val))    strength++;

  const levels = [
    { pct: '0%',   color: '#e5e7eb', label: 'Strength' },
    { pct: '25%',  color: '#ef4444', label: 'Weak' },
    { pct: '50%',  color: '#f59e0b', label: 'Fair' },
    { pct: '75%',  color: '#3b82f6', label: 'Good' },
    { pct: '100%', color: '#10b981', label: 'Strong' },
  ];

  const lvl = val.length === 0 ? levels[0] : levels[strength];
  pwFill.style.width      = lvl.pct;
  pwFill.style.background = lvl.color;
  pwLabel.textContent     = lvl.label;
  pwLabel.style.color     = lvl.color;
});

togglePw.addEventListener('click', () => {
  const isPassword = pwInput.type === 'password';
  pwInput.type = isPassword ? 'text' : 'password';
  togglePw.style.color = isPassword ? '#4f46e5' : '#9ca3af';
});

// ===================== VALIDATION =====================
function showErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErr(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = '';
}
function markField(id, isError) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('error', isError);
}

function validateStep1() {
  let ok = true;
  clearErr('su-first-err'); clearErr('su-last-err');
  clearErr('su-email-err'); clearErr('su-pw-err'); clearErr('su-country-err');

  if (!document.getElementById('su-first').value.trim()) {
    showErr('su-first-err', 'Required.'); markField('su-first', true); ok = false;
  } else markField('su-first', false);

  if (!document.getElementById('su-last').value.trim()) {
    showErr('su-last-err', 'Required.'); markField('su-last', true); ok = false;
  } else markField('su-last', false);

  const email = document.getElementById('su-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErr('su-email-err', 'Enter a valid email.'); markField('su-email', true); ok = false;
  } else markField('su-email', false);

  if (document.getElementById('su-password').value.length < 8) {
    showErr('su-pw-err', 'Password must be at least 8 characters.'); markField('su-password', true); ok = false;
  } else markField('su-password', false);

  if (!document.getElementById('su-country').value) {
    showErr('su-country-err', 'Please select your country.'); markField('su-country', true); ok = false;
  } else markField('su-country', false);

  return ok;
}

function validateStep2() {
  let ok = true;
  clearErr('su-level-err'); clearErr('su-goal-err');

  if (!document.getElementById('su-level').value) {
    showErr('su-level-err', 'Please select your level.'); markField('su-level', true); ok = false;
  } else markField('su-level', false);

  if (!document.querySelector('input[name="goal"]:checked')) {
    showErr('su-goal-err', 'Please select a goal.'); ok = false;
  }

  return ok;
}

function validateStep3() {
  clearErr('su-terms-err');
  if (!document.getElementById('su-terms').checked) {
    showErr('su-terms-err', 'You must agree to the Terms of Service to continue.');
    return false;
  }
  return true;
}

// ===================== FORM SUBMIT =====================
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validateStep3()) return;

  const btn = document.getElementById('su-submit');
  btn.querySelector('.btn-text').style.display = 'none';
  btn.querySelector('.btn-loading').style.display = 'inline';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('signup-form').style.display = 'none';
    document.querySelector('.step-indicators').style.display = 'none';
    document.querySelector('.signup-form-header').style.display = 'none';
    const success = document.getElementById('signup-success');
    success.style.display = 'block';
    success.classList.add('anim-scale-in');
  }, 1800);
});

// ===================== LIVE CLEAR ERRORS =====================
['su-first','su-last','su-email','su-password','su-country','su-level'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  const evt = el.tagName === 'SELECT' ? 'change' : 'input';
  el.addEventListener(evt, () => {
    markField(id, false);
    clearErr(id + '-err');
  });
});

// ===================== CURSOR GLOW (reuse from main) =====================
const glow = document.createElement('div');
glow.id = 'cursor-glow';
document.body.appendChild(glow);

let glowX = 0, glowY = 0, curX = 0, curY = 0;
document.addEventListener('mousemove', e => { glowX = e.clientX; glowY = e.clientY; glow.style.opacity = '1'; });
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

(function animateGlow() {
  curX += (glowX - curX) * 0.1;
  curY += (glowY - curY) * 0.1;
  glow.style.left = curX + 'px';
  glow.style.top  = curY + 'px';
  requestAnimationFrame(animateGlow);
})();

// ===================== LEFT PANEL PERK ENTRANCE =====================
const perks = document.querySelectorAll('.signup-perks li');
perks.forEach((p, i) => {
  p.style.opacity = '0';
  p.style.transform = 'translateX(-20px)';
  p.style.transition = `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`;
  setTimeout(() => { p.style.opacity = '1'; p.style.transform = 'none'; }, 50);
});

const headline = document.querySelector('.signup-headline');
const testimonial = document.querySelector('.signup-testimonial');
[headline, testimonial].forEach((el, i) => {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${0.1 + i * 0.15}s, transform 0.6s ease ${0.1 + i * 0.15}s`;
  setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 50);
});
