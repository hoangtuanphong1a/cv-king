import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig } from '@config/mikro-orm.config';
import { UsersModule } from '@modules/users/users.module';
import { RolesModule } from '@modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserRolesModule } from './modules/user_roles/user_roles.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';
import { SavedJobsModule } from './modules/saved-jobs/saved-jobs.module';
import { JobViewsModule } from './modules/job-views/job-views.module';
import { JobTagsModule } from './modules/job-tags/job-tags.module';
import { JobSkillsModule } from './modules/job-skills/job-skills.module';
import { JobCategoryModule } from './modules/job-category/job-category.module';
import { CompanyModule } from './modules/company/company.module';
import { JobSeekerProfileModule } from './modules/job-seeker-profile/job-seeker-profile.module';
import { EmployerProfileModule } from './modules/employer-profile/employer-profile.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { BlogPostsModule } from '@modules/blog-posts/blog-posts.module';
import { BlogTagsModule } from '@modules/blog-tags/blog-tags.module';
import { BlogCommentsModule } from '@modules/Blog-comments/blog-comments.module';
import { BlogCategoriesModule } from '@modules/blog-categories/blog-categories.module';
import { BlogViewsModule } from './modules/blog-views/blog-views.module';
import { SavedBlogsModule } from './modules/saved-blogs/saved-blogs.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        mikroOrmConfig(configService),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    UserRolesModule,
    JobsModule,
    JobApplicationsModule,
    SavedJobsModule,
    JobViewsModule,
    JobTagsModule,
    JobSkillsModule,
    JobCategoryModule,
    CompanyModule,
    JobSeekerProfileModule,
    EmployerProfileModule,
    CloudinaryModule,
    BlogPostsModule,
    BlogTagsModule,
    BlogCommentsModule,
    BlogCategoriesModule,
    BlogViewsModule,
    SavedBlogsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
