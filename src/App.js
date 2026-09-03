import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    setError("");
    setUserData(null);
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUserData(data);

      const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
      const repoData = await repoRes.json();
      setRepos(repoData.slice(0, 5)); // show 5 most recent
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchUser();
  };

  return (
    <div className="App">
      <h1>GitHub Profile Finder</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchUser}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {userData && <ProfileCard user={userData} repos={repos} />}
    </div>
  );
}

export default App;
