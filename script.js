// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation to cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all phase cards and value boxes for animation
document.querySelectorAll('.phase-card, .value, .mission-box, .vision-box').forEach(card => {
  observer.observe(card);
});

// Add fade-in animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 100;
  
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    
    if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '#aab6ff';
      });
      navLink.style.color = '#00e0ff';
    }
  });
});

// Add scroll animations for text elements
const textObserverOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      textObserver.unobserve(entry.target);
    }
  });
}, textObserverOptions);

// Initial style for text elements
document.querySelectorAll('.section-header, .about-content > p').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'all 0.6s ease';
  textObserver.observe(el);
});
