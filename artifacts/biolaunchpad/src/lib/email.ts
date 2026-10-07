import { EMAIL } from './site';

/** Mail clients reliably accept roughly 2000 characters in a mailto URL. */
export const MAILTO_LIMIT = 1900;

export function buildSummary(title: string, rows: [string, string | undefined][]) {
  const lines = [title, '='.repeat(title.length), ''];
  for (const [label, value] of rows) {
    const v = (value ?? '').trim();
    if (!v) continue;
    if (v.includes('\n') || v.length > 80) lines.push(`${label}:`, v, '');
    else lines.push(`${label}: ${v}`);
  }
  lines.push('', `To: ${EMAIL}`);
  return lines.join('\n');
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => {
  const digits = v.replace(/\D/g, '');
  return /^[+\d\s()-]+$/.test(v.trim()) && digits.length >= 7 && digits.length <= 15;
};
export const isUrl = (v: string) => {
  try {
    const u = new URL(v.trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
};
