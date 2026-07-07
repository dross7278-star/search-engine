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
import { auth, db, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const ensureUserDoc = async (firebaseUser) => {
    if (!firebaseUser) {
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
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await ensureUserDoc(credential.user);
  };

  const signIn = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await ensureUserDoc(credential.user);
  };

  const signInWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    await ensureUserDoc(credential.user);
  };

  const logout = async () => {
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
