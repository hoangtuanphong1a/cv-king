import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogViews' })
export class BlogViews extends AuditableEntity {
  @Property({ type: 'int', fieldName: 'blog_post_id' })
  blogPostId: number;

  @Property({ type: 'int', nullable: true, fieldName: 'viewer_user_id' })
  viewerUserId?: number;

  @Property({ type: 'string', nullable: true, fieldName: 'session_id' })
  sessionId?: string;

  @Property({ type: 'datetime2', nullable: false, defaultRaw: 'SYSUTCDATETIME()', fieldName: 'viewed_at' })
  viewedAt: Date = new Date();
}
