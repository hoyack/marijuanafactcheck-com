/**
 * Marijuana Fact Check — Main App
 * Handles claim rendering, search, filtering, navigation, and interactions.
 */
(function () {
  'use strict';

  // State
  let currentSearch = '';
  let currentCategory = '';
  let currentGrade = '';
  let currentVerdict = '';

  // DOM refs
  const claimsContainer = document.getElementById('claims-container');
  const noResults = document.getElementById('no-results');
  const searchInput = document.getElementById('claim-search');
  const searchBtn = document.getElementById('search-btn');
  const filterCategory = document.getElementById('filter-category');
  const filterGrade = document.getElementById('filter-grade');
  const filterVerdict = document.getElementById('filter-verdict');
  const resetBtn = document.getElementById('reset-filters');
  const clearFiltersLink = document.getElementById('clear-filters-link');
  const visibleCount = document.getElementById('visible-count');
  const totalCount = document.getElementById('total-count');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('main-nav');

  // ===== Claim Card Templates =====

  function buildGradeHTML(grade) {
    const cls = 'grade-' + grade.toLowerCase();
    return '<span class="grade ' + cls + '" aria-label="Evidence grade: ' + grade + '">' + grade + '</span>';
  }

  function buildVerdictHTML(verdict) {
    const label = verdict.replace(/-/g, ' ');
    const cls = 'verdict verdict-' + verdict;
    return '<span class="' + cls + '">' + label + '</span>';
  }

  function buildUncertaintyHTML(level) {
    const cls = 'uncertainty-' + level;
    const icons = { low: '\u25CF', medium: '\u25CF\u25CF', high: '\u25CF\u25CF\u25CF' };
    return '<span class="' + cls + '" aria-label="Uncertainty: ' + level + '">' + (icons[level] || '') + ' ' + level.charAt(0).toUpperCase() + level.slice(1) + '</span>';
  }

  function buildCategoryHTML(category) {
    const labels = {
      health: 'Health & Medicine',
      law: 'Law & Policy',
      science: 'Science & Chemistry',
      market: 'Market & Industry',
      culture: 'History & Culture'
    };
    return '<span class="category-tag">' + (labels[category] || category) + '</span>';
  }

  function buildClaimCard(claim) {
    return '<article class="claim-card">' +
      '<div class="claim-card-header">' +
        buildGradeHTML(claim.grade) +
        buildVerdictHTML(claim.verdict) +
        buildCategoryHTML(claim.category) +
      '</div>' +
      '<p class="claim-text"><a href="/claim.html?id=' + claim.id + '">' + escapeHTML(claim.text) + '</a></p>' +
      '<p class="claim-summary">' + escapeHTML(claim.summary) + '</p>' +
      '<div class="claim-card-meta">' +
        buildUncertaintyHTML(claim.uncertainty) +
        '<span>' + claim.sources.length + ' source' + (claim.sources.length !== 1 ? 's' : '') + '</span>' +
        '<span>Reviewed: ' + claim.lastReviewed + '</span>' +
      '</div>' +
    '</article>';
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ===== Filtering =====

  function matchesSearch(claim) {
    if (!currentSearch) return true;
    var q = currentSearch.toLowerCase();
    return claim.text.toLowerCase().includes(q) ||
           claim.summary.toLowerCase().includes(q) ||
           claim.evidence.toLowerCase().includes(q) ||
           claim.category.toLowerCase().includes(q) ||
           claim.verdict.toLowerCase().includes(q);
  }

  function matchesCategory(claim) {
    return !currentCategory || claim.category === currentCategory;
  }

  function matchesGrade(claim) {
    return !currentGrade || claim.grade === currentGrade;
  }

  function matchesVerdict(claim) {
    return !currentVerdict || claim.verdict === currentVerdict;
  }

  function getFilteredClaims() {
    return CLAIMS.filter(function(c) {
      return matchesSearch(c) && matchesCategory(c) && matchesGrade(c) && matchesVerdict(c);
    });
  }

  function renderClaims() {
    var filtered = getFilteredClaims();
    if (filtered.length === 0) {
      claimsContainer.innerHTML = '';
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      claimsContainer.innerHTML = filtered.map(buildClaimCard).join('');
    }
    visibleCount.textContent = filtered.length;
    totalCount.textContent = CLAIMS.length;
  }

  // ===== Event Handlers =====

  function onSearch() {
    currentSearch = searchInput.value.trim();
    renderClaims();
  }

  function onFilterChange() {
    currentCategory = filterCategory.value;
    currentGrade = filterGrade.value;
    currentVerdict = filterVerdict.value;
    renderClaims();
  }

  function resetFilters() {
    searchInput.value = '';
    filterCategory.value = '';
    filterGrade.value = '';
    filterVerdict.value = '';
    currentSearch = '';
    currentCategory = '';
    currentGrade = '';
    currentVerdict = '';
    renderClaims();
  }

  // ===== Navigation =====

  function toggleNav() {
    var expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  }

  // ===== Footer Year =====
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Claim Detail Page (claim.html) =====
  function renderClaimDetail() {
    var params = new URLSearchParams(window.location.search);
    var claimId = params.get('id');
    if (!claimId) {
      document.querySelector('.claim-detail').innerHTML = '<p>No claim specified. <a href="/">Browse all claims.</a></p>';
      return;
    }
    var claim = CLAIMS.find(function(c) { return c.id === claimId; });
    if (!claim) {
      document.querySelector('.claim-detail').innerHTML = '<p>Claim not found. <a href="/">Browse all claims.</a></p>';
      return;
    }

    // Update page title
    document.title = claim.text + ' — Marijuana Fact Check';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', claim.summary);

    var sourcesHTML = claim.sources.map(function(s) {
      return '<li><a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(s.label) + '</a></li>';
    }).join('');

    var html =
      '<div class="claim-header">' +
        '<div class="claim-card-header">' +
          buildGradeHTML(claim.grade) +
          buildVerdictHTML(claim.verdict) +
          buildCategoryHTML(claim.category) +
        '</div>' +
        '<h1>' + escapeHTML(claim.text) + '</h1>' +
        '<div class="claim-card-meta" style="margin-top:0.5rem">' +
          buildUncertaintyHTML(claim.uncertainty) +
          '<span>Last reviewed: ' + claim.lastReviewed + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="evidence-section">' +
        '<h3>Summary</h3>' +
        '<p>' + escapeHTML(claim.summary) + '</p>' +
      '</div>' +
      '<div class="evidence-section">' +
        '<h3>Evidence Review</h3>' +
        '<p>' + escapeHTML(claim.evidence) + '</p>' +
      '</div>' +
      '<div class="evidence-section">' +
        '<h3>Sources (' + claim.sources.length + ')</h3>' +
        '<ul class="source-list">' + sourcesHTML + '</ul>' +
      '</div>' +
      '<p style="margin-top:2rem"><a href="/">&larr; Back to all claims</a></p>';

    document.querySelector('.claim-detail').innerHTML = html;
  }

  // ===== Init =====

  function init() {
    // Claim browser (index.html)
    if (claimsContainer) {
      renderClaims();
    }

    // Claim detail (claim.html)
    if (document.querySelector('.claim-detail')) {
      renderClaimDetail();
    }

    // Event listeners
    if (searchBtn) {
      searchBtn.addEventListener('click', onSearch);
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') onSearch();
      });
    }
    if (filterCategory) filterCategory.addEventListener('change', onFilterChange);
    if (filterGrade) filterGrade.addEventListener('change', onFilterChange);
    if (filterVerdict) filterVerdict.addEventListener('change', onFilterChange);
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
    if (clearFiltersLink) clearFiltersLink.addEventListener('click', resetFilters);
    if (navToggle) navToggle.addEventListener('click', toggleNav);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
