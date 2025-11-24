import { IsUUID, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreateJobApplicationDto {
  @IsUUID()
  jobId: string;

  @IsUUID()
  jobSeekerId: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
