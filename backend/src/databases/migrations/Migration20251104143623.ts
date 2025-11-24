import { Migration } from '@mikro-orm/migrations';

export class Migration20251104143623 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [Companies] add [created_at] date not null, [updated_at] date null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'Companies' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table [Companies] drop constraint ' + @constraint0);`);
    this.addSql(`declare @constraint1 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'Companies' and all_columns.name = 'updated_at') if @constraint1 is not null exec('alter table [Companies] drop constraint ' + @constraint1);`);
    this.addSql(`alter table [Companies] drop column [created_at], [updated_at];`);
  }

}
