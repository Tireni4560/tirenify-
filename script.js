// =====================================================
// TIRENIFY - Premium Cybersecurity Homepage Scripts
// =====================================================

// Mobile navigation toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('site-navigation');

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mobileToggle.classList.toggle('open');
    nav.classList.toggle('open');
    
    // Prevent body scroll when nav is open
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking nav links
  const navLinks = Array.from(nav.querySelectorAll('a'));
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open')) {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
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