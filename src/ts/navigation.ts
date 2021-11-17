// Background
const navigation = document.querySelector('.Navigation');
if (navigation) {
  let isActive = window.screenY > 10;
  if (isActive) navigation.classList.add('active');

  let scrollListener: number;
  window.addEventListener('scroll', () => {
    if (scrollListener) cancelAnimationFrame(scrollListener);
    scrollListener = requestAnimationFrame(() => {
      if (isActive !== window.scrollY > 10) {
        isActive = !!navigation.classList.toggle('active');
      }
    });
  }, { passive: true });
}

// Mobile nav
const menuButton = navigation?.querySelector('nav > button');
const menuList = navigation?.querySelector('nav > ul');
if (menuButton && menuList) {
  let open = false;

  let resizeListener: number;
  window.addEventListener('resize', () => {
    if (resizeListener) cancelAnimationFrame(resizeListener);
    resizeListener = requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        menuButton.classList.remove('active');
        menuList.classList.remove('open');
      }
    });
  }, { passive: true });

  let clickListener: number;
  menuButton.addEventListener('click', () => {
    if (clickListener) cancelAnimationFrame(clickListener);
    clickListener = requestAnimationFrame(() => {
      open = !open;
      menuButton.classList.toggle('active');
      menuList.classList.toggle('open');
    });
  }, { passive: true });
}
