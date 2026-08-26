import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The current active password of the logged-in user',
    example: 'OldPassSecure123!',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword!: string;

  @ApiProperty({
    description: 'The new password to set (minimum 8 characters)',
    example: 'NewSecurePass987!',
    format: 'password',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long.' })
  newPassword!: string;
}
