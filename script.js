const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('site-navigation');
const checkerForm = document.getElementById('checker-form');

mobileToggle?.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
  mobileToggle.classList.toggle('open');
  document.querySelector('.header-actions')?.classList.toggle('open');
});

checkerForm?.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('email-input');
  if (!input) return;
  const email = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    input.setCustomValidity('Please enter a valid email address.');
    input.reportValidity();
    return;
  }

  const targetUrl = `https://tirenify-v0-production.up.railway.app/?email=${encodeURIComponent(email)}`;
  window.location.href = targetUrl;
});

const navLinks = Array.from(nav.querySelectorAll('a'));
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
