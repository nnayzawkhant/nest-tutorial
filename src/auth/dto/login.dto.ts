import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {

  @ApiProperty({
    description : 'The email of the User',
    example : 'text@gmail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'the password of the user',
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
