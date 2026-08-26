import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SubmitEnquiryDto {
  @ApiProperty({
    description: 'Full name of the contact person',
    example: 'Alice Smith',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name!: string;

  @ApiProperty({
    description: 'Email address for communications',
    example: 'alice.smith@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    description: 'Contact phone number (optional)',
    example: '+1-555-0199',
  })
  @IsOptional()
  @IsString()
  @Length(5, 30)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Company organization name (optional)',
    example: 'Acme Corp',
  })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  company?: string;

  @ApiProperty({
    description: 'Service offering they are interested in',
    example: 'Custom Web Application Development',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  serviceInterested!: string;

  @ApiPropertyOptional({
    description: 'Estimated budget range (optional)',
    example: '$10,000 - $25,000',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  budget?: string;

  @ApiProperty({
    description: 'Detailed details explaining their request',
    example:
      'Looking to rebuild our old legacy portal into a NestJS + React web app.',
    minLength: 10,
    maxLength: 2000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 2000)
  message!: string;
}
