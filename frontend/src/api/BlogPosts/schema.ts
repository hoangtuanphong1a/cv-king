import { z } from "zod";

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

export const BlogPostSchema = z.object({
  id: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  authorId: z.string(),
  categoryId: z.string().nullable().optional(),
  isPublished: z.boolean(),
  publishedAt: z.union([z.string(), z.date()]).nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),

  // Relations (optional để tương thích với Jobs)
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.union([z.string(), z.date()]),
        updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
      })
    )
    .optional(),
  comments: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        isApproved: z.boolean(),
        blogPostId: z.string().nullable().optional(),
        userId: z.string().nullable().optional(),
        createdAt: z.union([z.string(), z.date()]),
        updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
      })
    )
    .optional(),
  author: z.unknown().optional(),
  category: z.unknown().optional(),
});

export const BlogPostWithRelationsSchema = BlogPostSchema.extend({
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.union([z.string(), z.date()]),
        updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
      })
    )
    .default([]),
  comments: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        isApproved: z.boolean(),
        blogPostId: z.string().nullable().optional(),
        userId: z.string().nullable().optional(),
        createdAt: z.union([z.string(), z.date()]),
        updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
      })
    )
    .default([]),
  author: z.object({
    id: z.string(),
    username: z.string().optional(),
    email: z.string().email().optional(),
  }).optional(),
  category: z.object({
    id: z.string(),
    name: z.string().optional(),
  }).optional(),
});

export const BlogPostsSchema = z.array(BlogPostSchema);

export const CreateBlogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Tiêu đề quá ngắn")
    .max(500, "Tiêu đề quá dài"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug không được để trống")
    .max(500, "Slug quá dài")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  content: z
    .string()
    .trim()
    .min(10, "Nội dung quá ngắn")
    .max(50000, "Nội dung quá dài"),
  excerpt: z
    .string()
    .trim()
    .max(1000, "Tóm tắt tối đa 1000 ký tự")
    .optional(),
  coverImageUrl: z
    .string()
    .url("URL hình ảnh không hợp lệ")
    .optional(),
  authorId: z
    .string()
    .uuid("AuthorId phải là UUID hợp lệ"),
  categoryId: z
    .string()
    .uuid("CategoryId phải là UUID hợp lệ")
    .optional(),
  isPublished: z
    .boolean()
    .default(false),
  tagIds: z
    .array(z.string().uuid("TagId phải là UUID hợp lệ"))
    .default([]),
  shortDescription: z
    .string()
    .trim()
    .max(2000, "Mô tả ngắn tối đa 2000 ký tự")
    .optional(),
  requirements: z
    .string()
    .trim()
    .max(10000, "Yêu cầu tối đa 10000 ký tự")
    .optional(),
  benefits: z
    .string()
    .trim()
    .max(10000, "Lợi ích tối đa 10000 ký tự")
    .optional(),
});

export const UpdateBlogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Tiêu đề quá ngắn")
    .max(500, "Tiêu đề quá dài")
    .optional(),
  slug: z
    .string()
    .trim()
    .min(1, "Slug không được để trống")
    .max(500, "Slug quá dài")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang")
    .optional(),
  content: z
    .string()
    .trim()
    .min(10, "Nội dung quá ngắn")
    .max(50000, "Nội dung quá dài")
    .optional(),
  excerpt: z
    .string()
    .trim()
    .max(1000, "Tóm tắt tối đa 1000 ký tự")
    .optional(),
  coverImageUrl: z
    .string()
    .url("URL hình ảnh không hợp lệ")
    .optional(),
  authorId: z
    .string()
    .uuid("AuthorId phải là UUID hợp lệ")
    .optional(),
  categoryId: z
    .string()
    .uuid("CategoryId phải là UUID hợp lệ")
    .optional(),
  isPublished: z
    .boolean()
    .optional(),
  tagIds: z
    .array(z.string().uuid("TagId phải là UUID hợp lệ"))
    .optional(),
  shortDescription: z
    .string()
    .trim()
    .max(2000, "Mô tả ngắn tối đa 2000 ký tự")
    .optional(),
  requirements: z
    .string()
    .trim()
    .max(10000, "Yêu cầu tối đa 10000 ký tự")
    .optional(),
  benefits: z
    .string()
    .trim()
    .max(10000, "Lợi ích tối đa 10000 ký tự")
    .optional(),
});

export const BlogPostFilterSchema = z.object({
  keyword: z
    .string()
    .trim()
    .max(255, "Từ khóa tìm kiếm quá dài")
    .optional(),
  categoryId: z
    .string()
    .uuid("CategoryId phải là UUID hợp lệ")
    .optional(),
  authorId: z
    .string()
    .uuid("AuthorId phải là UUID hợp lệ")
    .optional(),
  tagIds: z
    .string()
    .optional(), // comma-separated tag IDs
  status: z
    .enum(['published', 'unpublished', 'draft'])
    .optional(),
  isPublished: z
    .boolean()
    .optional(),
  viewsCountMin: z
    .coerce
    .number()
    .int()
    .nonnegative("Số lượt xem tối thiểu không hợp lệ")
    .optional(),
  dateFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày bắt đầu phải có định dạng YYYY-MM-DD")
    .optional(),
  dateTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày kết thúc phải có định dạng YYYY-MM-DD")
    .optional(),
  sortBy: z
    .enum([
      'title', 'created_at', 'updated_at', 'published_at',
      'views_count', 'is_published'
    ])
    .default('created_at'),
  sortOrder: z
    .enum(['ASC', 'DESC'])
    .default('DESC'),
  page: z
    .coerce
    .number()
    .int()
    .positive("Số trang phải lớn hơn 0")
    .default(1),
  limit: z
    .coerce
    .number()
    .int()
    .min(1, "Số item mỗi trang phải ít nhất 1")
    .max(100, "Số item mỗi trang tối đa 100")
    .default(10),
}).refine(
  (data) => {
    if (data.dateFrom && data.dateTo && data.dateFrom > data.dateTo) {
      return false;
    }
    return true;
  },
  {
    message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
    path: ["dateFrom"],
  }
);
