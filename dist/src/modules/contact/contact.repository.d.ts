import { DatabaseService } from "../../database/database.service";
import { ContactSubmission, ContactStatus, Prisma } from '@prisma/client';
export declare class ContactRepository {
    private readonly db;
    constructor(db: DatabaseService);
    create(data: Prisma.ContactSubmissionCreateInput): Promise<ContactSubmission>;
    findAll(params: {
        page: number;
        limit: number;
        search?: string;
        status?: ContactStatus;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
        data: ContactSubmission[];
        total: number;
    }>;
    findOne(id: string): Promise<ContactSubmission | null>;
    update(id: string, data: Prisma.ContactSubmissionUpdateInput): Promise<ContactSubmission>;
    remove(id: string): Promise<ContactSubmission>;
}
