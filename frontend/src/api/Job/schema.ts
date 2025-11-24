import { z } from "zod";

export const CreateJobSchema = z
  .object({
    CompanyId: z.string().min(1, "Vui lòng chọn công ty"), // bắt buộc
    PostedByUserId: z.string(), // bắt buộc
    Title: z
      .string()
      .trim()
      .min(3, "Tiêu đề quá ngắn")
      .max(120, "Tiêu đề quá dài"),
    ShortDescription: z.string().trim().min(1, "Tóm tắt là bắt buộc").max(280),
    Description: z.string().trim().min(1, "Mô tả là bắt buộc").max(20000),
    Requirements: z.string().trim().min(1, "Yêu cầu là bắt buộc").max(20000),
    Benefits: z.string().trim().optional(), // có thể optional
    SalaryMin: z.coerce
      .number()
      .nonnegative("Lương tối thiểu không hợp lệ")
      .optional(),
    SalaryMax: z.coerce
      .number()
      .nonnegative("Lương tối đa không hợp lệ")
      .optional(),
    Currency: z
      .string()
      .regex(/^[A-Z]{3}$/, "Mã tiền tệ…")
      .optional(),
    JobType: z.enum([
      "Toàn thời gian",
      "Bán thời gian",
      "Hợp đồng",
      "Freelance",
    ]),
    Location: z.string().trim().min(1, "Địa điểm là bắt buộc").max(140),
    CategoryId: z.string().uuid("Danh mục phải là UUID"),
    ExpiresAt: z.coerce.date().min(new Date(), "Ngày hết hạn phải ở tương lai"),
    skillIds: z.array(z.string()).default([]),
    tagIds: z.array(z.string()).default([]),
  })
  .superRefine((data, ctx) => {
    const hasSalary = data.SalaryMin != null || data.SalaryMax != null;

    if (hasSalary && !data.Currency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Currency"],
        message: "Phải có Currency khi khai báo lương",
      });
    }

    if (
      data.SalaryMin != null &&
      data.SalaryMax != null &&
      data.SalaryMin > data.SalaryMax
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["SalaryMin"],
        message: "SalaryMin không được lớn hơn SalaryMax",
      });
    }
  });

export const JobSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  company_id: z.string(),
  posted_by_user_id: z.string().nullable().optional(),
  title: z.string(),
  slug: z.string(),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),
  salary_min: z.number().nullable().optional(),
  salary_max: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  job_type: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  category_id: z.string().nullable().optional(),
  status: z.string(),
  views_count: z.number().nullable().optional(),
  posted_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  total: z.number().optional(),

  // ✅ Cho phép category là string hoặc object, và tự parse JSON nếu cần
  category: z
    .union([
      z
        .string()
        .transform((str) => {
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        }),
      z
        .object({
          id: z.string(),
          Name: z.string(),
        })
        .nullable(),
      z.null(),
    ])
    .optional(),

  skills: z
    .preprocess(
      (v) => (v === null || v === undefined ? [] : v),
      z.array(
        z.object({
          id: z.string(),
          Name: z.string(),
        })
      )
    ),

  tags: z
    .preprocess(
      (v) => (v === null || v === undefined ? [] : v),
      z.array(
        z.object({
          id: z.string(),
          Name: z.string(),
        })
      )
    ),


  company: z
    .object({
      id: z.string(),
      Name: z.string(),
      slug: z.string().nullable().optional(),
      logo_url: z.string().nullable().optional(),
      banner_url: z.string().nullable().optional(),
      industry: z.string().nullable().optional(),
      company_size: z.string().nullable().optional(),
      website: z.string().nullable().optional(),
      location: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      isVerified: z.boolean().nullable().optional(),
    })
    .nullable()
    .optional(),
});


export const JobsSchema = z.array(JobSchema);

/** ====== Filter schema cho FE build query ======
 * - Coerce number
 * - Default page=1, limit=10
 * - Enum cho sortBy/sortOrder/jobType
 */
export const JobFilterSchema = z
  .object({
    keyword: z.string().trim().optional(),
    location: z.string().trim().optional(),
    categoryId: z.string().uuid().optional(),
    salaryMin: z.coerce.number().int().nonnegative().optional(),
    salaryMax: z.coerce.number().int().nonnegative().optional(),
    jobType: z
      .enum(["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"])
      .optional(),
    companyId: z.string().uuid().optional(),

    // backend đang nhận comma-separated -> để string
    skillIds: z.string().optional(),
    tagIds: z.string().optional(),

    sortBy: z
      .enum(["title", "salary_min", "created_at", "views_count"])
      .default("title"),
    sortOrder: z.enum(["ASC", "DESC"]).default("DESC"),

    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .refine(
    (v) =>
      v.salaryMin == null || v.salaryMax == null || v.salaryMin <= v.salaryMax,
    { message: "salaryMin must be <= salaryMax", path: ["salaryMin"] }
  );

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

export const JobApiResponseSchema = ApiResponseSchema(z.unknown());
