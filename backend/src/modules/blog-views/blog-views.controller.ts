import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Req,
  UseGuards,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BlogViewsService } from './blog-views.service';
import { BlogAnalyticsDto } from './dto/blog-analytics.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('blog-views')
@Controller('blog-views')
export class BlogViewsController {
  constructor(private readonly blogViewsService: BlogViewsService) {}

  @Post(':blogPostId')
  @UseGuards(AuthGuard('jwt'))
  async recordView(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string,
    @Req() req: any
  ): Promise<ApiResponse<any>> {
    const data = await this.blogViewsService.recordView(
      blogPostId,
      req.user,
      req.ip,
      req.headers['user-agent']
    );
    return {
      status: 'success',
      message: 'View recorded successfully',
      data,
    };
  }

  /**
   * Get detailed view statistics for a specific blog post
   * @param blogPostId Blog post ID
   * @returns Detailed view statistics
   */
  @Get(':blogPostId/stats')
  @ApiOperation({
    summary: 'Get detailed view statistics for a blog post',
    description: 'Returns total views, unique views, and recent views for a specific blog post'
  })
  @ApiParam({ name: 'blogPostId', description: 'Blog post ID' })
  async getViewStats(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string
  ): Promise<ApiResponse<any>> {
    const data = await this.blogViewsService.getViewStats(blogPostId);
    return {
      status: 'success',
      message: 'View stats retrieved successfully',
      data,
    };
  }

  /**
   * Get comprehensive analytics overview for all blog posts
   * @param query Analytics query parameters
   * @returns Analytics data with trends and insights
   */
  @Get('analytics/overview')
  @ApiOperation({
    summary: 'Get comprehensive blog analytics overview',
    description: 'Returns total views, unique views, top performing posts, and trend analysis'
  })
  async getOverviewStats(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
      })
    )
    query: BlogAnalyticsDto
  ): Promise<ApiResponse<any>> {
    const data = await this.blogViewsService.getOverviewStats(query);
    return {
      status: 'success',
      message: 'Analytics overview retrieved successfully',
      data,
      meta: {
        period: query.period || 'all',
        groupBy: query.groupBy || 'day',
      },
    };
  }

  /**
   * Get view trends over time for analytics
   * @param query Analytics query with time period
   * @returns Time-series view data
   */
  @Get('analytics/trends')
  @ApiOperation({
    summary: 'Get view trends over time',
    description: 'Returns time-series data for view analytics with grouping options'
  })
  async getViewTrends(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
      })
    )
    query: BlogAnalyticsDto
  ): Promise<ApiResponse<any>> {
    const data = await this.blogViewsService.getViewTrends(query);
    return {
      status: 'success',
      message: 'View trends retrieved successfully',
      data,
      meta: {
        period: query.period || 'all',
        groupBy: query.groupBy || 'day',
      },
    };
  }

  /**
   * Get top performing blog posts by views
   * @param query Analytics query parameters
   * @returns List of top viewed posts
   */
  @Get('analytics/top-posts')
  @ApiOperation({
    summary: 'Get top performing blog posts',
    description: 'Returns blog posts ranked by view count with performance metrics'
  })
  async getTopPosts(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
      })
    )
    query: BlogAnalyticsDto
  ): Promise<ApiResponse<any>> {
    const data = await this.blogViewsService.getTopPerformingPosts(query);
    return {
      status: 'success',
      message: 'Top performing posts retrieved successfully',
      data,
      meta: {
        limit: query.limit || 10,
        period: query.period || 'all',
      },
    };
  }
}
