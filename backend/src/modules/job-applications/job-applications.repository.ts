import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';

@Injectable()
export class JobApplicationsRepository {
  constructor(private readonly em: EntityManager) { }

  async findAll(): Promise<any[]> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetAllJobApplications');
    return extractJsonArray(raw) ?? [];
  }

  async findOne(id: string): Promise<any | null> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobApplicationById ?', [id]);
    return extractJson(raw);
  }

  async findByJobSeekerId(jobSeekerId: string): Promise<any[]> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobApplicationsByJobSeekerId ?', [jobSeekerId]);
    return extractJsonArray(raw) ?? [];
  }

  async findByCompanyId(companyId: string): Promise<any[]> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobApplicationsByCompanyId ?', [companyId]);
    return raw;
  }

  async create(dto: CreateJobApplicationDto): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_InsertJobApplication ?, ?, ?', [
        dto.jobId,
        dto.jobSeekerId,
        dto.coverLetter ?? null,
      ]);
    return extractJson(raw);
  }

  async update(dto: UpdateJobApplicationDto): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_UpdateJobApplication ?, ?, ?', [
        dto.id,
        dto.coverLetter ?? null,
        dto.status,
      ]);
    return extractJson(raw);
  }

  async delete(id: string): Promise<boolean> {
    await this.em
      .getConnection()
      .execute('EXEC SP_DeleteJobApplication ?', [id]);
    return true;
  }
}
