import React from 'react';

export function LoadingSkeleton() {
  return (
    <div
      id="loading-skeleton"
      className="w-full flex flex-col lg:flex-row gap-8 animate-pulse"
      aria-busy="true"
      aria-label="Loading profile"
    >
      {/* Profile Sidebar Skeleton */}
      <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center">
          {/* Avatar Skeleton */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-200 mb-4 border-4 border-white shadow-md ring-1 ring-slate-200" />

          {/* Name & Handle */}
          <div className="h-7 bg-slate-200 rounded-md w-40 mb-2" />
          <div className="h-4 bg-indigo-100 rounded-md w-24 mb-4" />

          {/* Bio */}
          <div className="h-3.5 bg-slate-100 rounded w-full mb-2" />
          <div className="h-3.5 bg-slate-100 rounded w-4/5 mb-6" />

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 w-full pt-6 border-t border-slate-100">
            <div className="flex flex-col items-center space-y-1">
              <div className="h-6 bg-slate-200 rounded w-10" />
              <div className="h-2.5 bg-slate-100 rounded w-14" />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="h-6 bg-slate-200 rounded w-10" />
              <div className="h-2.5 bg-slate-100 rounded w-14" />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="h-6 bg-slate-200 rounded w-10" />
              <div className="h-2.5 bg-slate-100 rounded w-14" />
            </div>
          </div>

          {/* Meta details list */}
          <div className="w-full mt-6 pt-5 border-t border-slate-100 space-y-3">
            <div className="h-3 bg-slate-100 rounded w-3/4" />
            <div className="h-3 bg-slate-100 rounded w-2/3" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
          </div>
        </div>

        {/* Status card skeleton */}
        <div className="bg-indigo-950/70 p-6 rounded-3xl space-y-2">
          <div className="h-3 bg-indigo-800 rounded w-20" />
          <div className="h-4 bg-indigo-700/60 rounded w-36" />
        </div>
      </aside>

      {/* Repos Section Skeleton */}
      <section className="flex-grow space-y-4">
        <div className="flex justify-between items-end">
          <div className="h-4 bg-slate-200 rounded w-36" />
          <div className="h-4 bg-slate-200 rounded w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div className="h-5 bg-slate-200 rounded w-36" />
                <div className="h-4 bg-slate-100 rounded w-12" />
              </div>
              <div className="h-3.5 bg-slate-100 rounded w-full" />
              <div className="h-3.5 bg-slate-100 rounded w-2/3" />
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <div className="flex gap-3">
                  <div className="h-3 bg-slate-200 rounded w-14" />
                  <div className="h-3 bg-slate-200 rounded w-10" />
                </div>
                <div className="h-3 bg-slate-100 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
