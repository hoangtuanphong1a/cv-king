import {
  type UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { BlogViewStats, BlogOverviewStats, BlogViewTrends, TopBlogPosts, BlogView, BlogAnalyticsFilter } from './type';
import { recordBlogViewRequest, getBlogViewStatsRequest, getBlogOverviewStatsRequest, getBlogViewTrendsRequest, getTopBlogPostsRequest } from './request';
import { onMutateError } from '@/lib/utils';

export const BlogViewQueryKey = {
  stats: (blogPostId: string) => ["blog-views", "stats", blogPostId] as const,
  overview: (filter?: Partial<BlogAnalyticsFilter>) => ["blog-views", "overview", filter ?? {}] as const,
  trends: (filter?: Partial<BlogAnalyticsFilter>) => ["blog-views", "trends", filter ?? {}] as const,
  topPosts: (filter?: Partial<BlogAnalyticsFilter>) => ["blog-views", "top-posts", filter ?? {}] as const,
};

export const useBlogViewStatsQuery = (blogPostId?: string) =>
  useQuery<BlogViewStats>({
    queryKey: BlogViewQueryKey.stats(blogPostId || "unknown"),
    queryFn: () => getBlogViewStatsRequest(blogPostId as string),
    enabled: !!blogPostId,
  });

export const useBlogOverviewStatsQuery = (filter?: Partial<BlogAnalyticsFilter>) =>
  useQuery<BlogOverviewStats>({
    queryKey: BlogViewQueryKey.overview(filter),
    queryFn: () => getBlogOverviewStatsRequest(filter),
  });

export const useBlogViewTrendsQuery = (filter?: Partial<BlogAnalyticsFilter>) =>
  useQuery<BlogViewTrends>({
    queryKey: BlogViewQueryKey.trends(filter),
    queryFn: () => getBlogViewTrendsRequest(filter),
  });

export const useTopBlogPostsQuery = (filter?: Partial<BlogAnalyticsFilter>) =>
  useQuery<TopBlogPosts>({
    queryKey: BlogViewQueryKey.topPosts(filter),
    queryFn: () => getTopBlogPostsRequest(filter),
  });

export const useRecordBlogViewMutation = (options?: UseMutationOptions<BlogView, Error, { blogPostId: string; userId?: string; ipAddress?: string; userAgent?: string }, unknown>) =>
  useMutation({
    mutationFn: ({ blogPostId, userId, ipAddress, userAgent }) =>
      recordBlogViewRequest(blogPostId, userId, ipAddress, userAgent),
    onError: onMutateError,
    ...options,
  });
