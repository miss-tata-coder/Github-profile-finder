import React from 'react';
import { AlertCircle, SearchX, ShieldAlert, Sparkles } from 'lucide-react';

export function StatusMessage({
  type,
  username,
  errorMessage,
  onSelectSuggestion,
}) {
  const suggestions = ['torvalds', 'octocat', 'gaearon', 'shadcn', 'antfu'];

  if (type === 'not_found') {
    return (
      <div
        id="status-not-found"
        className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          User Not Found
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          We couldn&apos;t find any GitHub account matching{' '}
          <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
            @{username}
          </span>
          . Check the spelling or choose a featured developer below.
        </p>

        {onSelectSuggestion && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Explore Popular Profiles
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onSelectSuggestion(suggestion)}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 border border-indigo-100 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  @{suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'rate_limit') {
    return (
      <div
        id="status-rate-limit"
        className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm"
      >
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          GitHub Rate Limit Reached
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          GitHub limits unauthenticated API requests to 60 queries per hour per IP.
          Please wait a few moments before trying again.
        </p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div
        id="status-error"
        className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm"
      >
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Connection Issue
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {errorMessage || 'Unable to connect to the GitHub API. Please check your network connection and try again.'}
        </p>
      </div>
    );
  }

  // Empty initial prompt state
  return (
    <div
      id="status-empty"
      className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Search Any GitHub User
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        Enter a GitHub username in the search bar above to view their profile stats and explore their recent repositories.
      </p>

      {onSelectSuggestion && (
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Quick Suggestions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSelectSuggestion(suggestion)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-colors cursor-pointer"
              >
                @{suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
