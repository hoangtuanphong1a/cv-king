import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { FilterBlogsDto } from './dto/filter-blogs.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

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
  constructor(private readonly em: EntityManager) {}

  /**
   * Find all blog posts with optional filtering (legacy method)
   * @param filters Optional filters for the query
   * @returns List of blog posts
   */
  async findAll(filters?: any): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC dbo.SP_GetAllBlogPosts ?,?,?,?,?,?', [
        filters?.page ?? 1,
        filters?.pageSize ?? 10,
        filters?.authorId ?? null,
        filters?.isPublished !== undefined
          ? filters.isPublished
            ? 1
            : 0
          : null,
        filters?.keyword ?? null,
        filters?.tagId ?? null,
      ]);

    return extractJsonArray(raw);
  }

  /**
   * Find all blog posts (similar to JobsRepository)
   * @returns List of all blog posts
   */
  async findAllBlogs(): Promise<any[]> {
    const raw = await this.em.getConnection().execute('EXEC dbo.SP_GetAllBlogPosts ?,?,?,?,?,?', [
      1, 10, null, null, null, null
    ]);
    return extractJsonArray(raw);
  }

  /**
   * Find a blog post by ID with related data
   * @param id ID of the blog post
   * @returns Blog post with related data
   */
  async findByIdWithRelations(id: string): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC dbo.SP_GetBlogPostById ?', [id]);

    return extractJsonDirect(raw) ?? null;
  }

  /**
   * Create a new blog post
   * @param dto Blog post creation data
   * @returns Created blog post
   */
  async create(dto: any): Promise<any> {
    // Map DTO to match stored procedure parameters
    const mappedDto = {
      title: dto.Title || dto.title,
      slug: dto.Slug || dto.slug,
      content: dto.Content || dto.content,
      excerpt: dto.Excerpt || dto.excerpt,
      coverImageUrl: dto.CoverImageUrl || dto.coverImageUrl,
      authorId: dto.AuthorId || dto.authorId,
      categoryId: dto.CategoryId || dto.categoryId,
      isPublished:
        dto.IsPublished !== undefined ? dto.IsPublished : dto.isPublished,
      publishedAt: dto.PublishedAt || dto.publishedAt,
      tagIds: dto.TagIds || dto.tagIds,
      shortDescription: dto.ShortDescription || dto.shortDescription,
    };

    const raw = await this.em
      .getConnection()
      .execute('EXEC dbo.SP_InsertBlogPost ?,?,?,?,?,?,?,?,?,?', [
        mappedDto.title,
        mappedDto.slug,
        mappedDto.content,
        mappedDto.excerpt ?? null,
        mappedDto.coverImageUrl ?? null,
        mappedDto.authorId,
        mappedDto.categoryId ?? null,
        mappedDto.isPublished !== undefined
          ? mappedDto.isPublished
            ? 1
            : 0
          : 0,
        mappedDto.publishedAt ?? null,
        mappedDto.tagIds && mappedDto.tagIds.length > 0
          ? mappedDto.tagIds.join(',')
          : null,
      ]);

    return extractJsonDirect(raw) ?? null;
  }

  /**
   * Update a blog post
   * @param dto Blog post update data (including ID)
   * @returns Updated blog post
   */
  async update(dto: any): Promise<any> {
    // Map DTO to match stored procedure parameters
    const mappedDto = {
      id: dto.id || dto.Id,
      title: dto.title || dto.Title,
      slug: dto.slug || dto.Slug,
      content: dto.content || dto.Content,
      excerpt: dto.excerpt || dto.Excerpt,
      coverImageUrl: dto.coverImageUrl || dto.CoverImageUrl,
      categoryId: dto.categoryId || dto.CategoryId,
      isPublished:
        dto.isPublished !== undefined ? dto.isPublished : dto.IsPublished,
      publishedAt: dto.publishedAt || dto.PublishedAt,
      tagIds: dto.tagIds || dto.TagIds,
      status: dto.status || dto.Status,
    };

    const raw = await this.em
      .getConnection()
      .execute('EXEC dbo.SP_UpdateBlogPost ?,?,?,?,?,?,?,?,?,?,?', [
        mappedDto.id,
        mappedDto.title ?? null,
        mappedDto.slug ?? null,
        mappedDto.content ?? null,
        mappedDto.excerpt ?? null,
        mappedDto.coverImageUrl ?? null,
        mappedDto.categoryId ?? null,
        mappedDto.isPublished !== undefined
          ? mappedDto.isPublished
            ? 1
            : 0
          : null,
        mappedDto.publishedAt ?? null,
        mappedDto.tagIds && mappedDto.tagIds.length > 0
          ? mappedDto.tagIds.join(',')
          : null,
        mappedDto.status ?? null,
      ]);

    return extractJsonDirect(raw) ?? null;
  }

  /**
   * Delete a blog post
   * @param id ID of the blog post
   * @returns True if deletion was successful
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.em
      .getConnection()
      .execute('EXEC dbo.SP_DeleteBlogPost ?', [id]);

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
    const raw = await this.em
      .getConnection()
      .execute('EXEC dbo.SP_GetBlogPostBySlug ?', [slug]);

    return extractJsonArray(raw)?.[0] ?? null;
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
    const result = await this.update({
      id,
      isPublished: true,
      publishedAt: new Date(),
    });
    if (result.error) {
      return null;
    }
    return result;
  }

  /**
   * Unpublish a blog post
   * @param id Blog post ID
   * @returns Updated blog post
   */
  async unpublishBlogPost(id: string): Promise<any> {
    const result = await this.update({
      id,
      isPublished: false,
      publishedAt: null,
    });
    if (result.error) {
      return null;
    }
    return result;
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
    const {
      keyword,
      categoryId,
      authorId,
      tagIds,
      isPublished,
      status,
      viewsCountMin,
      dateFrom,
      dateTo,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = filters;

    const safePage = Math.max(Number(page || 1), 1);
    const safeLimit = Math.max(Math.min(Number(limit || 10), 100), 1);
    const offset = (safePage - 1) * safeLimit;

    // Use comprehensive filtering SP similar to Jobs
    const params = [
      keyword ?? null, // 1 @Keyword
      categoryId ?? null, // 2 @CategoryId
      authorId ?? null, // 3 @AuthorId
      tagIds ?? null, // 4 @TagIds
      isPublished !== undefined ? (isPublished ? 1 : 0) : null, // 5 @IsPublished
      status ?? null, // 6 @Status
      viewsCountMin ?? null, // 7 @ViewsCountMin
      dateFrom ? new Date(dateFrom) : null, // 8 @DateFrom
      dateTo ? new Date(dateTo) : null, // 9 @DateTo
      sortBy, // 10 @SortBy
      sortOrder, // 11 @SortOrder
      offset, // 12 @Offset
      safeLimit, // 13 @Limit
    ];

    const raw = await this.em
      .getConnection()
      .execute(
        'EXEC dbo.SP_GetFilteredBlogPosts ?,?,?,?,?,?,?,?,?,?,?,?',
        params
      );

    const row = Array.isArray(raw) ? raw[0] : null;
    const jsonText = row?.json_result ?? null;

    if (!jsonText) return { data: [], total: 0 };
    const result = JSON.parse(jsonText);
    const total = result?.total ?? 0;
    const data = result?.data ?? [];

    return { data, total };
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
    // Get current post to update tags
    const post = await this.findByIdWithRelations(blogPostId);
    if (post && !post.error) {
      const currentTagIds = post.tags
        ? post.tags.map((tag: any) => tag.id)
        : [];
      const combinedTagIds = [...new Set([...currentTagIds, ...tagIds])];
      await this.update({ id: blogPostId, tagIds: combinedTagIds });
    }
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
    // Get current post to update tags
    const post = await this.findByIdWithRelations(blogPostId);
    if (post && !post.error && post.tags) {
      const updatedTagIds = post.tags
        .filter((tag: any) => tag.id !== tagId)
        .map((tag: any) => tag.id);
      await this.update({ id: blogPostId, tagIds: updatedTagIds });
    }
  }
}
