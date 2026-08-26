import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReorderServicesDto } from './dto/reorder-services.dto';
import { QueryServicesDto } from './dto/query-services.dto';
import { Service, Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Helper utility to convert a text title into a URL-safe unique slug.
   */
  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word characters
      .replace(/--+/g, '-') // Replace multiple dashes with single dash
      .replace(/^-+/, '') // Trim dash from start
      .replace(/-+$/, ''); // Trim dash from end
  }

  /**
   * Create a new service under admin credentials.
   */
  async create(dto: CreateServiceDto, userId: string): Promise<Service> {
    const slug = this.slugify(dto.title);

    // Confirm that the slug is unique
    const existing = await this.db.service.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(
        `A service with the slug "${slug}" generated from title already exists.`,
      );
    }

    return this.db.service.create({
      data: {
        title: dto.title,
        slug,
        summary: dto.summary,
        description: dto.description,
        icon: dto.icon,
        displayOrder: dto.displayOrder ?? 0,
        isActive: dto.isActive ?? true,
        createdBy: userId ? { connect: { id: userId } } : undefined,
      },
    });
  }

  /**
   * Fetch all active/visible services for the public website.
   */
  async findAllActive(): Promise<Service[]> {
    return this.db.service.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    });
  }

  /**
   * Fetch all services with pagination and filters (Admin Dashboard).
   */
  async findAllAdmin(query: QueryServicesDto) {
    const { page, limit, isActive } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ServiceWhereInput = {
      deletedAt: null,
    };

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [data, total] = await Promise.all([
      this.db.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          displayOrder: 'asc',
        },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          updatedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.db.service.count({ where }),
    ]);

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
   * View details of a specific service by UUID.
   */
  async findOne(id: string): Promise<Service> {
    const service = await this.db.service.findFirst({
      where: { id, deletedAt: null },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID "${id}" not found.`);
    }

    return service;
  }

  /**
   * Update service properties.
   */
  async update(
    id: string,
    dto: UpdateServiceDto,
    userId: string,
  ): Promise<Service> {
    await this.findOne(id);

    const updateData: Prisma.ServiceUpdateInput = {
      title: dto.title,
      summary: dto.summary,
      description: dto.description,
      icon: dto.icon,
      displayOrder: dto.displayOrder,
      isActive: dto.isActive,
      updatedBy: userId ? { connect: { id: userId } } : undefined,
    };

    // If title is changing, generate and validate a new slug
    if (dto.title) {
      const slug = this.slugify(dto.title);
      const existing = await this.db.service.findFirst({
        where: {
          slug,
          id: { not: id },
          deletedAt: null,
        },
      });
      if (existing) {
        throw new ConflictException(
          `A service with the slug "${slug}" already exists.`,
        );
      }
      updateData.slug = slug;
    }

    return this.db.service.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Perform a soft-delete on the service.
   */
  async remove(id: string, userId: string): Promise<Service> {
    await this.findOne(id);

    return this.db.service.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy: userId ? { connect: { id: userId } } : undefined,
      },
    });
  }

  /**
   * Atomically reorder display orders of multiple services.
   */
  async reorder(dto: ReorderServicesDto, userId: string): Promise<void> {
    // Execute updates within an isolated database transaction block
    await this.db.$transaction(
      dto.orders.map((item) =>
        this.db.service.update({
          where: { id: item.id },
          data: {
            displayOrder: item.displayOrder,
            updatedBy: userId ? { connect: { id: userId } } : undefined,
          },
        }),
      ),
    );
  }
}
