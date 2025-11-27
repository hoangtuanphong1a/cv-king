import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BlogComments } from '../../entities/blog-comment.entity';
import {
  CreateBlogCommentDto,
  UpdateBlogCommentDto,
} from './dto/blog-comments.dto';

@Injectable()
export class BlogCommentsRepository {
  constructor(
    @InjectRepository(BlogComments)
    private readonly repo: EntityRepository<BlogComments>,
    private readonly em: EntityManager
  ) {}

  /**
   * Find all comments with optional filtering
   * @param filters Optional filters for the query
   * @returns List of blog comments
   */
  async findAll(filters?: {
    blogPostId?: string;
    userId?: string;
    isApproved?: boolean;
  }): Promise<BlogComments[]> {
    const where: FilterQuery<BlogComments> = {};

    if (filters?.blogPostId) {
      where.blogPostId = filters.blogPostId;
    }

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    if (filters?.isApproved !== undefined) {
      where.isApproved = filters.isApproved;
    }

    return this.repo.findAll({
      where,
      orderBy: { createdAt: -1 },
    });
  }

  /**
   * Find a comment by ID
   * @param id Comment ID
   * @returns Blog comment
   */
  async findById(id: string): Promise<BlogComments | null> {
    return this.repo.findOne({ id });
  }

  /**
   * Create a new comment
   * @param data Comment data
   * @returns Created comment
   */
  async create(data: CreateBlogCommentDto): Promise<BlogComments> {
    // Validate that either UserId or GuestName is provided
    if (!data.UserId && !data.GuestName) {
      throw new Error('Either UserId or GuestName must be provided');
    }

    const comment = this.repo.create({
      content: data.Content,
      blogPostId: data.BlogPostId,
      userId: data.UserId || undefined,
      guestName: data.GuestName || undefined,
      isApproved: false, // Default to not approved
    });

    await this.em.persistAndFlush(comment);

    // Handle ParentCommentId for reply comments (not supported in current entity)
    if (data.ParentCommentId) {
      console.warn(
        'ParentCommentId is not supported in current entity structure'
      );
    }

    return comment;
  }

  /**
   * Update a comment
   * @param id Comment ID
   * @param data Updated data
   * @returns Updated comment
   */
  async update(id: string, data: UpdateBlogCommentDto): Promise<BlogComments> {
    const comment = await this.findById(id);
    if (!comment) {
      throw new NotFoundException('Blog comment not found');
    }

    this.repo.assign(comment, { content: data.Content });
    await this.em.flush();
    return comment;
  }

  /**
   * Delete a comment
   * @param id Comment ID
   * @returns True if deletion was successful
   */
  async delete(id: string): Promise<boolean> {
    const comment = await this.findById(id);
    if (!comment) {
      return false;
    }

    await this.em.removeAndFlush(comment);
    return true;
  }

  /**
   * Approve a comment
   * @param id Comment ID
   * @returns Updated comment
   */
  async approve(id: string): Promise<BlogComments> {
    const comment = await this.findById(id);
    if (!comment) {
      throw new NotFoundException('Blog comment not found');
    }

    this.repo.assign(comment, { isApproved: true });
    await this.em.flush();
    return comment;
  }

  /**
   * Reject a comment (unapprove)
   * @param id Comment ID
   * @returns Updated comment
   */
  async reject(id: string): Promise<BlogComments> {
    const comment = await this.findById(id);
    if (!comment) {
      throw new NotFoundException('Blog comment not found');
    }

    this.repo.assign(comment, { isApproved: false });
    await this.em.flush();
    return comment;
  }

  /**
   * Get comments for a specific blog post
   * @param blogPostId Blog post ID
   * @param approvedOnly Only return approved comments
   * @returns List of comments
   */
  async getCommentsByBlogPost(
    blogPostId: string,
    approvedOnly: boolean = true
  ): Promise<any[]> {
    const comments = await this.findAll({
      blogPostId,
      isApproved: approvedOnly ? true : undefined,
    });
    return comments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  /**
   * Get comment count for a blog post
   * @param blogPostId Blog post ID
   * @param approvedOnly Count only approved comments
   * @returns Comment count
   */
  async getCommentCount(
    blogPostId: string,
    approvedOnly: boolean = true
  ): Promise<number> {
    const comments = await this.getCommentsByBlogPost(blogPostId, approvedOnly);
    return comments.length;
  }

  /**
   * Get comments by user
   * @param userId User ID
   * @param approvedOnly Only return approved comments
   * @returns List of user's comments
   */
  async getCommentsByUser(
    userId: string,
    approvedOnly: boolean = true
  ): Promise<any[]> {
    const comments = await this.findAll({
      userId,
      isApproved: approvedOnly ? true : undefined,
    });
    return comments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
}
