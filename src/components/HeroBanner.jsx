import { useEffect, useMemo, useState } from "react";

export default function HeroBanner({ titles, onOpen, onAdd, myListIds }) {
  const headerTitles = useMemo(() => {
    if (!titles?.length) {
      return [];
    }

    if (titles.length >= 4) {
      return titles;
    }

    const extended = [...titles];
    while (extended.length < 4) {
      extended.push(titles[extended.length % titles.length]);
    }
    return extended;
  }, [titles]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (headerTitles.length <= 1 || isPaused) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % headerTitles.length);
    }, 6200);

    return () => clearInterval(timer);
  }, [headerTitles.length, isPaused]);

  useEffect(() => {
    if (activeIndex > headerTitles.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, headerTitles.length]);

  const activeTitle = headerTitles[activeIndex];

  if (!activeTitle) {
    return null;
  }

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="hero-slides" aria-hidden="true">
        {headerTitles.map((title, index) => (
          <div
            key={`${title.id}-${index}`}
            className={`hero-slide ${index === activeIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${title.image})` }}
          />
        ))}
      </div>
      <div className="hero-overlay">
        <div className="hero-copy" key={activeTitle.id}>
          <p className="hero-tag">Now Trending</p>
          <h1>{activeTitle.title}</h1>
          <p>{activeTitle.description}</p>
          <div className="hero-meta">
            <span>{activeTitle.year}</span>
            <span>{activeTitle.maturity}</span>
            <span>{activeTitle.runtime}</span>
            <span>{activeTitle.genre}</span>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onOpen(activeTitle)}>
              Play Trailer
            </button>
            <button className="btn-secondary" onClick={() => onAdd(activeTitle)}>
              {myListIds.has(activeTitle.id) ? "In My List" : "+ My List"}
            </button>
          </div>
        </div>
        <div className="hero-dots" role="tablist" aria-label="Featured titles">
          {headerTitles.map((title, index) => (
            <button
              key={`dot-${title.id}-${index}`}
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${title.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
