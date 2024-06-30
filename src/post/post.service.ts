import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, image: Express.Multer.File): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        image: image ? image.path : null,
      },
    });
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, image: Express.Multer.File): Promise<Post> {
    const post = await this.findOne(id);
    if (image) {
      updatePostDto.image = image.path;
    }
    return this.prisma.post.update({
      where: { id },
      data: { ...post, ...updatePostDto },
    });
  }

  async remove(id: number): Promise<Post> {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
