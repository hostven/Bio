import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'wouter';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="min-h-[100dvh] bg-[#f4efe3] text-[#0f2a1d] overflow-x-clip flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-[#0f2a1d] focus:text-[#f4efe3] focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <SiteHeader />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
