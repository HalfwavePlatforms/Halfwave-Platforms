import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddInternalNotesDto {
  @ApiProperty({
    description:
      'Internal team notes, follow-up remarks, or coordination comments',
    example: 'Spoke with Alice. She wants a demo next Tuesday morning.',
    minLength: 1,
    maxLength: 2000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 2000)
  notes!: string;
}
