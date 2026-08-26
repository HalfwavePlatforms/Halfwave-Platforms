import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ServiceOrderChangeDto {
  @ApiProperty({
    description: 'UUID of the service to reorder',
    example: '8a12e2f3-10bc-432d-94c8-2f16a04e5781',
  })
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'Target display order sequence index',
    example: 3,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  displayOrder!: number;
}

export class ReorderServicesDto {
  @ApiProperty({
    description: 'Collection of services and their target order values',
    type: [ServiceOrderChangeDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceOrderChangeDto)
  orders!: ServiceOrderChangeDto[];
}
