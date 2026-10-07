import { Check } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { ApplicationForm, SECTIONS, useApplication } from '@/components/forms/application-form';
import { useSeo } from '@/lib/seo';

export default function ApplyNow() {
  useSeo({ title: 'Apply with your idea', description: 'Share a healthcare problem you have seen first-hand and your idea for solving it. Prepares an email draft to Biolaunchpad; nothing is sent until you send it.', path: '/apply-now' });
  const app = useApplication();
  const done = (keys: readonly string[]) =>
    keys.length > 0 && keys.every((k) => {
      const val = app.v[k as keyof typeof app.v];
      return typeof val === 'boolean' ? val : Array.isArray(val) ? val.length > 0 : String(val).trim().length > 0;
    });

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Apply now' }]}
        label="Application"
        title={<>Tell us what you <em className="text-[#1d6b3a] font-[340]">keep noticing.</em></>}
        intro={<p>About ten minutes. You describe a real problem and a rough idea. We read every application and reply to the email you give us.</p>}
      />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <nav aria-label="Application sections" className="sticky top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Sections</p>
              <ol className="mt-5 space-y-1">
                {SECTIONS.map((s) => {
                  const ok = done(s.keys);
                  return (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[#0f2a1d]/5" data-testid={`link-section-${s.id}`}>
                        <span className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] transition-colors ${ok ? 'bg-[#5be36f] text-[#0f2a1d]' : 'border border-[#0f2a1d]/25 text-[#0f2a1d]/60'}`}>
                          {ok ? <Check className="h-3.5 w-3.5" /> : s.n}
                        </span>
                        <span className="text-sm">{s.t}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-8 rounded-2xl bg-[#e9e2d0] p-5 text-sm text-[#0f2a1d]/75 leading-relaxed">
                Your answers stay in this tab only. We do not save them. Use <strong>Download .txt</strong> to keep a copy before leaving the page.
              </div>
            </nav>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5">
            <ApplicationForm app={app} />
          </div>
        </div>
      </section>
    </>
  );
}
