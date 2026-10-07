import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/page-hero';
import { ArticleBody, headingId } from '@/components/blog/article-body';
import { ArticleCover } from '@/components/blog/article-cover';
import { ArticleCard } from '@/components/blog/article-card';
import { PrimaryCTA } from '@/components/brand';
import { ARTICLES, findArticle, formatDate, readingMinutes } from '@/content/blog';
import { copyText } from '@/lib/email';
import { SITE_URL } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import NotFound from './not-found';

export default function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const a = findArticle(slug);
  if (!a) return <NotFound />;
  return <Post key={a.slug} slug={a.slug} />;
}

function Post({ slug }: { slug: string }) {
  const a = findArticle(slug)!;
  const i = ARTICLES.findIndex((x) => x.slug === slug);
  useSeo({ title: a.title, description: a.dek, path: `/blog/${a.slug}`, type: 'article' });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${a.slug}`;
  const toc = a.blocks.filter((b) => b.t === 'h') as { t: 'h'; x: string; n?: string }[];
  const newer = ARTICLES[i - 1];
  const older = ARTICLES[i + 1];
  const related = ARTICLES.filter((x) => x.category === a.category && x.slug !== a.slug).slice(0, 2);

  return (
    <article>
      {!reduce && <motion.div className="fixed left-0 right-0 top-[72px] z-40 h-[3px] bg-[#2fb24a] origin-left" style={{ scaleX: scrollYProgress }} aria-hidden />}
      <header className="pt-[104px] md:pt-[128px]">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: a.title }]} />
          <div className="mt-10 max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1d6b3a]">{a.category}</p>
            <h1 className="font-display mt-5 text-[clamp(2.2rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.03em] font-[420]" data-testid="text-article-title">{a.title}</h1>
            <p className="mt-6 text-xl text-[#0f2a1d]/70 leading-relaxed max-w-2xl">{a.dek}</p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0f2a1d]/50">Published</dt><dd><time dateTime={a.published}>{formatDate(a.published)}</time></dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0f2a1d]/50">Updated</dt><dd><time dateTime={a.updated}>{formatDate(a.updated)}</time></dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0f2a1d]/50">Reading time</dt><dd>{readingMinutes(a)} min</dd></div>
            </dl>
          </div>
          <ArticleCover category={a.category} index={i} className="mt-12 rounded-[28px] md:rounded-[36px] aspect-[16/9] md:aspect-[24/9]" />
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-14 md:py-20 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="lg:sticky lg:top-28 grid gap-8">
            {toc.length > 2 && (
              <nav aria-label="In this article" className="hidden lg:block">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">In this article</p>
                <ol className="mt-4 space-y-2 text-sm">
                  {toc.map((h) => <li key={h.x}><a href={`#${headingId(h.x)}`} className="text-[#0f2a1d]/70 hover:text-[#0f2a1d] leading-snug block">{h.n ? `${h.n}  ` : ''}{h.x}</a></li>)}
                </ol>
              </nav>
            )}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Share</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#0f2a1d]/20 px-4 py-2 hover:bg-[#0f2a1d] hover:text-[#f4efe3]" data-testid="link-share-linkedin">LinkedIn</a>
                <a href={`https://api.whatsapp.com/send/?text=${encodeURIComponent(`${a.title} ${url}`)}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#0f2a1d]/20 px-4 py-2 hover:bg-[#0f2a1d] hover:text-[#f4efe3]" data-testid="link-share-whatsapp">WhatsApp</a>
                <button type="button" onClick={async () => setCopied(await copyText(url))} className="inline-flex items-center gap-2 rounded-full border border-[#0f2a1d]/20 px-4 py-2 hover:bg-[#0f2a1d] hover:text-[#f4efe3]" data-testid="button-copy-link"><Link2 className="h-3.5 w-3.5" />{copied ? 'Link copied' : 'Copy link'}</button>
              </div>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold" data-testid="link-back-blog"><ArrowLeft className="h-4 w-4" />All articles</Link>
          </div>
        </aside>
        <div className="lg:col-span-7 lg:col-start-5 order-1 lg:order-2 max-w-[700px]">
          <ArticleBody blocks={a.blocks} />
          <p className="mt-14 pt-6 border-t border-[#0f2a1d]/12 text-sm text-[#0f2a1d]/55">Originally published on biolaunchpad.com on {formatDate(a.published)}. Edited for clarity.</p>
        </div>
      </div>

      <nav aria-label="More articles" className="mx-auto max-w-[1320px] px-5 md:px-10 grid sm:grid-cols-2 gap-4">
        {newer ? <Link href={`/blog/${newer.slug}`} className="group rounded-[24px] border border-[#0f2a1d]/15 p-6 hover:bg-[#e9e2d0] transition-colors" data-testid="link-newer"><span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1d6b3a]"><ArrowLeft className="h-3.5 w-3.5" />Newer</span><span className="mt-2 block font-display text-xl leading-snug">{newer.title}</span></Link> : <span />}
        {older && <Link href={`/blog/${older.slug}`} className="group rounded-[24px] border border-[#0f2a1d]/15 p-6 text-right hover:bg-[#e9e2d0] transition-colors" data-testid="link-older"><span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1d6b3a]">Older<ArrowRight className="h-3.5 w-3.5" /></span><span className="mt-2 block font-display text-xl leading-snug">{older.title}</span></Link>}
      </nav>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 md:px-10 pt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1d6b3a]">More in {a.category}</p>
          <div className="mt-6 grid md:grid-cols-2 gap-5">{related.map((r) => <ArticleCard key={r.slug} a={r} index={ARTICLES.indexOf(r)} />)}</div>
        </section>
      )}

      <section className="mx-auto max-w-[1320px] px-5 md:px-10 py-20">
        <div className="rounded-[32px] bg-[#0f2a1d] text-[#f4efe3] p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-display text-4xl md:text-5xl leading-[1] max-w-xl">Seen a problem worth solving? <em className="text-[#5be36f] font-[340]">Tell us.</em></h2>
          <PrimaryCTA testid="link-article-apply">Apply with your idea</PrimaryCTA>
        </div>
      </section>
    </article>
  );
}
