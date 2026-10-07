import type { Category } from '@/content/blog';

const THEMES: Record<Category, { bg: string; fg: string; motif: 'grid' | 'rings' | 'bars' | 'rocket' }> = {
  'Healthtech explained': { bg: '#0f2a1d', fg: '#5be36f', motif: 'grid' },
  'Clinician innovators': { bg: '#5be36f', fg: '#0f2a1d', motif: 'rings' },
  'Building products': { bg: '#e9e2d0', fg: '#1d6b3a', motif: 'bars' },
  'Inside Biolaunchpad': { bg: '#1d6b3a', fg: '#f4efe3', motif: 'rocket' },
};

/** Typographic, generative cover per category. No remote images. */
export function ArticleCover({ category, index, className = '' }: { category: Category; index: number; className?: string }) {
  const t = THEMES[category];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: t.bg }} aria-hidden>
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" style={{ color: t.fg }}>
        {t.motif === 'grid' && Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${i * 50} 0V250M0 ${i * 32}H400`} stroke="currentColor" strokeOpacity=".18" />)}
        {t.motif === 'grid' && <path d="M0 170 L80 170 L105 110 L130 210 L150 150 L400 150" fill="none" stroke="currentColor" strokeWidth="3" />}
        {t.motif === 'rings' && [40, 80, 120, 160].map((r) => <circle key={r} cx={300 - index * 10} cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity=".35" />)}
        {t.motif === 'bars' && Array.from({ length: 10 }).map((_, i) => <rect key={i} x={30 + i * 36} y={220 - ((i * 37 + index * 13) % 140) - 30} width="18" height={((i * 37 + index * 13) % 140) + 30} fill="currentColor" fillOpacity={i % 3 === 0 ? 0.9 : 0.25} rx="3" />)}
        {t.motif === 'rocket' && (
          <g transform={`translate(${250 + index * 6} 40)`}>
            <path d="M40 0 C60 20 64 60 56 110 H24 C16 60 20 20 40 0Z" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="40" cy="45" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M28 120 L40 160 L52 120" fill="currentColor" fillOpacity=".4" />
            {[0, 1, 2].map((k) => <circle key={k} cx={-120 + k * 50} cy={160 - k * 30} r="2.5" fill="currentColor" />)}
          </g>
        )}
      </svg>
      <span className="absolute left-5 bottom-4 font-display text-6xl leading-none" style={{ color: t.fg, opacity: 0.9 }}>{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}
