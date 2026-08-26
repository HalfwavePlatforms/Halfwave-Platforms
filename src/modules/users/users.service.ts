import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Fetch user profile details.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.db.user.findFirst({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    return user;
  }

  /**
   * Update the profile of the current logged-in user.
   */
  async updateProfile(id: string, dto: UpdateProfileDto): Promise<User> {
    // Verify user exists and is active
    await this.findOne(id);

    return this.db.user.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  /**
   * Change user credentials (verifying old password before hashing the new one).
   */
  async changePassword(id: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.findOne(id);

    // Verify current password hash
    const isPasswordValid = await bcrypt.compare(
      dto.oldPassword,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(
        'The current password provided is incorrect.',
      );
    }

    // Check if new password is identical to the old one
    const isSamePassword = await bcrypt.compare(
      dto.newPassword,
      user.passwordHash,
    );
    if (isSamePassword) {
      throw new BadRequestException(
        'The new password cannot be the same as your current password.',
      );
    }

    // Generate secure salt & hash
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(dto.newPassword, salt);

    await this.db.user.update({
      where: { id },
      data: {
        passwordHash: newPasswordHash,
        // Invalidate active refresh tokens on credential change for security
        refreshTokenHash: null,
      },
    });
  }

  /**
   * Paginated listing of users supporting filters, search matching, and sorting.
   * Access: Admin only.
   */
  async findAll(queryDto: FindAllUsersQueryDto) {
    const { page, limit, search, role, status, sortBy, sortOrder } = queryDto;
    const skip = (page - 1) * limit;

    // Build Prisma query condition block
    const where: Prisma.UserWhereInput = {
      deletedAt: null, // Exclude soft-deleted records by default
    };

    if (role) {
      where.role = {
        name: role.toLowerCase(),
      };
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Enforce whitelisted sortable columns
    const allowedSortFields = [
      'firstName',
      'lastName',
      'email',
      'role',
      'status',
      'createdAt',
    ];
    const orderByField = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    // Execute paginated records fetch and count parallelly
    const [users, total] = await Promise.all([
      this.db.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [orderByField]: sortOrder,
        },
      }),
      this.db.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  /**
   * Soft-delete a user record.
   * Access: Admin only.
   */
  async softDelete(id: string, adminId: string): Promise<User> {
    if (id === adminId) {
      throw new BadRequestException(
        'Security safeguard: You cannot soft-delete your own account.',
      );
    }

    const user = await this.findOne(id);

    return this.db.user.update({
      where: { id: user.id },
      data: {
        deletedAt: new Date(),
        refreshTokenHash: null, // Evict current user sessions
      },
    });
  }

  /**
   * Restore a soft-deleted user.
   * Access: Admin only.
   */
  async restore(id: string): Promise<User> {
    const user = await this.db.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    if (!user.deletedAt) {
      throw new BadRequestException(
        'Target user account is active and does not require restoration.',
      );
    }

    return this.db.user.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
}
