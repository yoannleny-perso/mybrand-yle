export interface Achievement {
  slug: string;
  name: string;
  summary: string;
  projectType: string;
  industry: string;
  location: string;
  status: 'Case study in preparation';
  capabilities: string[];
  accent: string;
  href: string | null;
}

export const achievements: Achievement[] = [
  {
    slug: 'groupiq',
    name: 'GroupIQ',
    summary: 'A centralized reporting portal for the pharmaceutical industry in Australia.',
    projectType: 'Reporting portal',
    industry: 'Pharmaceuticals',
    location: 'Australia',
    status: 'Case study in preparation',
    capabilities: ['Data products', 'Executive reporting', 'Governance'],
    accent: '#2446ff',
    href: null,
  },
  {
    slug: 'polaris',
    name: 'Polaris',
    summary: 'A clearer way to run people operations.',
    projectType: 'Operations platform',
    industry: 'People operations',
    location: 'Confidential',
    status: 'Case study in preparation',
    capabilities: ['Operating model', 'Product strategy', 'Decision systems'],
    accent: '#2446ff',
    href: null,
  },
  {
    slug: 'lense-studio',
    name: 'Lense Studio',
    summary: 'An automated way to audit dashboards and propose improvements.',
    projectType: 'AI audit product',
    industry: 'Analytics',
    location: 'Global',
    status: 'Case study in preparation',
    capabilities: ['Agentic AI', 'Dashboard design', 'Quality automation'],
    accent: '#2446ff',
    href: null,
  },
  {
    slug: 'cap-ostrea',
    name: 'Cap Ostrea',
    summary: 'A mobile marketplace for oyster producers in Arcachon Bay.',
    projectType: 'Mobile marketplace',
    industry: 'Aquaculture',
    location: 'Arcachon Bay, France',
    status: 'Case study in preparation',
    capabilities: ['Marketplace design', 'Mobile product', 'Local operations'],
    accent: '#2446ff',
    href: null,
  },
  {
    slug: 'media-data-studio',
    name: 'Media Data Studio',
    summary: 'A multi-agent system that connects media platforms and builds an AI-ready data architecture.',
    projectType: 'Multi-agent data system',
    industry: 'Media',
    location: 'Global',
    status: 'Case study in preparation',
    capabilities: ['Multi-agent systems', 'Platform integration', 'AI-ready architecture'],
    accent: '#2446ff',
    href: null,
  },
];
