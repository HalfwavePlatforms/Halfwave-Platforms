import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { SubmitEnquiryDto } from './dto/submit-enquiry.dto';
import { QueryEnquiriesDto } from './dto/query-enquiries.dto';
import { UpdateEnquiryStatusDto } from './dto/update-status.dto';
import { AddInternalNotesDto } from './dto/add-notes.dto';
import { ContactSubmission, Prisma } from '@prisma/client';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly db: DatabaseService,
  ) {}

  /**
   * Submit a new public contact enquiry.
   */
  async submit(dto: SubmitEnquiryDto): Promise<ContactSubmission> {
    return this.contactRepository.create(dto);
  }

  /**
   * Fetch paginated list of enquiries supporting filters and search matching.
   */
  async findAll(queryDto: QueryEnquiriesDto) {
    const { page, limit, search, status, sortBy, sortOrder } = queryDto;

    const { data, total } = await this.contactRepository.findAll({
      page,
      limit,
      search,
      status,
      sortBy,
      sortOrder,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  /**
   * Find details of a single enquiry by UUID.
   */
  async findOne(id: string): Promise<ContactSubmission> {
    const enquiry = await this.contactRepository.findOne(id);
    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID "${id}" not found.`);
    }
    return enquiry;
  }

  /**
   * Update the status and/or assign a staff member to the enquiry.
   */
  async updateStatus(
    id: string,
    dto: UpdateEnquiryStatusDto,
  ): Promise<ContactSubmission> {
    // Confirm the enquiry exists
    await this.findOne(id);

    // If an assignee is provided, verify they exist in the database
    if (dto.assignedTo) {
      const userExists = await this.db.user.findUnique({
        where: { id: dto.assignedTo },
      });
      if (!userExists) {
        throw new BadRequestException(
          `Staff assignment failed: User with ID "${dto.assignedTo}" does not exist.`,
        );
      }
    }

    const updateData: Prisma.ContactSubmissionUpdateInput = {
      status: dto.status,
    };

    if (dto.assignedTo !== undefined) {
      updateData.assignee = dto.assignedTo
        ? { connect: { id: dto.assignedTo } }
        : { disconnect: true };
    }

    return this.contactRepository.update(id, updateData);
  }

  /**
   * Save internal notes or coordinator remarks on the enquiry.
   */
  async addNotes(
    id: string,
    dto: AddInternalNotesDto,
  ): Promise<ContactSubmission> {
    // Confirm the enquiry exists
    await this.findOne(id);

    return this.contactRepository.update(id, {
      internalNotes: dto.notes,
    });
  }

  /**
   * Permanently delete an enquiry from the database.
   */
  async remove(id: string): Promise<ContactSubmission> {
    // Confirm the enquiry exists
    await this.findOne(id);

    return this.contactRepository.remove(id);
  }
}
