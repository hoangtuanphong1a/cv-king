import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RolesRepository } from './roles.repository';
import { Roles } from '@entities/role.entity';
// import { Roles } from '@entities/role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Roles])],
  providers: [RolesRepository, RolesService],
  controllers: [RolesController],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
