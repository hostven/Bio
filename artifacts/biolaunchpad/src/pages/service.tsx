import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Label, Reveal, SmartLink } from '@/components/brand';
import { TwoPaths } from '@/components/two-paths';
import { SERVICES } from '@/content/services';
import { useSeo } from '@/lib/seo';

export default function Service() {
  useSeo({ title: 'Services', description: 'Co-development partnerships and consulting services for healthtech: legal, patents and IP, regulatory, market research, funding support, prototyping, clinical trials, manufacturing and marketing.', path: '/service' });
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        label="Services"
        title={<>Two ways to work <em className="text-[#1d6b3a] font-[340]">with us.</em></>}
        intro={<p>Most people come to Biolaunchpad with an idea and want a partner to build it. Others already have a venture and need one piece of specialist help. These are different arrangements, so here is how they differ.</p>}
      />
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10"><TwoPaths /></div>
      </section>

      <section className="bg-[#e9e2d0] py-20 md:py-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <Reveal><Label>Consulting services</Label></Reveal>
              <Reveal delay={0.1}><h2 className="font-display mt-6 text-5xl md:text-7xl leading-[0.98] tracking-[-0.03em]">Twelve areas of <em className="text-[#1d6b3a] font-[340]">specialist help.</em></h2></Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-5"><p className="text-lg text-[#0f2a1d]/70">Each one can be requested on its own. Choose "Enquire" and the service will be selected for you on the enquiry form.</p></Reveal>
          </div>
          <div className="mt-14">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i, 3) * 0.04}>
                <article id={s.slug} className="group scroll-mt-28 grid md:grid-cols-12 gap-5 md:gap-8 border-t border-[#0f2a1d]/15 py-9 md:py-11" data-testid={`card-service-${s.slug}`}>
                  <span className="md:col-span-1 font-mono text-sm text-[#1d6b3a] pt-2">{String(i + 1).padStart(2, '0')}</span>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-3xl md:text-4xl leading-[1.05] transition-transform duration-500 group-hover:translate-x-1.5">{s.title}</h3>
                    <p className="mt-3 font-display italic text-xl text-[#1d6b3a]">{s.tagline}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-[#0f2a1d]/80 leading-relaxed text-lg">{s.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.points.map((pt) => <li key={pt} className="rounded-full border border-[#0f2a1d]/15 bg-[#f4efe3] px-3.5 py-1.5 text-sm">{pt}</li>)}
                    </ul>
                    <SmartLink href={`/service-inquiry?service=${s.slug}`} testid={`link-enquire-${s.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4 decoration-[#5be36f] decoration-2 hover:decoration-[#1d6b3a]">
                      Enquire about {s.title.split(' (')[0].toLowerCase()} <ArrowUpRight className="h-4 w-4" />
                    </SmartLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#0f2a1d]/60 max-w-2xl">Biolaunchpad provides guidance and connects you with the right specialists. Regulatory approvals, patents and funding are decided by regulators, patent offices and investors, so outcomes cannot be guaranteed.</p>
        </div>
      </section>
    </>
  );
}
