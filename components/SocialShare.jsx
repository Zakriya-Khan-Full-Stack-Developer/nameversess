'use client';

import { useState } from 'react';

export default function SocialShare({ title = 'Check this out on NameVerse', url }) {
  const [copied, setCopied] = useState(false);

  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://nameverse.site');
  const shareUrl = encodeURIComponent(targetUrl);
  const shareText = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(targetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share options">
      <span className="text-xs font-bold uppercase tracking-wider text-nv-text-muted mr-1">Share:</span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="relative inline-flex h-9 items-center gap-1.5 rounded-xl border border-nv-border bg-nv-surface px-3 text-xs font-semibold text-nv-text-secondary transition hover:border-nv-accent hover:text-nv-accent"
        aria-label="Copy link to clipboard"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-nv-text px-2 py-0.5 text-[10px] font-bold text-nv-page shadow">
            Link copied!
          </span>
        )}
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-nv-border bg-nv-surface text-nv-text-secondary transition hover:border-emerald-500 hover:text-emerald-500"
        aria-label="Share on WhatsApp"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413A11.815 11.815 0 0 0 12.05 0zm.003 21.677a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.001 5.45-4.437 9.884-9.885 9.884z" />
        </svg>
      </a>

      {/* X (Twitter) */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-nv-border bg-nv-surface text-nv-text-secondary transition hover:border-nv-accent hover:text-nv-accent"
        aria-label="Share on X"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-nv-border bg-nv-surface text-nv-text-secondary transition hover:border-blue-600 hover:text-blue-600"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      </a>
    </div>
  );
}
