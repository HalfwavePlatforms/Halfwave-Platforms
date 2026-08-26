import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { ContactSubmission, ContactStatus, Prisma } from '@prisma/client';

@Injectable()
export class ContactRepository {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Persist a new contact enquiry to the database.
   */
  async create(
    data: Prisma.ContactSubmissionCreateInput,
  ): Promise<ContactSubmission> {
    return this.db.contactSubmission.create({
      data,
    });
  }

  /**
   * Find enquiries supporting search, status filtering, sorting, and pagination.
   */
  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
    status?: ContactStatus;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ data: ContactSubmission[]; total: number }> {
    const {
      page,
      limit,
      search,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ContactSubmissionWhereInput = {};

    // Apply status filter if provided
    if (status) {
      where.status = status;
    }

    // Apply case-insensitive global search
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { serviceInterested: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Validate and whitelist sort fields
    const whitelistedSortFields = [
      'name',
      'email',
      'company',
      'serviceInterested',
      'status',
      'createdAt',
      'updatedAt',
    ];
    const orderField = whitelistedSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    // Execute queries in parallel for performance
    const [data, total] = await Promise.all([
      this.db.contactSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [orderField]: sortOrder,
        },
        include: {
          assignee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.db.contactSubmission.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Find a single enquiry by its UUID ID.
   */
  async findOne(id: string): Promise<ContactSubmission | null> {
    return this.db.contactSubmission.findUnique({
      where: { id },
      include: {
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Update properties on an enquiry (status, notes, assignee).
   */
  async update(
    id: string,
    data: Prisma.ContactSubmissionUpdateInput,
  ): Promise<ContactSubmission> {
    return this.db.contactSubmission.update({
      where: { id },
      data,
      include: {
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Delete an enquiry.
   */
  async remove(id: string): Promise<ContactSubmission> {
    return this.db.contactSubmission.delete({
      where: { id },
    });
  }
}
