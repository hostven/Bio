import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.45, 0, 0.2, 1] as const;
const CYCLE = 11;

const LINES = [
  // device body: a soft handheld instrument outline
  { d: 'M40 120 C40 78 70 60 110 60 L250 60 C300 60 330 84 330 120 C330 156 300 180 250 180 L110 180 C70 180 40 162 40 120 Z', w: 1.1, o: 0.55, delay: 0 },
  // inner engineering panel
  { d: 'M120 92 L230 92 C244 92 252 100 252 114 L252 126 C252 140 244 148 230 148 L120 148', w: 0.8, o: 0.4, delay: 0.6 },
  // organic observation curve flowing into the device
  { d: 'M0 40 C40 40 52 92 92 104 C108 109 116 114 120 120', w: 0.9, o: 0.45, delay: 1.2 },
  // output line toward something useful
  { d: 'M330 120 C352 120 360 96 384 92 L420 92', w: 0.9, o: 0.45, delay: 2.0 },
  // fine measurement ticks
  { d: 'M150 170 L150 176 M180 170 L180 176 M210 170 L210 176 M240 170 L240 176', w: 0.7, o: 0.35, delay: 2.4 },
];

const NODES = [
  { cx: 92, cy: 104, delay: 1.9, bright: false },
  { cx: 120, cy: 120, delay: 2.3, bright: false },
  { cx: 252, cy: 120, delay: 2.8, bright: true },
  { cx: 384, cy: 92, delay: 3.4, bright: true },
];

export function HeroTrace({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 420 200" className="w-full h-auto overflow-visible" fill="none" focusable="false">
        {LINES.map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            stroke="#1d6b3a"
            strokeWidth={l.w}
            strokeOpacity={l.o}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className={i >= 3 ? 'hidden sm:block' : undefined}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={reduce ? { duration: 0 } : { duration: CYCLE, times: [0, 0.38, 0.85, 1], delay: l.delay * 0.4, repeat: Infinity, repeatDelay: 1.5, ease: EASE }}
          />
        ))}
        {NODES.map((n, i) => (
          <g key={i} className={i === 3 ? 'hidden sm:block' : undefined}>
            <circle cx={n.cx} cy={n.cy} r={6} stroke="#1d6b3a" strokeOpacity={0.18} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={n.bright ? 3 : 2.4}
              fill={n.bright ? '#5be36f' : '#1d6b3a'}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
              animate={reduce ? { opacity: 1, scale: 1 } : { opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 0.4] }}
              transition={reduce ? { duration: 0 } : { duration: CYCLE, times: [0, n.delay / CYCLE, n.delay / CYCLE + 0.06, 0.85, 1], repeat: Infinity, repeatDelay: 1.5, ease: EASE }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
