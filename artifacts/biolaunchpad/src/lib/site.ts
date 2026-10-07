export const EMAIL = 'biolaunchpad@gmail.com';
export const MAILTO = `mailto:${EMAIL}`;
export const MAIL_PARTNER = `mailto:${EMAIL}?subject=${encodeURIComponent('Partnership enquiry')}`;
export const MAIL_INVEST = `mailto:${EMAIL}?subject=${encodeURIComponent('Investor enquiry')}`;
export const SITE_URL = 'https://biolaunchpad.com';
export const FOUNDER_LINKEDIN = 'https://linkedin.com/in/ninad-saraf-6a73a079';

export const NAV = [
  { href: '/about-us', label: 'About' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/service', label: 'Services' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export const EASE = [0.22, 1, 0.36, 1] as const;
