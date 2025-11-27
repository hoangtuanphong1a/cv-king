import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends CreateJobDto {
  id: string;
  status: string;
}
