(() => {
  type Work = {
    title: string,
    description: string,
    link: {
      href: string,
      title: string
    },
    image: {
      src: string
      alt: string
    }
  };

  const works: Work[] = [
    {
      title: 'Music',
      description: 'Description',
      link: {
        href: './showcase/music.html',
        title: 'Music'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    },
    {
      title: 'Video / Photography',
      description: 'Description',
      link: {
        href: './showcase/video-photography.html',
        title: 'Video / photography'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    },
    {
      title: 'Writing',
      description: 'Description',
      link: {
        href: './showcase/writing.html',
        title: 'Writing'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    },
    {
      title: 'Dance',
      description: 'Description',
      link: {
        href: './showcase/dance.html',
        title: 'Dance'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    },
    {
      title: 'Art / Craft',
      description: 'Description',
      link: {
        href: './showcase/art-craft.html',
        title: 'Art / craft'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    },
    {
      title: 'Food',
      description: 'Description',
      link: {
        href: './showcase/food.html',
        title: 'Food'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    },
    {
      title: 'Technology',
      description: 'Description',
      link: {
        href: './showcase/technology.html',
        title: 'Technology'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'Alt'
      }
    }
  ];

  const carousel = (() => {
    type Elements = {
      image: HTMLImageElement
      index: HTMLDivElement
      title: HTMLHeadingElement
      description: HTMLHeadingElement
      slides: HTMLDivElement
      link: HTMLLinkElement
    };

    const elements = {
      image: document.querySelector('.Carousel > img'),
      index: document.querySelector('.Carousel > .label > .index'),
      title: document.querySelector('.Carousel > .label > .body > h1'),
      description: document.querySelector('.Carousel > .label > .body > h2'),
      slides: document.querySelector('.Carousel > .label > .body > .actions > .slides'),
      link: document.querySelector('.Carousel > .label > .body > .actions > a')
    };

    if (Object.values(elements).every(x => x)) return elements as Elements;

    const invalidElements = Object.entries(elements)
      .filter(entry => !entry[1])
      .map(([key]) => key)
      .join(', ');

    throw new Error(`Failed to initialize elements: ${invalidElements}`);
  })();

  const urlParams = new URLSearchParams(window.location.search);
  let interval = 0;

  const clampIndex = (i: number) => Math.min(Math.max(i, 0), carousel.slides.children.length - 1);

  const setSearchParams = (i: number) => {
    urlParams.set('index', `${i}`);
    const root = window.location.href.replace(/\?.*/, '');
    window.history.replaceState('', '', `${root}?${urlParams.toString()}`);
  };

  const setIndex = (i: number) => {
    carousel.index.innerText = `${i}`;
  };

  const setImage = (src: string, alt: string) => {
    carousel.image.src = src;
    carousel.image.alt = alt;
  };

  const setTitle = (title: string) => {
    carousel.title.innerText = title;
  };

  const setDescription = (description: string) => {
    carousel.description.innerText = description;
  };

  const setLink = (href: string, title: string) => {
    carousel.link.title = title;
    carousel.link.href = href;
  };

  const setButton = (i: number, x: boolean) => carousel.slides.children[i].classList.toggle('active', x);
  const getButtonActive = () => {
    for (let i = 0; i < carousel.slides.children.length; i += 1) {
      if (carousel.slides.children[i].className.includes('active')) return i;
    }

    return -1;
  };

  const setSlide = (prev: number, cur: number) => {
    const prevNormal = clampIndex(prev);
    const curNormal = clampIndex(cur);
    const work = works[curNormal];

    setButton(prevNormal, false);
    setButton(curNormal, true);
    setIndex(curNormal + 1);
    setImage(work.image.src, work.image.alt);
    setTitle(work.title);
    setDescription(work.description);
    setLink(work.link.href, work.link.title);
    setSearchParams(curNormal);
  };

  // Init
  const index = urlParams.get('index');
  if (typeof index === 'string') setSlide(0, parseInt(index, 10));

  interval = setInterval(() => {
    const prev = getButtonActive();
    let cur = prev + 1;
    if (cur > carousel.slides.children.length - 1) cur = 0;

    setSlide(prev, cur);
  }, 1000 * 30) as unknown as number;

  // Listeners
  for (let i = 0; i < carousel.slides.children.length; i += 1) {
    const child = carousel.slides.children[i];

    child.addEventListener('click', () => {
      setSlide(getButtonActive(), i);

      if (interval) clearInterval(interval);
    });
  }
})();
