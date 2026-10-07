import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Label } from '@/components/brand';
import { EASE } from '@/lib/site';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? 'text-[#f4efe3]/60' : 'text-[#0f2a1d]/60'}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:underline underline-offset-4" data-testid="link-crumb-home">Home</Link></li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:underline underline-offset-4" data-testid={`link-crumb-${i}`}>{c.label}</Link>
            ) : (
              <span aria-current="page" className={`${light ? 'text-[#f4efe3]' : 'text-[#0f2a1d]'} line-clamp-1 max-w-[60vw]`}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, label, title, intro, children, aside }: { crumbs: Crumb[]; label: string; title: ReactNode; intro?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  const reduce = useReducedMotion();
  const enter = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease: EASE },
  });
  return (
    <section className="relative pt-[104px] md:pt-[128px] pb-14 md:pb-20 overflow-hidden">
      <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full border border-[#1d6b3a]/15 anim-drift pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
        <motion.div {...enter(0)}><Breadcrumbs items={crumbs} /></motion.div>
        <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 items-end">
          <div className={aside ? 'lg:col-span-8' : 'lg:col-span-11'}>
            <motion.div {...enter(0.05)}><Label>{label}</Label></motion.div>
            <motion.h1 {...enter(0.12)} className="font-display mt-6 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.035em] font-[420] text-[#0f2a1d]">
              {title}
            </motion.h1>
            {intro && (
              <motion.div {...enter(0.24)} className="mt-8 text-lg md:text-xl leading-relaxed text-[#0f2a1d]/75 max-w-2xl">
                {intro}
              </motion.div>
            )}
            {children && <motion.div {...enter(0.32)} className="mt-10">{children}</motion.div>}
          </div>
          {aside && <motion.div {...enter(0.3)} className="lg:col-span-4">{aside}</motion.div>}
        </div>
      </div>
    </section>
  );
}
