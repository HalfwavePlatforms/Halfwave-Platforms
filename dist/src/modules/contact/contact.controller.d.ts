import { ContactService } from './contact.service';
import { SubmitEnquiryDto } from './dto/submit-enquiry.dto';
import { QueryEnquiriesDto } from './dto/query-enquiries.dto';
import { UpdateEnquiryStatusDto } from './dto/update-status.dto';
import { AddInternalNotesDto } from './dto/add-notes.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    submit(dto: SubmitEnquiryDto): Promise<{
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
    }>;
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
    findOne(id: string): Promise<{
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
    }>;
    updateStatus(id: string, dto: UpdateEnquiryStatusDto): Promise<{
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
    }>;
    addNotes(id: string, dto: AddInternalNotesDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
