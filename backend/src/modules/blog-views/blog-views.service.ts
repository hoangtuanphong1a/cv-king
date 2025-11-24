import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { BlogViewsRepository } from './blog-views.repository';

@Injectable()
export class BlogViewsService {
  constructor(
    private readonly blogViewsRepository: BlogViewsRepository,
    private readonly em: EntityManager
  ) {}

  async recordView(
    blogPostId: string,
    user?: any,
    ipAddress?: string,
    userAgent?: string
  ): Promise<any> {
    // Record view using repository
    const view = await this.blogViewsRepository.recordView(
      blogPostId,
      user?.id,
      ipAddress,
      userAgent
    );

    // Increment view count using repository
    await this.blogViewsRepository.incrementBlogViewCount(blogPostId);

    return view;
  }

  async getViewStats(blogPostId: string): Promise<{
    totalViews: number;
    uniqueViews: number;
    recentViews: number;
  }> {
    return await this.blogViewsRepository.getViewStats(blogPostId);
  }

  async getOverviewStats(query?: any): Promise<{
    totalViews: number;
    totalUniqueViews: number;
    averageViewsPerPost: number;
    topViewedPosts: any[];
    viewGrowth?: number;
    uniqueViewGrowth?: number;
  }> {
    return await this.blogViewsRepository.getOverviewStats(query);
  }

  async getViewTrends(query: any): Promise<{
    trends: any[];
    summary: {
      totalViews: number;
      growth: number;
      peakDay: string;
    };
  }> {
    return await this.blogViewsRepository.getViewTrends(query);
  }

  async getTopPerformingPosts(query: any): Promise<{
    posts: any[];
    summary: {
      totalPosts: number;
      averageViews: number;
      topPerformer: string;
    };
  }> {
    return await this.blogViewsRepository.getTopPerformingPosts(query);
  }
}
