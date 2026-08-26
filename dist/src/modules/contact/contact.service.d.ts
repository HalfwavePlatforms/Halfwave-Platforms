import { ContactRepository } from './contact.repository';
import { SubmitEnquiryDto } from './dto/submit-enquiry.dto';
import { QueryEnquiriesDto } from './dto/query-enquiries.dto';
import { UpdateEnquiryStatusDto } from './dto/update-status.dto';
import { AddInternalNotesDto } from './dto/add-notes.dto';
import { ContactSubmission } from '@prisma/client';
import { DatabaseService } from "../../database/database.service";
export declare class ContactService {
    private readonly contactRepository;
    private readonly db;
    constructor(contactRepository: ContactRepository, db: DatabaseService);
    submit(dto: SubmitEnquiryDto): Promise<ContactSubmission>;
    findAll(queryDto: QueryEnquiriesDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            status: import("@prisma/client").$Enums.ContactStatus;
            message: string;
            phone: string | null;
            company: string | null;
            serviceInterested: string;
            budget: string | null;
            internalNotes: string | null;
            assignedTo: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<ContactSubmission>;
    updateStatus(id: string, dto: UpdateEnquiryStatusDto): Promise<ContactSubmission>;
    addNotes(id: string, dto: AddInternalNotesDto): Promise<ContactSubmission>;
    remove(id: string): Promise<ContactSubmission>;
}
