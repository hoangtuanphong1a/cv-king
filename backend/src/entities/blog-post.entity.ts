import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

export enum BlogStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  EXPIRED = 'Expired',
  CLOSED = 'Closed',
}

@Entity({ tableName: 'BlogPosts' })
export class BlogPosts extends AuditableEntity {
  @Property({ type: 'string', length: 500, fieldName: 'title' })
  title: string;

  @Property({ type: 'string', length: 500, unique: true, fieldName: 'slug' })
  slug: string;

  @Property({ type: 'text', fieldName: 'content' })
  content: string;

  @Property({
    type: 'string',
    length: 1000,
    nullable: true,
    fieldName: 'excerpt',
  })
  excerpt?: string;

  @Property({
    type: 'string',
    length: 1000,
    nullable: true,
    fieldName: 'cover_image_url',
  })
  coverImageUrl?: string;

  // Đồng bộ với Job entity - thêm các trường nâng cao
  @Property({
    type: 'string',
    length: 1000,
    nullable: true,
    fieldName: 'short_description',
  })
  shortDescription?: string;

  @Property({
    type: 'string',
    length: -1,
    nullable: true,
    fieldName: 'requirements',
  })
  requirements?: string;

  @Property({
    type: 'string',
    length: -1,
    nullable: true,
    fieldName: 'benefits',
  })
  benefits?: string;

  @Property({ type: 'string', fieldName: 'author_user_id' })
  authorUserId: string;

  @Property({ type: 'boolean', default: false, fieldName: 'is_published' })
  isPublished: boolean = false;

  @Property({ type: 'datetime2', nullable: true, fieldName: 'published_at' })
  publishedAt?: Date;

  @Property({
    type: 'string',
    length: 50,
    nullable: false,
    default: BlogStatus.ACTIVE,
    fieldName: 'status',
  })
  status: string = BlogStatus.ACTIVE;

  @Property({
    type: 'int',
    nullable: false,
    default: 0,
    fieldName: 'views_count',
  })
  viewsCount: number = 0;

  @Property({
    type: 'datetime2',
    nullable: false,
    defaultRaw: 'SYSUTCDATETIME()',
    fieldName: 'posted_at',
  })
  postedAt: Date = new Date();

  @Property({ type: 'datetime2', nullable: true, fieldName: 'expires_at' })
  expiresAt?: Date;
}
