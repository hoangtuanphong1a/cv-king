import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogTags' })
export class BlogTags extends AuditableEntity {
  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true, fieldName: 'name' })
  name: string;

  // Đồng bộ với JobTag entity - thêm thuộc tính viết hoa
  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }
}
