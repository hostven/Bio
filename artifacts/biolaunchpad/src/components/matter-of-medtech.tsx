import { ArrowUpRight } from 'lucide-react';
import { Reveal, Label } from '@/components/brand';
import { asset } from '@/lib/site';

const MATTER_WEBSITE = 'https://matterofmedtech.com';

export function MatterOfMedtech() {
  return (
    <section id="collaboration" aria-labelledby="collaboration-heading" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal><Label>In collaboration</Label></Reveal>
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-5">
            <div className="h-full min-h-[260px] rounded-[28px] md:rounded-[36px] border border-[#0f2a1d]/15 bg-[#faf6ec] p-8 md:p-12 flex items-center justify-center">
              <img
                src={asset('matter-of-medtech.png')}
                alt="Matter of Medtech"
                loading="lazy"
                decoding="async"
                width={1024}
                height={361}
                className="w-full max-w-[380px] h-auto"
                data-testid="img-matter-of-medtech"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="h-full flex flex-col justify-center">
              <h2 id="collaboration-heading" className="font-display text-4xl md:text-6xl leading-[0.98] tracking-[-0.03em] text-[#0f2a1d]">
                Matter of Medtech <em className="text-[#1d6b3a] font-[340]">and Biolaunchpad.</em>
              </h2>
              <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-[#0f2a1d]">A platform for Indian medtech insights and conversations.</p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#0f2a1d]/75" data-testid="text-collaboration">
                Matter of Medtech is an initiative by Ninad Saraf, driven by an interest in medtech and how it is evolving from an Indian perspective. It is a space for discussions, insights and collaborations shaping medical technology and innovation in India. Biolaunchpad brings that perspective into practical product work with healthcare professionals.
              </p>
              <a
                href={MATTER_WEBSITE}
                data-testid="link-matter-of-medtech-contact"
                className="mt-8 self-start inline-flex items-center gap-2 font-semibold text-[#0f2a1d] underline underline-offset-4 decoration-[#5be36f] decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d6b3a] rounded-sm"
              >
                Visit Matter of Medtech <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
