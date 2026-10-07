import { motion, useReducedMotion } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/page-hero';
import { PrimaryCTA, GhostCTA, SmartLink } from '@/components/brand';
import { NAV, EASE } from '@/lib/site';
import { useSeo } from '@/lib/seo';

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'This page does not exist on Biolaunchpad.', path: '/404' });
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-[104px] md:pt-[128px] pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Breadcrumbs items={[{ label: 'Page not found' }]} />
        <div className="mt-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1d6b3a]">Error 404</p>
            <h1 className="font-display mt-6 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.035em]">This page did not make it <em className="text-[#1d6b3a] font-[340]">past assessment.</em></h1>
            <p className="mt-8 text-lg md:text-xl text-[#0f2a1d]/75 max-w-xl">The link may be old or mistyped. Older Biolaunchpad links for pages and articles still work here, so try one of these.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/" testid="link-404-home">Back to home</PrimaryCTA>
              <GhostCTA href="/blog" testid="link-404-blog">Browse the blog</GhostCTA>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map((n) => <li key={n.href}><SmartLink href={n.href} className="underline underline-offset-4 decoration-[#0f2a1d]/25 hover:decoration-[#1d6b3a]" testid={`link-404-${n.href.slice(1)}`}>{n.label}</SmartLink></li>)}
            </ul>
          </div>
          <div className="lg:col-span-5 flex justify-center" aria-hidden>
            <svg viewBox="0 0 300 300" className="w-64 md:w-80">
              <circle cx="150" cy="150" r="140" fill="none" stroke="#0f2a1d" strokeOpacity=".12" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#0f2a1d" strokeOpacity=".12" strokeDasharray="4 6" />
              <motion.g initial={reduce ? false : { rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 1.4, ease: EASE }} style={{ originX: '150px', originY: '150px' }}>
                <g className={reduce ? '' : 'anim-drift'} style={{ transformOrigin: '150px 150px' }}>
                  <path d="M150 60 C176 86 180 140 170 196 H130 C120 140 124 86 150 60Z" fill="#5be36f" />
                  <circle cx="150" cy="118" r="12" fill="#0f2a1d" />
                  <path d="M130 170 L108 210 L132 200Z M170 170 L192 210 L168 200Z" fill="#1d6b3a" />
                </g>
              </motion.g>
              <text x="150" y="268" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1d6b3a" letterSpacing="4">404</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
