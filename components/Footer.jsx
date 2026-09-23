import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  const traditions = [
    { name: 'Islamic Baby Names', href: '/names/islamic' },
    { name: 'Islamic Boy Names', href: '/islamic-boy-names' },
    { name: 'Islamic Girl Names', href: '/islamic-girl-names' },
    { name: 'Christian Baby Names', href: '/names/christian' },
    { name: 'Christian Boy Names', href: '/christian-boy-names' },
    { name: 'Christian Girl Names', href: '/christian-girl-names' },
    { name: 'Hindu Baby Names', href: '/names/hindu' },
    { name: 'Hindu Boy Names', href: '/hindu-boy-names' },
    { name: 'Hindu Girl Names', href: '/hindu-girl-names' },
    { name: 'Italian Baby Names', href: '/names/italian' },
  ];

  const discovery = [
    { name: 'Browse All 42,000+ Names', href: '/names' },
    { name: 'Names by Origin', href: '/origins' },
    { name: 'Names by Meaning', href: '/names-by-meaning' },
    { name: 'Curated Categories', href: '/categories' },
    { name: 'Trending Names 2026', href: '/trending-names' },
    { name: 'Unique & Rare Names', href: '/unique-names' },
    { name: 'A–Z Letter Browser', href: '/names/islamic/letter/a' },
  ];

  const toolsAndEditorial = [
    { name: 'Compare Name Popularity', href: '/popularity' },
    { name: 'Instant Name Search', href: '/search' },
    { name: 'Expert Naming Guide', href: '/guides/expert-naming-guide' },
    { name: 'Baby Naming Articles', href: '/blog' },
    { name: 'Sitemap Index', href: '/sitemap.xml' },
  ];

  const company = [
    { name: 'About NameVerse', href: '/about' },
    { name: 'Contact Editorial Team', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="mt-20 border-t border-nv-border/80 bg-nv-surface transition-colors">
      {/* Top Value Banner */}
      <div className="border-b border-nv-border/60 bg-nv-subtle/40 py-8">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <span className="eyebrow mb-1">Authentic & Verified</span>
            <h3 className="font-display text-lg font-bold text-nv-text">
              The World's Most Comprehensive Cultural Name Anthology
            </h3>
            <p className="mt-1 text-xs text-nv-text-secondary">
              Over 42,000 baby names documented with etymological roots, original alphabetic scripts, verified numerology, and cultural context.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/search" className="btn-primary !min-h-[42px] !px-5 !text-xs">
              Explore Name Database &rarr;
            </Link>
            <Link href="/popularity" className="btn-ghost !min-h-[42px] !px-4 !text-xs">
              Compare Names
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Manifesto */}
          <div className="flex flex-col gap-4 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-3" aria-label="NameVerse home">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nv-primary via-slate-800 to-nv-accent text-white shadow-md font-display text-xl font-bold">
                N
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-nv-text">
                NameVerse
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-nv-text-secondary">
              NameVerse is dedicated to helping parents worldwide discover baby names of profound spiritual and cultural significance across Islamic, Hindu, Christian, and Italian heritages.
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>42,310 names indexed with zero soft-404s</span>
            </div>

            <div className="mt-2 rounded-2xl border border-nv-border/80 bg-nv-surface/60 p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-nv-text-muted">Contact</p>
              <div className="mt-2 flex flex-col gap-2 text-sm">
                <p className="font-semibold text-nv-text">Zakriya Khan</p>
                <a href="tel:+923497174815" className="text-nv-accent transition hover:text-nv-accent/80">
                  0349 7174 815
                </a>
                <a
                  href="https://wa.me/923497174815?text=Hi%20Zakriya%20Khan%2C%20I%20found%20your%20site%20and%20want%20to%20connect."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Traditions */}
          <nav aria-label="Traditions and Gender Collections">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-nv-text">Traditions</h4>
            <ul className="space-y-2 text-xs">
              {traditions.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-nv-text-secondary hover:text-nv-accent transition font-medium">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Curated Discovery */}
          <nav aria-label="Discovery & Meaning">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-nv-text">Discovery</h4>
            <ul className="space-y-2 text-xs">
              {discovery.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-nv-text-secondary hover:text-nv-accent transition font-medium">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tools & Company */}
          <nav aria-label="Tools and Company">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-nv-text">Tools & Guides</h4>
            <ul className="space-y-2 text-xs">
              {toolsAndEditorial.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-nv-text-secondary hover:text-nv-accent transition font-medium">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 mb-3 text-xs font-bold uppercase tracking-wider text-nv-text">Company</h4>
            <ul className="space-y-2 text-xs">
              {company.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-nv-text-secondary hover:text-nv-accent transition font-medium">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-nv-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-nv-text-muted">
          <p>&copy; {year} NameVerse. Handcrafted for families worldwide. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-nv-accent transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-nv-accent transition">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-nv-accent transition">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:text-nv-accent transition">
              XML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
