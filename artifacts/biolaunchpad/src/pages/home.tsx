import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Reveal, Label, PrimaryCTA, Mark } from '@/components/brand';
import { MAIL_INVEST, MAIL_PARTNER } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { MatterOfMedtech } from '@/components/matter-of-medtech';
import { JourneyOverview } from '@/components/journey-overview';
import { HeroOrb } from '@/components/hero-orb';

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
        <h1 className="font-display text-[clamp(3rem,9.4vw,9.5rem)] leading-[0.92] tracking-[-0.035em] text-[#0f2a1d] font-[420]">
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
            <p className="font-display text-2xl md:text-[1.9rem] leading-[1.25] tracking-[-0.01em] text-[#0f2a1d]" data-testid="text-definition">
              Biolaunchpad partners with healthcare professionals to turn <Mark>first-hand problems</Mark> into products that improve patient care.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[#0f2a1d]/75">
              Your experience with patients can be the starting point for a better medical device or healthcare tool. We bring the development support to move your idea forward, while you stay involved in the work that inspired it.
            </p>
          </Reveal>
          <Reveal className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-4 md:justify-end" delay={0.45}>
            <div className="w-full flex justify-center md:justify-end md:pr-10 mb-2 md:mb-6"><HeroOrb /></div>
            <PrimaryCTA testid="link-hero-apply">Apply with your idea</PrimaryCTA>
            <Link href="/how-it-works" data-testid="link-hero-journey" className="inline-flex items-center rounded-full border border-[#0f2a1d]/25 px-6 py-4 font-semibold text-[#0f2a1d] hover:bg-[#0f2a1d] hover:text-[#f4efe3] transition-colors">
              See how it works
            </Link>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 mt-14 md:mt-20">
        <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] bg-[#0f2a1d]">
          <motion.img style={{ y, scale }} src={`${import.meta.env.BASE_URL}engineering-workbench.webp`} alt="Medical device prototypes, engineering sketches and tools on a development workbench" decoding="async" width={1024} height={576} className="absolute inset-0 h-[115%] w-full object-cover" />
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
  { t: 'Doctors and surgeons', tag: 'OPD / OT / wards', d: <>You keep meeting <Mark light>the same gap</Mark> on rounds or in theatre, or you have already improvised a workaround. That is where devices begin.</> },
  { t: 'Nurses and healthcare helpers', tag: 'Bedside / night shift', d: <>You see the <Mark light>daily friction of care</Mark> closer than anyone: the lift that strains a back, the alarm nobody can hear.</> },
  { t: 'Therapists and technicians', tag: 'Rehab / lab / OT', d: <>Physio, occupational and speech therapists, OT and lab technicians. You know <Mark light>which tools fail</Mark>, and exactly how.</> },
  { t: 'Researchers and everyone else', tag: 'Any field', d: <>Clinician researchers with a finding that should <Mark light>leave the paper</Mark>, and engineers, students or founders with a strong healthtech idea. You are welcome too.</> },
];

const ROLES_LINE = ['doctors', 'surgeons', 'nurses', 'therapists', 'technicians', 'healthcare helpers'];

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
            <p className="mt-8 text-lg text-[#f4efe3]/80 max-w-md leading-relaxed">
              If you work directly with patients, you already know the real problems first-hand. You do not need a business plan, a technical team or a finished design.
            </p>
            <p className="mt-6 max-w-md text-[1.35rem] leading-[1.5]" aria-label={`For ${ROLES_LINE.join(', ')} and anyone who works with patients.`}>
              <span aria-hidden>
                {ROLES_LINE.map((r, i) => (
                  <span key={r}>
                    <span className={i % 2 ? 'font-display italic text-[#5be36f]' : 'font-display text-[#f4efe3]'}>{r}</span>
                    <span className="font-mono text-xs text-[#f4efe3]/40 mx-2 align-middle">/</span>
                  </span>
                ))}
                <span className="font-display italic text-[#f4efe3]/70">anyone at the bedside.</span>
              </span>
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          {WHO.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.05}>
              <div className="group border-t border-[#f4efe3]/15 py-8 md:py-10 grid grid-cols-[auto_1fr] gap-6 md:gap-10" data-testid={`card-who-${i}`}>
                <span className="font-mono text-sm text-[#5be36f] pt-2">0{i + 1}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-3xl md:text-4xl transition-transform duration-500 group-hover:translate-x-2">{w.t}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4efe3]/45">{w.tag}</span>
                  </div>
                  <p className="mt-4 font-display italic font-[340] text-xl md:text-[1.55rem] leading-[1.4] text-[#f4efe3]/85 max-w-lg">{w.d}</p>
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
  const benefits = [
    { title: 'Make the complexity manageable.', text: 'Medical hardware takes more than a good design. Engineering, repeated prototypes, testing and manufacturing all add cost and uncertainty. We help you assess the idea, plan development in stages and bring the right expertise together before committing to the next step.' },
    { title: 'Plan for evidence and regulation early.', text: 'A working prototype is not yet a product ready for patients. We help identify the testing, clinical evidence and regulatory requirements your product may need, and coordinate specialist support. Approval depends on the product, its evidence and the relevant authorities.' },
    { title: 'Build without leaving your practice behind.', text: 'Healthcare professionals often have the most practical ideas, but cannot put their entire practice on hold to develop them. We take on the coordination of product development while you contribute clinical judgement, feedback and time at agreed stages.' },
    { title: 'Keep real care at the centre.', text: 'Your practice is an advantage. It helps us understand real workflows, refine the product and build relationships that can support clinical studies and market adoption. Any patient research or trials still require the appropriate ethics review, consent and approvals.' },
  ];
  return (
    <section id="partnership" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal><Label>02 / What partnership means</Label></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-6 text-5xl md:text-[5.5rem] leading-[0.96] tracking-[-0.035em] max-w-5xl">
            Your clinical insight. <em className="text-[#1d6b3a] font-[340]">Our shared work.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-[#0f2a1d]/75">The people closest to patients often know what needs to change. Turning that knowledge into a medtech product takes time, capital and expertise across several disciplines. Biolaunchpad brings those parts together with you, so you do not have to navigate the process alone.</p>
        </Reveal>
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.06} className="h-full">
              <article className="h-full rounded-[28px] border border-[#0f2a1d]/15 bg-[#faf6ec] p-7 md:p-10" data-testid={`partnership-benefit-${i}`}>
                <span className="font-mono text-xs tracking-[0.2em] text-[#1d6b3a]">0{i + 1}</span>
                <h3 className="mt-6 font-display text-3xl md:text-4xl leading-tight text-[#0f2a1d]">{benefit.title}</h3>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-[#0f2a1d]/75">{benefit.text}</p>
              </article>
            </Reveal>
          ))}
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
    { t: 'A real care problem', d: 'You have seen it first-hand. Describe what goes wrong, for whom, and how often. Plain language is perfect.' },
    { t: 'Your rough idea', d: 'A sketch, a voice note, a workaround you already use. Early is fine.' },
    { t: 'Time and curiosity', d: 'Partnership means staying involved. Your clinical eye is the part nobody else can supply.' },
  ];
  return (
    <section className="bg-[#0f2a1d] text-[#f4efe3] py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal><Label light>05 / Next steps</Label></Reveal>
        <Reveal delay={0.1}><h2 className="font-display mt-6 text-5xl md:text-7xl leading-[0.98] tracking-[-0.03em] max-w-4xl">What to bring to the <em className="text-[#5be36f] font-[340]">first conversation.</em></h2></Reveal>
        <div className="mt-16 grid auto-rows-fr md:grid-cols-3 gap-px bg-[#f4efe3]/10 rounded-[28px] overflow-hidden">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08} className="bg-[#0f2a1d] h-full">
              <div className="p-8 md:p-10 h-full flex flex-col min-h-[300px]" data-testid={`card-bring-${i}`}>
                <span className="font-display italic text-6xl text-[#5be36f]">{i + 1}</span>
                <h3 className="font-display mt-auto pt-10 text-2xl md:text-3xl leading-tight min-h-[2.5em] flex items-end">{it.t}</h3>
                <p className="mt-3 min-h-[5.2em] text-[#f4efe3]/65 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
            <PrimaryCTA testid="link-bring-apply">Start your application</PrimaryCTA>
            <p className="text-[#f4efe3]/60 max-w-sm">About ten minutes. It prepares an email draft in your own email app, and nothing is sent until you press send.</p>
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
  { q: 'Do I need to be a doctor?', a: 'No. Nurses, therapists, technicians, healthcare helpers and anyone who works directly with patients are especially welcome. Engineers, students and founders with a healthtech idea can apply too.' },
  { q: 'Do I need to be in Pune?', a: 'We are based in Pune and work with healthcare professionals across India, and welcome collaborators from abroad.' },
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
          <Reveal delay={0.15}>
            <Link href="/faqs" data-testid="link-home-all-faqs" className="mt-8 inline-flex items-center gap-2 font-semibold underline underline-offset-4 decoration-[#5be36f] decoration-2">
              All questions, searchable <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
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
              <Link href="/apply-now" data-testid="link-final-apply" className="group inline-flex items-center gap-3 rounded-full bg-[#0f2a1d] pl-7 pr-2 py-2 text-[#f4efe3] font-semibold hover:-translate-y-0.5 transition-transform">
                Apply with your idea
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#5be36f] text-[#0f2a1d] group-hover:rotate-45 transition-transform"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
              <a href={MAIL_PARTNER} data-testid="link-final-partner" className="inline-flex items-center rounded-full border border-[#0f2a1d]/40 px-6 py-4 font-semibold text-[#0f2a1d] hover:bg-[#0f2a1d]/10">Partnership enquiry</a>
              <a href={MAIL_INVEST} data-testid="link-final-investor" className="inline-flex items-center rounded-full border border-[#0f2a1d]/40 px-6 py-4 font-semibold text-[#0f2a1d] hover:bg-[#0f2a1d]/10">Investor enquiry</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSeo({
    title: "Biolaunchpad | You see what healthcare needs. Let's build it.",
    description: 'Biolaunchpad partners with healthcare professionals to turn first-hand problems into products that improve patient care. Doctors, nurses, therapists, technicians and anyone working directly with patients. Based in Pune, India.',
    path: '/',
  });
  return (
    <>
      <Hero />
      <Marquee />
      <Who />
      <Partnership />
      <JourneyOverview />
      <Focus />
      <Bring />
      <Questions />
      <FinalCTA />
      <MatterOfMedtech />
    </>
  );
}
