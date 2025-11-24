import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogComments' })
export class BlogComments extends AuditableEntity {
  @Property({ type: 'string', fieldName: 'blog_post_id' })
  blogPostId: string;

  @Property({ type: 'string', nullable: true, fieldName: 'user_id' })
  userId?: string;

  @Property({ type: 'string', length: 200, nullable: true, fieldName: 'guest_name' })
  guestName?: string;

  @Property({ type: 'text', fieldName: 'content' })
  content: string;

  @Property({ type: 'boolean', default: false, fieldName: 'is_approved' })
  isApproved: boolean = false;
}
