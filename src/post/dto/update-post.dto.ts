import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'Updated Post Title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated Category Name', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'Updated Image URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;
}
