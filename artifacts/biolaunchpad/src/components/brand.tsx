import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { asset, EASE } from '@/lib/site';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`font-mono text-[11px] uppercase tracking-[0.22em] flex items-center gap-3 ${light ? 'text-[#5be36f]' : 'text-[#1d6b3a]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#5be36f]' : 'bg-[#1d6b3a]'}`} />
      {children}
    </div>
  );
}

/** Logo: derived contrast variants of the original artwork. Proportions and all lettering kept intact. */
export function Logo({ tone = 'forest', className = 'h-6 md:h-7 w-auto' }: { tone?: 'ivory' | 'forest'; className?: string }) {
  return <img src={asset(tone === 'ivory' ? 'logo-ivory.svg' : 'logo-forest.svg')} alt="Biolaunchpad" width={672} height={122} className={className} />;
}

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');

export function SmartLink({ href, className, children, testid, onClick }: { href: string; className?: string; children: ReactNode; testid?: string; onClick?: () => void }) {
  if (isInternal(href)) {
    return (
      <Link href={href} className={className} data-testid={testid} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} data-testid={testid} onClick={onClick}>
      {children}
    </a>
  );
}

export function PrimaryCTA({ children, href = '/apply-now', testid, dark = false }: { children: ReactNode; href?: string; testid: string; dark?: boolean }) {
  return (
    <SmartLink
      href={href}
      testid={testid}
      className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d6b3a] ${dark ? 'bg-[#0f2a1d] text-[#f4efe3]' : 'bg-[#5be36f] text-[#0f2a1d]'}`}
    >
      {children}
      <span className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${dark ? 'bg-[#5be36f] text-[#0f2a1d]' : 'bg-[#0f2a1d] text-[#5be36f]'}`}>
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </SmartLink>
  );
}

export function GhostCTA({ children, href, testid, light = false }: { children: ReactNode; href: string; testid: string; light?: boolean }) {
  return (
    <SmartLink
      href={href}
      testid={testid}
      className={`inline-flex items-center rounded-full border px-6 py-4 font-semibold transition-colors ${light ? 'border-[#f4efe3]/30 text-[#f4efe3] hover:bg-[#f4efe3] hover:text-[#0f2a1d]' : 'border-[#0f2a1d]/25 text-[#0f2a1d] hover:bg-[#0f2a1d] hover:text-[#f4efe3]'}`}
    >
      {children}
    </SmartLink>
  );
}

/** Highlighter mark used for key phrases in descriptive copy. */
export function Mark({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={light ? 'mark-light' : 'mark-ink'}>{children}</span>;
}
