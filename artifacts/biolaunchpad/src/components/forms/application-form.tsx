import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { TextField, TextArea, SelectField, PillRadio, PillChecks, Acknowledge, focusFirstError } from './fields';
import { FormSection } from './form-section';
import { EmailActions } from './email-actions';
import { ALLOPATHY_SPECIALTIES, EDUCATION, PROFESSIONS, ROLES, SURGICAL_SPECIALTIES } from '@/content/application-options';
import { buildSummary, isEmail, isPhone, isUrl } from '@/lib/email';

const toOpts = (a: string[]) => a.map((v) => ({ value: v, label: v }));

const EMPTY = {
  firstName: '', lastName: '', age: '', email: '', phone: '',
  profession: '', degree: '', role: '', roleOther: '', allopathy: '', surgical: '', specialtyOther: '',
  education: [] as string[],
  problem: '', solution: '',
  supportingLink: '', resumeLink: '', linkedin: '',
  ack: false,
};
type Values = typeof EMPTY;
type Errors = Partial<Record<keyof Values, string>>;

const ORDER: (keyof Values)[] = ['firstName', 'lastName', 'age', 'email', 'phone', 'profession', 'degree', 'role', 'roleOther', 'allopathy', 'surgical', 'education', 'problem', 'solution', 'supportingLink', 'resumeLink', 'linkedin', 'ack'];

export const SECTIONS = [
  { id: 'about-you', n: '01', t: 'About you', keys: ['firstName', 'lastName', 'age', 'email'] },
  { id: 'background', n: '02', t: 'Your background', keys: ['profession', 'degree', 'role'] },
  { id: 'your-idea', n: '03', t: 'The problem and your idea', keys: ['problem', 'solution'] },
  { id: 'links', n: '04', t: 'Links (optional)', keys: [] },
  { id: 'before-you-send', n: '05', t: 'Before you send', keys: ['ack'] },
] as const;

export function useApplication() {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const set = <K extends keyof Values>(k: K) => (val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  return { v, set, errors, setErrors };
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = 'Enter your first name.';
  if (!v.lastName.trim()) e.lastName = 'Enter your last name.';
  const age = Number(v.age);
  if (!v.age.trim()) e.age = 'Enter your age.';
  else if (!Number.isInteger(age) || age < 1 || age > 120) e.age = 'Enter your age as a whole number.';
  if (!v.email.trim()) e.email = 'Enter an email address so we can reply.';
  else if (!isEmail(v.email)) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.phone.trim() && !isPhone(v.phone)) e.phone = 'Enter a valid phone number, or leave it blank.';
  if (!v.profession) e.profession = 'Choose the option that best describes you.';
  if (!v.degree.trim()) e.degree = 'Enter your degree, or "None" if not applicable.';
  if (!v.role) e.role = 'Choose your primary role.';
  if (v.role === 'Other' && !v.roleOther.trim()) e.roleOther = 'Tell us your role.';
  if (v.role === 'Allopathy doctor' && !v.allopathy) e.allopathy = 'Choose your specialty.';
  if (v.role === 'Surgeon' && !v.surgical) e.surgical = 'Choose your surgical specialty.';
  if (v.problem.trim().length < 30) e.problem = 'Describe the problem in a few sentences (at least 30 characters).';
  if (v.solution.trim().length < 30) e.solution = 'Outline your proposed solution in a few sentences (at least 30 characters).';
  (['supportingLink', 'resumeLink', 'linkedin'] as const).forEach((k) => {
    if (v[k].trim() && !isUrl(v[k])) e[k] = 'Enter a full link starting with https://';
  });
  if (!v.ack) e.ack = 'Please confirm you have read and agree to the terms above.';
  return e;
}

function summary(v: Values) {
  const spec = v.role === 'Allopathy doctor' ? v.allopathy : v.role === 'Surgeon' ? v.surgical : '';
  return buildSummary('Biolaunchpad application', [
    ['Name', `${v.firstName} ${v.lastName}`.trim()],
    ['Age', v.age],
    ['Reply email', v.email],
    ['Phone', v.phone],
    ['Profession', v.profession],
    ['Degree', v.degree],
    ['Primary role', v.role === 'Other' ? `Other: ${v.roleOther}` : v.role],
    ['Specialty', spec === 'Other' && v.specialtyOther ? `Other: ${v.specialtyOther}` : spec],
    ['Education completed', v.education.join(', ')],
    ['The problem', v.problem],
    ['Proposed solution', v.solution],
    ['Supporting document link', v.supportingLink],
    ['Resume link', v.resumeLink],
    ['LinkedIn', v.linkedin],
    ['Acknowledgement', v.ack ? 'I have read and agree to the first-stage terms (no NDA, no confidential designs or patient data, possible overlap with existing projects).' : 'Not yet confirmed'],
  ]);
}

export function ApplicationForm({ app }: { app: ReturnType<typeof useApplication> }) {
  const { v, set, errors, setErrors } = app;
  const run = () => {
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) {
      setTimeout(() => focusFirstError(e as Record<string, string>, ORDER as string[]), 30);
      return false;
    }
    return true;
  };
  const showSpecOther = (v.role === 'Allopathy doctor' && v.allopathy === 'Other') || (v.role === 'Surgeon' && v.surgical === 'Other');

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="grid gap-14" aria-label="Application">
      <FormSection id="about-you" n="01" title="About you" intro="So we know who we are talking to and where to reply.">
        <div className="grid sm:grid-cols-2 gap-7">
          <TextField id="firstName" label="First name" required value={v.firstName} onChange={set('firstName')} error={errors.firstName} autoComplete="given-name" />
          <TextField id="lastName" label="Last name" required value={v.lastName} onChange={set('lastName')} error={errors.lastName} autoComplete="family-name" />
        </div>
        <div className="grid sm:grid-cols-[160px_1fr] gap-7">
          <TextField id="age" label="Age" required value={v.age} onChange={set('age')} error={errors.age} inputMode="numeric" />
          <TextField id="email" label="Email for our reply" required type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" inputMode="email" />
        </div>
        <TextField id="phone" label="Phone" type="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" inputMode="tel" placeholder="+91" />
      </FormSection>

      <FormSection id="background" n="02" title="Your background" intro="You do not need a medical degree to apply. This helps us understand your perspective.">
        <PillRadio id="profession" label="Which best describes you?" required options={PROFESSIONS} value={v.profession} onChange={set('profession')} error={errors.profession} />
        <TextField id="degree" label="Degree" required value={v.degree} onChange={set('degree')} error={errors.degree} placeholder="For example MBBS, BPT, B.Sc Nursing, B.Tech" />
        <SelectField id="role" label="Primary professional role" required placeholder="Select your role" options={toOpts(ROLES)} value={v.role} onChange={(val) => { set('role')(val); set('allopathy')(''); set('surgical')(''); }} error={errors.role} />
        {v.role === 'Other' && <TextField id="roleOther" label="Your role" required value={v.roleOther} onChange={set('roleOther')} error={errors.roleOther} />}
        {v.role === 'Allopathy doctor' && <SelectField id="allopathy" label="Your specialty" required placeholder="Select specialty" options={toOpts(ALLOPATHY_SPECIALTIES)} value={v.allopathy} onChange={set('allopathy')} error={errors.allopathy} />}
        {v.role === 'Surgeon' && <SelectField id="surgical" label="Your surgical specialty" required placeholder="Select specialty" options={toOpts(SURGICAL_SPECIALTIES)} value={v.surgical} onChange={set('surgical')} error={errors.surgical} />}
        {showSpecOther && <TextField id="specialtyOther" label="Specialty name" value={v.specialtyOther} onChange={set('specialtyOther')} />}
        <PillChecks id="education" label="Education completed" hint="Select all that apply." options={EDUCATION} exclusive="Not applicable" values={v.education} onChange={set('education')} />
      </FormSection>

      <FormSection id="your-idea" n="03" title="The problem and your idea" intro="Plain language is perfect. Describe what you have seen, not confidential details of how to build it.">
        <TextArea id="problem" label="Describe the problem you have identified" required rows={7} maxLength={3000} value={v.problem} onChange={set('problem')} error={errors.problem} hint="What goes wrong, for whom, how often, and why current options fall short." />
        <TextArea id="solution" label="Outline your proposed solution" required rows={7} maxLength={3000} value={v.solution} onChange={set('solution')} error={errors.solution} hint="The general idea. Keep core design concepts and IP details private at this stage." />
      </FormSection>

      <FormSection id="links" n="04" title="Links (optional)" intro="No uploads. Share links instead, set to 'Anyone with the link can view'.">
        <TextField id="supportingLink" label="Pitch, idea or supporting document (PDF or Word on Google Drive)" type="url" inputMode="url" value={v.supportingLink} onChange={set('supportingLink')} error={errors.supportingLink} placeholder="https://drive.google.com/..." />
        <TextField id="resumeLink" label="Resume (Google Drive link)" type="url" inputMode="url" value={v.resumeLink} onChange={set('resumeLink')} error={errors.resumeLink} placeholder="https://drive.google.com/..." />
        <TextField id="linkedin" label="LinkedIn profile" type="url" inputMode="url" value={v.linkedin} onChange={set('linkedin')} error={errors.linkedin} placeholder="https://www.linkedin.com/in/..." />
      </FormSection>

      <FormSection id="before-you-send" n="05" title="Before you send">
        <div className="rounded-[24px] border border-[#e2603a]/40 bg-[#e2603a]/[0.07] p-6 md:p-8">
          <div className="flex items-center gap-3 text-[#9a3412]">
            <ShieldAlert className="h-5 w-5" aria-hidden />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Protect your idea</p>
          </div>
          <ul className="mt-5 space-y-3 text-[#0f2a1d]/85 leading-relaxed">
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#e2603a] shrink-0" />We do not sign NDAs at this first stage. Do not include specific intellectual property details, core design concepts or confidential drawings.</li>
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#e2603a] shrink-0" />Never include patient data or anything that could identify a patient.</li>
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#e2603a] shrink-0" />We work with many innovators, so similar ideas may already be in progress. We cannot take responsibility for overlap with existing projects. Ideas alone cannot be owned; what matters is turning them into unique, patentable solutions.</li>
            <li className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 rotate-45 bg-[#e2603a] shrink-0" />We do not share your data with any third party.</li>
          </ul>
        </div>
        <Acknowledge id="ack" checked={v.ack} onChange={set('ack')} error={errors.ack}>
          I have read and understood the above, and I agree to these conditions for sharing my idea.
        </Acknowledge>
        <EmailActions subject={`Application: ${v.firstName || 'New'} ${v.lastName}`.trim()} buildBody={() => summary(v)} validate={run} filename="biolaunchpad-application.txt" testPrefix="apply" />
      </FormSection>
    </form>
  );
}
