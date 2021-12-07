(() => {
  type Work = {
    id: string
    title: string
    description: string
    link: {
      href: string
      title: string
    },
    image: {
      src: string
      alt: string
    }
  };

  const works: Work[] = [
    {
      id: 'writing',
      title: 'Writing Group',
      description: 'The writing group focused on opening conversation through the media of literature.',
      link: {
        href: './showcase/writing.html',
        title: 'Writing'
      },
      image: {
        src: './images/grave_4.jpeg',
        alt: 'A bust of Bruce Reynolds is in the middle of this arched grave in a graveyard. The words above the bust read, "BRUCE RENOYLDS 1931-2013". Below the bust reads, "1948 ANGELA 2010".'
      }
    },
    {
      id: 'photography',
      title: 'Photography Group',
      description: 'The photography group focused on opening conversation through the media of photographs.',
      link: {
        href: './showcase/photography.html',
        title: 'Photography'
      },
      image: {
        src: './images/skeleton_2.jpeg',
        alt: 'Two skeletons lay on a sandstone ground. There is a wooden bench to the right of two skeletons, and a third skeleton after the bench. To the right of all three skeletons are big ceramic pots and a ceramic bowl. They are all kept behind a glass wall.'
      }
    },
    {
      id: 'food',
      title: 'Food Group',
      description: 'The food group focused on opening conversation through the media of food and drink.',
      link: {
        href: './showcase/food.html',
        title: 'Food'
      },
      image: {
        src: './images/mummy.jpeg',
        alt: 'A mummy wrapped in various cloth is laying down on its\' back, with its\' feet furthest away from the camera. Behind the mummy is the sarcophagus/coffin made of wood. It is decorated in Ancient Egyptian hieroglyphics and paintings, with a statue of Anubis on the top.'
      }
    },
    {
      id: 'art-craft',
      title: 'Arts & Crafts Group',
      description: 'The art/craft group focused on opening conversation through the media of arts and craft.',
      link: {
        href: './showcase/art-craft.html',
        title: 'Arts & Crafts'
      },
      image: {
        src: './images/skeleton.jpeg',
        alt: 'A skeleton is lying down in a fetal position in a wider circular stone pit. To the left of the skeleton is two ceramic bowls, one ceramic jug, and a cracked ceramic bowl. Surround the skeleton by its\' feet and head are other smaller bones from animal parts.'
      }
    },
    {
      id: 'dance',
      title: 'Dance Group',
      description: 'The dance group focused on opening conversation through the media of dance and movement.',
      link: {
        href: './showcase/dance.html',
        title: 'Dance'
      },
      image: {
        src: './images/grave_6.jpeg',
        alt: 'Six rectangular cuboid shaped graves stand side by side underneath trees. Urn statues stand on top of some of the graves. There is ferns surrounding the graves.'
      }
    },
    {
      id: 'music',
      title: 'Music',
      description: 'The music group focused on opening conversation through the media of song and music.',
      link: {
        href: './showcase/music.html',
        title: 'Music'
      },
      image: {
        src: './images/grave_3.jpeg',
        alt: 'A statue of an angel lying down in a sleeping position is on top of a long rectangular grave. The grave is surrounded by other graves, with ivy growing on top of them. The graves are surrounded by tall trees.'
      }
    },
    {
      id: 'technology',
      title: 'Technology',
      description: 'The technology group focused on opening conversation through the media of technology and computers.',
      link: {
        href: './showcase/technology.html',
        title: 'Technology'
      },
      image: {
        src: './images/grave_5.jpeg',
        alt: 'A bust of Karl Marx is on top of a cuboid shaped grave. There is a black stone path to the grave, and flowers in front of the grave. There are other smaller graves behind the Marx grave and are surrounded by trees.'
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
      index: document.querySelector('.Carousel > .card > .container > .index'),
      title: document.querySelector('.Carousel > .card > .container > .body > h1'),
      description: document.querySelector('.Carousel > .card > .container > .body > h2'),
      slides: document.querySelector('.Carousel > .card > .container > .body > .actions > .slides'),
      link: document.querySelector('.Carousel > .card > .container > .body > .actions > a')
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
    urlParams.set('group', works[i].id);
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
  setSlide(0, works.findIndex(work => work.id === urlParams.get('group')));
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
