import { Module } from '@nestjs/common';
import { JobSkillsService } from './job-skills.service';
import { JobSkillsController } from './job-skills.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobSkillsRepository } from './job-skills.repository';
import { Skill } from '@entities/skill.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Skill])],
  providers: [JobSkillsRepository, JobSkillsService],
  controllers: [JobSkillsController],
  exports: [JobSkillsService, JobSkillsRepository],
})
export class JobSkillsModule {} 