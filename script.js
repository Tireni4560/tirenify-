// ============================================================
// TIRENIFY — Homepage v2
// Direction A: light, engineered
// ============================================================

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── WORDMARK ENTRANCE ─────────────────────────────── */
  function splitWordmark() {
    var el = document.querySelector('.wordmark[data-split]');
    if (!el) return;
    var text = el.getAttribute('data-split') || el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    var i, letter;
    for (i = 0; i < text.length; i++) {
      letter = document.createElement('span');
      letter.className = 'letter';
      letter.style.setProperty('--i', String(i));
      if (text[i] === ' ') {
        letter.innerHTML = '&nbsp;';
      } else {
        letter.textContent = text[i];
      }
      frag.appendChild(letter);
    }
    el.appendChild(frag);
  }
  splitWordmark();

  var started = false;
  function startEntrance() {
    if (started) return;
    started = true;
    document.body.classList.add('started');
    // Trigger diagram draw after wordmark settles
    window.setTimeout(activateDiagram, reduceMotion ? 200 : 1450);
  }

  /* ─── TECHNICAL DIAGRAM ─────────────────────────────── */
  function activateDiagram() {
    var dg = document.getElementById('diagram');
    var dm = document.getElementById('diagram-mobile');
    if (dg) dg.classList.add('live');
    if (dm) dm.classList.add('live');
  }

  /* ─── SCROLL REVEAL ─────────────────────────────────── */
  function setupReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var group = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.transitionDelay = Math.min(group, 4) * 80 + 'ms';
        el.classList.add('revealed');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ─── HEADER SCROLL STATE ───────────────────────────── */
  function setupHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE NAV (hamburger full-screen overlay) ────────── */
  function setupMobileNav() {
    var toggle = document.getElementById('mobile-toggle');
    var overlay = document.getElementById('mobile-overlay');
    if (!toggle || !overlay) return;

    var lastFocus = null;

    function openNav() {
      lastFocus = document.activeElement;
      overlay.classList.add('is-open');
      toggle.classList.add('active');
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Move focus to first link for keyboard users
      var first = overlay.querySelector('a');
      if (first) first.focus();
    }

    function closeNav() {
      overlay.classList.remove('is-open');
      toggle.classList.remove('active');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    toggle.addEventListener('click', function () {
      overlay.classList.contains('is-open') ? closeNav() : openNav();
    });

    // Close when tapping the dark overlay background
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeNav();
    });

    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        // Scroll after a tick so the overlay hides first
        window.setTimeout(closeNav, 10);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeNav();
    });

    // Trap focus within the overlay while open
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key !== 'Tab') return;
      var focusables = overlay.querySelectorAll('a');
      if (!focusables.length) return;
      var firstEl = focusables[0];
      var lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    });

    // Restore scroll if viewport orientation changes while open
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && overlay.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  /* ─── SMOOTH ANCHOR SCROLL ──────────────────────────── */
  function setupAnchors() {
    var header = document.querySelector('.site-header');
    var offset = (header ? header.offsetHeight : 76) + 8;

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ─── INIT ──────────────────────────────────────────── */
  function init() {
    setupHeader();
    setupMobileNav();
    setupAnchors();
    setupReveal();

    if (window.performance && window.performance.timing) {
      // Entrance staged after first paint
      if (reduceMotion) {
        activateDiagram();
        window.requestAnimationFrame(function () { document.body.classList.add('started'); });
      } else {
        window.requestAnimationFrame(startEntrance);
      }
    } else {
      startEntrance();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();