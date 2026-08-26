import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Create a new role and optionally link permissions.
   */
  async create(dto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.db.role.findUnique({
      where: { name: dto.name.toLowerCase() },
    });

    if (existingRole) {
      throw new ConflictException(
        `Role with name "${dto.name}" already exists.`,
      );
    }

    const { permissionIds, name, description } = dto;

    return this.db.role.create({
      data: {
        name: name.toLowerCase(),
        description,
        permissions: permissionIds
          ? {
              connect: permissionIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        permissions: true,
      },
    });
  }

  /**
   * Fetch all roles with their connected permissions.
   */
  async findAll(): Promise<Role[]> {
    return this.db.role.findMany({
      include: {
        permissions: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  /**
   * Fetch a single role by its UUID ID.
   */
  async findOne(id: string): Promise<Role> {
    const role = await this.db.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }

    return role;
  }

  /**
   * Update role parameters and replace permission assignments.
   */
  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.db.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }

    const { permissionIds, name, description } = dto;

    if (name && name.toLowerCase() !== role.name) {
      const existingName = await this.db.role.findUnique({
        where: { name: name.toLowerCase() },
      });
      if (existingName) {
        throw new ConflictException(`Role with name "${name}" already exists.`);
      }
    }

    return this.db.role.update({
      where: { id },
      data: {
        name: name ? name.toLowerCase() : undefined,
        description,
        permissions: permissionIds
          ? {
              // 'set' deletes existing links in the join table and connects new ones
              set: permissionIds.map((pid) => ({ id: pid })),
            }
          : undefined,
      },
      include: {
        permissions: true,
      },
    });
  }

  /**
   * Delete a role. Includes safety checks to verify it's not currently in use.
   */
  async remove(id: string): Promise<Role> {
    const role = await this.db.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }

    // Safety check: verify no users are currently assigned to this role
    const assignedUsersCount = await this.db.user.count({
      where: { roleId: id },
    });

    if (assignedUsersCount > 0) {
      throw new BadRequestException(
        `Access denied: You cannot delete the role "${role.name}" because it is currently assigned to ${assignedUsersCount} active users.`,
      );
    }

    // Implicit join table entries are handled automatically by Prisma client cascade deletion
    return this.db.role.delete({
      where: { id },
    });
  }
}
