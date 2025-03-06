const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.querySelector('.container');
const navLinks = document.querySelectorAll('nav a');

// Toggle navigation
open.addEventListener('click', () => container.classList.add('show-nav'));
close.addEventListener('click', () => {
  container.classList.remove('show-nav');
  setActiveLink('home');
});

// Handle nav link clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href').substring(1);
    showContent(target);
    container.classList.remove('show-nav');
    setActiveLink(target);
  });
});

function showContent(targetId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(targetId).classList.add('active');
}

function setActiveLink(targetId) {
  navLinks.forEach(link => {
    link.parentElement.classList.remove('active');
    if (link.getAttribute('href').substring(1) === targetId) {
      link.parentElement.classList.add('active');
    }
  });
}

// Initialize default view
showContent('home');
setActiveLink('home');