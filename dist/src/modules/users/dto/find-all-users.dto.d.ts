import { Status } from '@prisma/client';
export declare class FindAllUsersQueryDto {
    page: number;
    limit: number;
    search?: string;
    role?: string;
    status?: Status;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
