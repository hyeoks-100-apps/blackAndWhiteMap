import { useEffect } from 'react';

type AdsenseBannerProps = {
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = 'ca-pub-2370970936034063';
const ADSENSE_SCRIPT_ID = 'adsense-script';

export function AdsenseBanner({ className }: AdsenseBannerProps) {
  const metaSlot =
    typeof document !== 'undefined'
      ? document.querySelector<HTMLMetaElement>('meta[name="google-adsense-slot"]')?.content
      : undefined;
  const adSlot = import.meta.env.VITE_GOOGLE_ADSENSE_SLOT || metaSlot;

  useEffect(() => {
    if (!adSlot) return;
    if (typeof window === 'undefined') return;
    const existing = document.getElementById(ADSENSE_SCRIPT_ID);
    if (!existing) {
      const script = document.createElement('script');
      script.id = ADSENSE_SCRIPT_ID;
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      script.addEventListener('load', () => {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      });
      return;
    }
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error(error);
    }
  }, [adSlot]);

  if (!adSlot) {
    if (import.meta.env.DEV) {
      return (
        <div className={className}>
          <div className="adsense-placeholder">광고 슬롯이 설정되지 않았습니다.</div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
