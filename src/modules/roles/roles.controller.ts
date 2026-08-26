import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequirePermissions } from '@common/decorators/permissions.decorator';
import { PermissionsGuard } from '@common/guards/permissions.guard';
// Assuming JwtAuthGuard is globally available or imported from common guards
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('Roles')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({
    summary: 'Create a new role and connect permissions - Admin Only',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Role created and permissions linked.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Role with specified name already exists.',
  })
  @Post()
  @RequirePermissions('roles:write')
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all roles with their connected permissions - Admin Only',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Roles list returned successfully.',
  })
  @Get()
  @RequirePermissions('roles:read')
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Get role details by ID - Admin Only' })
  @ApiParam({ name: 'id', description: 'Unique role UUID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role details returned.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found.' })
  @Get(':id')
  @RequirePermissions('roles:read')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update role details and permissions mappings - Admin Only',
  })
  @ApiParam({ name: 'id', description: 'Unique role UUID to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role updated successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Role not found.' })
  @Patch(':id')
  @RequirePermissions('roles:write')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a role from database - Admin Only' })
  @ApiParam({ name: 'id', description: 'Unique role UUID to delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Role is currently assigned to users.',
  })
  @Delete(':id')
  @RequirePermissions('roles:write')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.rolesService.remove(id);
  }
}
