// ===================== DARK MODE =====================
// Apply saved theme immediately (before paint) to prevent flash
// New visitors always start on light mode
(function () {
  var saved = localStorage.getItem('bp-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('bp-theme', 'light');
  }
})();

// Wire up the toggle button after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bp-theme', next);
  });
});
