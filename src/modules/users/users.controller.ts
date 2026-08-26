import {
  Controller,
  Get,
  Body,
  Patch,
  Post,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users.dto';
import type { User } from '@prisma/client';
import { RequirePermissions } from '@common/decorators/permissions.decorator';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';

/**
 * Helper utility to strip sensitive user fields before rendering JSON responses.
 */
function serializeUser(user: User) {
  const safeUser = { ...user } as Record<string, unknown>;
  delete safeUser.passwordHash;
  delete safeUser.refreshTokenHash;
  delete safeUser.verificationToken;
  delete safeUser.passwordResetToken;
  delete safeUser.passwordResetExpires;
  return safeUser;
}

@ApiTags('Users')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get current logged-in user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile details returned successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or missing JWT token.',
  })
  @Get('me')
  findMe(@CurrentUser() user: User) {
    return serializeUser(user);
  }

  @ApiOperation({ summary: 'Update profile details for the logged-in user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload parameters.',
  })
  @Patch('me')
  async updateMe(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    const updatedUser = await this.usersService.updateProfile(user.id, dto);
    return serializeUser(updatedUser);
  }

  @ApiOperation({ summary: 'Change password for the logged-in user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect current password or invalid formatting.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('me/change-password')
  async changeMyPassword(
    @CurrentUser() user: User,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(user.id, dto);
    return { message: 'Your password has been changed successfully.' };
  }

  @ApiOperation({
    summary: 'Get all users list (Paginated, Filtered, Sorted) - Admin Only',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users returned successfully.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied: Requires admin rights.',
  })
  @Get()
  @RequirePermissions('users:read')
  async findAll(@Query() queryDto: FindAllUsersQueryDto) {
    const result = await this.usersService.findAll(queryDto);
    return {
      data: result.data.map(serializeUser),
      meta: result.meta,
    };
  }

  @ApiOperation({
    summary: 'Get detailed user profile by UUID ID - Admin Only',
  })
  @ApiParam({ name: 'id', description: 'Unique user UUID identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile details returned.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with specified ID not found.',
  })
  @Get(':id')
  @RequirePermissions('users:read')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    return serializeUser(user);
  }

  @ApiOperation({ summary: 'Soft-delete a user account - Admin Only' })
  @ApiParam({ name: 'id', description: 'Unique user UUID to soft-delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User account soft-deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User attempted to self-delete.',
  })
  @Delete(':id')
  @RequirePermissions('users:delete')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() admin: User,
  ) {
    const deletedUser = await this.usersService.softDelete(id, admin.id);
    return serializeUser(deletedUser);
  }

  @ApiOperation({ summary: 'Restore a soft-deleted user account - Admin Only' })
  @ApiParam({ name: 'id', description: 'Unique user UUID to restore' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User account successfully restored.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Target user account is already active.',
  })
  @Patch(':id/restore')
  @RequirePermissions('users:delete')
  async restore(@Param('id', new ParseUUIDPipe()) id: string) {
    const restoredUser = await this.usersService.restore(id);
    return serializeUser(restoredUser);
  }
}
