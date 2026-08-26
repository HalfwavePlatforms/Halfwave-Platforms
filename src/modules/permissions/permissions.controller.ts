import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { RequirePermissions } from '@common/decorators/permissions.decorator';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('Permissions')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({
    summary: 'Get all available system permissions - Admin Only',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Permissions list returned.',
  })
  @Get()
  @RequirePermissions('roles:read')
  findAll() {
    return this.permissionsService.findAll();
  }
}
