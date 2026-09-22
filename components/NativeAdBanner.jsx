'use client';

export default function NativeAdBanner({
  placement = 'top-banner',
  className = '',
  title = 'Sponsored Partner',
}) {
  const containerId = `container-${placement}-c90e1cf06dc7451f1fd3d33c703af951`;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-nv-border/70 bg-gradient-to-r from-nv-subtle/60 via-nv-surface to-nv-subtle/60 p-3 sm:p-4 shadow-sm transition-all duration-300 hover:border-nv-accent/30 ${className}`}
      data-ad-placement={placement}
      data-native-ad="true"
    >
      {/* Subtle Ad Disclosure Header */}
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-nv-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-nv-accent/70" />
          <span className="uppercase tracking-wider">{title}</span>
        </span>
        <span className="rounded bg-nv-subtle px-1.5 py-0.5 text-[10px] text-nv-text-muted border border-nv-border/40">
          Advertisement
        </span>
      </div>

      {/* Ad slot container with CLS guard */}
      <div className="relative flex min-h-[90px] w-full items-center justify-center sm:min-h-[100px] overflow-hidden rounded-xl bg-nv-surface/50">
        <div id={containerId} className="w-full max-w-[320px] sm:max-w-[728px] text-center" />
      </div>
    </div>
  );
}
