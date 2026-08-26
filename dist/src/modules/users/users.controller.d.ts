import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users.dto';
import type { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findMe(user: User): Record<string, unknown>;
    updateMe(user: User, dto: UpdateProfileDto): Promise<Record<string, unknown>>;
    changeMyPassword(user: User, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    findAll(queryDto: FindAllUsersQueryDto): Promise<{
        data: Record<string, unknown>[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<Record<string, unknown>>;
    remove(id: string, admin: User): Promise<Record<string, unknown>>;
    restore(id: string): Promise<Record<string, unknown>>;
}
