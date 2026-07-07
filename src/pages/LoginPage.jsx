import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from ?? "/profiles";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setWorking(true);

    try {
      if (isSignup) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate(destination, { replace: true });
    } catch {
      setError("Authentication failed. Check credentials and try again.");
    } finally {
      setWorking(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setWorking(true);
    try {
      await signInWithGoogle();
      navigate(destination, { replace: true });
    } catch {
      setError("Google sign-in failed. Please retry.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>{isSignup ? "Create Account" : "Sign In"}</h1>
        <p>Stream your next obsession.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
          <button className="btn-primary" type="submit" disabled={working}>
            {working ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>
        <button className="btn-secondary" onClick={handleGoogle} disabled={working}>
          Continue With Google
        </button>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="switch-auth" onClick={() => setIsSignup((prev) => !prev)}>
          {isSignup ? "Already have an account? Sign in" : "New here? Create account"}
        </button>
      </div>
    </main>
  );
}
