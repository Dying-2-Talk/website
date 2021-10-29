const navigation = document.querySelector('.Navigation');

let isActive = window.screenY > 10;
window.addEventListener('scroll', event => {
  if (isActive !== window.scrollY > 10) {
    isActive = !!navigation?.classList.toggle('active');
  }
}, { passive: true });
