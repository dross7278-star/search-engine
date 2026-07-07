export default function HeroBanner({ title, onOpen, onAdd, inList }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${title.image})` }}>
      <div className="hero-overlay">
        <p className="hero-tag">Now Trending</p>
        <h1>{title.title}</h1>
        <p>{title.description}</p>
        <div className="hero-meta">
          <span>{title.year}</span>
          <span>{title.maturity}</span>
          <span>{title.runtime}</span>
          <span>{title.genre}</span>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => onOpen(title)}>
            Play Trailer
          </button>
          <button className="btn-secondary" onClick={() => onAdd(title)}>
            {inList ? "In My List" : "+ My List"}
          </button>
        </div>
      </div>
    </section>
  );
}
