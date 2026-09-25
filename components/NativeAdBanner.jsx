'use client';

import { useEffect, useRef } from 'react';

export default function NativeAdBanner({
  placement = 'top-banner',
  className = '',
  title = 'Sponsored Partner',
}) {
  const containerId = `container-${placement}-c90e1cf06dc7451f1fd3d33c703af951`;
  const adRef = useRef(null);

  const adClient =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ||
    process.env.NEXT_PUBLIC_NATIVE_AD_CLIENT ||
    '';

  const adSlot =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT ||
    process.env.NEXT_PUBLIC_NATIVE_AD_SLOT ||
    '';

  useEffect(() => {
    const scriptId = 'adsbygoogle-js';
    const scriptUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

    if (!adClient || !adSlot || typeof window === 'undefined') {
      return;
    }

    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = scriptUrl;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    const pushAd = () => {
      if (!adRef.current) return;
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (error) {
        // provider may reject SSR or no-fill; keep the container ready.
      }
    };

    const timer = window.setTimeout(pushAd, 350);
    return () => window.clearTimeout(timer);
  }, [adClient, adSlot]);

  const hasConfiguredAd = Boolean(adClient && adSlot);

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-nv-border/70 bg-gradient-to-r from-nv-subtle/60 via-nv-surface to-nv-subtle/60 p-3 sm:p-4 shadow-sm transition-all duration-300 hover:border-nv-accent/30 ${className}`}
      data-ad-placement={placement}
      data-native-ad="true"
    >
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-nv-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-nv-accent/70" />
          <span className="uppercase tracking-wider">{title}</span>
        </span>
        <span className="rounded bg-nv-subtle px-1.5 py-0.5 text-[10px] text-nv-text-muted border border-nv-border/40">
          Advertisement
        </span>
      </div>

      <div className="relative flex min-h-[90px] w-full items-center justify-center sm:min-h-[100px] overflow-hidden rounded-xl bg-nv-surface/50">
        <div id={containerId} className="w-full max-w-[320px] sm:max-w-[728px] text-center">
          {hasConfiguredAd ? (
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{
                display: 'block',
                width: '100%',
                minHeight: '90px',
                textAlign: 'center',
              }}
              data-ad-client={adClient}
              data-ad-slot={adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          ) : (
            <div className="flex min-h-[90px] w-full items-center justify-center rounded-xl border border-dashed border-nv-border bg-nv-surface/40 px-4 text-center text-sm text-nv-text-muted">
              Sponsored partner slot — configure your ad provider to display native ads here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
