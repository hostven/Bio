import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal, Label } from '@/components/brand';

const STEPS = [
  { n: '01', t: 'Idea assessment', d: 'We look hard at the idea together before anything gets built.', points: ['Is the clinical problem real and well defined?', 'Is there a market that needs this?', 'Is there potential for a patent?'] },
  { n: '02', t: 'Partnership', d: 'If the idea holds up, we agree how we will work together and what each side brings.', points: ['Clear roles from day one', 'Your clinical insight stays central', 'A shared plan for the road ahead'] },
  { n: '03', t: 'Prototyping and development', d: 'The concept becomes something you can test, hold, use and improve.', points: ['Early prototypes to learn fast', 'Iteration guided by clinical feedback', 'Development toward a usable product'] },
  { n: '04', t: 'Launch', d: 'We work toward getting the product out of the lab and into the hands of the people it was made for.', points: ['Preparing the product for the real world', 'Planning the route to users', 'Staying alongside you through it'] },
];

export function JourneyOverview() {
  const reduce = useReducedMotion();
  const [[active, dir], setState] = useState<[number, number]>([0, 1]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number, focus = false) => {
    const next = (i + STEPS.length) % STEPS.length;
    setState([next, next >= active ? 1 : -1]);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: STEPS.length - 1 };
    if (e.key in map) { e.preventDefault(); go(map[e.key], true); }
  };
  const s = STEPS[active];
  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 48 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -48 }),
  };

  return (
    <section id="journey" className="bg-[#e9e2d0] py-20 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <Reveal><Label>03 / The journey</Label></Reveal>
            <Reveal delay={0.1}><h2 className="font-display mt-5 text-4xl md:text-6xl leading-[0.98] tracking-[-0.03em] max-w-3xl">Four stages. <em className="text-[#1d6b3a] font-[340]">One partner</em> the whole way.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><p className="text-lg text-[#0f2a1d]/70 max-w-sm">Every idea moves at its own pace. This is the path we walk with you.</p></Reveal>
        </div>

        <div className="mt-10 grid auto-rows-fr grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3" role="tablist" aria-label="Journey stages" onKeyDown={onKey}>
          {STEPS.map((st, i) => {
            const on = active === i;
            return (
              <button
                key={st.n}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`journey-tab-${i}`}
                aria-selected={on}
                aria-controls="journey-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                data-testid={`button-step-${i}`}
                className={`relative h-full min-h-[150px] md:min-h-[168px] text-left rounded-2xl p-4 md:p-5 flex flex-col transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6b3a] ${on ? 'bg-[#0f2a1d] text-[#f4efe3]' : 'bg-[#faf6ec]/70 text-[#0f2a1d] hover:bg-[#faf6ec]'}`}
              >
                <span className="flex items-center gap-3">
                  <span className={`font-mono text-xs ${on ? 'text-[#5be36f]' : 'text-[#1d6b3a]'}`}>{st.n}</span>
                  <span className={`h-px flex-1 ${on ? 'bg-[#5be36f]/50' : 'bg-[#0f2a1d]/15'}`} />
                </span>
                <span className="mt-3 font-display text-xl md:text-2xl leading-tight">{st.t}</span>
                <span className={`mt-2 text-sm leading-snug ${on ? 'text-[#f4efe3]/70' : 'text-[#0f2a1d]/65'}`}>{st.d}</span>
              </button>
            );
          })}
        </div>

        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${active}`}
          className="mt-3 relative rounded-[24px] bg-[#0f2a1d] text-[#f4efe3] overflow-hidden grid"
        >
          <span className="absolute right-4 -bottom-10 font-display text-[9rem] md:text-[12rem] leading-none text-[#5be36f]/10 select-none pointer-events-none" aria-hidden>{s.n}</span>
          {/* Invisible sizers: panel height = tallest stage, so it never changes */}
          {STEPS.map((st) => (
            <div key={st.n} aria-hidden className="invisible [grid-area:1/1]"><Detail step={st} /></div>
          ))}
          <div className="[grid-area:1/1] relative">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <Detail step={s} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="[grid-area:1/1] self-end justify-self-end p-5 md:p-8 flex items-center gap-3 relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5be36f] mr-2" aria-live="polite">Stage {active + 1} of 4</span>
            <button type="button" onClick={() => go(active - 1)} aria-label="Previous stage" data-testid="button-step-prev" className="grid h-10 w-10 place-items-center rounded-full border border-[#f4efe3]/25 hover:bg-[#f4efe3]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5be36f]"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => go(active + 1)} aria-label="Next stage" data-testid="button-step-next" className="grid h-10 w-10 place-items-center rounded-full bg-[#5be36f] text-[#0f2a1d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5be36f]"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="p-6 md:p-8 pb-24 md:pb-24 lg:pb-8 lg:pr-56 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 md:gap-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5be36f]">What happens at stage {step.n}</p>
        <h3 className="font-display mt-3 text-3xl md:text-4xl leading-none" data-testid="text-step-title">{step.t}</h3>
      </div>
      <ul className="space-y-2.5 md:pt-1">
        {step.points.map((p) => (
          <li key={p} className="flex gap-3 items-start text-[#f4efe3]/90"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#5be36f] shrink-0" />{p}</li>
        ))}
      </ul>
    </div>
  );
}
