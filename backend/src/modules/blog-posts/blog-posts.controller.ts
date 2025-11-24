import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BlogPostsRepository } from './blog-posts.repository';

import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FilterBlogsDto } from './dto/filter-blogs.dto';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly repo: BlogPostsRepository) {}

  /**
   * Get all blog posts with advanced filtering and pagination
   * @param query FilterBlogsDto with comprehensive filtering options
   * @returns List of blog posts with pagination metadata
   */
  @Get()
  @ApiOperation({
    summary: 'Get all blog posts with advanced filtering and pagination',
    description:
      'Comprehensive filtering with 12+ options including keyword search, category, tags, date range, views count, and more',
  })
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
      })
    )
    query: FilterBlogsDto
  ): Promise<ApiResponse<any>> {
    // Chỉ coi là "lọc" khi thực sự có filter ngoài page/limit/sort
    const hasFilters = !!(
      query.keyword ||
      query.categoryId ||
      query.authorId ||

      query.tagIds ||
      query.status ||
      query.isPublished !== undefined ||
      query.viewsCountMin !== undefined ||
      query.dateFrom ||
      query.dateTo
    );

    if (hasFilters) {
      const result = await this.repo.findFiltered(query);
      return {
        status: 'success',
        message: 'Filtered blog posts retrieved successfully',
        data: result.data,
        meta: {
          count: result.total,
          page: query.page ?? 1,
          limit: query.limit ?? 10,
          totalPages: Math.ceil((result.total || 0) / (query.limit ?? 10)),
        },
      };
    } else {
      // Không có filter đặc biệt -> dùng SP_GetFilteredBlogs với page/limit mặc định
      const result = await this.repo.findFiltered({
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        sortBy: query.sortBy ?? 'created_at',
        sortOrder: query.sortOrder ?? 'DESC',
      } as FilterBlogsDto);

      return {
        status: 'success',
        message: 'All blog posts (paged)',
        data: result.data,
        meta: {
          count: result.total,
          page: query.page ?? 1,
          limit: query.limit ?? 10,
          totalPages: Math.ceil((result.total || 0) / (query.limit ?? 10)),
        },
      };
    }
  }

  /**
   * Get blog post by ID with full relations (tags, comments)
   * @param id Blog post ID
   * @returns Blog post with related data
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get blog post by ID with relations' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findByIdWithRelations(id);
    return {
      status: 'success',
      message: 'Blog post retrieved successfully',
      data,
    };
  }

  /**
   * Get blog post by slug
   * @param slug Blog post slug
   * @returns Blog post
   */
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get blog post by slug' })
  @ApiParam({ name: 'slug', description: 'Blog post slug' })
  async findBySlug(
    @Param('slug') slug: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findBySlug(slug);
    return {
      status: 'success',
      message: 'Blog post retrieved successfully',
      data,
    };
  }

  /**
   * Create a new blog post
   * @param createBlogDto Blog post data
   * @returns Created blog post
   */
  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  async create(
    @Body(ValidationPipe) dto: CreateBlogDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return {
      status: 'success',
      message: 'Created',
      data,
    };
  }

  /**
   * Update an existing blog post
   * @param updateBlogDto Updated blog post data (including ID)
   * @returns Updated blog post
   */
  @Put()
  @ApiOperation({ summary: 'Update a blog post' })
  async update(
    @Body(ValidationPipe) dto: UpdateBlogDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return {
      status: 'success',
      message: 'Updated',
      data,
    };
  }

  /**
   * Delete a blog post
   * @param id Blog post ID
   * @returns Success message
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiParam({ name: 'id', description: 'Blog post ID to delete' })
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return {
      status: 'success',
      message: 'Deleted',
      data: null,
    };
  }

  /**
   * Search blog posts by title
   * @param title Search term
   * @returns List of matching blog posts
   */
  @Get('search/title')
  @ApiOperation({ summary: 'Search blog posts by title' })
  @ApiQuery({ name: 'title', description: 'Search term' })
  async searchByTitle(
    @Query('title') title: string
  ): Promise<ApiResponse<any[]>> {
    const data = await this.repo.searchByTitle(title);
    return {
      status: 'success',
      message: 'Search completed successfully',
      data,
      meta: { count: data.length },
    };
  }

  /**
   * Add tags to a blog post
   * @param id Blog post ID
   * @param tagIds Array of tag IDs
   * @returns Success message
   */
  @Post(':id/tags')
  @ApiOperation({ summary: 'Add tags to a blog post' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  async addTags(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('tagIds') tagIds: string[]
  ): Promise<ApiResponse<null>> {
    await this.repo.addTagsToBlogPost(id, tagIds);
    return {
      status: 'success',
      message: 'Tags added successfully',
      data: null,
    };
  }

  /**
   * Remove tag from a blog post
   * @param id Blog post ID
   * @param tagId Tag ID
   * @returns Success message
   */
  @Delete(':id/tags/:tagId')
  @ApiOperation({ summary: 'Remove tag from a blog post' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  @ApiParam({ name: 'tagId', description: 'Tag ID' })
  async removeTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string
  ): Promise<ApiResponse<null>> {
    await this.repo.removeTagFromBlogPost(id, tagId);
    return {
      status: 'success',
      message: 'Tag removed successfully',
      data: null,
    };
  }

  /**
   * Publish a blog post
   * @param id Blog post ID
   * @returns Updated blog post
   */
  @Put(':id/publish')
  @ApiOperation({ summary: 'Publish a blog post' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  async publish(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.publishBlogPost(id);
    return {
      status: 'success',
      message: 'Blog post published successfully',
      data,
    };
  }

  /**
   * Unpublish a blog post
   * @param id Blog post ID
   * @returns Updated blog post
   */
  @Put(':id/unpublish')
  @ApiOperation({ summary: 'Unpublish a blog post' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  async unpublish(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.unpublishBlogPost(id);
    return {
      status: 'success',
      message: 'Blog post unpublished successfully',
      data,
    };
  }
}
