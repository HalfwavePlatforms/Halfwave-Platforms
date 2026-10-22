import type { ServiceItem } from '@halfwave/types';

export type ServiceStatus = 'live' | 'dev' | 'research';

export interface ServiceOffering {
  name: string;
  cat: string;
  status: ServiceStatus;
  desc: string;
  detail: string;
}

// Proving workspace type import from @halfwave/types
export type SharedServiceContract = ServiceItem;

export const products: ServiceOffering[] = [
  {
    name: 'Web Development',
    cat: 'Professional Services',
    status: 'live',
    desc: 'Custom Business Websites, Corporate Websites, Portfolio Websites, Landing Pages, E-Commerce Websites, Admin Dashboards, CMS Development, Progressive Web Apps (PWA).',
    detail:
      'Modern web platforms designed to present, convert, and scale your brand online.',
  },
  {
    name: 'Mobile App Development',
    cat: 'Professional Services',
    status: 'live',
    desc: 'Android Applications, iOS Applications, Flutter Apps, React Native Apps, Enterprise Applications, Business Management Apps, E-Commerce Apps.',
    detail:
      'Cross-platform and native mobile experiences for business efficiency and customer growth.',
  },
  {
    name: 'AI & Machine Learning',
    cat: 'Professional Services',
    status: 'live',
    desc: 'AI Chatbots, Custom AI Solutions, Large Language Model Integrations, AI Automation, Computer Vision, Recommendation Systems, Predictive Analytics, Generative AI Solutions.',
    detail:
      'Intelligent systems that streamline operations and unlock automation opportunities.',
  },
  {
    name: 'Data Analytics',
    cat: 'Professional Services',
    status: 'dev',
    desc: 'Business Intelligence Dashboards, Data Visualization, KPI Reporting, Sales Analytics, Customer Analytics, Data Cleaning, Data Warehousing, Predictive Insights.',
    detail:
      'Decision-ready dashboards and reporting pipelines built for actionable insight.',
  },
  {
    name: 'UI/UX Design',
    cat: 'Professional Services',
    status: 'live',
    desc: 'Product Design, Wireframes, Prototypes, User Experience Design, User Interface Design, Mobile UI, Web UI, Design Systems.',
    detail:
      'Design systems and user journeys that elevate product clarity and conversion.',
  },
  {
    name: 'Graphic Designing',
    cat: 'Professional Services',
    status: 'research',
    desc: 'Brand Identity, Logo Design, Social Media Creatives, Posters, Flyers, Brochures, Business Cards, Marketing Creatives.',
    detail:
      'Premium visual identity and marketing collateral for stronger brand presence.',
  },
  {
    name: 'Video Editing',
    cat: 'Professional Services',
    status: 'live',
    desc: 'Promotional Videos, Corporate Videos, Product Videos, Social Media Reels, YouTube Editing, Motion Graphics, Short-form Content, Brand Advertisements.',
    detail:
      'High-impact visual storytelling optimized for digital engagement and brand recall.',
  },
  {
    name: 'Cloud & Deployment',
    cat: 'Professional Services',
    status: 'dev',
    desc: 'AWS Deployment, Azure Deployment, VPS Hosting, CI/CD, Docker, Kubernetes, Server Management, Domain & SSL Setup.',
    detail:
      'Reliable cloud delivery and infrastructure management for secure, scalable launches.',
  },
];
