import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SmartLink } from '@/components/brand';
import type { Faq } from '@/content/faqs';
import { EASE } from '@/lib/site';

export function FaqAccordion({ items, openSet, toggle }: { items: Faq[]; openSet: Set<string>; toggle: (q: string) => void }) {
  const reduce = useReducedMotion();
  return (
    <div>
      {items.map((f, i) => {
        const isOpen = openSet.has(f.q);
        const id = `faq-panel-${i}`;
        return (
          <div key={f.q} className="border-t border-[#0f2a1d]/15 last:border-b">
            <h3>
              <button type="button" onClick={() => toggle(f.q)} aria-expanded={isOpen} aria-controls={id} data-testid={`button-faq-${i}`} className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left">
                <span className="font-display text-xl md:text-3xl leading-tight">{f.q}</span>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? 'bg-[#0f2a1d] text-[#5be36f]' : 'border border-[#0f2a1d]/20'}`}>
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={id} role="region" key="c" initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                  <div className="pb-8 pr-4 md:pr-16 max-w-2xl text-lg text-[#0f2a1d]/75 leading-relaxed">
                    <p>{f.a}</p>
                    {f.list && (
                      <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                        {f.list.map((l) => <li key={l} className="flex gap-3 items-start"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#2fb24a] shrink-0" />{l}</li>)}
                      </ul>
                    )}
                    {f.link && <SmartLink href={f.link.href} className="mt-5 inline-block font-semibold text-[#0f2a1d] underline underline-offset-4 decoration-[#5be36f] decoration-2" testid={`link-faq-${i}`}>{f.link.label}</SmartLink>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
