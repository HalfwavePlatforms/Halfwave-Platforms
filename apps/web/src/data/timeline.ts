export interface TimelineMilestone {
  label: string;
  title: string;
  desc: string;
  future: boolean;
}

export const timeline: TimelineMilestone[] = [
  {
    label: '2023',
    title: 'Founded',
    desc: 'Halfwave Platforms incorporated as a holding company.',
    future: false,
  },
  {
    label: '2024',
    title: 'Forge launches',
    desc: 'First developer platform ships to early customers.',
    future: false,
  },
  {
    label: '2025',
    title: 'Current goes public',
    desc: 'Consumer app crosses one million monthly actives.',
    future: false,
  },
  {
    label: '2026',
    title: 'Present',
    desc: 'Halfwave Cloud enters private beta.',
    future: false,
  },
  {
    label: 'Next',
    title: 'Cloud GA',
    desc: 'General availability of Halfwave Cloud.',
    future: true,
  },
  {
    label: 'Future Vision',
    title: 'Full ecosystem',
    desc: 'Every vertical operating on one shared platform core.',
    future: true,
  },
];
