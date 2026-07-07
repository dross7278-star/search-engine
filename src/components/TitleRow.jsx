export default function TitleRow({ title, items, onOpen, onAdd, myListIds }) {
  return (
    <section className="title-row">
      <h2>{title}</h2>
      <div className="row-grid">
        {items.map((item) => (
          <article className="tile" key={item.id}>
            <img src={item.thumb} alt={item.title} loading="lazy" />
            <div className="tile-content">
              <h3>{item.title}</h3>
              <p>{item.genre}</p>
              <div className="tile-actions">
                <button onClick={() => onOpen(item)}>Details</button>
                <button onClick={() => onAdd(item)}>
                  {myListIds.has(item.id) ? "Saved" : "+ List"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
