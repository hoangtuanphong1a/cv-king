export class CreateJobDto {
  CompanyId: string;
  PostedByUserId?: string;
  Title: string;
  Slug: string;
  ShortDescription?: string;
  Description?: string;
  Requirements?: string;
  Benefits?: string;
  SalaryMin?: number;
  SalaryMax?: number;
  Currency?: string;
  JobType?: string;
  Location?: string;
  CategoryId?: string;
  ExpiresAt?: Date;
  skillIds: string[]; // <--- thêm
  tagIds: string[]; // <--- thêm
}
