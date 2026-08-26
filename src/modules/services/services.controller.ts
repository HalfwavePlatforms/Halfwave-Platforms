import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReorderServicesDto } from './dto/reorder-services.dto';
import { QueryServicesDto } from './dto/query-services.dto';
import { RequirePermissions } from '@common/decorators/permissions.decorator';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import type { User } from '@prisma/client';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({
    summary: 'Get all active services sorted by display order (Public API)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Flat list of active services returned successfully.',
  })
  @Get()
  findAllActive() {
    return this.servicesService.findAllActive();
  }

  @ApiOperation({ summary: 'Get paginated list of all services - Admin Only' })
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Catalog table rows returned.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Missing or invalid token.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Missing services:read permission.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('admin')
  @RequirePermissions('services:read')
  findAllAdmin(@Query() query: QueryServicesDto) {
    return this.servicesService.findAllAdmin(query);
  }

  @ApiOperation({
    summary: 'View a specific service detail by ID - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiParam({ name: 'id', description: 'Unique service UUID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service details returned.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service not found.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('admin/:id')
  @RequirePermissions('services:read')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.servicesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new service - Admin Only' })
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Service registered successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Service with generated slug already exists.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('admin')
  @RequirePermissions('services:write')
  create(@Body() dto: CreateServiceDto, @CurrentUser() user: User) {
    return this.servicesService.create(dto, user.id);
  }

  @ApiOperation({
    summary: 'Bulk reorder services display orders - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reordering successfully applied.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('admin/reorder')
  @RequirePermissions('services:write')
  reorder(@Body() dto: ReorderServicesDto, @CurrentUser() user: User) {
    return this.servicesService.reorder(dto, user.id);
  }

  @ApiOperation({ summary: 'Update service details - Admin Only' })
  @ApiBearerAuth('JWT')
  @ApiParam({ name: 'id', description: 'Unique service UUID to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service not found.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('admin/:id')
  @RequirePermissions('services:write')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateServiceDto,
    @CurrentUser() user: User,
  ) {
    return this.servicesService.update(id, dto, user.id);
  }

  @ApiOperation({ summary: 'Soft-delete a service - Admin Only' })
  @ApiBearerAuth('JWT')
  @ApiParam({ name: 'id', description: 'Unique service UUID to delete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Service soft-deleted.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service not found.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('admin/:id')
  @RequirePermissions('services:write')
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: User,
  ) {
    return this.servicesService.remove(id, user.id);
  }
}
