import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TitleModal from "../components/TitleModal";
import TitleRow from "../components/TitleRow";
import { useAppData } from "../context/AppDataContext";

export default function MyListPage() {
  const { myList, removeFromMyList, addToMyList, trackWatch, history } = useAppData();
  const [selectedTitle, setSelectedTitle] = useState(null);

  const savedTitles = myList.map((item) => item.title);
  const myListIds = useMemo(() => new Set(myList.map((item) => item.titleId)), [myList]);
  const recentlyWatched = history.slice(0, 10).map((entry) => entry.title);

  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <TitleRow
          title="My List"
          items={savedTitles}
          onOpen={setSelectedTitle}
          onAdd={addToMyList}
          myListIds={myListIds}
        />
        <TitleRow
          title="Continue Watching"
          items={recentlyWatched}
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
