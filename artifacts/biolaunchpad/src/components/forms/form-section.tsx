import { type ReactNode } from 'react';

export function FormSection({ id, n, title, intro, children }: { id: string; n: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-[#0f2a1d]/12 pt-10 md:pt-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-[#1d6b3a]">{n}</span>
        <h2 id={`${id}-title`} className="font-display text-3xl md:text-4xl tracking-[-0.02em]">{title}</h2>
      </div>
      {intro && <p className="mt-3 text-[#0f2a1d]/65 max-w-xl md:ml-10">{intro}</p>}
      <div className="mt-8 grid gap-7 md:ml-10">{children}</div>
    </section>
  );
}
