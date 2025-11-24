import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BlogAnalyticsDto } from './dto/blog-analytics.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

@Injectable()
export class BlogViewsRepository {
  constructor(private readonly em: EntityManager) {}

  async recordView(
    blogPostId: string,
    userId?: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<any> {
    const raw = await this.em.getConnection().execute(
      'EXEC SP_RecordBlogView ?, ?, ?, ?',
      [blogPostId, userId || null, ipAddress || null, userAgent || null]
    );
    return extractJson(raw);
  }

  async getViewStats(blogPostId: string): Promise<{
    totalViews: number;
    uniqueViews: number;
    recentViews: number;
  }> {
    const raw = await this.em.getConnection().execute(
      'EXEC SP_GetBlogViewStats ?',
      [blogPostId]
    );
    return extractJson(raw);
  }

  async getOverviewStats(query?: BlogAnalyticsDto): Promise<{
    totalViews: number;
    totalUniqueViews: number;
    averageViewsPerPost: number;
    topViewedPosts: any[];
    viewGrowth?: number;
    uniqueViewGrowth?: number;
  }> {
    const { period = 'all', groupBy = 'day' } = query || {};

    const raw = await this.em.getConnection().execute(
      'EXEC SP_GetBlogOverviewStats ?, ?',
      [period, groupBy]
    );
    return extractJson(raw);
  }

  async getViewTrends(query: BlogAnalyticsDto): Promise<{
    trends: any[];
    summary: {
      totalViews: number;
      growth: number;
      peakDay: string;
    };
  }> {
    const { period = 'all', groupBy = 'day', dateFrom, dateTo } = query;

    const raw = await this.em.getConnection().execute(
      'EXEC SP_GetBlogViewTrends ?, ?, ?, ?',
      [period, groupBy, dateFrom || null, dateTo || null]
    );
    return extractJson(raw);
  }

  async getTopPerformingPosts(query: BlogAnalyticsDto): Promise<{
    posts: any[];
    summary: {
      totalPosts: number;
      averageViews: number;
      topPerformer: string;
    };
  }> {
    const { limit = 10, period = 'all' } = query;

    const raw = await this.em.getConnection().execute(
      'EXEC SP_GetTopBlogPosts ?, ?, ?',
      [limit, period, 'views']
    );
    return extractJson(raw);
  }

  async incrementBlogViewCount(blogPostId: string): Promise<boolean> {
    await this.em.getConnection().execute(
      'EXEC SP_IncrementBlogViewCount ?',
      [blogPostId]
    );
    return true;
  }
}
