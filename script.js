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

  /* ─── SITE CONFIG ───────────────────────────────────── */
  var CONFIG = window.TIRENIFY_CONFIG || {};
  var FORM_ENDPOINT = String(CONFIG.FORM_ENDPOINT || '').trim();

  /* ─── FAQ (rendered from faq-data.js) ───────────────── */
  function renderFaq() {
    var data = window.TIRENIFY_FAQ;
    if (!data || !data.items || !data.items.length) return;

    document.querySelectorAll('[data-faq]').forEach(function (host) {
      var isShort = host.getAttribute('data-faq') === 'short';
      var items = isShort
        ? data.items.filter(function (item) { return item.short; })
        : data.items;
      var frag = document.createDocumentFragment();

      items.forEach(function (item) {
        var details = document.createElement('details');
        details.className = 'faq-item';

        var summary = document.createElement('summary');
        var q = document.createElement('span');
        q.className = 'faq-q';
        q.textContent = item.q;
        var icon = document.createElement('span');
        icon.className = 'faq-icon';
        icon.setAttribute('aria-hidden', 'true');
        summary.appendChild(q);
        summary.appendChild(icon);
        details.appendChild(summary);

        var answer = document.createElement('div');
        answer.className = 'faq-a';
        var p = document.createElement('p');
        p.textContent = item.a;
        answer.appendChild(p);
        if (item.link && item.link.href) {
          var link = document.createElement('a');
          link.className = 'text-link';
          link.href = item.link.href;
          link.textContent = item.link.text || 'Read more';
          answer.appendChild(link);
        }
        details.appendChild(answer);
        frag.appendChild(details);
      });

      host.innerHTML = '';
      host.appendChild(frag);
    });
  }

  /* ─── BREACH DATA SOURCE NOTE (only when configured) ── */
  function setupSourceNote() {
    var note = String(CONFIG.BREACH_DATA_SOURCE_NOTE || '').trim();
    document.querySelectorAll('[data-source-note]').forEach(function (el) {
      var target = el.querySelector('[data-source-note-text]') || el;
      if (!note) {
        el.hidden = true;
        return;
      }
      target.textContent = note;
      el.hidden = false;
    });
  }

  /* ─── FORMS (contact + "what we build next") ────────── */
  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function setupForms() {
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      var openedAt = Date.now();
      var message = form.parentNode.querySelector('[data-form-message]');
      var submit = form.querySelector('[type="submit"]');
      var honeypot = form.querySelector('[data-honeypot]');
      var successText = form.getAttribute('data-success-message') || 'Thanks. We\u2019ve got your message.';
      var errorText = form.getAttribute('data-error-message') ||
        'Sorry \u2014 that didn\u2019t send. Please email support@tirenify.app and we\u2019ll pick it up from there.';
      var minSeconds = parseInt(form.getAttribute('data-min-seconds') || '0', 10);

      function setMessage(text, state) {
        if (!message) return;
        message.textContent = text || '';
        message.classList.remove('is-success', 'is-error');
        if (state) message.classList.add('is-' + state);
        if (text) {
          // Announce, and keep the keyboard in a sensible place when a form hides
          message.setAttribute('tabindex', '-1');
          message.focus();
        }
      }

      function errorIdFor(control, error) {
        if (!error.id) error.id = (control.id || 'field') + '-error';
        return error.id;
      }

      function setFieldError(control, text) {
        var field = control.closest ? control.closest('.form-field') : null;
        var error = field ? field.querySelector('.field-error') : null;
        if (text) {
          control.setAttribute('aria-invalid', 'true');
          if (error) {
            error.textContent = text;
            var id = errorIdFor(control, error);
            var described = (control.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
            if (described.indexOf(id) === -1) {
              described.push(id);
              control.setAttribute('aria-describedby', described.join(' '));
            }
          }
        } else {
          control.removeAttribute('aria-invalid');
          if (error) {
            error.textContent = '';
            if (error.id) {
              var rest = (control.getAttribute('aria-describedby') || '')
                .split(/\s+/)
                .filter(function (token) { return token && token !== error.id; });
              if (rest.length) control.setAttribute('aria-describedby', rest.join(' '));
              else control.removeAttribute('aria-describedby');
            }
          }
        }
      }

      function validate() {
        var firstInvalid = null;
        form.querySelectorAll('[data-validate]').forEach(function (control) {
          var rules = control.getAttribute('data-validate') || '';
          var value = String(control.value || '').trim();
          var error = '';

          if (rules.indexOf('required') > -1 && !value) {
            error = control.getAttribute('data-required-message') || 'This field is required.';
          } else if (value && rules.indexOf('email') > -1 && !isEmail(value)) {
            error = 'Enter a valid email address, like you@example.com';
          }
          setFieldError(control, error);
          if (error && !firstInvalid) firstInvalid = control;
        });
        return firstInvalid;
      }

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        setMessage('', null);

        // Bot signals: filled honeypot, or submitted faster than a person could type
        if (honeypot && String(honeypot.value || '').length) return;
        if (minSeconds && Date.now() - openedAt < minSeconds * 1000) {
          form.hidden = true;
          setMessage(successText, 'success');
          return;
        }

        var firstInvalid = validate();
        if (firstInvalid) {
          setMessage('Please check the highlighted fields and try again.', 'error');
          firstInvalid.focus();
          return;
        }

        if (!FORM_ENDPOINT) {
          // No handler connected yet (see site-config.js). Never fail silently.
          setMessage(errorText, 'error');
          return;
        }

        var payload = {};
        new FormData(form).forEach(function (value, key) {
          if (honeypot && key === honeypot.name) return;
          payload[key] = value;
        });

        if (submit) submit.disabled = true;

        window.fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (response) {
          if (!response.ok) throw new Error('Form endpoint returned ' + response.status);
          form.reset();
          form.hidden = true;
          setMessage(successText, 'success');
        }).catch(function () {
          setMessage(errorText, 'error');
        }).then(function () {
          if (submit) submit.disabled = false;
        });
      });

      // Clear a field's error as soon as the visitor starts fixing it
      form.addEventListener('input', function (event) {
        var control = event.target;
        if (control && control.getAttribute && control.getAttribute('aria-invalid') === 'true') {
          setFieldError(control, '');
        }
      });
    });
  }

/* ─── INIT ──────────────────────────────────────────── */
  function init() {
    setupHeader();
    setupMobileNav();
    setupAnchors();
    setupReveal();
    renderFaq();
    setupSourceNote();
    setupForms();

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