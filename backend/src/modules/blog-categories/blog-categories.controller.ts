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
import { BlogCategoriesRepository } from './blog-categories.repository';
import {
  CreateBlogCategoryDto,
  UpdateBlogCategoryDto,
} from './dto/blog-category.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BlogCategory } from '../../entities/blog-category.entity';

@ApiTags('blog-categories')
@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly repo: BlogCategoriesRepository) {}

  /**
   * Get all blog categories
   * @returns List of blog categories
   */
  @Get()
  @ApiOperation({ summary: 'Get all blog categories' })
  async findAll(): Promise<ApiResponse<any>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All categories',
      data,
      meta: { count: data.length },
    };
  }

  /**
   * Get category by ID
   * @param id Category ID
   * @returns Blog category
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Found category', data };
  }

  /**
   * Create a new blog category
   * @param data Category data
   * @returns Created category
   */
  @Post()
  @ApiOperation({ summary: 'Create a new blog category' })
  async create(
    @Body(ValidationPipe) dto: CreateBlogCategoryDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Created', data };
  }

  /**
   * Update a blog category
   * @param id Category ID
   * @param data Updated data
   * @returns Updated category
   */
  @Put()
  @ApiOperation({ summary: 'Update a blog category' })
  async update(
    @Body(ValidationPipe) dto: UpdateBlogCategoryDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return { status: 'success', message: 'Updated', data };
  }

  /**
   * Delete a blog category
   * @param id Category ID
   * @returns Success message
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog category' })
  @ApiParam({ name: 'id', description: 'Category ID to delete' })
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return { status: 'success', message: 'Deleted', data: null };
  }
}
