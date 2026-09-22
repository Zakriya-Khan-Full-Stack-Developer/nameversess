import Link from 'next/link';
import { normalizeGender } from '../lib/data/name-utils.js';

export default function NameCard({ item, showReligion = false, headingTag = 'h3' }) {
  if (!item) return null;
  const meaning = item.short_meaning || item.meaning || '';
  const genderKey = normalizeGender(item.gender);
  const isMale = genderKey === 'boy';
  const isFemale = genderKey === 'girl';
  const genderLabel = isMale ? 'Boy' : isFemale ? 'Girl' : 'Unisex';
  const religion = item.religion || '';
  const luckyNumber = item.lucky_number ?? item.luckyNumber;

  // Tradition-specific top border & badge accent
  const traditionStyles = {
    islamic: {
      bar: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40',
    },
    christian: {
      bar: 'bg-indigo-500',
      badge: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/40',
    },
    hindu: {
      bar: 'bg-rose-500',
      badge: 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40',
    },
    italian: {
      bar: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40',
    },
  };

  const style = traditionStyles[religion] || {
    bar: 'bg-nv-accent',
    badge: 'bg-nv-accent-subtle text-nv-accent',
  };

  const HeadingComponent = headingTag;

  return (
    <Link
      href={`/names/${item.religion}/${item.slug}`}
      className="card group relative flex flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-nv-accent/40 hover:shadow-card-hover"
    >
      {/* Tradition top accent bar */}
      <div className={`absolute left-0 top-0 h-1 w-full ${style.bar} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      <div className="flex items-start justify-between gap-3">
        <HeadingComponent className="font-display text-lg font-bold tracking-tight text-nv-text transition-colors group-hover:text-nv-accent">
          {item.name}
        </HeadingComponent>

        {/* Gender Badge with SVG icon */}
        <span
          className={`badge shrink-0 border text-[11px] font-semibold ${
            isMale
              ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/50 dark:bg-sky-950/50 dark:text-sky-300'
              : isFemale
              ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/50 dark:bg-rose-950/50 dark:text-rose-300'
              : 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800/50 dark:bg-purple-950/50 dark:text-purple-300'
          }`}
        >
          {isMale ? (
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 2.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V4.56l-3.22 3.22a6.5 6.5 0 1 1-1.06-1.06l3.22-3.22h-2.19a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .5.5zm-5 6.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
            </svg>
          ) : isFemale ? (
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.5a6.5 6.5 0 0 1 6.5 6.5c0 3.25-2.38 5.94-5.5 6.42v2.08h2.25a.75.75 0 0 1 0 1.5H13v2.25a.75.75 0 0 1-1.5 0V19h-2.25a.75.75 0 0 1 0-1.5H11.5v-2.08C8.38 14.94 6 12.25 6 9a6.5 6.5 0 0 1 6.5-6.5zm0 1.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
            </svg>
          ) : null}
          {genderLabel}
        </span>
      </div>

      {meaning && (
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-nv-text-secondary">
          {meaning}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
        {showReligion && religion && (
          <span className={`badge border text-[10px] uppercase tracking-wide ${style.badge}`}>
            {religion}
          </span>
        )}
        {item.origin && (
          <span className="badge border border-nv-border bg-nv-subtle/80 text-[11px] text-nv-text-secondary">
            {item.origin}
          </span>
        )}
        {luckyNumber !== undefined && luckyNumber !== null && (
          <span className="badge border border-amber-200/70 bg-amber-50/80 text-[11px] font-semibold text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/40 dark:text-amber-300">
            ★ {luckyNumber}
          </span>
        )}
        <span className="ml-auto text-xs font-semibold text-nv-accent opacity-0 transition-opacity group-hover:opacity-100">
          &rarr;
        </span>
      </div>
    </Link>
  );
}
