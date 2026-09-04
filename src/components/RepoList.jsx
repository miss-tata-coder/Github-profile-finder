import React from 'react';
import { Star, GitFork, ExternalLink, BookMarked, Clock } from 'lucide-react';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  R: '#198CE7',
  Zig: '#ec915c',
};

export function RepoList({ repos, isLoading, repoCount }) {
  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="h-5 bg-slate-200 rounded w-40 animate-pulse" />
          <div className="h-5 bg-slate-200 rounded w-28 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 animate-pulse">
              <div className="h-5 bg-slate-200 rounded w-36" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="flex gap-4 pt-2">
                <div className="h-3 bg-slate-200 rounded w-16" />
                <div className="h-3 bg-slate-200 rounded w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <section id="repos-section" className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center shadow-xs">
        <BookMarked className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h3 className="text-base font-semibold text-slate-800">No public repositories found</h3>
        <p className="text-xs text-slate-500 mt-1">This user currently has no public code repositories.</p>
      </section>
    );
  }

  return (
    <section id="repos-section" className="space-y-4">
      {/* Sleek section header */}
      <div className="flex justify-between items-end">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
          Recent Repositories
        </h3>
        <span className="text-xs text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-full font-medium">
          Showing {repos.length} of {repoCount}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => {
          const formattedUpdated = new Date(repo.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#6e7681') : null;

          return (
            <article
              key={repo.id}
              id={`repo-${repo.id}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all group shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-start gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 break-all"
                  >
                    <span>{repo.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase shrink-0">
                    {repo.fork ? 'Fork' : 'Public'}
                  </span>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {repo.description || <span className="italic text-slate-400">No description provided</span>}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100 text-xs text-slate-400">
                <div className="flex items-center gap-3 flex-wrap">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 font-medium text-slate-600">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: langColor || '#6e7681' }}
                      />
                      {repo.language}
                    </span>
                  )}

                  <span className="flex items-center gap-1 font-medium" title="Stars">
                    <Star className="w-3.5 h-3.5 text-slate-400" />
                    <span>{Number(repo.stargazers_count || 0).toLocaleString()}</span>
                  </span>

                  <span className="flex items-center gap-1 font-medium" title="Forks">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    <span>{Number(repo.forks_count || 0).toLocaleString()}</span>
                  </span>
                </div>

                <span className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0 font-normal">
                  <Clock className="w-3 h-3" />
                  <span>{formattedUpdated}</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
