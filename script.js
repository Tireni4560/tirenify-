// =====================================================
// TIRENIFY - Premium Cybersecurity Homepage Scripts
// =====================================================

// ─── MOBILE OVERLAY NAVIGATION ───────────────────────

const mobileToggle = document.getElementById('mobile-toggle');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileClose = document.getElementById('mobile-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileNav() {
  mobileOverlay.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      mobileOverlay.classList.add('is-open');
    });
  });
  mobileOverlay.setAttribute('aria-hidden', 'false');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileOverlay.classList.remove('is-open');
  mobileOverlay.setAttribute('aria-hidden', 'true');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!mobileOverlay.classList.contains('is-open')) {
      mobileOverlay.style.display = 'none';
    }
  }, 300);
}

if (mobileToggle && mobileOverlay) {
  mobileOverlay.style.display = 'none';

  mobileToggle.addEventListener('click', openMobileNav);

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      closeMobileNav();
    }
  });
}

// Header scroll state for frosted glass effect
const headerEl = document.querySelector('.site-header');
if (headerEl) {
  let lastScrollY = 0;
  const scrollThreshold = 60;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    headerEl.classList.toggle('scrolled', currentScrollY > scrollThreshold);
    
    lastScrollY = currentScrollY;
  }, { passive: true });
}

// Scroll reveal animation using IntersectionObserver
(function setupReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(element => revealObserver.observe(element));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 68;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();