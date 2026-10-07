import { useSearch } from 'wouter';
import { PageHero } from '@/components/layout/page-hero';
import { ServiceInquiryForm } from '@/components/forms/service-inquiry-form';
import { SmartLink } from '@/components/brand';
import { useSeo } from '@/lib/seo';

export default function ServiceInquiry() {
  useSeo({ title: 'Service enquiry', description: 'Ask Biolaunchpad about a specific service: IP, regulatory, market research, funding support, prototyping, legal and more.', path: '/service-inquiry' });
  const search = useSearch();
  const service = new URLSearchParams(search).get('service') ?? '';
  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/service' }, { label: 'Service enquiry' }]} label="Service enquiry" title={<>Ask about <em className="text-[#1d6b3a] font-[340]">one specific thing.</em></>} intro={<p>For consulting services with a defined scope. If you want Biolaunchpad to co-develop your idea as a partner, <SmartLink href="/apply-now" className="underline underline-offset-4 decoration-[#5be36f] decoration-2">apply instead</SmartLink>.</p>} />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[860px] px-5 md:px-10">
          <ServiceInquiryForm key={service} initialService={service} />
          <p className="mt-8"><SmartLink href="/service" className="text-sm underline underline-offset-4 text-[#0f2a1d]/70" testid="link-back-services">Back to all services</SmartLink></p>
        </div>
      </section>
    </>
  );
}
