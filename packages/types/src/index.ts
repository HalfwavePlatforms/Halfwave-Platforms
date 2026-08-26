/**
 * Shared Type Definitions & API Contracts for Halfwave Platforms Monorepo
 */

export interface ContactEnquirySubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested: string;
  budget?: string;
  message: string;
}

export type ContactEnquiryStatus =
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'completed'
  | 'closed';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export interface TeamMemberProfile {
  id: string;
  firstName: string;
  lastName: string;
  roleTitle: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface JobPostingSummary {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  experienceLevel: string;
  description: string;
  isActive: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  timestamp: string;
  path: string;
}
