import { z } from "zod";

export const BlogViewStatsSchema = z.object({
  totalViews: z.number(),
  uniqueViews: z.number(),
  recentViews: z.number(),
});

export const BlogOverviewStatsSchema = z.object({
  totalViews: z.number(),
  totalUniqueViews: z.number(),
  averageViewsPerPost: z.number(),
  topViewedPosts: z.array(z.unknown()),
  viewGrowth: z.number().optional(),
  uniqueViewGrowth: z.number().optional(),
});

export const BlogViewTrendsSchema = z.object({
  trends: z.array(z.unknown()),
  summary: z.object({
    totalViews: z.number(),
    growth: z.number(),
    peakDay: z.string(),
  }),
});

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  viewsCount: z.number(),
  createdAt: z.string(),
  authorUserId: z.string(),
  authorName: z.string(),
  commentsCount: z.number(),
});

export const TopBlogPostsSchema = z.object({
  posts: z.array(BlogPostSchema),
  summary: z.object({
    totalPosts: z.number(),
    averageViews: z.number(),
    topPerformer: z.string(),
  }),
});

export const BlogViewSchema = z.object({
  id: z.string(),
  blogPostId: z.string(),
  viewerUserId: z.string().optional(),
  sessionId: z.string(),
  viewedAt: z.string(),
});

export const BlogAnalyticsFilterSchema = z.object({
  period: z.enum(['today', 'week', 'month', 'year', 'all']).default('all'),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const ApiResponseSchema = <T extends z.ZodTypeAny = z.ZodUnknown>(
  dataSchema?: T
) =>
  z.object({
    status: z.enum(["success", "error"]),
    message: z.string(),
    data: z.union([
      dataSchema ?? z.unknown(),
      (dataSchema ?? z.unknown()).array(),
      z.null(),
    ]),
    meta: z
      .object({
        count: z.number().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
        totalPages: z.number().optional(),
      })
      .optional(),
  });
