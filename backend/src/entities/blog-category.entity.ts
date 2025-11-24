import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogCategories' })
export class BlogCategory extends AuditableEntity {
  @Property({ type: 'string', length: 200, nullable: false, unique: true, fieldName: 'name' })
  name: string;

  // Đồng bộ với JobCategory entity - thêm thuộc tính viết hoa
  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }
}
