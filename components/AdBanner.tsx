'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX';
  const slotId = dataAdSlot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || '1234567890';
  const isPlaceholder = !clientId || clientId === 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    if (isPlaceholder) return;

    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn('Google AdSense error loading ad unit:', err);
    }
  }, [isPlaceholder, slotId]);

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full overflow-hidden text-center my-8 ${className}`}
    >
      {isPlaceholder ? (
        <div className="border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/40 rounded-xl py-6 px-4 text-center max-w-4xl mx-auto transition-all">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Advertisement Space (Google AdSense)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Set <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400 font-mono">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> in <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400 font-mono">.env.local</code> to activate live ads.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto flex justify-center min-h-[90px]">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
          />
        </div>
      )}
    </aside>
  );
};
