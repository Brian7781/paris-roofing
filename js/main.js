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
  if ('ontouchstart' in window) {
    document.querySelectorAll('.hero a[href^="tel:"]').forEach((el) => {
      el.setAttribute('data-touch', 'true');
    });
  }

  // --- Hero video sound toggle + auto-unmute on first interaction ---
  var heroVideo = document.querySelector('.hero__video');
  var soundBtn = document.querySelector('.hero__sound-toggle');
  var videoWrap = document.querySelector('.hero__video-wrap');
  if (heroVideo && soundBtn && videoWrap) {
    function unmuteVideo() {
      if (!heroVideo.muted) return;
      heroVideo.muted = false;
      videoWrap.classList.add('sound-on');
      if (typeof gtag === 'function') {
        gtag('event', 'video_sound_toggle', {
          'event_category': 'engagement',
          'event_label': 'auto_unmuted'
        });
      }
    }
    function muteVideo() {
      heroVideo.muted = true;
      videoWrap.classList.remove('sound-on');
    }
    function toggleSound() {
      if (heroVideo.muted) { unmuteVideo(); } else { muteVideo(); }
    }

    // Manual toggle on button click
    soundBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSound();
      removeAutoUnmute();
    });

    // Auto-unmute on first user interaction anywhere on page
    var autoUnmuteEvents = ['click', 'scroll', 'touchstart', 'keydown'];
    function handleAutoUnmute() {
      unmuteVideo();
      removeAutoUnmute();
    }
    function removeAutoUnmute() {
      autoUnmuteEvents.forEach(function(evt) {
        document.removeEventListener(evt, handleAutoUnmute, { capture: true });
      });
    }
    autoUnmuteEvents.forEach(function(evt) {
      document.addEventListener(evt, handleAutoUnmute, { capture: true, passive: true });
    });
  }

  // --- GA4 call button click tracking ---
  document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      gtag('event', 'call_button_click', {
        'event_category': 'engagement',
        'event_label': 'phone_call'
      });
    });
  });

  // --- Auto-update copyright year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Scroll Reveal Animations ---
  initScrollReveal();

  function initScrollReveal() {
    // Skip if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) return;

    // Individual reveal targets (not staggered)
    const singles = document.querySelectorAll(
      '.section > .container > h2, ' +
      '.section__lede, ' +
      '.why-banner, ' +
      '.storm__copy, ' +
      '.contact__card, ' +
      '.estimate-form, ' +
      '.area__copy, ' +
      '.contact h2, ' +
      '.section--navy > .container > .center'
    );
    singles.forEach(function (el) {
      el.classList.add('reveal');
    });

    // Staggered groups — children animate in sequence when parent enters viewport
    var groups = document.querySelectorAll(
      '.grid:not(.contact), .pillars'
    );
    groups.forEach(function (parent) {
      var children = parent.children;
      for (var i = 0; i < children.length; i++) {
        children[i].classList.add('reveal');
        children[i].style.setProperty('--i', i);
      }
      parent.classList.add('reveal-stagger');
    });

    // Cities get faster stagger (many items)
    var citiesEl = document.querySelector('.cities');
    if (citiesEl) {
      var pills = citiesEl.children;
      for (var i = 0; i < pills.length; i++) {
        pills[i].classList.add('reveal');
        pills[i].style.setProperty('--i', i);
      }
      citiesEl.classList.add('reveal-stagger');
      citiesEl.classList.add('reveal-stagger--fast');
    }

    // Create the observer
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;

          // If it's a stagger parent, reveal all children
          if (target.classList.contains('reveal-stagger')) {
            var revealChildren = target.querySelectorAll('.reveal');
            revealChildren.forEach(function (child) {
              child.classList.add('revealed');
            });
          } else {
            target.classList.add('revealed');
          }

          observer.unobserve(target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe all single targets
    singles.forEach(function (el) { observer.observe(el); });
    // Observe stagger group parents
    groups.forEach(function (el) { observer.observe(el); });
    if (citiesEl) observer.observe(citiesEl);
  }
})();
