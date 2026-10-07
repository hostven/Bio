import { useState } from 'react';
import { TextField, TextArea, SelectField, PillRadio, focusFirstError } from './fields';
import { EmailActions } from './email-actions';
import { INQUIRY_PROFESSIONS } from '@/content/application-options';
import { SERVICE_OPTIONS } from '@/content/services';
import { buildSummary, isEmail, isPhone } from '@/lib/email';

type V = { firstName: string; lastName: string; email: string; phone: string; profession: string; service: string; details: string };
const ORDER = ['firstName', 'lastName', 'email', 'phone', 'profession', 'service', 'details'];

export function ServiceInquiryForm({ initialService }: { initialService: string }) {
  const valid = SERVICE_OPTIONS.some((o) => o.value === initialService) ? initialService : '';
  const [v, setV] = useState<V>({ firstName: '', lastName: '', email: '', phone: '', profession: '', service: valid, details: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof V, string>>>({});
  const set = (k: keyof V) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const label = SERVICE_OPTIONS.find((o) => o.value === v.service)?.label ?? '';
  const run = () => {
    const e: Partial<Record<keyof V, string>> = {};
    if (!v.firstName.trim()) e.firstName = 'Enter your first name.';
    if (!v.lastName.trim()) e.lastName = 'Enter your last name.';
    if (!v.email.trim()) e.email = 'Enter your email address.';
    else if (!isEmail(v.email)) e.email = 'Enter a valid email address.';
    if (!v.phone.trim()) e.phone = 'Enter your phone number.';
    else if (!isPhone(v.phone)) e.phone = 'Enter a valid phone number (7 to 15 digits).';
    if (!v.profession) e.profession = 'Choose the option that best describes you.';
    if (!v.service) e.service = 'Choose a service.';
    if (v.service === 'others' && v.details.trim().length < 10) e.details = 'Tell us what you need (at least 10 characters).';
    setErrors(e);
    if (Object.keys(e).length) {
      setTimeout(() => focusFirstError(e as Record<string, string>, ORDER), 30);
      return false;
    }
    return true;
  };
  const body = () => buildSummary('Biolaunchpad service enquiry', [['Name', `${v.firstName} ${v.lastName}`.trim()], ['Email', v.email], ['Phone', v.phone], ['Profession', v.profession], ['Service', label], ['Details', v.details]]);

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="grid gap-7" aria-label="Service enquiry">
      <SelectField id="service" label="Service" required placeholder="Select a service" options={SERVICE_OPTIONS} value={v.service} onChange={set('service')} error={errors.service} hint={valid && v.service === valid ? 'Prefilled from the services page. You can change it.' : undefined} />
      <div className="grid sm:grid-cols-2 gap-7">
        <TextField id="firstName" label="First name" required value={v.firstName} onChange={set('firstName')} error={errors.firstName} autoComplete="given-name" />
        <TextField id="lastName" label="Last name" required value={v.lastName} onChange={set('lastName')} error={errors.lastName} autoComplete="family-name" />
      </div>
      <div className="grid sm:grid-cols-2 gap-7">
        <TextField id="email" label="Email" required type="email" inputMode="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <TextField id="phone" label="Phone" required type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="+91" />
      </div>
      <PillRadio id="profession" label="Which best describes you?" required options={INQUIRY_PROFESSIONS} value={v.profession} onChange={set('profession')} error={errors.profession} />
      <TextArea id="details" label="What do you need?" required={v.service === 'others'} rows={5} maxLength={2000} value={v.details} onChange={set('details')} error={errors.details} hint="Stage of your venture, what you need help with and any timing. No confidential designs or patient data." />
      <EmailActions subject={`Service enquiry: ${label || 'General'}`} buildBody={body} validate={run} filename="biolaunchpad-service-enquiry.txt" testPrefix="service" />
    </form>
  );
}
