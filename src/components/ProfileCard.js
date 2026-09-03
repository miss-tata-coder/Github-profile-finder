import React from "react";

function ProfileCard({ user, repos }) {
  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.name}</h2>
      <p>@{user.login}</p>
      <p>{user.bio}</p>
      <p>Followers: {user.followers}</p>
      <p>Public Repos: {user.public_repos}</p>

      <h3>Recent Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileCard;

