import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { ArticleCover } from './article-cover';
import { type Article, formatDate, readingMinutes } from '@/content/blog';

export function ArticleCard({ a, index, large = false }: { a: Article; index: number; large?: boolean }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group flex flex-col h-full rounded-[28px] overflow-hidden border border-[#0f2a1d]/12 bg-[#faf6ec] hover:-translate-y-1 transition-transform duration-500" data-testid={`card-article-${a.slug}`}>
      <ArticleCover category={a.category} index={index} className={large ? 'aspect-[16/9] md:aspect-[21/10]' : 'aspect-[16/10]'} />
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0f2a1d]/55">
          <span className="text-[#1d6b3a]">{a.category}</span>
          <span aria-hidden>/</span>
          <time dateTime={a.published}>{formatDate(a.published)}</time>
          <span aria-hidden>/</span>
          <span>{readingMinutes(a)} min read</span>
        </div>
        <h3 className={`font-display mt-4 leading-[1.08] tracking-[-0.015em] ${large ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>{a.title}</h3>
        <p className="mt-3 text-[#0f2a1d]/70 leading-relaxed line-clamp-3">{a.dek}</p>
        <span className="mt-auto pt-6 inline-flex items-center gap-2 font-semibold text-sm">Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></span>
      </div>
    </Link>
  );
}
