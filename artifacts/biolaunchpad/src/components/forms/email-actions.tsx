import { useState } from 'react';
import { Mail, Copy, Download, Info } from 'lucide-react';
import { copyText, downloadText, mailtoUrl, MAILTO_LIMIT } from '@/lib/email';
import { EMAIL, MAILTO } from '@/lib/site';

type Status = { tone: 'info' | 'warn' | 'error'; text: string } | null;

export function EmailActions({ subject, buildBody, validate, filename, testPrefix }: { subject: string; buildBody: () => string; validate: () => boolean; filename: string; testPrefix: string }) {
  const [status, setStatus] = useState<Status>(null);

  const openDraft = async () => {
    if (!validate()) {
      setStatus({ tone: 'error', text: 'Some required details are missing or need fixing. Check the highlighted fields above.' });
      return;
    }
    const body = buildBody();
    const url = mailtoUrl(subject, body);
    if (url.length > MAILTO_LIMIT) {
      const copied = await copyText(body);
      const short = `${copied ? 'My full details are copied to my clipboard and pasted below.' : 'Please see my attached summary (.txt).'}\n\n[Paste here]\n`;
      window.location.href = mailtoUrl(subject, short);
      setStatus({
        tone: 'warn',
        text: copied
          ? 'Your details are too long to fit in an email link, so we copied the full summary to your clipboard. In the draft, paste it where it says "Paste here". Nothing is sent until you press send in your email app.'
          : 'Your details are too long for an email link and copying was blocked. Use "Download .txt" and attach the file to the draft. Nothing is sent until you press send in your email app.',
      });
      return;
    }
    window.location.href = url;
    setStatus({ tone: 'info', text: `We asked your device to open an email draft to ${EMAIL}. Nothing has been sent. Review it and press send in your email app. If no draft appeared, copy or download the summary instead. Your answers stay on this page.` });
  };

  const copy = async () => {
    const ok = await copyText(buildBody());
    setStatus(ok ? { tone: 'info', text: `Summary copied. Paste it into a new email to ${EMAIL}. Nothing has been sent.` } : { tone: 'error', text: 'Your browser blocked copying. Try "Download .txt" instead.' });
  };

  const download = () => {
    downloadText(filename, buildBody());
    setStatus({ tone: 'info', text: `Summary downloaded as ${filename}. Attach it or paste it into an email to ${EMAIL}. Nothing has been sent.` });
  };

  return (
    <div className="rounded-[28px] bg-[#0f2a1d] text-[#f4efe3] p-6 md:p-8">
      <div className="flex items-start gap-3 text-[#f4efe3]/80">
        <Info className="h-5 w-5 mt-0.5 shrink-0 text-[#5be36f]" aria-hidden />
        <p className="text-sm md:text-base leading-relaxed">
          This form does not send anything by itself. <strong className="text-[#f4efe3]">Open email draft</strong> prepares a message to {EMAIL} in your own email app. Nothing is sent until you press send there.
        </p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
        <button type="button" onClick={openDraft} data-testid={`button-${testPrefix}-open-draft`} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#5be36f] pl-6 pr-2 py-2 font-semibold text-[#0f2a1d] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5be36f]">
          Open email draft
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f2a1d] text-[#5be36f]"><Mail className="h-4 w-4" /></span>
        </button>
        <button type="button" onClick={copy} data-testid={`button-${testPrefix}-copy`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f4efe3]/25 px-5 py-3.5 font-semibold hover:bg-[#f4efe3]/10 transition-colors">
          <Copy className="h-4 w-4" /> Copy summary
        </button>
        <button type="button" onClick={download} data-testid={`button-${testPrefix}-download`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f4efe3]/25 px-5 py-3.5 font-semibold hover:bg-[#f4efe3]/10 transition-colors">
          <Download className="h-4 w-4" /> Download .txt
        </button>
      </div>
      <div aria-live="polite" className="min-h-[1px]">
        {status && (
          <p data-testid={`status-${testPrefix}`} className={`mt-5 rounded-2xl px-4 py-3 text-sm leading-relaxed ${status.tone === 'error' ? 'bg-[#e2603a]/20 text-[#ffd9cc]' : status.tone === 'warn' ? 'bg-[#f4efe3]/10 text-[#f4efe3]' : 'bg-[#5be36f]/12 text-[#d8f7dc]'}`}>
            {status.text}
          </p>
        )}
      </div>
      <p className="mt-5 text-xs text-[#f4efe3]/55">
        Copy and download work even with incomplete answers, so you can save your progress. Prefer to write directly? <a href={MAILTO} className="underline underline-offset-4 text-[#f4efe3]/80" data-testid={`link-${testPrefix}-direct-email`}>Email {EMAIL}</a>.
      </p>
    </div>
  );
}
