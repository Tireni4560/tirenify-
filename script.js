const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');

// Default: dark blue mode
body.classList.add('dark');
body.style.backgroundColor = '#0a0f1c';
body.style.color = '#fff';
icon.classList.remove('fa-sun');
icon.classList.add('fa-moon');

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    // Switch to light mode
    body.classList.remove('dark');
    body.style.backgroundColor = '#f9f9f9';
    body.style.color = '#000';
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    // Switch back to dark blue mode
    body.classList.add('dark');
    body.style.backgroundColor = '#0a0f1c';
    body.style.color = '#fff';
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});
