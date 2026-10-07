import { Link } from 'wouter';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { Logo } from '@/components/brand';
import { EMAIL, MAILTO, MAIL_INVEST, MAIL_PARTNER, NAV } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1320px] px-5 md:px-10 py-14">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Logo className="h-7 w-auto" />
          <p className="mt-5 text-[#0f2a1d]/70 max-w-sm">
            Biolaunchpad partners with healthcare professionals to turn first-hand problems into products that improve patient care.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Explore</p>
          <ul className="mt-4 space-y-2">
            <li><Link href="/" className="hover:text-[#1d6b3a]" data-testid="link-footer-home">Home</Link></li>
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-[#1d6b3a]" data-testid={`link-footer-${n.href.slice(1)}`}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1d6b3a]">Get in touch</p>
          <a href={MAILTO} className="mt-4 flex items-center gap-3 hover:text-[#1d6b3a]" data-testid="link-footer-email"><Mail className="h-4 w-4" />{EMAIL}</a>
          <p className="mt-2 flex items-center gap-3"><MapPin className="h-4 w-4" />Pune, India</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/apply-now" className="font-semibold underline underline-offset-4 decoration-[#5be36f] decoration-2" data-testid="link-footer-apply">Apply now</Link>
            <Link href="/service-inquiry" className="underline underline-offset-4 decoration-[#0f2a1d]/20" data-testid="link-footer-service-inquiry">Service enquiry</Link>
            <a href={MAIL_PARTNER} className="underline underline-offset-4 decoration-[#0f2a1d]/20" data-testid="link-footer-partner">Partnerships</a>
            <a href={MAIL_INVEST} className="underline underline-offset-4 decoration-[#0f2a1d]/20" data-testid="link-footer-investor">Investors</a>
          </div>
        </div>
      </div>
      <div className="mt-14 pt-6 border-t border-[#0f2a1d]/10 flex flex-col sm:flex-row justify-between gap-2 text-sm text-[#0f2a1d]/60">
        <p>&copy; {new Date().getFullYear()} Biolaunchpad. Pune, India.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0 })} className="inline-flex items-center gap-2 hover:text-[#0f2a1d]" data-testid="button-back-top">
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
