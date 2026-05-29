/* Apply saved theme before first paint — prevents flash */
(function () {
  document.documentElement.setAttribute(
    'data-theme',
    localStorage.getItem('mf_theme') || 'dark'
  );
})();

/* Wire up theme toggles after DOM is ready */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;

  function applyTheme(theme, animate) {
    if (animate) {
      document.body.classList.add('transitioning');
      setTimeout(function () { document.body.classList.remove('transitioning'); }, 350);
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('mf_theme', theme);
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  });
});
