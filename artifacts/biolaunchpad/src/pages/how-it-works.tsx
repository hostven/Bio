import { PageHero } from '@/components/layout/page-hero';
import { Label, PrimaryCTA, Reveal, GhostCTA } from '@/components/brand';
import { StageTimeline } from '@/components/stage-timeline';
import { useSeo } from '@/lib/seo';

export default function HowItWorks() {
  useSeo({ title: 'How it works', description: 'The eight stages of a Biolaunchpad co-development partnership, from idea submission and assessment to development, regulatory work, manufacturing, market and growth.', path: '/how-it-works' });
  return (
    <>
      <PageHero
        crumbs={[{ label: 'How it works' }]}
        label="How it works"
        title={<>From first note <em className="text-[#1d6b3a] font-[340]">to real patients.</em></>}
        intro={<p>A co-development partnership moves through eight stages. Not every idea goes through all of them, and every product moves at its own pace. At each stage, this is what we do and what we ask of you.</p>}
      >
        <div className="flex flex-wrap gap-4">
          <PrimaryCTA testid="link-hiw-apply">Start at stage one</PrimaryCTA>
          <GhostCTA href="/faqs" testid="link-hiw-faqs">Read the FAQs</GhostCTA>
        </div>
      </PageHero>
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10"><StageTimeline /></div>
      </section>
      <section className="bg-[#0f2a1d] text-[#f4efe3] py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal><Label light>Worth knowing</Label></Reveal>
            <Reveal delay={0.1}><h2 className="font-display mt-6 text-4xl md:text-6xl leading-[1] tracking-[-0.03em]">You keep practising. <em className="text-[#5be36f] font-[340]">We carry the build.</em></h2></Reveal>
            <Reveal delay={0.2}><p className="mt-6 text-lg text-[#f4efe3]/70 max-w-2xl">Approvals are decided by regulators and funding by investors, so no stage comes with guarantees. What we commit to is doing the work alongside you and being straight about what we learn.</p></Reveal>
          </div>
          <Reveal delay={0.25} className="lg:col-span-4 lg:justify-self-end"><PrimaryCTA testid="link-hiw-apply-bottom">Apply with your idea</PrimaryCTA></Reveal>
        </div>
      </section>
    </>
  );
}
