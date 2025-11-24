import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Patch,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BlogCommentsRepository } from './blog-comments.repository';
import { CreateBlogCommentDto, UpdateBlogCommentDto } from './dto/blog-comments.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BlogComments } from '../../entities/blog-comment.entity';

@ApiTags('blog-comments')
@Controller('blog-comments')
export class BlogCommentsController {
  constructor(private readonly blogCommentsRepository: BlogCommentsRepository) {}

  /**
   * Get all comments with optional filtering
   * @param blogPostId Filter by blog post ID
   * @param userId Filter by user ID
   * @param isApproved Filter by approval status
   * @returns List of comments
   */
  @Get()
  @ApiOperation({ summary: 'Get all blog comments' })
  @ApiQuery({ name: 'blogPostId', required: false, description: 'Filter by blog post ID' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  @ApiQuery({ name: 'isApproved', required: false, description: 'Filter by approval status' })
  async findAll(
    @Query('blogPostId') blogPostId?: string,
    @Query('userId') userId?: string,
    @Query('isApproved') isApproved?: string,
  ): Promise<ApiResponse<BlogComments[]>> {
    const filters: any = {};

    if (blogPostId) {
      filters.blogPostId = blogPostId;
    }

    if (userId) {
      filters.userId = userId;
    }

    if (isApproved !== undefined) {
      filters.isApproved = isApproved === 'true';
    }

    const comments = await this.blogCommentsRepository.findAll(filters);
    return {
      status: 'success',
      message: 'Comments retrieved successfully',
      data: comments,
      meta: { count: comments.length },
    };
  }

  /**
   * Get comment by ID
   * @param id Comment ID
   * @returns Comment
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get comment by ID' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<BlogComments>> {
    const comment = await this.blogCommentsRepository.findById(id);
    if (!comment) {
      throw new Error(`Comment with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Comment retrieved successfully',
      data: comment,
    };
  }

  /**
   * Create a new comment
   * @param createBlogCommentDto Comment data
   * @returns Created comment
   */
  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  async create(
    @Body(ValidationPipe) createBlogCommentDto: CreateBlogCommentDto
  ): Promise<ApiResponse<BlogComments>> {
    const comment = await this.blogCommentsRepository.create(createBlogCommentDto);
    return {
      status: 'success',
      message: 'Comment created successfully',
      data: comment,
    };
  }

  /**
   * Update a comment
   * @param id Comment ID
   * @param updateBlogCommentDto Updated data
   * @returns Updated comment
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBlogCommentDto: UpdateBlogCommentDto
  ): Promise<ApiResponse<BlogComments>> {
    const comment = await this.blogCommentsRepository.update(id, updateBlogCommentDto);
    if (!comment) {
      throw new Error(`Comment with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Comment updated successfully',
      data: comment,
    };
  }

  /**
   * Delete a comment
   * @param id Comment ID
   * @returns Success message
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({ name: 'id', description: 'Comment ID to delete' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    const deleted = await this.blogCommentsRepository.delete(id);
    if (!deleted) {
      throw new Error(`Comment with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Comment deleted successfully',
      data: null,
    };
  }

  /**
   * Approve a comment
   * @param id Comment ID
   * @returns Approved comment
   */
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a comment' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  async approve(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<BlogComments>> {
    const comment = await this.blogCommentsRepository.approve(id);
    if (!comment) {
      throw new Error(`Comment with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Comment approved successfully',
      data: comment,
    };
  }

  /**
   * Reject a comment
   * @param id Comment ID
   * @returns Rejected comment
   */
  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a comment' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  async reject(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<BlogComments>> {
    const comment = await this.blogCommentsRepository.reject(id);
    if (!comment) {
      throw new Error(`Comment with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Comment rejected successfully',
      data: comment,
    };
  }

  /**
   * Get comments for a specific blog post
   * @param blogPostId Blog post ID
   * @param approvedOnly Only approved comments
   * @returns List of comments
   */
  @Get('post/:blogPostId')
  @ApiOperation({ summary: 'Get comments for a blog post' })
  @ApiParam({ name: 'blogPostId', description: 'Blog post ID' })
  @ApiQuery({ name: 'approvedOnly', required: false, description: 'Only approved comments' })
  async getCommentsByBlogPost(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string,
    @Query('approvedOnly') approvedOnly?: string,
  ): Promise<ApiResponse<BlogComments[]>> {
    const approvedOnlyBool = approvedOnly !== 'false';
    const comments = await this.blogCommentsRepository.getCommentsByBlogPost(blogPostId, approvedOnlyBool);
    return {
      status: 'success',
      message: 'Comments retrieved successfully',
      data: comments,
      meta: { count: comments.length },
    };
  }

  /**
   * Get comment count for a blog post
   * @param blogPostId Blog post ID
   * @param approvedOnly Count only approved comments
   * @returns Comment count
   */
  @Get('post/:blogPostId/count')
  @ApiOperation({ summary: 'Get comment count for a blog post' })
  @ApiParam({ name: 'blogPostId', description: 'Blog post ID' })
  @ApiQuery({ name: 'approvedOnly', required: false, description: 'Count only approved comments' })
  async getCommentCount(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string,
    @Query('approvedOnly') approvedOnly?: string,
  ): Promise<ApiResponse<{ count: number }>> {
    const approvedOnlyBool = approvedOnly !== 'false';
    const count = await this.blogCommentsRepository.getCommentCount(blogPostId, approvedOnlyBool);
    return {
      status: 'success',
      message: 'Comment count retrieved successfully',
      data: { count },
    };
  }

  /**
   * Get comments by user
   * @param userId User ID
   * @param approvedOnly Only approved comments
   * @returns List of user's comments
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get comments by user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'approvedOnly', required: false, description: 'Only approved comments' })
  async getCommentsByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('approvedOnly') approvedOnly?: string,
  ): Promise<ApiResponse<BlogComments[]>> {
    const approvedOnlyBool = approvedOnly !== 'false';
    const comments = await this.blogCommentsRepository.getCommentsByUser(userId, approvedOnlyBool);
    return {
      status: 'success',
      message: 'User comments retrieved successfully',
      data: comments,
      meta: { count: comments.length },
    };
  }

  /**
   * Bulk approve comments
   * @param commentIds Array of comment IDs
   * @returns Approved comments
   */
  @Patch('bulk/approve')
  @ApiOperation({ summary: 'Bulk approve comments' })
  async bulkApprove(
    @Body('commentIds') commentIds: string[]
  ): Promise<ApiResponse<BlogComments[]>> {
    const comments: BlogComments[] = [];

    for (const id of commentIds) {
      try {
        const comment = await this.blogCommentsRepository.approve(id);
        if (comment) comments.push(comment);
      } catch (error) {
        // Skip comments that can't be found or approved
        continue;
      }
    }

    return {
      status: 'success',
      message: `${comments.length} comments approved successfully`,
      data: comments,
    };
  }

  /**
   * Bulk delete comments
   * @param commentIds Array of comment IDs
   * @returns Number of deleted comments
   */
  @Delete('bulk/delete')
  @ApiOperation({ summary: 'Bulk delete comments' })
  async bulkDelete(
    @Body('commentIds') commentIds: string[]
  ): Promise<ApiResponse<{ deletedCount: number }>> {
    let deletedCount = 0;

    for (const id of commentIds) {
      try {
        const deleted = await this.blogCommentsRepository.delete(id);
        if (deleted) deletedCount++;
      } catch (error) {
        // Skip comments that can't be found
        continue;
      }
    }

    return {
      status: 'success',
      message: `${deletedCount} comments deleted successfully`,
      data: { deletedCount },
    };
  }
}
