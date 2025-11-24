import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags extends AuditableEntity {
  @Property({ type: 'string', fieldName: 'blog_post_id' })
  blogPostId: string;

  @Property({ type: 'string', fieldName: 'blog_tag_id' })
  blogTagId: string;
}
