'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const traditionsList = [
  {
    name: 'Islamic Names',
    href: '/names/islamic',
    count: '18,800+',
    desc: 'Quranic, Arabic & Urdu names with spiritual roots',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    border: 'border-emerald-200/60 dark:border-emerald-800/40',
    boyHref: '/islamic-boy-names',
    girlHref: '/islamic-girl-names',
  },
  {
    name: 'Christian Names',
    href: '/names/christian',
    count: '12,300+',
    desc: 'Biblical, Hebrew, Greek & modern saints',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    border: 'border-indigo-200/60 dark:border-indigo-800/40',
    boyHref: '/christian-boy-names',
    girlHref: '/christian-girl-names',
  },
  {
    name: 'Hindu Names',
    href: '/names/hindu',
    count: '10,700+',
    desc: 'Sanskrit, Vedic & regional deities with nakshatra roots',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/50',
    border: 'border-rose-200/60 dark:border-rose-800/40',
    boyHref: '/hindu-boy-names',
    girlHref: '/hindu-girl-names',
  },
  {
    name: 'Italian Names',
    href: '/names/italian',
    count: '400+',
    desc: 'Classical Roman, Tuscan & Renaissance heritage',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    border: 'border-amber-200/60 dark:border-amber-800/40',
    boyHref: '/names/italian',
    girlHref: '/names/italian',
  },
];

const exploreLinks = [
  {
    name: 'A–Z Letter Browser',
    href: '/names/islamic/letter/a',
    desc: 'Alphabetical directory across traditions',
    icon: (
      <svg className="w-5 h-5 text-nv-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M9 12h6m-4 4h2" />
      </svg>
    ),
  },
  {
    name: 'Names by Meaning',
    href: '/names-by-meaning',
    desc: 'Browse names meaning light, strength, peace',
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    name: 'Names by Origin',
    href: '/origins',
    desc: 'Arabic, Hebrew, Sanskrit, Latin & Persian',
    icon: (
      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Curated Categories',
    href: '/categories',
    desc: 'Biblical, Saint, Virtue & cultural themes',
    icon: (
      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: 'Trending Names 2026',
    href: '/trending-names',
    desc: 'Fastest rising names parents search this month',
    icon: (
      <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'Popularity Comparison',
    href: '/popularity',
    desc: 'Compare names side-by-side with metrics',
    icon: (
      <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [theme, setTheme] = useState('light');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-nv-border/80 bg-nv-surface/90 backdrop-blur-xl transition-colors">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="NameVerse home">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nv-primary via-slate-800 to-nv-accent text-white shadow-md shadow-nv-accent/15 transition-transform group-hover:scale-105">
            <span className="font-display text-xl font-bold">N</span>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-nv-text group-hover:text-nv-accent transition-colors">
              NameVerse
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-nv-text-muted sm:block">
              Cultural Anthology
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              pathname === '/'
                ? 'bg-nv-accent-subtle text-nv-accent'
                : 'text-nv-text-secondary hover:bg-nv-subtle hover:text-nv-text'
            }`}
          >
            Home
          </Link>

          {/* Traditions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('traditions')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'traditions' ? null : 'traditions')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                openDropdown === 'traditions' || pathname.startsWith('/names')
                  ? 'bg-nv-accent-subtle text-nv-accent'
                  : 'text-nv-text-secondary hover:bg-nv-subtle hover:text-nv-text'
              }`}
              aria-expanded={openDropdown === 'traditions'}
            >
              <span>Traditions</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'traditions' ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === 'traditions' && (
              <div className="absolute left-0 top-full w-[480px] rounded-2xl border border-nv-border bg-nv-surface p-4 shadow-2xl backdrop-blur-2xl transition animate-in fade-in slide-in-from-top-2">
                <div className="mb-2 flex items-center justify-between px-2 pb-2 border-b border-nv-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-nv-text-muted">
                    Sacred & Cultural Traditions
                  </span>
                  <Link href="/names" className="text-xs font-semibold text-nv-accent hover:underline">
                    All 42,000+ &rarr;
                  </Link>
                </div>
                <div className="grid gap-2.5">
                  {traditionsList.map((t) => (
                    <div
                      key={t.name}
                      className="group rounded-xl border border-transparent p-2.5 transition hover:border-nv-border hover:bg-nv-subtle/70"
                    >
                      <div className="flex items-center justify-between">
                        <Link href={t.href} className="font-display text-sm font-bold text-nv-text group-hover:text-nv-accent">
                          {t.name}
                        </Link>
                        <span className={`badge text-[11px] ${t.bg} ${t.color} font-medium`}>
                          {t.count}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-nv-text-secondary line-clamp-1">{t.desc}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] font-medium text-nv-text-muted">
                        <Link href={t.boyHref} className="hover:text-nv-accent hover:underline">
                          Boy Names &rarr;
                        </Link>
                        <span>&bull;</span>
                        <Link href={t.girlHref} className="hover:text-nv-accent hover:underline">
                          Girl Names &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explore Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('explore')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'explore' ? null : 'explore')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                openDropdown === 'explore'
                  ? 'bg-nv-accent-subtle text-nv-accent'
                  : 'text-nv-text-secondary hover:bg-nv-subtle hover:text-nv-text'
              }`}
              aria-expanded={openDropdown === 'explore'}
            >
              <span>Explore</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'explore' ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === 'explore' && (
              <div className="absolute -left-16 top-full w-[540px] rounded-2xl border border-nv-border bg-nv-surface p-4 shadow-2xl backdrop-blur-2xl transition animate-in fade-in slide-in-from-top-2">
                <div className="mb-2 px-2 pb-2 border-b border-nv-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-nv-text-muted">
                    Curated Discovery & Tools
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {exploreLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-nv-subtle/80"
                    >
                      <div className="mt-0.5 rounded-lg bg-nv-subtle p-2 group-hover:bg-nv-surface transition">
                        {item.icon}
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-nv-text group-hover:text-nv-accent transition-colors">
                          {item.name}
                        </span>
                        <span className="block text-xs text-nv-text-secondary line-clamp-1">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/trending-names"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              pathname === '/trending-names'
                ? 'bg-nv-accent-subtle text-nv-accent'
                : 'text-nv-text-secondary hover:bg-nv-subtle hover:text-nv-text'
            }`}
          >
            Trending
          </Link>

          <Link
            href="/blog"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              pathname.startsWith('/blog')
                ? 'bg-nv-accent-subtle text-nv-accent'
                : 'text-nv-text-secondary hover:bg-nv-subtle hover:text-nv-text'
            }`}
          >
            Articles
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-xl border border-nv-border bg-nv-subtle/60 px-3 py-1.5 text-xs text-nv-text-secondary transition hover:border-nv-accent/40 hover:bg-nv-subtle hover:text-nv-text"
            aria-label="Search baby names"
          >
            <svg className="h-4 w-4 text-nv-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline font-medium">Search names…</span>
            <kbd className="hidden md:inline-block rounded border border-nv-border bg-nv-surface px-1.5 py-0.5 text-[10px] font-mono text-nv-text-muted">
              /
            </kbd>
          </Link>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-nv-border bg-nv-surface text-nv-text-secondary transition hover:border-nv-accent hover:text-nv-accent"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-nv-border bg-nv-surface text-nv-text lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-nv-border bg-nv-surface px-4 py-6 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-nv-text-muted">Main Menu</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link href="/" className="rounded-xl bg-nv-subtle p-3 text-sm font-semibold text-nv-text">
                  Home
                </Link>
                <Link href="/names" className="rounded-xl bg-nv-subtle p-3 text-sm font-semibold text-nv-text">
                  All 42,000+ Names
                </Link>
                <Link href="/trending-names" className="rounded-xl bg-nv-subtle p-3 text-sm font-semibold text-nv-text">
                  Trending
                </Link>
                <Link href="/popularity" className="rounded-xl bg-nv-subtle p-3 text-sm font-semibold text-nv-text">
                  Compare Tool
                </Link>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-nv-text-muted">Traditions</span>
              <div className="mt-2 space-y-2">
                {traditionsList.map((t) => (
                  <div key={t.name} className="rounded-xl border border-nv-border p-3">
                    <div className="flex items-center justify-between">
                      <Link href={t.href} className="font-bold text-nv-text">
                        {t.name}
                      </Link>
                      <span className={`badge text-[10px] ${t.bg} ${t.color}`}>{t.count}</span>
                    </div>
                    <div className="mt-2 flex gap-3 text-xs text-nv-accent">
                      <Link href={t.boyHref} className="underline">
                        Boy Names
                      </Link>
                      <span>&bull;</span>
                      <Link href={t.girlHref} className="underline">
                        Girl Names
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-nv-text-muted">Curated Collections</span>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-medium text-nv-text-secondary">
                <Link href="/origins" className="p-2 hover:text-nv-accent">
                  Names by Origin &rarr;
                </Link>
                <Link href="/categories" className="p-2 hover:text-nv-accent">
                  Categories &rarr;
                </Link>
                <Link href="/names-by-meaning" className="p-2 hover:text-nv-accent">
                  Names by Meaning &rarr;
                </Link>
                <Link href="/unique-names" className="p-2 hover:text-nv-accent">
                  Unique Names &rarr;
                </Link>
                <Link href="/blog" className="p-2 hover:text-nv-accent">
                  Articles & Guides &rarr;
                </Link>
                <Link href="/search" className="p-2 hover:text-nv-accent">
                  Full Search &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
