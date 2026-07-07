import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppData } from "../context/AppDataContext";

export default function Navbar() {
  const { logout } = useAuth();
  const { activeProfile } = useAppData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="top-nav">
      <Link to="/" className="logo">
        NETPLIX
      </Link>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/my-list">My List</NavLink>
        <NavLink to="/profiles">Profiles</NavLink>
      </nav>
      <div className="profile-chip">
        <span>{activeProfile?.avatar ?? "N"}</span>
        <strong>{activeProfile?.name ?? "Profile"}</strong>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </header>
  );
}
