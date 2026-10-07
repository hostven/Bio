import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo, PrimaryCTA } from '@/components/brand';
import { EMAIL, MAILTO, NAV, EASE } from '@/lib/site';

export function isActive(location: string, href: string) {
  return location === href || location.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => {
      window.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'bg-[#f4efe3]/92 backdrop-blur-md border-b border-[#0f2a1d]/10' : ''}`}>
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 md:px-10 h-[72px]">
        <Link href="/" data-testid="link-logo" aria-label="Biolaunchpad home" className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d6b3a]">
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-[#0f2a1d]/80" aria-label="Primary">
          {NAV.map((n) => {
            const active = isActive(location, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? 'page' : undefined}
                data-testid={`link-nav-${n.href.slice(1)}`}
                className={`relative hover:text-[#0f2a1d] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:bg-[#1d6b3a] after:transition-transform hover:after:scale-x-100 ${active ? 'text-[#0f2a1d] font-semibold after:scale-x-100' : 'after:scale-x-0'}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/apply-now" data-testid="link-nav-apply" className="hidden sm:inline-flex rounded-full bg-[#0f2a1d] px-5 py-2.5 text-sm font-semibold text-[#f4efe3] hover:bg-[#1d6b3a] transition-colors">
            Apply now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-testid="button-menu"
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-[#0f2a1d]/20 text-[#0f2a1d]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden h-[calc(100dvh-72px)] overflow-y-auto bg-[#f4efe3] px-5 pt-4 pb-10 flex flex-col"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              <Link href="/" data-testid="link-mobile-home" className="font-display text-3xl py-3 border-b border-[#0f2a1d]/10 flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#1d6b3a]">00</span>Home
              </Link>
              {NAV.map((n, i) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(location, n.href) ? 'page' : undefined}
                  data-testid={`link-mobile-${n.href.slice(1)}`}
                  className={`font-display text-3xl py-3 border-b border-[#0f2a1d]/10 flex items-baseline gap-4 ${isActive(location, n.href) ? 'text-[#1d6b3a] italic' : ''}`}
                >
                  <span className="font-mono text-xs not-italic text-[#1d6b3a]">0{i + 1}</span>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-10 flex flex-col gap-4">
              <PrimaryCTA testid="link-mobile-apply">Apply with your idea</PrimaryCTA>
              <a href={MAILTO} className="text-sm text-[#0f2a1d]/70" data-testid="link-mobile-email">{EMAIL}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
