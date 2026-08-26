import { ContactStatus } from '@prisma/client';
export declare class QueryEnquiriesDto {
    page: number;
    limit: number;
    search?: string;
    status?: ContactStatus;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
