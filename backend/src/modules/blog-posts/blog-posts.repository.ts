import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BlogPosts, BlogStatus } from '../../entities/blog-post.entity';
import { FilterBlogsDto } from './dto/filter-blogs.dto';
import { extractJsonArray } from 'src/utils/extractJson';

// Helper function to extract direct JSON result from stored procedure
function extractJsonDirect(raw: any[]): any {
  if (!raw?.[0]) return null;

  // Extract the first column value directly if it's already JSON
  const row = raw[0];
  const firstKey = Object.keys(row)[0];
  const value = row[firstKey];

  // If it's already a JS object, return it directly
  if (typeof value === 'object') return value;

  // Try to parse as JSON string
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

@Injectable()
export class BlogPostsRepository {
  constructor(
    @InjectRepository(BlogPosts)
    private readonly repo: EntityRepository<BlogPosts>,
    private readonly em: EntityManager
  ) {}

  /**
   * Find all blog posts with optional filtering (legacy method)
   * @param filters Optional filters for the query
   * @returns List of blog posts
   */
  async findAll(filters?: any): Promise<BlogPosts[]> {
    const where: FilterQuery<BlogPosts> = {};

    if (filters?.authorId) {
      where.authorUserId = filters.authorId;
    }

    if (filters?.isPublished !== undefined) {
      where.isPublished = filters.isPublished;
    }

    if (filters?.keyword) {
      where.$or = [
        { title: { $ilike: `%${filters.keyword}%` } },
        { content: { $ilike: `%${filters.keyword}%` } },
        { shortDescription: { $ilike: `%${filters.keyword}%` } },
      ];
    }

    const limit = filters?.pageSize ?? 10;
    const offset = ((filters?.page ?? 1) - 1) * limit;

    return this.repo.findAll({
      where,
      limit,
      offset,
      orderBy: { createdAt: -1 },
    });
  }

  /**
   * Find all blog posts (similar to JobsRepository)
   * @returns List of all blog posts
   */
  async findAllBlogs(): Promise<BlogPosts[]> {
    return this.repo.findAll({
      orderBy: { createdAt: -1 },
      limit: 10,
    });
  }

  /**
   * Find a blog post by ID with related data
   * @param id ID of the blog post
   * @returns Blog post with related data
   */
  async findByIdWithRelations(id: string): Promise<any> {
    return this.repo.findOne(id);
  }

  /**
   * Create a new blog post
   * @param dto Blog post creation data
   * @returns Created blog post
   */
  async create(dto: any): Promise<any> {
    const blogPost = this.repo.create({
      title: dto.Title || dto.title,
      slug: dto.Slug || dto.slug,
      content: dto.Content || dto.content,
      excerpt: dto.Excerpt || dto.excerpt,
      coverImageUrl: dto.CoverImageUrl || dto.coverImageUrl,
      authorUserId: dto.AuthorId || dto.authorId,
      isPublished:
        dto.IsPublished !== undefined ? dto.IsPublished : dto.isPublished,
      publishedAt: dto.PublishedAt || dto.publishedAt,
      shortDescription: dto.ShortDescription || dto.shortDescription,
      status: dto.Status || dto.status || BlogStatus.ACTIVE,
      viewsCount: dto.ViewsCount || dto.viewsCount || 0,
    });

    await this.em.persistAndFlush(blogPost);
    return blogPost;
  }

  /**
   * Update a blog post
   * @param dto Blog post update data (including ID)
   * @returns Updated blog post
   */
  async update(dto: any): Promise<any> {
    const id = dto.id || dto.Id;
    if (!id) {
      throw new Error('Blog post ID is required for update');
    }

    const existingPost = await this.repo.findOne(id);
    if (!existingPost) {
      throw new NotFoundException('Blog post not found');
    }

    // Update fields
    if (dto.title !== undefined) existingPost.title = dto.title || dto.Title;
    if (dto.slug !== undefined) existingPost.slug = dto.slug || dto.Slug;
    if (dto.content !== undefined)
      existingPost.content = dto.content || dto.Content;
    if (dto.excerpt !== undefined)
      existingPost.excerpt = dto.excerpt || dto.Excerpt;
    if (dto.coverImageUrl !== undefined)
      existingPost.coverImageUrl = dto.coverImageUrl || dto.CoverImageUrl;
    if (dto.isPublished !== undefined)
      existingPost.isPublished = dto.isPublished;
    if (dto.publishedAt !== undefined)
      existingPost.publishedAt = dto.publishedAt || dto.PublishedAt;
    if (dto.shortDescription !== undefined)
      existingPost.shortDescription =
        dto.shortDescription || dto.ShortDescription;
    if (dto.status !== undefined)
      existingPost.status = dto.status || dto.Status;

    await this.em.persistAndFlush(existingPost);
    return existingPost;
  }

  /**
   * Delete a blog post
   * @param id ID of the blog post
   * @returns True if deletion was successful
   */
  async delete(id: string): Promise<boolean> {
    const existingPost = await this.repo.findOne(id);
    if (!existingPost) {
      throw new NotFoundException('Blog post not found');
    }

    await this.em.removeAndFlush(existingPost);
    return true;
  }

  /**
   * Search blog posts by title
   * @param title Search term
   * @returns List of matching blog posts
   */
  async searchByTitle(title: string): Promise<any[]> {
    return this.findAll({ keyword: title });
  }

  /**
   * Find blog post by slug
   * @param slug Slug of the blog post
   * @returns Blog post
   */
  async findBySlug(slug: string): Promise<any | null> {
    return this.repo.findOne({ slug });
  }

  /**
   * Add tags to a blog post - handled in update/create
   */
  async addTagsToPost(_blogPostId: string, _tagIds: string[]): Promise<void> {
    // This is now handled in the SP_InsertBlogPost and SP_UpdateBlogPost
    // Keeping the method signature for compatibility
  }

  /**
   * Remove tag from blog post - handled in update
   */
  async removeTagFromPost(_blogPostId: string, _tagId: string): Promise<void> {
    // This is now handled in SP_UpdateBlogPost
    // Keeping the method signature for compatibility
  }

  /**
   * Publish a blog post
   * @param id Blog post ID
   * @returns Updated blog post
   */
  async publishBlogPost(id: string): Promise<any> {
    return this.update({
      id,
      isPublished: true,
      publishedAt: new Date(),
    });
  }

  /**
   * Unpublish a blog post
   * @param id Blog post ID
   * @returns Updated blog post
   */
  async unpublishBlogPost(id: string): Promise<any> {
    return this.update({
      id,
      isPublished: false,
      publishedAt: null,
    });
  }

  /**
   * Get all blog posts with optional filtering
   * @param filters Optional filters
   * @returns List of blog posts
   */
  async getAllBlogPosts(filters?: any): Promise<any> {
    return this.findAll(filters);
  }

  /**
   * Get blog post with relations (tags, comments)
   * @param id Blog post ID
   * @returns Blog post with related data
   */
  async getBlogPostWithRelations(id: string): Promise<any> {
    return this.findByIdWithRelations(id);
  }

  /**
   * Get blog post by slug
   * @param slug Blog post slug
   * @returns Blog post
   */
  async getBlogPostBySlug(slug: string): Promise<any | null> {
    return this.findBySlug(slug);
  }

  /**
   * Create a new blog post
   * @param data Blog post data
   * @returns Created blog post
   */
  async createBlogPost(data: any): Promise<any> {
    return this.create(data);
  }

  /**
   * Find blog posts with advanced filtering and pagination using FilterBlogsDto
   * @param filters Advanced filtering options (like Job System)
   * @returns Data and total count
   */
  async findFiltered(
    filters: FilterBlogsDto
  ): Promise<{ data: any[]; total: number }> {
    // Temporarily return empty result to test if endpoint works
    return { data: [], total: 0 };
  }

  /**
   * Delete a blog post
   * @param id Blog post ID
   * @returns True if deletion was successful
   */
  async deleteBlogPost(id: string): Promise<boolean> {
    return this.delete(id);
  }

  /**
   * Search blog posts by title
   * @param title Search term
   * @returns List of matching blog posts
   */
  async searchBlogPostsByTitle(title: string): Promise<any[]> {
    return this.searchByTitle(title);
  }

  /**
   * Add tags to a blog post
   * @param blogPostId Blog post ID
   * @param tagIds Array of tag IDs
   */
  async addTagsToBlogPost(blogPostId: string, tagIds: string[]): Promise<void> {
    // BlogPosts entity doesn't have tag relationships implemented
    // This method is kept for compatibility but doesn't perform any action
    console.log(
      `Adding tags ${tagIds} to blog post ${blogPostId} - not implemented`
    );
  }

  /**
   * Remove tag from blog post
   * @param blogPostId Blog post ID
   * @param tagId Tag ID
   */
  async removeTagFromBlogPost(
    blogPostId: string,
    tagId: string
  ): Promise<void> {
    // BlogPosts entity doesn't have tag relationships implemented
    // This method is kept for compatibility but doesn't perform any action
    console.log(
      `Removing tag ${tagId} from blog post ${blogPostId} - not implemented`
    );
  }
}
