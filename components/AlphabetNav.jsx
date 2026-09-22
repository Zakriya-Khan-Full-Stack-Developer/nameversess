import Link from 'next/link';

export default function AlphabetNav({ religion, currentLetter = '', availableLetters = [] }) {
  const letters = [...'abcdefghijklmnopqrstuvwxyz', '#'];
  const availSet = availableLetters instanceof Set ? availableLetters : new Set(availableLetters);

  return (
    <nav aria-label="Browse by letter" className="rounded-2xl border border-nv-border bg-nv-surface/80 p-4 shadow-sm backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold text-nv-text-muted">
        <span className="uppercase tracking-wider">Browse by Initial Letter</span>
        <span>A – Z Alphabetical Index</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {letters.map((l) => {
          const available = availSet.has(l);
          const active = currentLetter.toLowerCase() === l;
          const letterUrl = `/names/${religion}/letter/${l === '#' ? '%23' : l}`;
          return available ? (
            <Link
              key={l}
              href={letterUrl}
              aria-current={active ? 'page' : undefined}
              className={`grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl text-sm font-bold uppercase transition-all duration-200 ${
                active
                  ? 'bg-nv-accent text-white shadow-md shadow-nv-accent/30 scale-105 ring-2 ring-nv-accent/40'
                  : 'border border-nv-border/70 bg-nv-subtle/50 text-nv-text hover:border-nv-accent/50 hover:bg-nv-surface hover:text-nv-accent hover:scale-105'
              }`}
            >
              {l}
            </Link>
          ) : (
            <span
              key={l}
              className="grid h-10 w-10 sm:h-11 sm:w-11 cursor-not-allowed place-items-center rounded-xl text-xs font-bold uppercase text-nv-text-muted opacity-30"
            >
              {l}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
