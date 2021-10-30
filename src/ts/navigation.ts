const navigation = document.querySelector('.Navigation');

let isActive = window.screenY > 10;

if (isActive) navigation?.classList.add('active');
window.addEventListener('scroll', () => {
  if (isActive !== window.scrollY > 10) {
    isActive = !!navigation?.classList.toggle('active');
  }
}, { passive: true });
