/* ==========================================================================
   Paris Roofing Services — main.js
   ========================================================================== */

// === STORM ALERT BANNER TOGGLE ===
// Set to true when there's been recent hail / severe weather in Central Texas.
// Set to false to hide the red banner at the top of the page.
const showStormAlert = true;

(function () {
  'use strict';

  // --- Storm alert banner ---
  const banner = document.getElementById('storm-banner');
  if (banner && showStormAlert) {
    banner.hidden = false;
    document.body.classList.add('has-alert');
  }

  // --- Smooth scroll for in-page anchors ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('.site-header').offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileNav();
    });
  });

  // --- Sticky header shadow + scroll-to-top visibility ---
  const header = document.querySelector('.site-header');
  const toTop = document.getElementById('to-top');
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 80);
    if (toTop) toTop.classList.toggle('visible', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile hamburger toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  function closeMobileNav() {
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  // --- Scroll-to-top click ---
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Tap-to-call on mobile ---
  // All phone links already use tel:+15127403215 so mobile taps call directly.
  // This block ensures any stray (512) 740-3215 text in the hero is wrapped
  // in a tel: link on touch devices.
  if ('ontouchstart' in window) {
    document.querySelectorAll('.hero a[href^="tel:"]').forEach((el) => {
      el.setAttribute('data-touch', 'true');
    });
  }

  // --- Auto-update copyright year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
