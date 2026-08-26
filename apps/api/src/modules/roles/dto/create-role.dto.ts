import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Unique name identifier of the role',
    example: 'moderator',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name!: string;

  @ApiPropertyOptional({
    description: "Human-readable description detailing this role's operations",
    example: 'Allows moderation of blogs and testimonials.',
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Array of Permission UUIDs to associate with the role',
    example: [
      'd3b07384-d113-4ec5-a55d-20d18721c2c3',
      'e8f9b2d3-241b-4f9e-a612-c2893d5089c2',
    ],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, {
    each: true,
    message: 'Each permission ID must be a valid UUID v4',
  })
  permissionIds?: string[];
}
