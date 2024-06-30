import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        category: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'category', 'image'],
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Post created successfully.' })
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() createPostDto: CreatePostDto, @UploadedFile('image') image: Express.Multer.File) {
    console.log(image)
    return this.postService.create(createPostDto, image);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Posts retrieved successfully.' })
  findAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Post retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
  findOnePost(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: HttpStatus.OK, description: 'Post updated successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
  @UseInterceptors(FileInterceptor('image'))
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @UploadedFile() image: Express.Multer.File) {
    return this.postService.update(id, updatePostDto, image);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Post deleted successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
  removePost(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
