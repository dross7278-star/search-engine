import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, hasFirebaseConfig } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      const raw = localStorage.getItem("netplix-demo-user");
      setUser(raw ? JSON.parse(raw) : null);
      setLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const ensureUserDoc = async (firebaseUser) => {
    if (!firebaseUser || !db) {
      return;
    }

    await setDoc(
      doc(db, "users", firebaseUser.uid),
      {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const signUp = async (email, password) => {
    if (!hasFirebaseConfig) {
      const demoUser = { uid: crypto.randomUUID(), email };
      localStorage.setItem("netplix-demo-user", JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await ensureUserDoc(credential.user);
  };

  const signIn = async (email, password) => {
    if (!hasFirebaseConfig) {
      const demoUser = { uid: crypto.randomUUID(), email };
      localStorage.setItem("netplix-demo-user", JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    await ensureUserDoc(credential.user);
  };

  const signInWithGoogle = async () => {
    if (!hasFirebaseConfig) {
      const demoUser = { uid: crypto.randomUUID(), email: "demo@netplix.app" };
      localStorage.setItem("netplix-demo-user", JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }

    const credential = await signInWithPopup(auth, googleProvider);
    await ensureUserDoc(credential.user);
  };

  const logout = async () => {
    if (!hasFirebaseConfig) {
      localStorage.removeItem("netplix-demo-user");
      setUser(null);
      return;
    }

    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, loading, signUp, signIn, signInWithGoogle, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
