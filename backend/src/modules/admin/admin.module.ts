import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '@modules/users/users.module';
import { JobTagsModule } from '@modules/job-tags/job-tags.module';
import { RolesModule } from '@modules/roles/roles.module';
import { EmployerProfileModule } from '@modules/employer-profile/employer-profile.module';
import { JobSkillsModule } from '@modules/job-skills/job-skills.module';
import { CompanyModule } from '@modules/company/company.module';

@Module({
  imports: [UsersModule, JobTagsModule, RolesModule, EmployerProfileModule,JobSkillsModule, CompanyModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
