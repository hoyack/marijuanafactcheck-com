window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) };
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }
  // Copyright year
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  // Conversion view guard: only fire on success-page with explicit param
  var view = document.querySelector('[data-conversion-view]');
  if (view) {
    var params = new URLSearchParams(location.search);
    var requiredParam = view.getAttribute('data-conversion-param');
    if (params.get(requiredParam)) {
      plausible(view.getAttribute('data-conversion-view'));
    }
  }
  // Search filter on claims page
  var searchInput = document.querySelector('[data-claim-search]');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.toLowerCase();
      document.querySelectorAll('[data-claim-card]').forEach(function (card) {
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
});
