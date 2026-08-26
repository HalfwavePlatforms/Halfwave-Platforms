import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Length,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Title heading of the service',
    example: 'Enterprise Cloud Strategy',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  title!: string;

  @ApiProperty({
    description: 'A brief overview summary of the service',
    example: 'Architecting secure multi-cloud structures for global firms.',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  summary!: string;

  @ApiProperty({
    description:
      'Detailed description listing offerings, key deliverables, and value propositions',
    example:
      'Our comprehensive strategy addresses cost efficiency, regulatory compliance, and multi-region deployment redundancy...',
    minLength: 10,
    maxLength: 5000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 5000)
  description!: string;

  @ApiProperty({
    description:
      'Icon library name reference identifier (e.g. Feather icon tag or dynamic slug)',
    example: 'cloud-lightning',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  icon!: string;

  @ApiPropertyOptional({
    description: 'Determines display order sequence of services (ascending)',
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number = 0;

  @ApiPropertyOptional({
    description: 'Enables or disables service visibility in public API queries',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
