import React, { useState, useEffect, useCallback } from 'react';
import { SearchHeader } from './components/SearchHeader.jsx';
import { UserProfileCard } from './components/UserProfileCard.jsx';
import { RepoList } from './components/RepoList.jsx';
import { LoadingSkeleton } from './components/LoadingSkeleton.jsx';
import { StatusMessage } from './components/StatusMessage.jsx';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUsername, setSearchedUsername] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReposLoading, setIsReposLoading] = useState(false);
  const [statusType, setStatusType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserData = useCallback(async (username) => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setIsReposLoading(true);
    setStatusType(null);
    setErrorMessage('');
    setSearchedUsername(trimmed);
    setActiveUser(null);
    setRepos([]);

    try {
      // 1. Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(trimmed)}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (userRes.status === 404) {
        setStatusType('not_found');
        setIsLoading(false);
        setIsReposLoading(false);
        return;
      }

      if (userRes.status === 403) {
        setStatusType('rate_limit');
        setIsLoading(false);
        setIsReposLoading(false);
        return;
      }

      if (!userRes.ok) {
        throw new Error(`GitHub API error: ${userRes.statusText} (${userRes.status})`);
      }

      const userData = await userRes.json();
      setActiveUser(userData);
      setIsLoading(false);

      // 2. Fetch user's most recent repositories
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${encodeURIComponent(trimmed)}/repos?sort=updated&per_page=6`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(Array.isArray(reposData) ? reposData : []);
        } else {
          setRepos([]);
        }
      } catch (err) {
        console.error('Failed to fetch repositories:', err);
        setRepos([]);
      } finally {
        setIsReposLoading(false);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setStatusType('error');
      setErrorMessage(err.message || 'An unexpected error occurred while contacting GitHub.');
      setIsLoading(false);
      setIsReposLoading(false);
    }
  }, []);

  // Initial load with default example user
  useEffect(() => {
    fetchUserData('torvalds');
  }, [fetchUserData]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      fetchUserData(searchTerm);
    }
  };

  const handleSelectSuggestion = (username) => {
    setSearchTerm(username);
    fetchUserData(username);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Sleek top header bar with search */}
      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        isLoading={isLoading}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {/* Main dashboard body */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl w-full mx-auto flex flex-col">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && statusType && (
          <div className="w-full py-6">
            <StatusMessage
              type={statusType}
              username={searchedUsername}
              errorMessage={errorMessage}
              onSelectSuggestion={handleSelectSuggestion}
            />
          </div>
        )}

        {!isLoading && !statusType && activeUser && (
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            {/* Left Sidebar / Profile Card */}
            <aside className="w-full lg:w-[320px] shrink-0">
              <UserProfileCard user={activeUser} />
            </aside>

            {/* Right Section / Recent Repositories */}
            <div className="flex-grow w-full min-w-0">
              <RepoList
                repos={repos}
                isLoading={isReposLoading}
                repoCount={activeUser.public_repos}
              />
            </div>
          </div>
        )}
      </main>

      {/* Sleek Minimal Footer */}
      <footer className="mt-auto py-4 text-center border-t border-slate-200">
        <p className="text-xs text-slate-400">
          Enter a username to view live data. Powered by GitHub REST API.
        </p>
      </footer>
    </div>
  );
}
