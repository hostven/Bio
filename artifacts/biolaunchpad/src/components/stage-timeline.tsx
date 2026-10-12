import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { STAGES } from '@/content/stages';
import { EASE } from '@/lib/site';

/** Reduced motion removes interpolation, without changing the actual scroll progress. */
export function StageTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setReached(Math.min(STAGES.length, Math.floor(p * STAGES.length + 0.35)));
  });

  return (
    <div ref={ref} className="relative">
      <div className="sticky top-[72px] z-10 -mx-5 md:mx-0 mb-10 bg-[#f4efe3]/92 backdrop-blur-md px-5 md:px-0 py-4 border-b border-[#0f2a1d]/10">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-[#1d6b3a]" aria-hidden>Stage {String(Math.max(1, reached)).padStart(2, '0')} / 08</span>
          <span className="text-[#0f2a1d]/55 truncate" aria-hidden>{STAGES[Math.max(0, reached - 1)].t}</span>
        </div>
        <div className="mt-3 grid grid-cols-8 gap-1.5" aria-hidden>
          {STAGES.map((s, i) => (
            <span key={s.n} className="h-1.5 rounded-full bg-[#0f2a1d]/10 overflow-hidden">
              <span className={`block h-full bg-[#2fb24a] origin-left transition-transform duration-500 ${i < reached ? 'scale-x-100' : 'scale-x-0'}`} />
            </span>
          ))}
        </div>
      </div>

      <ol className="relative">
        <div className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-[#0f2a1d]/12" aria-hidden />
        <motion.div className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-[2px] -ml-[0.5px] bg-[#2fb24a] origin-top" style={{ scaleY: reduce ? scrollYProgress : fill }} aria-hidden />
        {STAGES.map((s, i) => {
          const lit = i < reached;
          return (
            <li key={s.n} className="relative grid grid-cols-[40px_1fr] md:grid-cols-[56px_1fr] gap-5 md:gap-10 pb-14 md:pb-20 last:pb-0" data-testid={`stage-${s.n}`}>
              <span className={`relative z-[1] grid h-10 w-10 md:h-14 md:w-14 place-items-center rounded-full font-mono text-xs md:text-sm transition-colors duration-500 ${lit ? 'bg-[#0f2a1d] text-[#5be36f]' : 'bg-[#f4efe3] border border-[#0f2a1d]/20 text-[#0f2a1d]/60'}`}>
                {s.n}
              </span>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="grid lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-7">
                  <h3 className="font-display text-3xl md:text-5xl leading-[1] tracking-[-0.02em]">{s.t}</h3>
                  <p className="mt-4 text-lg text-[#0f2a1d]/78 leading-relaxed">{s.d}</p>
                  {s.points && (
                    <ul className="mt-5 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3 items-start"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#2fb24a] shrink-0" />{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="lg:col-span-5">
                  <div className={`rounded-2xl p-5 transition-colors duration-500 ${lit ? 'bg-[#5be36f]/25' : 'bg-[#e9e2d0]'}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1d6b3a]">Your part</p>
                    <p className="mt-2 font-display italic text-lg leading-snug">{s.you}</p>
                  </div>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
