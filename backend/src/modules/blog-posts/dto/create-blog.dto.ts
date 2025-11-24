export class CreateBlogDto {
  AuthorId: string;
  Title: string;
  Slug: string;
  Content: string;
  Excerpt?: string;
  CoverImageUrl?: string;
  CategoryId?: string;
  IsPublished?: boolean;
  PublishedAt?: Date;
  TagIds?: string[];
  ShortDescription?: string;

  // Đồng bộ với Job entity - thêm các trường nâng cao
  Requirements?: string;
  Benefits?: string;

  // Các trường khác từ Job entity (tùy chọn cho blog)
  SalaryMin?: number;
  SalaryMax?: number;
  Currency?: string;
  JobType?: string;
  Location?: string;
  ExpiresAt?: Date;

  // Keep backwards compatibility
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  coverImageUrl?: string;
  authorId?: string;
  isPublished?: boolean;
  tagIds?: string[];
  shortDescription?: string;
  categoryId?: string;
  requirements?: string;
  benefits?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  jobType?: string;
  location?: string;
  expiresAt?: Date;
}
