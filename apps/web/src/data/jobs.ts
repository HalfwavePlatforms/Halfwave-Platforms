import type { JobPostingSummary } from '@halfwave/types';

export interface JobPosting {
  title: string;
  team: string;
  location: string;
}

// Proving workspace type import compatibility
export type SharedJobPostingContract = Partial<JobPostingSummary>;

export const jobs: JobPosting[] = [
  {
    title: 'Video Editor',
    team: 'Forge',
    location: 'Remote',
  },
];
