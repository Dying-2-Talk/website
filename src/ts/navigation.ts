(() => {
  const listeners: Record<string, number> = {
    scroll: 0,
    resize: 0
  };

  const navigation = (() => {
    type Elements = {
      root: HTMLDivElement,
      button: HTMLButtonElement,
      list: HTMLUListElement
    };

    const elements = {
      root: document.querySelector('.Navigation'),
      button: document.querySelector('.Navigation > nav > button'),
      list: document.querySelector('.Navigation > nav > ul')
    };

    if (Object.values(elements).every(x => x)) return elements as Elements;

    const invalidElements = Object.entries(elements)
      .filter(entry => !entry[1])
      .map(([key]) => key)
      .join(', ');

    throw new Error(`Failed to initialize elements: ${invalidElements}`);
  })();

  const showBackground = () => window.scrollY > 24;
  const setBackground = (x?: boolean) => navigation.root.classList.toggle('active', x);
  const setMenu = (x?: boolean) => {
    const buttonState = navigation.button.classList.toggle('active', x);
    const listState = navigation.list.classList.toggle('open', x);

    return buttonState && listState;
  };

  // Init
  if (showBackground()) setBackground(true);

  // Listeners
  window.addEventListener('scroll', () => {
    if (listeners.scroll) cancelAnimationFrame(listeners.scroll);
    listeners.scroll = requestAnimationFrame(() => setBackground(showBackground()));
  });

  window.addEventListener('resize', () => {
    if (listeners.resize) cancelAnimationFrame(listeners.resize);
    listeners.resize = requestAnimationFrame(() => window.innerWidth > 768 && setMenu(false));
  });

  navigation.button.addEventListener('click', () => {
    setMenu();
  });
})();
