export const catalog = [
  {
    rowTitle: "Trending Now",
    items: [
      {
        id: "arcane",
        title: "Arcane",
        year: 2021,
        maturity: "TV-14",
        runtime: "2 Seasons",
        genre: "Animation",
        description:
          "Amid escalating unrest between twin cities, two sisters fight on rival sides of a war between magic technologies.",
        image:
          "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/fXmAurh012s",
      },
      {
        id: "stranger-things",
        title: "Stranger Things",
        year: 2016,
        maturity: "TV-14",
        runtime: "4 Seasons",
        genre: "Sci-Fi",
        description:
          "When a boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.",
        image:
          "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
      },
      {
        id: "dark",
        title: "Dark",
        year: 2017,
        maturity: "TV-MA",
        runtime: "3 Seasons",
        genre: "Mystery",
        description:
          "A family saga with a supernatural twist set in a German town where the disappearance of two children exposes relations among four families.",
        image:
          "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/rrwycJ08PSA",
      },
    ],
  },
  {
    rowTitle: "Because You Watched Sci-Fi",
    items: [
      {
        id: "black-mirror",
        title: "Black Mirror",
        year: 2011,
        maturity: "TV-MA",
        runtime: "6 Seasons",
        genre: "Thriller",
        description:
          "Twisted tales run wild in this mind-bending anthology series that reveals humanity's worst traits and greatest innovations.",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/jRolrhQkK78",
      },
      {
        id: "foundation",
        title: "Foundation",
        year: 2021,
        maturity: "TV-14",
        runtime: "2 Seasons",
        genre: "Epic Sci-Fi",
        description:
          "A group of exiles discover that the only way to save the Galactic Empire is to defy it.",
        image:
          "https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1476231790875-016a80c274f5?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/X4QYV5GTz7c",
      },
      {
        id: "3body",
        title: "3 Body Problem",
        year: 2024,
        maturity: "TV-MA",
        runtime: "1 Season",
        genre: "Drama",
        description:
          "Across continents and decades, brilliant minds unravel a cosmic threat that could change life on Earth forever.",
        image:
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/SdvzhCL7vIA",
      },
    ],
  },
  {
    rowTitle: "Top Picks For You",
    items: [
      {
        id: "queen-gambit",
        title: "The Queen's Gambit",
        year: 2020,
        maturity: "TV-MA",
        runtime: "Limited Series",
        genre: "Drama",
        description:
          "In a 1950s orphanage, a young girl reveals an astonishing talent for chess while struggling with addiction.",
        image:
          "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1528813860492-b7b9e1f8f7d7?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/CDrieqwSdgI",
      },
      {
        id: "money-heist",
        title: "Money Heist",
        year: 2017,
        maturity: "TV-MA",
        runtime: "5 Parts",
        genre: "Crime",
        description:
          "Eight thieves take hostages and lock themselves in the Royal Mint as a criminal mastermind manipulates the police.",
        image:
          "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1520975693410-0010f2f5c2b1?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/_InqQJRqGW4",
      },
      {
        id: "wednesday",
        title: "Wednesday",
        year: 2022,
        maturity: "TV-14",
        runtime: "1 Season",
        genre: "Fantasy",
        description:
          "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends and foes.",
        image:
          "https://images.unsplash.com/photo-1489599904732-47d5dca7f3f3?q=80&w=1600&auto=format&fit=crop",
        thumb:
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop",
        trailer: "https://www.youtube.com/embed/Di310WS8zLk",
      },
    ],
  },
];

export const allTitles = catalog.flatMap((row) => row.items);
