import { PageHero } from '@/components/layout/page-hero';
import { Label, Mark, PrimaryCTA, GhostCTA, Reveal } from '@/components/brand';
import { FOUNDER_LINKEDIN } from '@/lib/site';
import { useSeo } from '@/lib/seo';

const GAPS = [
  { t: 'Far from technology', d: 'Unlike many other professionals, healthcare experts are often disconnected from technology and product development, and lack the technical know-how or confidence to take an idea forward.' },
  { t: 'Bound to practice', d: 'Running a company while keeping a clinical practice is hard, sometimes impossible. MedTech development takes significant time and effort, and few can step away from patients to do it full-time.' },
  { t: 'Looking for another path', d: 'More doctors and healthcare professionals are drawn to entrepreneurship, some feeling burned out and others wanting a path alongside clinical practice.' },
];

const STORY = [
  { k: 'The start', t: 'A clinician moves into rehabilitation robotics', d: 'Our founder, Ninad Saraf, stepped away from his practice to work on robotics for rehabilitation, determined to tackle pressing problems in rehabilitation technology.' },
  { k: 'The obstacle', t: 'The development ecosystem itself was the problem', d: 'Working with agencies and consultants, he found the process slow, opaque and often disappointing in quality. MedTech development, especially hardware, felt like a maze with few reliable guides.' },
  { k: 'The bigger gap', t: 'India lacked a strong hardware development ecosystem', d: 'Resources were fragmented, mentorship scarce and specialist talent hard to find. Funding for hardware was an uphill battle in an industry focused mainly on software, so important hardtech ideas were underfunded and neglected.' },
  { k: 'The response', t: 'A vertically integrated partner', d: 'Biolaunchpad was built to take on the complexities, from legal work and hardware development to the search for funding, so healthcare innovators can focus on the idea and the product while they continue their clinical work.' },
];

export default function AboutUs() {
  useSeo({ title: 'About us', description: 'Biolaunchpad partners with healthcare professionals to turn first-hand problems into products that improve patient care. Our mission, founder story and the gaps we work on.', path: '/about-us' });
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About us' }]}
        label="About Biolaunchpad"
        title={<>Built by a clinician <em className="text-[#1d6b3a] font-[340]">who hit the wall.</em></>}
        intro={<p>Biolaunchpad partners with healthcare professionals to turn first-hand problems into products that improve patient care. We bridge the gap between concept and creation with the expertise and hands-on support an idea needs to become a real product.</p>}
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid md:grid-cols-12 gap-5">
          <Reveal className="md:col-span-7">
            <div className="h-full rounded-[28px] bg-[#5be36f] p-8 md:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Our mission</p>
              <p className="font-display mt-6 text-3xl md:text-[2.75rem] leading-[1.1] tracking-[-0.02em]">To bring healthtech solutions to life through innovation led by the people who deliver care, partnering with them to solve real problems in healthcare.</p>
            </div>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <div className="h-full rounded-[28px] bg-[#0f2a1d] text-[#f4efe3] p-8 md:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5be36f]">What we do</p>
              <p className="font-display mt-6 text-3xl leading-[1.15]">We do not incubate ideas. <em className="text-[#5be36f] font-[340]">We co-create.</em></p>
              <p className="mt-5 text-[#f4efe3]/75 leading-relaxed">If your idea has potential, we partner with you to develop it toward a market-ready product, bringing resources, expertise and hands-on support.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#e9e2d0] py-20 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <Reveal><Label>What drives us</Label></Reveal>
            <Reveal delay={0.1}><h2 className="font-display mt-6 text-5xl md:text-6xl leading-[0.98] tracking-[-0.03em]">It started as a <em className="text-[#1d6b3a] font-[340]">personal problem.</em></h2></Reveal>
            <Reveal delay={0.15}><a href={FOUNDER_LINKEDIN} target="_blank" rel="noreferrer" className="mt-8 inline-block font-semibold underline underline-offset-4 decoration-[#1d6b3a] decoration-2" data-testid="link-founder-linkedin">Ninad Saraf on LinkedIn</a></Reveal>
          </div>
          <ol className="lg:col-span-8 relative">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-[#0f2a1d]/20" aria-hidden />
            {STORY.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.05}>
                <li className="relative pl-12 pb-12 last:pb-0" data-testid={`story-${i}`}>
                  <span className={`absolute left-0 top-2 h-[15px] w-[15px] rotate-45 ${i === STORY.length - 1 ? 'bg-[#2fb24a]' : 'bg-[#0f2a1d]'}`} aria-hidden />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">{s.k}</p>
                  <h3 className="font-display mt-3 text-3xl md:text-4xl leading-[1.05]">{s.t}</h3>
                  <p className="mt-4 text-lg text-[#0f2a1d]/78 leading-relaxed max-w-2xl">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal><Label>The gap we work on</Label></Reveal>
          <Reveal delay={0.1}>
            <p className="font-display mt-6 text-3xl md:text-5xl leading-[1.15] tracking-[-0.02em] max-w-5xl">
              Healthcare professionals are excellent at <Mark>spotting problems</Mark>. Few have the exposure, time or team to <Mark>turn them into technology</Mark>. They need a trusted partner.
            </p>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-12 gap-px bg-[#0f2a1d]/12 rounded-[28px] overflow-hidden border border-[#0f2a1d]/12">
            {GAPS.map((g, i) => (
              <Reveal key={g.t} delay={i * 0.08} className={`bg-[#faf6ec] ${['md:col-span-5', 'md:col-span-7', 'md:col-span-12'][i]}`}>
                <div className="p-8 md:p-10 h-full">
                  <span className="font-display italic text-5xl text-[#2fb24a]">{i + 1}</span>
                  <h3 className="font-display mt-6 text-2xl md:text-3xl">{g.t}</h3>
                  <p className="mt-3 text-[#0f2a1d]/70 leading-relaxed max-w-xl">{g.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-12 text-lg md:text-xl text-[#0f2a1d]/80 leading-relaxed max-w-3xl">
              We select driven people with strong ideas and work with them to make those ideas real. Partners stay focused on their practice while we take on the complexity of product development, funding and scaling. Our platform focuses on ideas from healthcare professionals, and we also welcome applications from people in any field and with any educational background.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-3 md:px-6 pb-6">
        <div className="rounded-[32px] md:rounded-[48px] bg-[#0f2a1d] text-[#f4efe3] px-6 md:px-16 py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.035em] max-w-3xl">The problem you keep noticing <em className="text-[#5be36f] font-[340]">deserves a partner.</em></h2>
            <div className="flex flex-wrap gap-4">
              <PrimaryCTA testid="link-about-apply">Apply with your idea</PrimaryCTA>
              <GhostCTA href="/how-it-works" testid="link-about-hiw" light>How it works</GhostCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
