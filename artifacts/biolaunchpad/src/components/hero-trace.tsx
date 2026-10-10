import { motion, useReducedMotion } from 'framer-motion';

type Form = {
  d: string;
  fill?: string;
  stroke?: string;
  sw?: number;
  drift: { x: number[]; y: number[]; rotate: number[] };
  dur: number;
  origin: string;
  mobile?: boolean;
};

const FORMS: Form[] = [
  // large deep pebble, the anchor
  {
    d: 'M118 46 C178 22 262 38 286 96 C308 150 262 196 196 204 C128 212 70 184 62 132 C56 92 76 62 118 46 Z',
    fill: 'url(#ht-deep)',
    drift: { x: [0, 6, 0], y: [0, -4, 0], rotate: [0, 3, 0] },
    dur: 16,
    origin: '174px 124px',
    mobile: true,
  },
  // translucent leaf overlapping right
  {
    d: 'M220 70 C276 34 368 46 392 104 C412 154 366 192 300 190 C244 188 196 160 192 122 C190 100 200 82 220 70 Z',
    fill: 'url(#ht-mid)',
    drift: { x: [0, -10, 0], y: [0, 6, 0], rotate: [0, -4, 0] },
    dur: 19,
    origin: '296px 120px',
    mobile: true,
  },
  // bright green seed, the accent
  {
    d: 'M262 128 C282 108 318 112 326 136 C334 160 312 178 288 176 C264 174 248 148 262 128 Z',
    fill: '#5be36f',
    drift: { x: [0, 8, 0], y: [0, -8, 0], rotate: [0, 8, 0] },
    dur: 13,
    origin: '292px 144px',
    mobile: true,
  },
  // pale ivory-green overlay cutting across
  {
    d: 'M40 150 C90 112 170 118 226 146 C262 164 250 200 204 210 C140 222 64 204 40 180 C30 170 30 158 40 150 Z',
    fill: 'rgba(233,226,208,0.55)',
    drift: { x: [0, 12, 0], y: [0, -3, 0], rotate: [0, 2, 0] },
    dur: 21,
    origin: '140px 170px',
  },
  // contour outline echoing the pebble
  {
    d: 'M104 32 C176 2 282 22 306 92 C330 160 270 220 190 224 C112 228 44 190 40 128 C38 82 62 50 104 32 Z',
    stroke: '#1d6b3a',
    sw: 1,
    drift: { x: [0, -5, 0], y: [0, 5, 0], rotate: [0, -2.5, 0] },
    dur: 23,
    origin: '174px 124px',
    mobile: true,
  },
  // second offset contour
  {
    d: 'M232 54 C300 20 392 40 408 108',
    stroke: '#1d6b3a',
    sw: 1,
    drift: { x: [0, 6, 0], y: [0, 4, 0], rotate: [0, 3, 0] },
    dur: 17,
    origin: '320px 80px',
  },
];

export function HeroTrace({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 440 240" className="w-full h-auto overflow-visible" fill="none" focusable="false">
        <defs>
          <linearGradient id="ht-deep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1d6b3a" stopOpacity="0.92" />
            <stop offset="1" stopColor="#0f2a1d" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ht-mid" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5be36f" stopOpacity="0.55" />
            <stop offset="1" stopColor="#1d6b3a" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {FORMS.map((f, i) => (
          <motion.path
            key={i}
            d={f.d}
            fill={f.fill ?? 'none'}
            stroke={f.stroke}
            strokeWidth={f.sw}
            strokeOpacity={f.stroke ? 0.45 : undefined}
            vectorEffect="non-scaling-stroke"
            className={f.mobile ? undefined : 'hidden sm:block'}
            style={{ transformOrigin: f.origin, mixBlendMode: i === 1 ? 'multiply' : undefined }}
            animate={reduce ? undefined : f.drift}
            transition={reduce ? undefined : { duration: f.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  );
}
