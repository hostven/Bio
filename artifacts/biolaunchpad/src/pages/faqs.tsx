import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { FaqAccordion } from '@/components/faq-accordion';
import { PrimaryCTA, GhostCTA } from '@/components/brand';
import { FAQS, FAQ_CATS, type FaqCat } from '@/content/faqs';
import { MAILTO } from '@/lib/site';
import { useSeo } from '@/lib/seo';

export default function Faqs() {
  useSeo({ title: 'FAQs', description: 'Answers about Biolaunchpad: who can apply, how ideas are assessed, equity partnerships, IP and NDAs, services, regulatory support and location.', path: '/faqs' });
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<FaqCat | 'All'>('All');
  const [open, setOpen] = useState<Set<string>>(new Set([FAQS[0].q]));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => (cat === 'All' || f.cat === cat) && (!q || `${f.q} ${f.a} ${(f.list ?? []).join(' ')}`.toLowerCase().includes(q)));
  }, [query, cat]);

  const toggle = (q: string) => setOpen((s) => {
    const n = new Set(s);
    if (n.has(q)) n.delete(q);
    else n.add(q);
    return n;
  });

  const grouped = FAQ_CATS.map((c) => ({ c, items: results.filter((f) => f.cat === c) })).filter((g) => g.items.length);

  return (
    <>
      <PageHero crumbs={[{ label: 'FAQs' }]} label="Questions" title={<>Honest answers, <em className="text-[#1d6b3a] font-[340]">before you apply.</em></>} intro={<p>Search, or browse by topic. If your question is not here, write to us.</p>} />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <label htmlFor="faq-search" className="sr-only">Search questions</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d6b3a]" aria-hidden />
                <input id="faq-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search, for example equity or NDA" className="w-full rounded-full border border-[#0f2a1d]/20 bg-[#faf6ec] pl-11 pr-11 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2fb24a]/50" data-testid="input-faq-search" />
                {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full hover:bg-[#0f2a1d]/5" data-testid="button-clear-search"><X className="h-4 w-4" /></button>}
              </div>
              <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
                {(['All', ...FAQ_CATS] as const).map((c) => (
                  <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${cat === c ? 'bg-[#0f2a1d] text-[#f4efe3]' : 'border border-[#0f2a1d]/20 hover:border-[#1d6b3a]'}`} data-testid={`button-cat-${c.toLowerCase().replace(/\W+/g, '-')}`}>{c}</button>
                ))}
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0f2a1d]/55" aria-live="polite" data-testid="text-faq-count">{results.length} of {FAQS.length} questions</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {grouped.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#0f2a1d]/25 p-10 text-center" data-testid="empty-faq">
                <p className="font-display text-3xl">Nothing matches "{query}".</p>
                <p className="mt-3 text-[#0f2a1d]/65">Try a broader word, or ask us directly.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => { setQuery(''); setCat('All'); }} className="rounded-full bg-[#0f2a1d] px-5 py-3 font-semibold text-[#f4efe3]" data-testid="button-reset-faq">Show all questions</button>
                  <a href={MAILTO} className="rounded-full border border-[#0f2a1d]/25 px-5 py-3 font-semibold" data-testid="link-faq-email">Email us</a>
                </div>
              </div>
            ) : (
              grouped.map((g) => (
                <div key={g.c} className="mb-14 last:mb-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1d6b3a] mb-2">{g.c}</p>
                  <FaqAccordion items={g.items} openSet={open} toggle={toggle} />
                </div>
              ))
            )}
            <div className="mt-16 flex flex-wrap gap-4">
              <PrimaryCTA testid="link-faq-apply">Apply with your idea</PrimaryCTA>
              <GhostCTA href="/contact" testid="link-faq-contact">Ask a question</GhostCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
