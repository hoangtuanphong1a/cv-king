import instance, { getSuccessResponse } from "../axios";
import {
  ApiResponseSchema,
  BlogViewStatsSchema,
  BlogOverviewStatsSchema,
  BlogViewTrendsSchema,
  TopBlogPostsSchema,
  BlogAnalyticsFilterSchema
} from "./schema";
import {
  BlogViewStats,
  BlogOverviewStats,
  BlogViewTrends,
  TopBlogPosts,
  BlogView,
  BlogAnalyticsFilter
} from "./type";

// API Functions
export const recordBlogViewRequest = async (
  blogPostId: string,
  userId?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<BlogView> => {
  const response = await instance.post(`/blog-views/${blogPostId}`, {}, {
    headers: {
      'X-User-Id': userId,
      'X-IP-Address': ipAddress,
      'User-Agent': userAgent,
    },
  });
  return getSuccessResponse<BlogView>(response);
};

export const getBlogViewStatsRequest = async (blogPostId: string): Promise<BlogViewStats> => {
  const response = await instance.get(`/blog-views/${blogPostId}/stats`);
  const StatsResp = ApiResponseSchema(BlogViewStatsSchema);
  const parsedResp = StatsResp.parse(response.data);
  return parsedResp.data as BlogViewStats;
};

export const getBlogOverviewStatsRequest = async (filters?: Partial<BlogAnalyticsFilter>): Promise<BlogOverviewStats> => {
  const parsed = BlogAnalyticsFilterSchema.parse(filters ?? {});

  const params: Record<string, string | number> = {};
  params.period = parsed.period;
  params.groupBy = parsed.groupBy;

  const response = await instance.get(`/blog-views/analytics/overview`, { params });
  const OverviewResp = ApiResponseSchema(BlogOverviewStatsSchema);
  const parsedResp = OverviewResp.parse(response.data);
  return parsedResp.data as BlogOverviewStats;
};

export const getBlogViewTrendsRequest = async (filters?: Partial<BlogAnalyticsFilter>): Promise<BlogViewTrends> => {
  const parsed = BlogAnalyticsFilterSchema.parse(filters ?? {});

  const params: Record<string, string | number> = {};
  params.period = parsed.period;
  params.groupBy = parsed.groupBy;
  if (parsed.dateFrom) params.dateFrom = parsed.dateFrom;
  if (parsed.dateTo) params.dateTo = parsed.dateTo;

  const response = await instance.get(`/blog-views/analytics/trends`, { params });
  const TrendsResp = ApiResponseSchema(BlogViewTrendsSchema);
  const parsedResp = TrendsResp.parse(response.data);
  return parsedResp.data as BlogViewTrends;
};

export const getTopBlogPostsRequest = async (filters?: Partial<BlogAnalyticsFilter>): Promise<TopBlogPosts> => {
  const parsed = BlogAnalyticsFilterSchema.parse(filters ?? {});

  const params: Record<string, string | number> = {};
  params.limit = parsed.limit;
  params.period = parsed.period;

  const response = await instance.get(`/blog-views/analytics/top-posts`, { params });
  const TopPostsResp = ApiResponseSchema(TopBlogPostsSchema);
  const parsedResp = TopPostsResp.parse(response.data);
  return parsedResp.data as TopBlogPosts;
};
