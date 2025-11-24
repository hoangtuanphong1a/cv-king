import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends CreateBlogDto {
  id: string;
  Status?: string;

  // Additional fields for update operations
  skillIds?: string[];
  tagIds?: string[];

  // Các trường mới từ entity nâng cao
  requirements?: string;
  benefits?: string;
  shortDescription?: string;
}
