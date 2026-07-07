import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";

const avatarOptions = ["A", "B", "C", "D", "E", "F"];

export default function ProfilesPage() {
  const { profiles, switchProfile, createProfile } = useAppData();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(avatarOptions[0]);

  const canCreate = useMemo(() => name.trim().length > 1, [name]);

  const handleSelect = (profileId) => {
    switchProfile(profileId);
    navigate("/");
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!canCreate) {
      return;
    }

    await createProfile(name.trim(), avatar);
    setName("");
  };

  return (
    <main className="profiles-shell">
      <h1>Who&apos;s watching?</h1>
      <section className="profiles-grid">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            className="profile-card"
            onClick={() => handleSelect(profile.id)}
          >
            <span>{profile.avatar}</span>
            <strong>{profile.name}</strong>
          </button>
        ))}
      </section>
      <form className="new-profile" onSubmit={handleCreate}>
        <h2>Add Profile</h2>
        <input
          type="text"
          placeholder="Profile name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <select value={avatar} onChange={(event) => setAvatar(event.target.value)}>
          {avatarOptions.map((option) => (
            <option value={option} key={option}>
              Avatar {option}
            </option>
          ))}
        </select>
        <button className="btn-primary" type="submit" disabled={!canCreate}>
          Add Profile
        </button>
      </form>
    </main>
  );
}
