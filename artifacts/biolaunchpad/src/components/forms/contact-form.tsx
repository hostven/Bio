import { useState } from 'react';
import { TextField, TextArea, focusFirstError } from './fields';
import { EmailActions } from './email-actions';
import { buildSummary, isEmail, isPhone } from '@/lib/email';

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', message: '' };
type V = typeof EMPTY;
const ORDER = ['firstName', 'lastName', 'email', 'phone', 'message'];

export function ContactForm() {
  const [v, setV] = useState<V>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof V, string>>>({});
  const set = (k: keyof V) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const run = () => {
    const e: Partial<Record<keyof V, string>> = {};
    if (!v.firstName.trim()) e.firstName = 'Enter your first name.';
    if (!v.lastName.trim()) e.lastName = 'Enter your last name.';
    if (!v.email.trim()) e.email = 'Enter your email address.';
    else if (!isEmail(v.email)) e.email = 'Enter a valid email address.';
    if (!v.phone.trim()) e.phone = 'Enter your phone number.';
    else if (!isPhone(v.phone)) e.phone = 'Enter a valid phone number (7 to 15 digits).';
    if (v.message.trim().length < 10) e.message = 'Write a short message (at least 10 characters).';
    setErrors(e);
    if (Object.keys(e).length) {
      setTimeout(() => focusFirstError(e as Record<string, string>, ORDER), 30);
      return false;
    }
    return true;
  };
  const body = () => buildSummary('Biolaunchpad contact message', [['Name', `${v.firstName} ${v.lastName}`.trim()], ['Email', v.email], ['Phone', v.phone], ['Message', v.message]]);

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="grid gap-7" aria-label="Contact" id="contact-form">
      <div className="grid sm:grid-cols-2 gap-7">
        <TextField id="firstName" label="First name" required value={v.firstName} onChange={set('firstName')} error={errors.firstName} autoComplete="given-name" />
        <TextField id="lastName" label="Last name" required value={v.lastName} onChange={set('lastName')} error={errors.lastName} autoComplete="family-name" />
      </div>
      <div className="grid sm:grid-cols-2 gap-7">
        <TextField id="email" label="Email" required type="email" inputMode="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <TextField id="phone" label="Phone" required type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="+91" />
      </div>
      <TextArea id="message" label="Message" required rows={6} maxLength={2000} value={v.message} onChange={set('message')} error={errors.message} hint="Investor, mentor, partner or just curious? Tell us a little about why you are getting in touch." />
      <EmailActions subject={`Contact: ${`${v.firstName} ${v.lastName}`.trim() || 'Website enquiry'}`} buildBody={body} validate={run} filename="biolaunchpad-message.txt" testPrefix="contact" />
    </form>
  );
}
