import { IsString, IsOptional, IsUUID, IsBoolean, IsArray, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class CreateBlogPostDto {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  authorId: string;
  isPublished?: boolean;
  tagIds?: string[];

  // Additional fields for enhanced functionality
  shortDescription?: string;
  categoryId?: string;

  // Note: These fields exist in entity but not yet in database:
  // postedByUserId?: string;
  // requirements?: string;
  // benefits?: string;
  // location?: string;
  // blogType?: string;
}

export class UpdateBlogPostDto {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  coverImageUrl?: string;
  authorId?: string;
  isPublished?: boolean;
  tagIds?: string[];

  // Additional fields for enhanced functionality
  shortDescription?: string;
  categoryId?: string;
  status?: string;

  // Note: These fields exist in entity but not yet in database:
  // postedByUserId?: string;
  // requirements?: string;
  // benefits?: string;
  // location?: string;
  // blogType?: string;
}
