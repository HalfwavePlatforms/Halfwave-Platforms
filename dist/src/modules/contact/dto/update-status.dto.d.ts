import { ContactStatus } from '@prisma/client';
export declare class UpdateEnquiryStatusDto {
    status: ContactStatus;
    assignedTo?: string;
}
