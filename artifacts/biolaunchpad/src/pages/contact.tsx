import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { Reveal, SmartLink } from '@/components/brand';
import { EMAIL, MAILTO, MAIL_INVEST, MAIL_PARTNER } from '@/lib/site';
import { useSeo } from '@/lib/seo';

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Contact Biolaunchpad in Pune, India. For innovators, investors, mentors and industry leaders. Email biolaunchpad@gmail.com.', path: '/contact' });
  return (
    <>
      <PageHero crumbs={[{ label: 'Contact' }]} label="Contact" title={<>Write to us. <em className="text-[#1d6b3a] font-[340]">A person reads it.</em></>} intro={<p>Questions, collaborations, investment or mentorship. If you have an idea to share, the <SmartLink href="/apply-now" className="underline underline-offset-4 decoration-[#5be36f] decoration-2">application</SmartLink> is the better route.</p>} />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <div className="lg:col-span-5 grid gap-6 content-start">
            <Reveal>
              <div className="rounded-[28px] border border-[#0f2a1d]/15 bg-[#faf6ec] p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Direct</p>
                <a href={MAILTO} className="mt-4 flex items-center gap-3 font-display text-2xl hover:text-[#1d6b3a] break-all" data-testid="link-contact-email"><Mail className="h-5 w-5 shrink-0" />{EMAIL}</a>
                <p className="mt-3 flex items-center gap-3 text-[#0f2a1d]/75"><MapPin className="h-5 w-5" />Pune, India</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[28px] bg-[#0f2a1d] text-[#f4efe3] p-7 md:p-9">
                <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full border border-[#5be36f]/20 anim-drift" aria-hidden />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5be36f]">Fuel healthtech innovation</p>
                <h2 className="font-display mt-4 text-3xl md:text-4xl leading-tight">Investors, mentors and industry leaders.</h2>
                <p className="mt-4 text-[#f4efe3]/75 leading-relaxed">We work with healthcare professionals on ideas with real commercial value and the potential for meaningful impact. Your involvement can help these products grow and bridge the gap between technology and real clinical needs.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={MAIL_INVEST} className="inline-flex items-center gap-2 rounded-full bg-[#5be36f] px-5 py-3 font-semibold text-[#0f2a1d]" data-testid="link-contact-investor">Investor enquiry <ArrowUpRight className="h-4 w-4" /></a>
                  <a href={MAIL_PARTNER} className="inline-flex items-center gap-2 rounded-full border border-[#f4efe3]/30 px-5 py-3 font-semibold" data-testid="link-contact-partner">Partnership enquiry</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <SmartLink href="/service-inquiry" testid="link-contact-service" className="group flex items-center justify-between rounded-[28px] border border-[#0f2a1d]/15 p-7 hover:bg-[#e9e2d0] transition-colors">
                <span><span className="block font-display text-2xl">Need a specific service?</span><span className="text-[#0f2a1d]/65">IP, regulatory, funding support and more.</span></span>
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:rotate-45" />
              </SmartLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
