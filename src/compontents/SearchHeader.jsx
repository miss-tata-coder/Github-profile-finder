import React from 'react';
import { Search, Loader2, X, Github } from 'lucide-react';

export function SearchHeader({
  searchTerm,
  setSearchTerm,
  onSearch,
  isLoading,
  onSelectSuggestion,
}) {
  const quickPicks = ['torvalds', 'octocat', 'gaearon', 'shadcn', 'antfu'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e);
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 shrink-0 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-none">
              GitHub Profile Finder
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
              Sleek developer search &amp; repository scout
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto md:min-w-[420px] lg:min-w-[540px]">
          <form
            id="search-form"
            onSubmit={handleSubmit}
            className="relative flex items-center w-full gap-2"
          >
            <div className="relative flex-grow">
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search GitHub username..."
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                disabled={isLoading}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-100 border border-transparent rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all disabled:opacity-60"
              />
              <div className="absolute left-3.5 top-3 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>

              {searchTerm && !isLoading && (
                <button
                  id="clear-button"
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                  title="Clear input"
                  aria-label="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              id="search-button"
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-md shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Suggested Quick Links */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 pt-3 text-xs text-slate-500 flex-wrap">
        <span className="font-semibold text-slate-400 tracking-wide uppercase text-[10px]">
          Suggestions:
        </span>
        {quickPicks.map((user) => (
          <button
            key={user}
            type="button"
            onClick={() => onSelectSuggestion(user)}
            disabled={isLoading}
            className="px-2.5 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-full transition-colors font-medium text-xs cursor-pointer disabled:opacity-50"
          >
            @{user}
          </button>
        ))}
      </div>
    </header>
  );
}
