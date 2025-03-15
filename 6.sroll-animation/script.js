const boxes = document.querySelectorAll('.box');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  checkBoxes();
  toggleBackToTop();
});

function checkBoxes() {
  const triggerBottom = window.innerHeight * 0.8;
  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}

function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initial check on load
checkBoxes();
