// Background
const navigation = document.querySelector('.Navigation');
if (navigation) {
  let isActive = window.screenY > 10;
  if (isActive) navigation.classList.add('active');
  window.addEventListener('scroll', () => {
    if (isActive !== window.scrollY > 10) {
      isActive = !!navigation.classList.toggle('active');
    }
  }, { passive: true });
}

// Mobile nav
const menuButton = navigation?.querySelector('nav > button');
const menuList = navigation?.querySelector('nav > ul');
if (menuButton && menuList) {
  let open = false;

  menuButton.addEventListener('click', () => {
    open = !open;
    menuButton.classList.toggle('active');
    menuList.classList.toggle('open');
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuButton.classList.remove('active');
      menuList.classList.remove('open');
    }
  }, { passive: true });
}
