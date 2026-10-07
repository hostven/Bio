export type Service = { slug: string; title: string; tagline: string; body: string; points: string[] };

export const SERVICES: Service[] = [
  {
    slug: 'quick-launch',
    title: 'Quick launch',
    tagline: 'Get your venture set up quickly.',
    body: 'Company compliance, website setup and brand identity, scoped for a turnaround of about two weeks so you can start without losing time. Useful whether you are launching something new or tidying up an existing setup.',
    points: ['Company compliance', 'Website setup', 'Brand identity'],
  },
  {
    slug: 'legal',
    title: 'Business structuring and legal documentation',
    tagline: 'A sound legal footing from the start.',
    body: 'Guidance from business formation through ongoing compliance, covering the documents a healthtech venture typically needs.',
    points: ['NDAs and deal structuring', 'Licensing and shareholder agreements', 'Customer and vendor contracts', 'Tax structuring and regulatory compliance'],
  },
  {
    slug: 'patent-ip',
    title: 'Patent and intellectual property',
    tagline: 'Protect your work in India and abroad.',
    body: 'Due diligence and patent filing support. We assess the novelty and inventiveness of a concept and help you decide a strategy for domestic and international filing.',
    points: ['Prior art and patentability searches', 'Freedom to operate (FTO) searches', 'Domestic and international filing strategy'],
  },
  {
    slug: 'regulatory',
    title: 'Regulatory services (India and USA)',
    tagline: 'Understand the rules that apply to your product.',
    body: 'We help you identify the regulations relevant to your location, product and services, including safety, quality and environmental standards, and plan how to meet them. Approval decisions rest with the regulators themselves.',
    points: ['Identify applicable regulations', 'Assess non-compliance risks and priorities', 'Monitor regulatory changes', 'Advice on structures, contracts and compliance'],
  },
  {
    slug: 'market-research',
    title: 'Market research and analysis',
    tagline: 'Know your market before you build for it.',
    body: 'We help you understand your target customers and competition, gathering information on market gaps, statistics, industry trends and pricing so you can refine the product to fit real needs.',
    points: ['Customer and competitor analysis', 'Market gaps and trends', 'Pricing insight'],
  },
  {
    slug: 'funding',
    title: 'Funding and investment support',
    tagline: 'Find the capital routes that fit your stage.',
    body: 'We share current funding options for healthtech and help with fundraising through our network of angel investors, venture capitalists and other investors in the Indian and American markets, and identify suitable government programmes. Funding outcomes depend on investors and programmes and cannot be guaranteed.',
    points: ['Healthtech funding options', 'Investor introductions', 'Government funding programmes', 'Advice from founders and mentors'],
  },
  {
    slug: 'product-design',
    title: 'Product design and rapid prototype development',
    tagline: 'From concept to something you can test.',
    body: 'We connect your venture with engineers and designers to work on functionality, structural integrity and manufacturability, and with partners for testing and manufacturing.',
    points: ['Engineering and design collaboration', 'Supplier networks for components and materials', 'Testing partners for performance and durability', 'Manufacturing partners and supply chain'],
  },
  {
    slug: 'healthtech-consulting',
    title: 'HealthTech business consulting',
    tagline: 'Strategy shaped for the healthtech industry.',
    body: 'Draw on our network of startups, investors and industry experts. We study successful healthtech models, gather feedback from providers and patients, and help you form useful partnerships and find reliable vendors.',
    points: ['Mentorship from founders and clinicians', 'Business model and positioning analysis', 'Stakeholder feedback', 'Partnerships and vendor connections'],
  },
  {
    slug: 'mentorship',
    title: 'Mentorship and guidance',
    tagline: 'Advice from people who have done it.',
    body: 'Personal guidance from experienced healthtech professionals on business planning, growth strategy, fundraising, marketing and sales.',
    points: ['Business planning', 'Growth strategy', 'Fundraising preparation', 'Marketing and sales'],
  },
  {
    slug: 'clinical-trials',
    title: 'Clinical trial support',
    tagline: 'Plan and run trials with the right expertise.',
    body: 'We work with regulatory consultants and trial experts on protocol design, and connect you with data management and statistics specialists. We also explore grants, private investment and incubator programmes that offer lab facilities.',
    points: ['Protocol design', 'Regulatory alignment', 'Data management and statistics', 'Grants and lab access'],
  },
  {
    slug: 'manufacturing',
    title: 'Healthcare-specific manufacturing consulting',
    tagline: 'Manufacturing built around healthcare standards.',
    body: 'Guidance on standards such as FDA, CE and ISO, quality systems, efficient processes, scale-up, commercialisation and post-market surveillance.',
    points: ['FDA, CE and ISO guidance', 'QA and QC systems', 'Process design and scale-up', 'Post-market surveillance'],
  },
  {
    slug: 'marketing',
    title: 'Marketing and branding strategies',
    tagline: 'Help the right people find your product.',
    body: 'Expert advice on your brand story and visual identity, search optimisation for your website and social media engagement.',
    points: ['Brand story', 'Visual identity', 'Search optimisation', 'Social media'],
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => ({ value: s.slug, label: s.title })), { value: 'others', label: 'Something else' }];
