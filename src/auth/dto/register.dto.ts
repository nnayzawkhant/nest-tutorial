import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description : 'The email of the User',
    example : 'text@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'the password of the user', example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
