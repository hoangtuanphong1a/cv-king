import { Module } from '@nestjs/common';
import { UserRoleController } from './user_roles.controller';
import { UserRolesService } from './user_roles.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { UserRole } from '@entities/user_role.entity';
import { UserRolesRepository } from './user_roles.repository';
import { UserRole } from '@entities/user_role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserRole])],
  providers: [UserRolesRepository, UserRolesService],
  controllers: [UserRoleController],
  exports: [UserRolesService],
})
export class UserRolesModule {}
