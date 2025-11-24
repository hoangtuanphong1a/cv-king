import { ApplicationStatus } from '@entities/job-application.entity';
import { IsUUID, IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateJobApplicationDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
