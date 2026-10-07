import type { Block } from '@/content/blog';

export const headingId = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        if (b.t === 'h')
          return (
            <h2 key={i} id={headingId(b.x)} className="scroll-mt-28 font-display text-3xl md:text-4xl leading-[1.08] tracking-[-0.02em] mt-14 mb-5 flex items-baseline gap-4">
              {b.n && <span className="font-mono text-sm text-[#1d6b3a] shrink-0">{b.n}</span>}
              <span>{b.x}</span>
            </h2>
          );
        if (b.t === 'ul')
          return (
            <ul key={i} className="my-6 space-y-3">
              {b.items.map((it) => <li key={it} className="flex gap-4 items-start text-lg leading-relaxed text-[#0f2a1d]/85"><span className="mt-3 h-1.5 w-1.5 rotate-45 bg-[#2fb24a] shrink-0" />{it}</li>)}
            </ul>
          );
        if (b.t === 'note')
          return (
            <aside key={i} className="my-10 rounded-[24px] border-l-4 border-[#2fb24a] bg-[#e9e2d0] px-6 py-5 font-display italic text-xl md:text-2xl leading-snug">{b.x}</aside>
          );
        return <p key={i} className={`my-5 leading-[1.75] text-[#0f2a1d]/85 ${i === 0 ? 'text-xl md:text-2xl font-display leading-snug text-[#0f2a1d]' : 'text-lg'}`}>{b.x}</p>;
      })}
    </div>
  );
}
