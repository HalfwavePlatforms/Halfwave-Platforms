import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ContactStatus } from '@prisma/client';

export class UpdateEnquiryStatusDto {
  @ApiProperty({
    description: 'New status to assign to the enquiry',
    enum: ContactStatus,
    example: 'in_progress',
  })
  @IsEnum(ContactStatus)
  status!: ContactStatus;

  @ApiPropertyOptional({
    description:
      'UUID of the staff member assigned to manage this enquiry (optional)',
    example: 'a5c0b2d3-241b-4f9e-a612-c2893d5089c2',
  })
  @IsOptional()
  @IsUUID()
  assignedTo?: string;
}
