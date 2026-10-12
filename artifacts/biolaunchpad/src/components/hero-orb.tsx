import { useEffect, useRef } from 'react';
import './hero-orb.css';

export function HeroOrb({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    const apply = () => el.classList.toggle('orb-paused', !visible || document.hidden);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; apply(); });
    io.observe(el);
    document.addEventListener('visibilitychange', apply);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', apply); };
  }, []);
  return (
    <div ref={ref} className={`hero-orb ${className}`} aria-hidden="true">
      <div className="orb-halo" />
      <div className="orb-body">
        <div className="orb-core" />
        <div className="orb-lobe orb-lobe-a" />
        <div className="orb-lobe orb-lobe-b" />
        <div className="orb-lobe orb-lobe-c" />
        <div className="orb-ribbon" />
        <div className="orb-shine" />
        <div className="orb-rim" />
      </div>
    </div>
  );
}
