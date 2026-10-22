import type { TeamMemberProfile } from '@halfwave/types';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

// Proving workspace type import compatibility
export type SharedTeamProfileContract = Partial<TeamMemberProfile>;

export const team: TeamMember[] = [
  {
    name: 'Deepak GM',
    role: 'Founder & Full Stack Developer',
    bio: 'Leads product strategy, software architecture, AI integration, and full-stack development across Halfwave Platforms.',
    image: '/team/deepak-gm.jpg',
  },
  {
    name: 'Dhyan K',
    role: 'AI/ML Engineer',
    bio: 'Builds intelligent machine learning models, automation systems, and data-driven solutions.',
  },
  {
    name: 'Aneesh Nagesh',
    role: 'Creative Designer',
    bio: 'Designs intuitive user experiences, brand identities, graphics, and visual design systems.',
  },
  {
    name: 'Tharun Kumar SV',
    role: 'Chief Marketing Officer',
    bio: 'Drives marketing strategy, brand growth, market positioning, and studio partnerships.',
  },
];
