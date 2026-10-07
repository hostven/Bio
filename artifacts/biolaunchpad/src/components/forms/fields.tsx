import { type ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';

type Base = { id: string; label: string; required?: boolean; hint?: ReactNode; error?: string; className?: string };

const inputCls = (err?: string) =>
  `mt-2 w-full rounded-2xl border bg-[#faf6ec] px-4 py-3.5 text-base text-[#0f2a1d] placeholder:text-[#0f2a1d]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2fb24a]/50 ${err ? 'border-[#c4441f]' : 'border-[#0f2a1d]/20 focus:border-[#1d6b3a]'}`;

function Shell({ id, label, required, hint, error, className = '', children, asLegend = false }: Base & { children: ReactNode; asLegend?: boolean }) {
  const lab = (
    <>
      {label}
      {required ? <span className="text-[#c4441f] ml-1" aria-hidden>*</span> : <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0f2a1d]/45">Optional</span>}
    </>
  );
  const meta = (
    <>
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-sm text-[#0f2a1d]/60">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-[#c4441f]" data-testid={`error-${id}`}>{error}</p>}
    </>
  );
  if (asLegend) {
    return (
      <fieldset className={className} aria-describedby={[hint ? `${id}-hint` : '', error ? `${id}-error` : ''].join(' ').trim() || undefined}>
        <legend className="font-semibold text-[#0f2a1d]">{lab}</legend>
        {meta}
        {children}
      </fieldset>
    );
  }
  return (
    <div className={className}>
      <label htmlFor={id} className="font-semibold text-[#0f2a1d]">{lab}</label>
      {children}
      {meta}
    </div>
  );
}

const described = (id: string, hint?: ReactNode, error?: string) => [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].join(' ').trim() || undefined;

export function TextField(p: Base & { value: string; onChange: (v: string) => void; type?: string; placeholder?: string; autoComplete?: string; inputMode?: 'numeric' | 'tel' | 'email' | 'url' }) {
  return (
    <Shell {...p}>
      <input
        id={p.id}
        name={p.id}
        type={p.type ?? 'text'}
        value={p.value}
        placeholder={p.placeholder}
        autoComplete={p.autoComplete}
        inputMode={p.inputMode}
        onChange={(e) => p.onChange(e.target.value)}
        aria-invalid={!!p.error}
        aria-required={p.required}
        aria-describedby={described(p.id, p.hint, p.error)}
        className={inputCls(p.error)}
        data-testid={`input-${p.id}`}
      />
    </Shell>
  );
}

export function TextArea(p: Base & { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; maxLength?: number }) {
  return (
    <Shell {...p}>
      <textarea
        id={p.id}
        name={p.id}
        rows={p.rows ?? 6}
        value={p.value}
        maxLength={p.maxLength}
        placeholder={p.placeholder}
        onChange={(e) => p.onChange(e.target.value)}
        aria-invalid={!!p.error}
        aria-required={p.required}
        aria-describedby={described(p.id, p.hint, p.error)}
        className={`${inputCls(p.error)} resize-y leading-relaxed`}
        data-testid={`input-${p.id}`}
      />
      {p.maxLength && <p className="mt-1 text-right font-mono text-[11px] text-[#0f2a1d]/45">{p.value.length} / {p.maxLength}</p>}
    </Shell>
  );
}

export function SelectField(p: Base & { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder: string }) {
  return (
    <Shell {...p}>
      <div className="relative">
        <select
          id={p.id}
          name={p.id}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
          aria-invalid={!!p.error}
          aria-required={p.required}
          aria-describedby={described(p.id, p.hint, p.error)}
          className={`${inputCls(p.error)} appearance-none pr-12 ${p.value ? '' : 'text-[#0f2a1d]/50'}`}
          data-testid={`select-${p.id}`}
        >
          <option value="">{p.placeholder}</option>
          {p.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[#1d6b3a]" />
      </div>
    </Shell>
  );
}

export function PillRadio(p: Base & { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Shell {...p} asLegend>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" id={p.id}>
        {p.options.map((o) => {
          const on = p.value === o;
          return (
            <label key={o} className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-[#2fb24a]/60 ${on ? 'bg-[#0f2a1d] border-[#0f2a1d] text-[#f4efe3]' : 'border-[#0f2a1d]/20 hover:border-[#1d6b3a] bg-[#faf6ec]'}`}>
              <input type="radio" name={p.id} value={o} checked={on} onChange={() => p.onChange(o)} className="sr-only" data-testid={`radio-${p.id}-${o.toLowerCase().replace(/\W+/g, '-')}`} />
              {o}
            </label>
          );
        })}
      </div>
    </Shell>
  );
}

export function PillChecks(p: Base & { values: string[]; onChange: (v: string[]) => void; options: string[]; exclusive?: string }) {
  const toggle = (o: string) => {
    if (o === p.exclusive) return p.onChange(p.values.includes(o) ? [] : [o]);
    const base = p.values.filter((v) => v !== p.exclusive);
    p.onChange(base.includes(o) ? base.filter((v) => v !== o) : [...base, o]);
  };
  return (
    <Shell {...p} asLegend>
      <div className="mt-3 flex flex-wrap gap-2" id={p.id}>
        {p.options.map((o) => {
          const on = p.values.includes(o);
          return (
            <label key={o} className={`cursor-pointer inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-[#2fb24a]/60 ${on ? 'bg-[#5be36f] border-[#0f2a1d]/30 text-[#0f2a1d]' : 'border-[#0f2a1d]/20 hover:border-[#1d6b3a] bg-[#faf6ec]'}`}>
              <input type="checkbox" checked={on} onChange={() => toggle(o)} className="sr-only" data-testid={`check-${p.id}-${o.toLowerCase().replace(/\W+/g, '-')}`} />
              {on && <Check className="h-3.5 w-3.5" aria-hidden />}
              {o}
            </label>
          );
        })}
      </div>
    </Shell>
  );
}

export function Acknowledge({ id, checked, onChange, error, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={`flex items-start gap-4 cursor-pointer rounded-2xl border p-5 transition-colors ${checked ? 'border-[#1d6b3a] bg-[#5be36f]/15' : error ? 'border-[#c4441f]' : 'border-[#0f2a1d]/20'}`}>
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className="peer sr-only" data-testid={`check-${id}`} />
        <span aria-hidden className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2fb24a] ${checked ? 'bg-[#0f2a1d] border-[#0f2a1d] text-[#5be36f]' : 'border-[#0f2a1d]/40 bg-[#faf6ec]'}`}>
          {checked && <Check className="h-4 w-4" />}
        </span>
        <span className="text-[#0f2a1d]/85 leading-relaxed">{children}<span className="text-[#c4441f] ml-1" aria-hidden>*</span></span>
      </label>
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-[#c4441f]">{error}</p>}
    </div>
  );
}

/** Focus the first invalid field after validation. */
export function focusFirstError(errors: Record<string, string>, order: string[]) {
  const first = order.find((k) => errors[k]);
  if (!first) return;
  const el = document.getElementById(first);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  const focusable = el.matches('input,select,textarea') ? el : el.querySelector<HTMLElement>('input,select,textarea');
  (focusable as HTMLElement | null)?.focus({ preventScroll: true });
}
