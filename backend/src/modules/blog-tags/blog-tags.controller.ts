import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BlogTagsRepository } from './blog-tags.repository';
import { CreateBlogTagDto, UpdateBlogTagDto } from './dto/blog-tag.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('blog-tags')
@Controller('blog-tags')
export class BlogTagsController {
  constructor(private readonly repo: BlogTagsRepository) {}

  /**
   * Get all blog tags
   * @returns List of blog tags
   */
  @Get()
  @ApiOperation({ summary: 'Get all blog tags' })
  async findAll(): Promise<ApiResponse<any>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All tags',
      data,
      meta: { count: data.length },
    };
  }

  /**
   * Get tag by ID
   * @param id Tag ID
   * @returns Blog tag
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get tag by ID' })
  @ApiParam({ name: 'id', description: 'Tag ID' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Found tag', data };
  }

  /**
   * Create a new blog tag
   * @param data Tag data
   * @returns Created tag
   */
  @Post()
  @ApiOperation({ summary: 'Create a new blog tag' })
  async create(
    @Body(ValidationPipe) dto: CreateBlogTagDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Created', data };
  }

  /**
   * Update a blog tag
   * @param id Tag ID
   * @param data Updated data
   * @returns Updated tag
   */
  @Put()
  @ApiOperation({ summary: 'Update a blog tag' })
  async update(
    @Body(ValidationPipe) dto: UpdateBlogTagDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return { status: 'success', message: 'Updated', data };
  }

  /**
   * Delete a blog tag
   * @param id Tag ID
   * @returns Success message
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog tag' })
  @ApiParam({ name: 'id', description: 'Tag ID to delete' })
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return { status: 'success', message: 'Deleted', data: null };
  }
}
