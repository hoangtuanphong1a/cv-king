import z from "zod";
import {
  BlogViewStatsSchema,
  BlogOverviewStatsSchema,
  BlogViewTrendsSchema,
  TopBlogPostsSchema,
  BlogViewSchema,
  BlogAnalyticsFilterSchema
} from "./schema";

export type BlogViewStats = z.infer<typeof BlogViewStatsSchema>;
export type BlogOverviewStats = z.infer<typeof BlogOverviewStatsSchema>;
export type BlogViewTrends = z.infer<typeof BlogViewTrendsSchema>;
export type TopBlogPosts = z.infer<typeof TopBlogPostsSchema>;
export type BlogView = z.infer<typeof BlogViewSchema>;
export type BlogAnalyticsFilter = z.infer<typeof BlogAnalyticsFilterSchema>;
