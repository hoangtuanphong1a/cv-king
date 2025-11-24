import { Module } from '@nestjs/common';
import { EmployerProfilesController } from './employer-profile.controller';
import { EmployerProfile } from '@entities/employer-profile.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EmployerProfilesRepository } from './employer-profiles.repository';

@Module({
  imports: [MikroOrmModule.forFeature([EmployerProfile])],
  controllers: [EmployerProfilesController],
  providers: [EmployerProfilesRepository],
  exports: [EmployerProfilesRepository],
})
export class EmployerProfileModule {}
