import { useMemo, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";
import TitleModal from "../components/TitleModal";
import TitleRow from "../components/TitleRow";
import { useAppData } from "../context/AppDataContext";
import { allTitles, catalog } from "../data/catalog";

export default function BrowsePage() {
  const { myList, addToMyList, removeFromMyList, trackWatch } = useAppData();
  const [selectedTitle, setSelectedTitle] = useState(null);

  const heroTitles = allTitles.slice(0, 5);
  const myListIds = useMemo(() => new Set(myList.map((item) => item.titleId)), [myList]);

  return (
    <div className="page-shell">
      <Navbar />
      <HeroBanner
        titles={heroTitles}
        onOpen={setSelectedTitle}
        onAdd={addToMyList}
        myListIds={myListIds}
      />
      <main>
        {catalog.map((row) => (
          <TitleRow
            key={row.rowTitle}
            title={row.rowTitle}
            items={row.items}
            onOpen={setSelectedTitle}
            onAdd={addToMyList}
            myListIds={myListIds}
          />
        ))}
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
