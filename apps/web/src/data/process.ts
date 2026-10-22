export interface ProcessStep {
  title: string;
  desc: string;
}

export const processItems: ProcessStep[] = [
  {
    title: 'Discovery & Planning',
    desc: 'We understand your business goals, users, competitors, and technical requirements before development begins.',
  },
  {
    title: 'UI/UX Design',
    desc: 'Our designers create intuitive, modern interfaces focused on usability and exceptional user experience.',
  },
  {
    title: 'Development',
    desc: 'We build scalable web applications, mobile apps, AI solutions, and cloud-based systems using modern technologies.',
  },
  {
    title: 'Testing & Quality Assurance',
    desc: 'Every feature is tested for performance, security, responsiveness, and reliability before deployment.',
  },
  {
    title: 'Deployment',
    desc: 'We deploy your project using industry-standard DevOps practices with secure hosting and CI/CD pipelines.',
  },
  {
    title: 'Maintenance & Support',
    desc: 'We provide continuous improvements, monitoring, updates, bug fixes, and long-term technical support.',
  },
];
