export default function TitleModal({ title, onClose, onAdd, onRemove, inList, onWatched }) {
  if (!title) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div className="video-wrap">
          <iframe
            src={title.trailer}
            title={`${title.title} trailer`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="modal-body">
          <h2>{title.title}</h2>
          <p>{title.description}</p>
          <div className="hero-meta">
            <span>{title.year}</span>
            <span>{title.maturity}</span>
            <span>{title.runtime}</span>
            <span>{title.genre}</span>
          </div>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => {
                onWatched(title);
              }}
            >
              Mark As Watched
            </button>
            {inList ? (
              <button className="btn-secondary" onClick={() => onRemove(title.id)}>
                Remove From List
              </button>
            ) : (
              <button className="btn-secondary" onClick={() => onAdd(title)}>
                Add To My List
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
