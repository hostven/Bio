import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X, Mail, MapPin, Plus, Minus } from 'lucide-react';

const APPLY = 'https://biolaunchpad.com/apply-now';
const MAIL = 'mailto:biolaunchpad@gmail.com';
const MAIL_PARTNER = 'mailto:biolaunchpad@gmail.com?subject=Partnership%20enquiry';
const MAIL_INVEST = 'mailto:biolaunchpad@gmail.com?subject=Investor%20enquiry';

const NAV = [
  { href: '#who', label: 'Who it is for' },
  { href: '#partnership', label: 'Partnership' },
  { href: '#journey', label: 'The journey' },
  { href: '#focus', label: 'Focus areas' },
  { href: '#questions', label: 'Questions' },
];

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`font-mono text-[11px] uppercase tracking-[0.22em] flex items-center gap-3 ${light ? 'text-[#5be36f]' : 'text-[#1d6b3a]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#5be36f]' : 'bg-[#1d6b3a]'}`} />
      {children}
    </div>
  );
}

function PrimaryCTA({ children, href = APPLY, testid }: { children: ReactNode; href?: string; testid: string }) {
  return (
    <a
      href={href}
      data-testid={testid}
      className="group inline-flex items-center gap-3 rounded-full bg-[#5be36f] pl-6 pr-2 py-2 text-[#0f2a1d] font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d6b3a]"
    >
      {children}
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f2a1d] text-[#5be36f] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'bg-[#f4efe3]/90 backdrop-blur-md border-b border-[#0f2a1d]/10' : ''}`}>
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 md:px-10 h-[72px]">
        <a href="#top" data-testid="link-logo" aria-label="Biolaunchpad home" className="block">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Biolaunchpad" className="h-6 md:h-7 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-[#0f2a1d]/80" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} data-testid={`link-nav-${n.href.slice(1)}`} className="relative hover:text-[#0f2a1d] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#1d6b3a] after:transition-transform hover:after:scale-x-100">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={APPLY} data-testid="link-nav-apply" className="hidden sm:inline-flex rounded-full bg-[#0f2a1d] px-5 py-2.5 text-sm font-semibold text-[#f4efe3] hover:bg-[#1d6b3a] transition-colors">
            Apply now
          </a>
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
      {open && (
        <div id="mobile-menu" className="lg:hidden min-h-[calc(100dvh-72px)] bg-[#f4efe3] px-5 pt-6 pb-10 flex flex-col">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((n, i) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${n.href.slice(1)}`} className="font-display text-4xl py-3 border-b border-[#0f2a1d]/10 flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#1d6b3a]">0{i + 1}</span>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-10 flex flex-col gap-4">
            <PrimaryCTA testid="link-mobile-apply">Apply with your idea</PrimaryCTA>
            <a href={MAIL} className="text-sm text-[#0f2a1d]/70" data-testid="link-mobile-email">biolaunchpad@gmail.com</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const words = ['You', 'see', 'what', 'healthcare', 'needs.'];
  return (
    <section id="top" ref={ref} className="relative pt-[120px] md:pt-[150px] pb-16 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Label>For doctors and healthcare professionals in India</Label>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0f2a1d]/60">
            <span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-[#5be36f] anim-pulse" /><span className="absolute inset-0 rounded-full bg-[#2fb24a]" /></span>
            Pune, India
          </span>
        </motion.div>
        <h1 className="font-display mt-8 text-[clamp(3rem,9.4vw,9.5rem)] leading-[0.92] tracking-[-0.035em] text-[#0f2a1d] font-[420]">
          <span className="block">
            {words.map((w, i) => (
              <motion.span key={w} className="inline-block mr-[0.22em]" initial={reduce ? false : { opacity: 0, y: '0.5em' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
          </span>
          <motion.span className="block italic font-[340] text-[#1d6b3a]" initial={reduce ? false : { opacity: 0, y: '0.4em' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            Let's build it<span className="not-italic text-[#5be36f]">.</span>
          </motion.span>
        </h1>
        <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
          <Reveal className="md:col-span-6 lg:col-span-5" delay={0.3}>
            <p className="text-lg md:text-xl leading-relaxed text-[#0f2a1d]/80">
              You notice the problems in clinical practice before anyone else does. Biolaunchpad is the hands-on partner that helps you turn that insight into a real product, from first assessment to prototype to launch.
            </p>
          </Reveal>
          <Reveal className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-4 md:justify-end" delay={0.45}>
            <PrimaryCTA testid="link-hero-apply">Apply with your idea</PrimaryCTA>
            <a href="#journey" data-testid="link-hero-journey" className="inline-flex items-center rounded-full border border-[#0f2a1d]/25 px-6 py-4 font-semibold text-[#0f2a1d] hover:bg-[#0f2a1d] hover:text-[#f4efe3] transition-colors">
              See how it works
            </a>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 mt-14 md:mt-20">
        <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] bg-[#0f2a1d]">
          <motion.img style={{ y, scale }} src={`${import.meta.env.BASE_URL}hero.jpg`} alt="A clinician's paper sketch of a medical device beside an early physical prototype" className="absolute inset-0 h-[115%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a1d]/85 via-[#0f2a1d]/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-[#f4efe3]">
            <p className="font-display italic text-2xl md:text-4xl max-w-xl leading-tight">From a note in the margin to something you can hold.</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5be36f]">Idea / Prototype / Launch</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const DOMAINS = ['Medical devices', 'Biotechnology', 'Software as a medical device', 'Digital therapeutics', 'Health apps', 'Insurance technology', 'Healthcare SaaS'];

function Marquee() {
  const row = [...DOMAINS, ...DOMAINS];
  return (
    <div className="bg-[#5be36f] text-[#0f2a1d] py-5 overflow-hidden border-y border-[#0f2a1d]" aria-label="Areas we work in">
      <div className="flex w-max anim-marquee">
        {row.map((d, i) => (
          <span key={i} aria-hidden={i >= DOMAINS.length} className="font-display text-2xl md:text-4xl px-6 md:px-10 flex items-center gap-6 md:gap-10 whitespace-nowrap">
            {d}
            <span className="h-2.5 w-2.5 rotate-45 bg-[#0f2a1d]" />
          </span>
        ))}
      </div>
    </div>
  );
}

const WHO = [
  { t: 'Practising doctors', d: 'You keep running into the same gap on rounds, in the OT or in OPD, and you have a hunch about how to fix it.' },
  { t: 'Surgeons and specialists', d: 'You have modified a tool, improvised a workaround or sketched a better instrument. That is where devices begin.' },
  { t: 'Nurses, therapists and allied professionals', d: 'You see the daily friction of care up close. Your view of the problem is just as valuable.' },
  { t: 'Clinician researchers', d: 'You have a finding or a concept that deserves to leave the paper and reach patients.' },
];

function Who() {
  return (
    <section id="who" className="relative bg-[#0f2a1d] text-[#f4efe3] py-24 md:py-36 overflow-hidden">
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-[#5be36f]/15 anim-drift" aria-hidden />
      <div className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-[#5be36f]/25 anim-drift" aria-hidden />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <Reveal><Label light>01 / Who it is for</Label></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-5xl md:text-7xl leading-[0.98] tracking-[-0.03em]">
              The idea came from <em className="text-[#5be36f] font-[340]">the ward,</em> not a boardroom.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-[#f4efe3]/70 max-w-md leading-relaxed">
              You do not need a business plan, a technical team or a finished design. You need a real clinical problem and the will to see it solved.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          {WHO.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.05}>
              <div className="group border-t border-[#f4efe3]/15 py-8 md:py-10 grid grid-cols-[auto_1fr] gap-6 md:gap-10" data-testid={`card-who-${i}`}>
                <span className="font-mono text-sm text-[#5be36f] pt-2">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl transition-transform duration-500 group-hover:translate-x-2">{w.t}</h3>
                  <p className="mt-3 text-[#f4efe3]/65 text-lg leading-relaxed max-w-lg">{w.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partnership() {
  const rows = [
    ['You receive a quote and a delivery date.', 'We work through the problem with you, side by side.'],
    ['You hand over a brief.', 'Your clinical judgement shapes every decision.'],
    ['The work ends at handover.', 'We stay with the idea from assessment through to launch.'],
    ['Your role is customer.', 'Your role is co-creator.'],
  ];
  return (
    <section id="partnership" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal><Label>02 / What partnership means</Label></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-6 text-5xl md:text-[5.5rem] leading-[0.96] tracking-[-0.035em] max-w-5xl">
            We do not build <span className="line-through decoration-[#e2603a] decoration-[3px]">for</span> you. We build it <em className="text-[#1d6b3a] font-[340]">with</em> you.
          </h2>
        </Reveal>
        <div className="mt-16 md:mt-24 rounded-[28px] md:rounded-[36px] border border-[#0f2a1d]/15 overflow-hidden bg-[#faf6ec]">
          <div className="grid grid-cols-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <div className="p-5 md:p-8 text-[#0f2a1d]/50 border-r border-[#0f2a1d]/10">A typical development agency</div>
            <div className="p-5 md:p-8 bg-[#0f2a1d] text-[#5be36f]">Biolaunchpad</div>
          </div>
          {rows.map(([a, b], i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="grid grid-cols-2 border-t border-[#0f2a1d]/10" data-testid={`row-compare-${i}`}>
                <p className="p-5 md:p-8 text-base md:text-xl text-[#0f2a1d]/50 border-r border-[#0f2a1d]/10">{a}</p>
                <p className="p-5 md:p-8 text-base md:text-xl font-display bg-[#0f2a1d] text-[#f4efe3]">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', t: 'Idea assessment', d: 'We look hard at the idea together before anything gets built.', points: ['Is the clinical problem real and well defined?', 'Is there a market that needs this?', 'Is there potential for a patent?'] },
  { n: '02', t: 'Partnership', d: 'If the idea holds up, we agree how we will work together and what each side brings.', points: ['Clear roles from day one', 'Your clinical insight stays central', 'A shared plan for the road ahead'] },
  { n: '03', t: 'Prototyping and development', d: 'The concept becomes something you can test, hold, use and improve.', points: ['Early prototypes to learn fast', 'Iteration guided by clinical feedback', 'Development toward a usable product'] },
  { n: '04', t: 'Launch', d: 'We work toward getting the product out of the lab and into the hands of the people it was made for.', points: ['Preparing the product for the real world', 'Planning the route to users', 'Staying alongside you through it'] },
];

function Journey() {
  const [active, setActive] = useState(0);
  return (
    <section id="journey" className="bg-[#e9e2d0] py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Reveal><Label>03 / The journey</Label></Reveal>
            <Reveal delay={0.1}><h2 className="font-display mt-6 text-5xl md:text-7xl leading-[0.98] tracking-[-0.03em] max-w-3xl">Four stages. <em className="text-[#1d6b3a] font-[340]">One partner</em> the whole way.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><p className="text-lg text-[#0f2a1d]/70 max-w-sm">Every idea moves at its own pace. This is the path we walk with you.</p></Reveal>
        </div>
        <div className="mt-16 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col gap-2" role="tablist" aria-label="Journey stages">
            {STEPS.map((s, i) => (
              <button
                key={s.n}
                role="tab"
                aria-selected={active === i}
                aria-controls="journey-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                data-testid={`button-step-${i}`}
                className={`text-left rounded-2xl px-6 py-5 flex items-center gap-5 transition-colors duration-300 ${active === i ? 'bg-[#0f2a1d] text-[#f4efe3]' : 'hover:bg-[#0f2a1d]/5 text-[#0f2a1d]'}`}
              >
                <span className={`font-mono text-sm ${active === i ? 'text-[#5be36f]' : 'text-[#1d6b3a]'}`}>{s.n}</span>
                <span className="font-display text-2xl md:text-3xl">{s.t}</span>
                <ArrowUpRight className={`ml-auto h-5 w-5 transition-transform duration-300 ${active === i ? 'rotate-45 text-[#5be36f]' : 'opacity-40'}`} />
              </button>
            ))}
          </div>
          <div id="journey-panel" role="tabpanel" className="lg:col-span-7 relative rounded-[28px] bg-[#0f2a1d] text-[#f4efe3] p-8 md:p-12 min-h-[420px] overflow-hidden">
            <span className="absolute -right-4 -bottom-16 font-display text-[16rem] md:text-[22rem] leading-none text-[#5be36f]/10 select-none" aria-hidden>{STEPS[active].n}</span>
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative">
              <div className="h-1.5 w-full bg-[#f4efe3]/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#5be36f] origin-left" initial={{ scaleX: active / 4 }} animate={{ scaleX: (active + 1) / 4 }} transition={{ duration: 0.6 }} />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5be36f]">Stage {active + 1} of 4</p>
              <h3 className="font-display mt-8 text-4xl md:text-6xl leading-none" data-testid="text-step-title">{STEPS[active].t}</h3>
              <p className="mt-5 text-lg md:text-xl text-[#f4efe3]/75 max-w-lg">{STEPS[active].d}</p>
              <ul className="mt-8 space-y-3">
                {STEPS[active].points.map((p) => (
                  <li key={p} className="flex gap-4 items-start text-[#f4efe3]/90"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#5be36f] shrink-0" />{p}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const OTHERS = [
  { t: 'Biotechnology', d: 'Biological insight with a path to the clinic.' },
  { t: 'Software as a medical device', d: 'Software that plays a direct role in diagnosis or treatment.' },
  { t: 'Digital therapeutics', d: 'Evidence-led digital programmes that support care.' },
  { t: 'Health apps', d: 'Tools for patients, clinicians and care teams.' },
  { t: 'Insurance technology', d: 'Making cover and claims work better for care.' },
  { t: 'Healthcare SaaS', d: 'Software that helps hospitals and clinics run.' },
];

function Focus() {
  return (
    <section id="focus" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal><Label>04 / Focus areas</Label></Reveal>
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-7">
            <div className="relative h-full rounded-[28px] md:rounded-[36px] bg-[#5be36f] p-8 md:p-12 overflow-hidden min-h-[480px] flex flex-col" data-testid="card-focus-hardtech">
              <svg viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-72 w-72 md:h-96 md:w-96 text-[#0f2a1d]/15 anim-drift" aria-hidden>
                <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                <circle cx="100" cy="100" r="36" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M4 100h192M100 4v192" stroke="currentColor" strokeWidth="1" />
              </svg>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0f2a1d]">Our particular focus</p>
              <h3 className="font-display mt-6 text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em] text-[#0f2a1d] max-w-lg">Hardtech medical devices, <em className="font-[340]">made in India.</em></h3>
              <p className="mt-auto pt-10 text-lg md:text-xl text-[#0f2a1d]/85 max-w-md leading-relaxed">Physical devices are hard to build and harder to get right. That is exactly why we lean in. If your idea is something a clinician will hold, wear or use at the bedside, we especially want to hear it.</p>
            </div>
          </Reveal>
          <div className="lg:col-span-5 rounded-[28px] md:rounded-[36px] border border-[#0f2a1d]/15 bg-[#faf6ec] p-8 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">We also work across</p>
            <ul className="mt-6">
              {OTHERS.map((o, i) => (
                <Reveal key={o.t} delay={i * 0.05}>
                  <li className="group border-t border-[#0f2a1d]/10 py-5" data-testid={`text-focus-${i}`}>
                    <p className="font-display text-2xl group-hover:text-[#1d6b3a] transition-colors">{o.t}</p>
                    <p className="text-[#0f2a1d]/60 mt-1">{o.d}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bring() {
  const items = [
    { t: 'A problem you have seen first-hand', d: 'Describe what goes wrong, for whom, and how often. Plain language is perfect.' },
    { t: 'Your idea, however rough', d: 'A sketch, a voice note, a workaround you already use. Early is fine.' },
    { t: 'Time and curiosity', d: 'Partnership means staying involved. Your clinical eye is the part nobody else can supply.' },
  ];
  return (
    <section className="bg-[#0f2a1d] text-[#f4efe3] py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal><Label light>05 / Next steps</Label></Reveal>
        <Reveal delay={0.1}><h2 className="font-display mt-6 text-5xl md:text-7xl leading-[0.98] tracking-[-0.03em] max-w-4xl">What to bring to the <em className="text-[#5be36f] font-[340]">first conversation.</em></h2></Reveal>
        <div className="mt-16 grid md:grid-cols-12 gap-px bg-[#f4efe3]/10 rounded-[28px] overflow-hidden">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08} className={`bg-[#0f2a1d] ${i === 0 ? 'md:col-span-6' : 'md:col-span-3'}`}>
              <div className="p-8 md:p-10 h-full flex flex-col min-h-[300px]" data-testid={`card-bring-${i}`}>
                <span className="font-display italic text-6xl text-[#5be36f]">{i + 1}</span>
                <h3 className="font-display mt-auto pt-10 text-2xl md:text-3xl leading-tight">{it.t}</h3>
                <p className="mt-3 text-[#f4efe3]/65 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
            <PrimaryCTA testid="link-bring-apply">Start your application</PrimaryCTA>
            <p className="text-[#f4efe3]/60 max-w-sm">The application opens on biolaunchpad.com. Start by telling us about the healthcare problem you want to solve.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FAQ = [
  { q: 'Do I need a technical background?', a: 'No. You bring the clinical problem and the insight. Turning it into a product is the work we do together.' },
  { q: 'How early is too early?', a: 'Rarely too early. Many good products start as a frustration you cannot stop thinking about. Idea assessment exists to test exactly that.' },
  { q: 'Will you build any idea I send?', a: 'Not every idea. We first assess the clinical problem, the market fit and the patent potential, and we will be honest with you about what we find.' },
  { q: 'Do I need to be in Pune?', a: 'We are based in Pune and work with healthcare professionals across India.' },
  { q: 'I am an investor or organisation. How do I reach you?', a: 'Write to biolaunchpad@gmail.com and tell us what you have in mind. Links for partnership and investor enquiries are below.' },
];

function Questions() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="questions" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Reveal><Label>06 / Questions</Label></Reveal>
          <Reveal delay={0.1}><h2 className="font-display mt-6 text-5xl md:text-6xl leading-[0.98] tracking-[-0.03em]">Honest answers, <em className="text-[#1d6b3a] font-[340]">before you apply.</em></h2></Reveal>
        </div>
        <div className="lg:col-span-8">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-[#0f2a1d]/15 last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  data-testid={`button-faq-${i}`}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-2xl md:text-3xl">{f.q}</span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? 'bg-[#0f2a1d] text-[#5be36f]' : 'border border-[#0f2a1d]/20'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <motion.p id={`faq-${i}`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="pb-8 pr-16 text-lg text-[#0f2a1d]/70 leading-relaxed max-w-2xl">
                    {f.a}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-3 md:px-6 pb-3 md:pb-6">
      <div className="relative rounded-[32px] md:rounded-[48px] bg-[#5be36f] overflow-hidden px-6 md:px-16 py-20 md:py-32">
        <div className="absolute inset-0 opacity-[0.12]" aria-hidden style={{ backgroundImage: 'radial-gradient(#0f2a1d 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-[1200px] mx-auto">
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0f2a1d]">The problem you keep noticing</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-[-0.035em] text-[#0f2a1d]">
              could be the next thing <em className="font-[340]">India builds.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-4">
              <a href={APPLY} data-testid="link-final-apply" className="group inline-flex items-center gap-3 rounded-full bg-[#0f2a1d] pl-7 pr-2 py-2 text-[#f4efe3] font-semibold hover:-translate-y-0.5 transition-transform">
                Apply with your idea
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#5be36f] text-[#0f2a1d] group-hover:rotate-45 transition-transform"><ArrowUpRight className="h-4 w-4" /></span>
              </a>
              <a href={MAIL_PARTNER} data-testid="link-final-partner" className="inline-flex items-center rounded-full border border-[#0f2a1d]/40 px-6 py-4 font-semibold text-[#0f2a1d] hover:bg-[#0f2a1d]/10">Partnership enquiry</a>
              <a href={MAIL_INVEST} data-testid="link-final-investor" className="inline-flex items-center rounded-full border border-[#0f2a1d]/40 px-6 py-4 font-semibold text-[#0f2a1d] hover:bg-[#0f2a1d]/10">Investor enquiry</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-[1320px] px-5 md:px-10 py-14">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Biolaunchpad" className="h-7 w-auto" />
          <p className="mt-5 text-[#0f2a1d]/65 max-w-sm">The hands-on partner for doctors and healthcare professionals turning clinical problems into real products.</p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Explore</p>
          <ul className="mt-4 space-y-2">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-[#1d6b3a]" data-testid={`link-footer-${n.href.slice(1)}`}>{n.label}</a></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Contact</p>
          <a href={MAIL} className="mt-4 flex items-center gap-3 hover:text-[#1d6b3a]" data-testid="link-footer-email"><Mail className="h-4 w-4" />biolaunchpad@gmail.com</a>
          <p className="mt-2 flex items-center gap-3"><MapPin className="h-4 w-4" />Pune, India</p>
          <a href={APPLY} className="mt-4 inline-block font-semibold underline underline-offset-4 decoration-[#5be36f] decoration-2" data-testid="link-footer-apply">Apply now</a>
        </div>
      </div>
      <div className="mt-14 pt-6 border-t border-[#0f2a1d]/10 flex flex-col sm:flex-row justify-between gap-2 text-sm text-[#0f2a1d]/50">
        <p>&copy; {new Date().getFullYear()} Biolaunchpad. Pune, India.</p>
        <a href="#top" className="hover:text-[#0f2a1d]" data-testid="link-back-top">Back to top</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#f4efe3] text-[#0f2a1d] overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-[#0f2a1d] focus:text-[#f4efe3] focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Who />
        <Partnership />
        <Journey />
        <Focus />
        <Bring />
        <Questions />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
