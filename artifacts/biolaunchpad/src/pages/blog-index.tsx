import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { ArticleCard } from '@/components/blog/article-card';
import { Reveal } from '@/components/brand';
import { ARTICLES, CATEGORIES, type Category } from '@/content/blog';
import { useSeo } from '@/lib/seo';

export default function BlogIndex() {
  useSeo({ title: 'Blog', description: 'Articles from Biolaunchpad on SaMDs, healthcare data, clinician innovators, medical product development and our mission.', path: '/blog/' });
  const [cat, setCat] = useState<Category | 'All'>('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ARTICLES.filter((a) => (cat === 'All' || a.category === cat) && (!s || `${a.title} ${a.dek}`.toLowerCase().includes(s)));
  }, [cat, q]);
  const idx = (slug: string) => ARTICLES.findIndex((a) => a.slug === slug);
  const [first, ...rest] = list;

  return (
    <>
      <PageHero crumbs={[{ label: 'Blog' }]} label="Field notes" title={<>Notes on building <em className="text-[#1d6b3a] font-[340]">healthcare products.</em></>} intro={<p>Eight articles, first published on biolaunchpad.com between September and December 2024.</p>} />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-y border-[#0f2a1d]/12 py-5">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {(['All', ...CATEGORIES] as const).map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${cat === c ? 'bg-[#0f2a1d] text-[#f4efe3]' : 'border border-[#0f2a1d]/20 hover:border-[#1d6b3a]'}`} data-testid={`button-blog-cat-${c.toLowerCase().replace(/\W+/g, '-')}`}>{c}</button>
              ))}
            </div>
            <div className="relative md:w-72">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d6b3a]" aria-hidden />
              <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="w-full rounded-full border border-[#0f2a1d]/20 bg-[#faf6ec] pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2fb24a]/50" data-testid="input-blog-search" />
            </div>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0f2a1d]/55" aria-live="polite">{list.length} {list.length === 1 ? 'article' : 'articles'}</p>
          {list.length === 0 ? (
            <div className="mt-10 rounded-[28px] border border-dashed border-[#0f2a1d]/25 p-12 text-center" data-testid="empty-blog">
              <p className="font-display text-3xl">No articles match that.</p>
              <button type="button" onClick={() => { setQ(''); setCat('All'); }} className="mt-6 rounded-full bg-[#0f2a1d] px-5 py-3 font-semibold text-[#f4efe3]" data-testid="button-reset-blog">Show all articles</button>
            </div>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Reveal className="md:col-span-2 lg:col-span-3"><ArticleCard a={first} index={idx(first.slug)} large /></Reveal>
              {rest.map((a, i) => <Reveal key={a.slug} delay={(i % 3) * 0.06}><ArticleCard a={a} index={idx(a.slug)} /></Reveal>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
