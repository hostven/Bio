import { motion, useReducedMotion } from 'framer-motion';
import { PrimaryCTA, GhostCTA } from '@/components/brand';
import { EASE } from '@/lib/site';

const PATHS = [
  {
    key: 'co',
    tag: 'Path A',
    title: 'Co-development partnership',
    who: 'You have a problem you have seen first-hand and an idea, but no company or team.',
    rows: [['How it starts', 'An application and an honest assessment'], ['Our role', 'Co-developer and business partner'], ['Commercial basis', 'Equity partnership; terms depend on the project'], ['Your role', 'Clinical insight and decisions, alongside your practice']],
    cta: { href: '/apply-now', label: 'Apply with your idea' },
    dark: true,
  },
  {
    key: 'svc',
    tag: 'Path B',
    title: 'Consulting services',
    who: 'You already run a venture or project and need specific expertise.',
    rows: [['How it starts', 'A service enquiry'], ['Our role', 'Specialist support for a defined scope'], ['Commercial basis', 'Scope and terms discussed per enquiry'], ['Your role', 'You own and lead the venture']],
    cta: { href: '/service-inquiry', label: 'Send a service enquiry' },
    dark: false,
  },
];

export function TwoPaths() {
  const reduce = useReducedMotion();
  return (
    <div>
      <svg viewBox="0 0 800 120" className="hidden md:block w-full h-[120px]" aria-hidden>
        <circle cx="400" cy="10" r="7" fill="#0f2a1d" />
        {[['M400 10 C400 70, 200 50, 200 118', '#0f2a1d'], ['M400 10 C400 70, 600 50, 600 118', '#1d6b3a']].map(([d, c], i) => (
          <motion.path key={i} d={d} fill="none" stroke={c} strokeWidth="2" strokeDasharray={i ? '6 6' : undefined} initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: EASE }} />
        ))}
      </svg>
      <div className="grid md:grid-cols-2 gap-5">
        {PATHS.map((p, i) => (
          <motion.div
            key={p.key}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: EASE }}
            className={`rounded-[28px] p-7 md:p-10 flex flex-col ${p.dark ? 'bg-[#0f2a1d] text-[#f4efe3]' : 'bg-[#faf6ec] border border-[#0f2a1d]/15'}`}
            data-testid={`card-path-${p.key}`}
          >
            <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${p.dark ? 'text-[#5be36f]' : 'text-[#1d6b3a]'}`}>{p.tag}</p>
            <h3 className="font-display mt-4 text-3xl md:text-5xl leading-[1] tracking-[-0.02em]">{p.title}</h3>
            <p className={`mt-4 font-display italic text-xl ${p.dark ? 'text-[#f4efe3]/80' : 'text-[#0f2a1d]/75'}`}>{p.who}</p>
            <dl className="mt-8">
              {p.rows.map(([k, val]) => (
                <div key={k} className={`grid grid-cols-[130px_1fr] gap-4 border-t py-3.5 ${p.dark ? 'border-[#f4efe3]/12' : 'border-[#0f2a1d]/10'}`}>
                  <dt className={`font-mono text-[11px] uppercase tracking-[0.16em] pt-1 ${p.dark ? 'text-[#f4efe3]/50' : 'text-[#0f2a1d]/50'}`}>{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-8">
              {p.dark ? <PrimaryCTA href={p.cta.href} testid={`link-path-${p.key}`}>{p.cta.label}</PrimaryCTA> : <GhostCTA href={p.cta.href} testid={`link-path-${p.key}`}>{p.cta.label}</GhostCTA>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
