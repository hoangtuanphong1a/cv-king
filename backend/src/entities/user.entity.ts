import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
  ManyToMany,
} from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';
import { BlogPosts } from './blog-post.entity';
import { JobApplication } from './job-application.entity';
import { SavedJob } from './saved-job.entity';
import { SavedBlog } from './saved-blog.entity';
import { BlogComments } from './blog-comment.entity';
import { BlogViews } from './blog-views.entity';
import { EmployerProfile } from './employer-profile.entity';
import { JobSeekerProfile } from './job-seeker-profile.entity';
import { Roles } from './role.entity';

@Entity({ tableName: 'Users' })
export class Users extends AuditableEntity {
  @Property({ type: 'string' })
  @Unique()
  email: string;

  @Property({ type: 'string', nullable: true })
  username?: string;

  @Property({ type: 'string' })
  password: string;

  @Property({ type: 'boolean', default: false })
  isEmailConfirmed: boolean = false;

  @Property({ type: 'date', nullable: true })
  lastLoginAt?: Date;

  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Property({ type: 'boolean', default: false })
  isDeleted: boolean = false;

  @Property({ type: 'string', nullable: true })
  displayName?: string;

  @Property({ type: 'string', nullable: true })
  avatarUrl?: string;

  @Property({ type: 'string', nullable: true })
  preferredLocale?: string;

  @Property({ type: 'string', nullable: true })
  googleId?: string;

  @Property({ type: 'string', nullable: true })
  linkedInId?: string;

  @Property({ type: 'string', length: 1000, nullable: true })
  refreshToken?: string;

  // Relationships - to be added after updating related entities
  // @OneToMany(() => Job, job => job.postedByUser)
  // postedJobs = new Collection<Job>(this);

  // @OneToMany(() => BlogPosts, blogPost => blogPost.author)
  // authoredBlogPosts = new Collection<BlogPosts>(this);

  // @OneToMany(() => JobApplication, application => application.applicant)
  // jobApplications = new Collection<JobApplication>(this);

  // @OneToMany(() => SavedJob, savedJob => savedJob.user)
  // savedJobs = new Collection<SavedJob>(this);

  // @OneToMany(() => SavedBlog, savedBlog => savedBlog.user)
  // savedBlogs = new Collection<SavedBlog>(this);

  // @OneToMany(() => BlogComments, comment => comment.author)
  // blogComments = new Collection<BlogComments>(this);

  // @OneToMany(() => BlogViews, view => view.user)
  // blogViews = new Collection<BlogViews>(this);

  // @OneToOne(() => EmployerProfile, profile => profile.user)
  // employerProfile?: EmployerProfile;

  // @OneToOne(() => JobSeekerProfile, profile => profile.user)
  // jobSeekerProfile?: JobSeekerProfile;

  // @ManyToMany(() => Roles, 'users', { owner: true })
  // roles = new Collection<Roles>(this);
}
