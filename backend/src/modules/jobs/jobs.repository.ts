import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

@Injectable()
export class JobsRepository {
  constructor(private readonly em: EntityManager) { }

  async findAll(): Promise<any[]> {
    const raw = await this.em.getConnection().execute('EXEC SP_GetAllJobs');
    return extractJsonArray(raw);
  }

  async findFiltered(
    filter: FilterJobsDto
  ): Promise<{ data: any[]; total: number }> {
    const {
      keyword,
      location,
      categoryId,
      salaryMin,
      salaryMax,
      jobType,
      companyId,
      skillIds,
      tagIds,
      sortBy = 'posted_at',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = filter;

    const safePage = Math.max(Number(page || 1), 1);
    const safeLimit = Math.max(Math.min(Number(limit || 10), 100), 1);
    const offset = (safePage - 1) * safeLimit;

    // ✅ ĐÚNG 13 phần tử theo thứ tự thủ tục
    const params = [
      keyword ?? null, // 1 @Keyword
      location ?? null, // 2 @Location
      categoryId ?? null, // 3 @CategoryId
      salaryMin ?? null, // 4 @SalaryMin
      salaryMax ?? null, // 5 @SalaryMax
      jobType ?? null, // 6 @JobType
      companyId ?? null, // 7 @CompanyId
      skillIds ?? null, // 8 @SkillIds
      tagIds ?? null, // 9 @TagIds
      sortBy, // 10 @SortBy
      sortOrder, // 11 @SortOrder
      offset, // 12 @Offset
      safeLimit, // 13 @Limit
    ];

    // ✅ ĐÚNG 13 "?" placeholders
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetFilteredJobs ?,?,?,?,?,?,?,?,?,?,?,?,?', params);

    const row = Array.isArray(raw) ? raw[0] : null;
    const jsonText = row?.json_result ?? null;

    if (!jsonText) return { data: [], total: 0 };
    const list = JSON.parse(jsonText) as any[];
    const total = list?.[0]?.total ?? 0;


    return { data: list ?? [], total };
  }

  async findOne(id: string): Promise<any | null> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobById ?', [id]);
    if (!raw?.[0]) return null;
    return extractJson(raw);
  }

  async create(dto: CreateJobDto): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_InsertJobFull ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?', [
        dto.CompanyId,
        dto.PostedByUserId,
        dto.Title,
        dto.Slug,
        dto.ShortDescription,
        dto.Description,
        dto.Requirements,
        dto.Benefits,
        dto.SalaryMin,
        dto.SalaryMax,
        dto.Currency,
        dto.JobType,
        dto.Location,
        dto.CategoryId,
        dto.ExpiresAt,
        JSON.stringify(dto.skillIds ?? []),
        JSON.stringify(dto.tagIds ?? []),
      ]);
    return extractJson(raw);
  }

  async update(dto: UpdateJobDto): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_UpdateJobFull ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?', [
        dto.id,
        dto.Title,
        dto.Slug,
        dto.ShortDescription,
        dto.Description,
        dto.Requirements,
        dto.Benefits,
        dto.SalaryMin,
        dto.SalaryMax,
        dto.Currency,
        dto.JobType,
        dto.Location,
        dto.CategoryId,
        dto.Status,
        dto.ExpiresAt,
        JSON.stringify(dto.skillIds ?? []),
        JSON.stringify(dto.tagIds ?? []),
      ]);
    return extractJson(raw);
  }

  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteJob ?', [id]);
    return true;
  }
}
