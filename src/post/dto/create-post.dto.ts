import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Post Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Category Name' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Image URL', format: 'binary', required: true  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
