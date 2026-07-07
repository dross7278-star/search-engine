import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, hasFirebaseConfig } from "../firebase";
import { useAuth } from "./AuthContext";

const AppDataContext = createContext(null);

const ACTIVE_PROFILE_KEY = "netflix-active-profile";

function getLocalStateKey(uid) {
  return `netplix-local-data-${uid}`;
}

function readLocalState(uid) {
  const raw = localStorage.getItem(getLocalStateKey(uid));
  if (!raw) {
    return { profiles: [], myList: [], history: [] };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { profiles: [], myList: [], history: [] };
  }
}

function writeLocalState(uid, data) {
  localStorage.setItem(getLocalStateKey(uid), JSON.stringify(data));
}

export function AppDataProvider({ children }) {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(
    localStorage.getItem(ACTIVE_PROFILE_KEY) ?? ""
  );
  const [myList, setMyList] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) ?? null;
  const scopedMyList = useMemo(
    () => myList.filter((item) => item.profileId === activeProfileId),
    [myList, activeProfileId]
  );
  const scopedHistory = useMemo(
    () => history.filter((item) => item.profileId === activeProfileId),
    [history, activeProfileId]
  );

  useEffect(() => {
    localStorage.setItem(ACTIVE_PROFILE_KEY, activeProfileId);
  }, [activeProfileId]);

  useEffect(() => {
    const loadFirebaseData = async () => {
      if (!user) {
        setProfiles([]);
        setMyList([]);
        setHistory([]);
        setActiveProfileId("");
        setLoadingData(false);
        return;
      }

      setLoadingData(true);
      const profilesRef = collection(db, "users", user.uid, "profiles");
      const listRef = collection(db, "users", user.uid, "myList");
      const historyRef = collection(db, "users", user.uid, "history");

      const [profilesSnap, listSnap, historySnap] = await Promise.all([
        getDocs(profilesRef),
        getDocs(listRef),
        getDocs(historyRef),
      ]);

      const profileDocs = profilesSnap.docs.map((profileDoc) => ({
        id: profileDoc.id,
        ...profileDoc.data(),
      }));

      if (profileDocs.length === 0) {
        const defaultProfileId = crypto.randomUUID();
        await setDoc(doc(profilesRef, defaultProfileId), {
          name: "Main Profile",
          avatar: "🎬",
          createdAt: serverTimestamp(),
        });
        profileDocs.push({ id: defaultProfileId, name: "Main Profile", avatar: "🎬" });
      }

      setProfiles(profileDocs);
      if (!profileDocs.some((profile) => profile.id === activeProfileId)) {
        setActiveProfileId(profileDocs[0].id);
      }

      setMyList(listSnap.docs.map((itemDoc) => ({ id: itemDoc.id, ...itemDoc.data() })));
      setHistory(
        historySnap.docs
          .map((itemDoc) => ({ id: itemDoc.id, ...itemDoc.data() }))
          .sort((a, b) => (b.watchedAt?.seconds ?? 0) - (a.watchedAt?.seconds ?? 0))
      );

      setLoadingData(false);
    };

    const loadLocalData = () => {
      if (!user) {
        setProfiles([]);
        setMyList([]);
        setHistory([]);
        setActiveProfileId("");
        setLoadingData(false);
        return;
      }

      const data = readLocalState(user.uid);
      const profileDocs = data.profiles.length
        ? data.profiles
        : [{ id: crypto.randomUUID(), name: "Main Profile", avatar: "🎬" }];

      setProfiles(profileDocs);
      if (!profileDocs.some((profile) => profile.id === activeProfileId)) {
        setActiveProfileId(profileDocs[0].id);
      }

      setMyList(data.myList ?? []);
      setHistory(data.history ?? []);
      writeLocalState(user.uid, {
        profiles: profileDocs,
        myList: data.myList ?? [],
        history: data.history ?? [],
      });
      setLoadingData(false);
    };

    if (hasFirebaseConfig) {
      loadFirebaseData().catch(() => setLoadingData(false));
    } else {
      loadLocalData();
    }
  }, [user]);

  const createProfile = async (name, avatar) => {
    if (!user) {
      return;
    }

    if (!hasFirebaseConfig) {
      const profile = { id: crypto.randomUUID(), name, avatar };
      const nextProfiles = [...profiles, profile];
      setProfiles(nextProfiles);
      writeLocalState(user.uid, { profiles: nextProfiles, myList, history });
      return;
    }

    const profileId = crypto.randomUUID();
    const profile = { name, avatar, createdAt: serverTimestamp() };
    await setDoc(doc(db, "users", user.uid, "profiles", profileId), profile);
    setProfiles((prev) => [...prev, { id: profileId, name, avatar }]);
  };

  const switchProfile = (profileId) => {
    setActiveProfileId(profileId);
  };

  const addToMyList = async (title) => {
    if (!user) {
      return;
    }

    const existing = myList.find(
      (item) => item.titleId === title.id && item.profileId === activeProfileId
    );
    if (existing) {
      return;
    }

    if (!hasFirebaseConfig) {
      const entry = {
        id: crypto.randomUUID(),
        titleId: title.id,
        title,
        profileId: activeProfileId,
        createdAt: { seconds: Date.now() / 1000 },
      };
      const nextList = [...myList, entry];
      setMyList(nextList);
      writeLocalState(user.uid, { profiles, myList: nextList, history });
      return;
    }

    const listDoc = {
      titleId: title.id,
      title,
      profileId: activeProfileId,
      createdAt: serverTimestamp(),
    };
    const listRef = collection(db, "users", user.uid, "myList");
    const docRef = await addDoc(listRef, listDoc);
    setMyList((prev) => [...prev, { id: docRef.id, ...listDoc }]);
  };

  const removeFromMyList = async (titleId) => {
    if (!user) {
      return;
    }

    if (!hasFirebaseConfig) {
      const nextList = myList.filter(
        (item) => !(item.titleId === titleId && item.profileId === activeProfileId)
      );
      setMyList(nextList);
      writeLocalState(user.uid, { profiles, myList: nextList, history });
      return;
    }

    const listRef = collection(db, "users", user.uid, "myList");
    const listQuery = query(listRef, where("titleId", "==", titleId));
    const snap = await getDocs(listQuery);

    await Promise.all(
      snap.docs
        .filter((listDoc) => listDoc.data().profileId === activeProfileId)
        .map((listDoc) => deleteDoc(doc(db, "users", user.uid, "myList", listDoc.id)))
    );
    setMyList((prev) =>
      prev.filter((item) => !(item.titleId === titleId && item.profileId === activeProfileId))
    );
  };

  const trackWatch = async (title) => {
    if (!user) {
      return;
    }

    if (!hasFirebaseConfig) {
      const entry = {
        id: crypto.randomUUID(),
        titleId: title.id,
        profileId: activeProfileId,
        title,
        watchedAt: { seconds: Date.now() / 1000 },
      };
      const nextHistory = [entry, ...history];
      setHistory(nextHistory);
      writeLocalState(user.uid, { profiles, myList, history: nextHistory });
      return;
    }

    const entry = {
      titleId: title.id,
      profileId: activeProfileId,
      title,
      watchedAt: serverTimestamp(),
    };
    const historyRef = collection(db, "users", user.uid, "history");
    await addDoc(historyRef, entry);
    setHistory((prev) => [
      { id: crypto.randomUUID(), ...entry, watchedAt: { seconds: Date.now() / 1000 } },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({
      profiles,
      activeProfile,
      activeProfileId,
      switchProfile,
      createProfile,
      myList: scopedMyList,
      addToMyList,
      removeFromMyList,
      history: scopedHistory,
      trackWatch,
      loadingData,
      usingFirebase: hasFirebaseConfig,
    }),
    [
      profiles,
      activeProfile,
      activeProfileId,
      scopedMyList,
      scopedHistory,
      loadingData,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }
  return context;
}
