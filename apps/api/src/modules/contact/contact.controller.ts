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
import { ContactService } from './contact.service';
import { SubmitEnquiryDto } from './dto/submit-enquiry.dto';
import { QueryEnquiriesDto } from './dto/query-enquiries.dto';
import { UpdateEnquiryStatusDto } from './dto/update-status.dto';
import { AddInternalNotesDto } from './dto/add-notes.dto';
import { RequirePermissions } from '@common/decorators/permissions.decorator';
import { PermissionsGuard } from '@common/guards/permissions.guard';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Submit a new public contact request enquiry' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Contact enquiry submitted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed for input variables.',
  })
  @Post()
  submit(@Body() dto: SubmitEnquiryDto) {
    return this.contactService.submit(dto);
  }

  @ApiOperation({
    summary:
      'Get all contact enquiries (Paginated, Filtered, Sorted) - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of enquiries returned.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Missing or invalid token.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Missing contact:read permission.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('admin')
  @RequirePermissions('contact:read')
  findAll(@Query() queryDto: QueryEnquiriesDto) {
    return this.contactService.findAll(queryDto);
  }

  @ApiOperation({
    summary: 'View a specific contact enquiry by ID - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiParam({ name: 'id', description: 'Unique enquiry UUID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Enquiry details returned.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Enquiry not found.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('admin/:id')
  @RequirePermissions('contact:read')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.contactService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update status or assign manager to an enquiry - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiParam({ name: 'id', description: 'Unique enquiry UUID to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid status or missing staff UUID.',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('admin/:id/status')
  @RequirePermissions('contact:write')
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateEnquiryStatusDto,
  ) {
    return this.contactService.updateStatus(id, dto);
  }

  @ApiOperation({
    summary: 'Add internal coordination notes to an enquiry - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiParam({
    name: 'id',
    description: 'Unique enquiry UUID to append comments to',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Internal notes saved.' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('admin/:id/notes')
  @RequirePermissions('contact:write')
  addNotes(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AddInternalNotesDto,
  ) {
    return this.contactService.addNotes(id, dto);
  }

  @ApiOperation({
    summary: 'Permanently delete an enquiry record - Admin Only',
  })
  @ApiBearerAuth('JWT')
  @ApiParam({ name: 'id', description: 'Unique enquiry UUID to delete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Enquiry deleted.' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('admin/:id')
  @RequirePermissions('contact:write')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.contactService.remove(id);
  }
}
