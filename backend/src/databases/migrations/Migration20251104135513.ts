import { Migration } from '@mikro-orm/migrations';

export class Migration20251104135513 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE [BlogCategories] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [BlogCategories_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [BlogCategories_name_unique] ON [BlogCategories] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [BlogComments] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [blog_post_id] nvarchar(255) not null, [user_id] nvarchar(255) null, [guest_name] nvarchar(200) null, [content] text not null, [is_approved] bit not null CONSTRAINT [blogcomments_is_approved_default] DEFAULT 0, CONSTRAINT [BlogComments_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [BlogPosts] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [title] nvarchar(500) not null, [slug] nvarchar(500) not null, [content] text not null, [excerpt] nvarchar(1000) null, [cover_image_url] nvarchar(1000) null, [short_description] nvarchar(1000) null, [requirements] nvarchar(max) null, [benefits] nvarchar(max) null, [author_user_id] nvarchar(255) not null, [is_published] bit not null CONSTRAINT [blogposts_is_published_default] DEFAULT 0, [published_at] datetime2 null, [status] nvarchar(50) not null CONSTRAINT [blogposts_status_default] DEFAULT 'Active', [views_count] int not null CONSTRAINT [blogposts_views_count_default] DEFAULT 0, [posted_at] datetime2 not null CONSTRAINT [blogposts_posted_at_default] DEFAULT SYSUTCDATETIME(), [expires_at] datetime2 null, CONSTRAINT [BlogPosts_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [BlogPosts_slug_unique] ON [BlogPosts] ([slug]) WHERE [slug] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [BlogPostTags] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [blog_post_id] nvarchar(255) not null, [blog_tag_id] nvarchar(255) not null, CONSTRAINT [BlogPostTags_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [BlogTags] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [BlogTags_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [BlogTags_name_unique] ON [BlogTags] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [BlogViews] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [blog_post_id] int not null, [viewer_user_id] int null, [session_id] nvarchar(255) null, [viewed_at] datetime2 not null CONSTRAINT [blogviews_viewed_at_default] DEFAULT SYSUTCDATETIME(), CONSTRAINT [BlogViews_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Companies] ([id] nvarchar(255) not null, [name] nvarchar(300) not null, [slug] nvarchar(300) null, [logo_url] nvarchar(1000) null, [banner_url] nvarchar(1000) null, [industry] nvarchar(200) null, [company_size] nvarchar(50) null, [website] nvarchar(500) null, [location] nvarchar(300) null, [description] text null, [benefits] nvarchar(max) null, [is_verified] bit not null CONSTRAINT [companies_is_verified_default] DEFAULT 0, CONSTRAINT [Companies_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [EmployerProfiles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(200) null, [company] nvarchar(200) null, [title] nvarchar(200) null, [phone] nvarchar(50) null, CONSTRAINT [EmployerProfiles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Jobs] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [company_id] nvarchar(255) not null, [posted_by_user_id] nvarchar(255) null, [title] nvarchar(500) not null, [slug] nvarchar(500) not null, [short_description] nvarchar(1000) null, [description] nvarchar(max) null, [requirements] nvarchar(max) null, [benefits] nvarchar(max) null, [salary_min] int null, [salary_max] int null, [currency] nvarchar(10) null, [job_type] nvarchar(50) null, [location] nvarchar(300) null, [category_id] nvarchar(255) null, [status] nvarchar(50) not null CONSTRAINT [jobs_status_default] DEFAULT 'Active', [views_count] int not null CONSTRAINT [jobs_views_count_default] DEFAULT 0, [posted_at] datetime2 not null CONSTRAINT [jobs_posted_at_default] DEFAULT SYSUTCDATETIME(), [expires_at] datetime2 null, CONSTRAINT [Jobs_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Jobs_slug_unique] ON [Jobs] ([slug]) WHERE [slug] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [job_applications] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [job_id] nvarchar(255) not null, [job_seeker_id] nvarchar(255) not null, [cover_letter] text null, [status] nvarchar(100) check ([status] in ('Pending', 'Reviewed', 'Interview', 'Rejected', 'Hired')) not null CONSTRAINT [job_applications_status_default] DEFAULT 'Pending', [applied_at] datetime2 not null, [is_deleted] bit not null CONSTRAINT [job_applications_is_deleted_default] DEFAULT 0, CONSTRAINT [job_applications_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [JobCategories] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [JobCategories_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobCategories_name_unique] ON [JobCategories] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [JobJobTags] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [job_id] nvarchar(255) not null, [job_tag_id] nvarchar(255) not null, CONSTRAINT [JobJobTags_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [JobSeekerProfiles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(200) null, [full_name] nvarchar(300) null, [phone] nvarchar(50) null, [dob] date null, [location] nvarchar(300) null, [summary] text null, [current_title] nvarchar(200) null, [years_experience] int null, CONSTRAINT [JobSeekerProfiles_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobSeekerProfiles_user_id_unique] ON [JobSeekerProfiles] ([user_id]) WHERE [user_id] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [JobSkills] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [job_id] nvarchar(255) not null, [skill_id] nvarchar(255) not null, CONSTRAINT [JobSkills_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [JobTags] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [JobTags_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobTags_name_unique] ON [JobTags] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [Roles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [role_name] nvarchar(255) not null, [description] nvarchar(255) null, CONSTRAINT [Roles_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Roles_role_name_unique] ON [Roles] ([role_name]) WHERE [role_name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [saved_blogs] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(255) not null, [blog_post_id] nvarchar(255) not null, CONSTRAINT [saved_blogs_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [saved_blogs_user_id_blog_post_id_unique] ON [saved_blogs] ([user_id], [blog_post_id]) WHERE [user_id] IS NOT NULL AND [blog_post_id] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [saved_jobs] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [job_seeker_id] nvarchar(255) not null, [job_id] nvarchar(255) not null, CONSTRAINT [saved_jobs_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [saved_jobs_job_seeker_id_job_id_unique] ON [saved_jobs] ([job_seeker_id], [job_id]) WHERE [job_seeker_id] IS NOT NULL AND [job_id] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [Skills] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [Skills_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Skills_name_unique] ON [Skills] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [UserRoles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(255) not null, [role_id] nvarchar(255) not null, CONSTRAINT [UserRoles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Users] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [email] nvarchar(255) not null, [username] nvarchar(255) null, [password] nvarchar(255) not null, [is_email_confirmed] bit not null CONSTRAINT [users_is_email_confirmed_default] DEFAULT 0, [last_login_at] date null, [is_active] bit not null CONSTRAINT [users_is_active_default] DEFAULT 1, [is_deleted] bit not null CONSTRAINT [users_is_deleted_default] DEFAULT 0, [display_name] nvarchar(255) null, [avatar_url] nvarchar(255) null, [preferred_locale] nvarchar(255) null, [google_id] nvarchar(255) null, [linked_in_id] nvarchar(255) null, [refresh_token] nvarchar(1000) null, CONSTRAINT [Users_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Users_email_unique] ON [Users] ([email]) WHERE [email] IS NOT NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`if object_id('[BlogCategories]', 'U') is not null DROP TABLE [BlogCategories];`);

    this.addSql(`if object_id('[BlogComments]', 'U') is not null DROP TABLE [BlogComments];`);

    this.addSql(`if object_id('[BlogPosts]', 'U') is not null DROP TABLE [BlogPosts];`);

    this.addSql(`if object_id('[BlogPostTags]', 'U') is not null DROP TABLE [BlogPostTags];`);

    this.addSql(`if object_id('[BlogTags]', 'U') is not null DROP TABLE [BlogTags];`);

    this.addSql(`if object_id('[BlogViews]', 'U') is not null DROP TABLE [BlogViews];`);

    this.addSql(`if object_id('[Companies]', 'U') is not null DROP TABLE [Companies];`);

    this.addSql(`if object_id('[EmployerProfiles]', 'U') is not null DROP TABLE [EmployerProfiles];`);

    this.addSql(`if object_id('[Jobs]', 'U') is not null DROP TABLE [Jobs];`);

    this.addSql(`if object_id('[job_applications]', 'U') is not null DROP TABLE [job_applications];`);

    this.addSql(`if object_id('[JobCategories]', 'U') is not null DROP TABLE [JobCategories];`);

    this.addSql(`if object_id('[JobJobTags]', 'U') is not null DROP TABLE [JobJobTags];`);

    this.addSql(`if object_id('[JobSeekerProfiles]', 'U') is not null DROP TABLE [JobSeekerProfiles];`);

    this.addSql(`if object_id('[JobSkills]', 'U') is not null DROP TABLE [JobSkills];`);

    this.addSql(`if object_id('[JobTags]', 'U') is not null DROP TABLE [JobTags];`);

    this.addSql(`if object_id('[Roles]', 'U') is not null DROP TABLE [Roles];`);

    this.addSql(`if object_id('[saved_blogs]', 'U') is not null DROP TABLE [saved_blogs];`);

    this.addSql(`if object_id('[saved_jobs]', 'U') is not null DROP TABLE [saved_jobs];`);

    this.addSql(`if object_id('[Skills]', 'U') is not null DROP TABLE [Skills];`);

    this.addSql(`if object_id('[UserRoles]', 'U') is not null DROP TABLE [UserRoles];`);

    this.addSql(`if object_id('[Users]', 'U') is not null DROP TABLE [Users];`);
  }

}
