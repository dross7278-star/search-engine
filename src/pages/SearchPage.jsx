import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TitleModal from "../components/TitleModal";
import TitleRow from "../components/TitleRow";
import { useAppData } from "../context/AppDataContext";
import { allTitles } from "../data/catalog";

export default function SearchPage() {
  const { myList, addToMyList, removeFromMyList, trackWatch } = useAppData();
  const [query, setQuery] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);

  const myListIds = useMemo(() => new Set(myList.map((item) => item.titleId)), [myList]);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return allTitles;
    }

    const search = query.toLowerCase();
    return allTitles.filter((title) => {
      return (
        title.title.toLowerCase().includes(search) ||
        title.genre.toLowerCase().includes(search) ||
        title.description.toLowerCase().includes(search)
      );
    });
  }, [query]);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="search-shell">
        <div className="search-bar-wrap">
          <input
            type="search"
            placeholder="Search titles, genres, or stories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <TitleRow
          title={`Results (${filtered.length})`}
          items={filtered}
          onOpen={setSelectedTitle}
          onAdd={addToMyList}
          myListIds={myListIds}
        />
      </main>
      <TitleModal
        title={selectedTitle}
        onClose={() => setSelectedTitle(null)}
        onAdd={addToMyList}
        onRemove={removeFromMyList}
        inList={selectedTitle ? myListIds.has(selectedTitle.id) : false}
        onWatched={trackWatch}
      />
    </div>
  );
}
