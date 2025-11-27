import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BlogViews } from '../../entities/blog-views.entity';
import { BlogAnalyticsDto } from './dto/blog-analytics.dto';

@Injectable()
export class BlogViewsRepository {
  constructor(
    @InjectRepository(BlogViews)
    private readonly repo: EntityRepository<BlogViews>,
    private readonly em: EntityManager
  ) {}

  async recordView(
    blogPostId: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<BlogViews> {
    // Generate session ID if not provided (for unique view tracking)
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const view = this.repo.create({
      blogPostId: parseInt(blogPostId),
      viewerUserId: userId ? parseInt(userId) : undefined,
      sessionId,
      viewedAt: new Date(),
    });

    await this.em.persistAndFlush(view);
    return view;
  }

  async getViewStats(blogPostId: string): Promise<{
    totalViews: number;
    uniqueViews: number;
    recentViews: number;
  }> {
    const postId = parseInt(blogPostId);

    // Total views
    const totalViews = await this.repo.count({ blogPostId: postId });

    // Unique views (based on session_id)
    const uniqueViewsResult = await this.em
      .getConnection()
      .execute(
        `SELECT COUNT(DISTINCT session_id) as unique_views FROM BlogViews WHERE blog_post_id = ?`,
        [postId]
      );
    const uniqueViews = (uniqueViewsResult[0] as any)?.unique_views || 0;

    // Recent views (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentViews = await this.repo.count({
      blogPostId: postId,
      viewedAt: { $gte: sevenDaysAgo },
    });

    return {
      totalViews,
      uniqueViews,
      recentViews,
    };
  }

  async getOverviewStats(query?: BlogAnalyticsDto): Promise<{
    totalViews: number;
    totalUniqueViews: number;
    averageViewsPerPost: number;
    topViewedPosts: any[];
    viewGrowth?: number;
    uniqueViewGrowth?: number;
  }> {
    // Get total views
    const totalViews = await this.repo.count();

    // Get unique views
    const uniqueViewsResult = await this.em
      .getConnection()
      .execute(
        'SELECT COUNT(DISTINCT session_id) as unique_views FROM BlogViews'
      );
    const totalUniqueViews = (uniqueViewsResult[0] as any)?.unique_views || 0;

    // Get unique post IDs for average calculation
    const postIdsResult = await this.em
      .getConnection()
      .execute(
        'SELECT COUNT(DISTINCT blog_post_id) as total_posts FROM BlogViews'
      );
    const totalPosts = (postIdsResult[0] as any)?.total_posts || 1;
    const averageViewsPerPost = Math.round(totalViews / totalPosts);

    // Get top viewed posts (simplified)
    const topPostsResult = await this.em.getConnection().execute(`
      SELECT blog_post_id, COUNT(*) as view_count
      FROM BlogViews
      GROUP BY blog_post_id
      ORDER BY view_count DESC
      LIMIT 5
    `);

    const topViewedPosts = (topPostsResult as any[]).map(row => ({
      postId: row.blog_post_id,
      views: row.view_count,
    }));

    return {
      totalViews,
      totalUniqueViews,
      averageViewsPerPost,
      topViewedPosts,
    };
  }

  async getViewTrends(query: BlogAnalyticsDto): Promise<{
    trends: any[];
    summary: {
      totalViews: number;
      growth: number;
      peakDay: string;
    };
  }> {
    // Simplified implementation - group by date
    const trendsResult = await this.em.getConnection().execute(`
      SELECT DATE(viewed_at) as date, COUNT(*) as views
      FROM BlogViews
      GROUP BY DATE(viewed_at)
      ORDER BY date DESC
      LIMIT 30
    `);

    const trends = (trendsResult as any[]).map(row => ({
      date: row.date,
      views: row.views,
    }));

    const totalViews = trends.reduce((sum, t) => sum + t.views, 0);
    const peakDay = trends.length > 0 ? trends[0].date : '';

    return {
      trends,
      summary: {
        totalViews,
        growth: 0, // Simplified - would need more complex calculation
        peakDay,
      },
    };
  }

  async getTopPerformingPosts(query: BlogAnalyticsDto): Promise<{
    posts: any[];
    summary: {
      totalPosts: number;
      averageViews: number;
      topPerformer: string;
    };
  }> {
    const limit = query.limit || 10;

    const topPostsResult = await this.em.getConnection().execute(
      `
      SELECT blog_post_id, COUNT(*) as view_count
      FROM BlogViews
      GROUP BY blog_post_id
      ORDER BY view_count DESC
      LIMIT ?
    `,
      [limit]
    );

    const posts = (topPostsResult as any[]).map(row => ({
      postId: row.blog_post_id,
      views: row.view_count,
    }));

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const averageViews =
      totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
    const topPerformer = totalPosts > 0 ? posts[0].postId.toString() : '';

    return {
      posts,
      summary: {
        totalPosts,
        averageViews,
        topPerformer,
      },
    };
  }

  async incrementBlogViewCount(blogPostId: string): Promise<boolean> {
    // This method is now redundant since recordView handles the counting
    // Keeping for backward compatibility
    return true;
  }
}
