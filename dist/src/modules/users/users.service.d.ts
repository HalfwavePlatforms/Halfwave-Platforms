import { DatabaseService } from "../../database/database.service";
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users.dto';
import { User } from '@prisma/client';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    findOne(id: string): Promise<User>;
    updateProfile(id: string, dto: UpdateProfileDto): Promise<User>;
    changePassword(id: string, dto: ChangePasswordDto): Promise<void>;
    findAll(queryDto: FindAllUsersQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            roleId: string;
            status: import("@prisma/client").$Enums.Status;
            deletedAt: Date | null;
            refreshTokenHash: string | null;
            isEmailVerified: boolean;
            verificationToken: string | null;
            passwordResetToken: string | null;
            passwordResetExpires: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    softDelete(id: string, adminId: string): Promise<User>;
    restore(id: string): Promise<User>;
}
