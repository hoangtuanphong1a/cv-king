import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { RolesService } from '@modules/roles/roles.service';
import { UserRolesService } from '@modules/user_roles/user_roles.service';
import { UsersService } from '@modules/users/users.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, registerEmployeeDto } from '../dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from '../dtos/login.dto';
import { JobSeekerProfile } from '@entities/job-seeker-profile.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from '@entities/company.entity';
import { EmployerProfile } from '@entities/employer-profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly usersRoleService: UserRolesService,
    private readonly em: EntityManager,
    private readonly jwt: JwtService,

    @InjectRepository(JobSeekerProfile)
    private readonly jobSeekerRepo: EntityRepository<JobSeekerProfile>,

    @InjectRepository(Company)
    private readonly companyRepo: EntityRepository<Company>,

    @InjectRepository(EmployerProfile)
    private readonly employerRepo: EntityRepository<EmployerProfile>
  ) { }
  private async signTokens(userId: string, email: string) {
    const userRoleEntities = await this.usersRoleService.findByUser(userId);

    // Lấy tên role từ bảng Roles bằng RolesService
    const roleNames = await Promise.all(
      userRoleEntities.map(async ur => {
        const role = await this.rolesService.findOne(ur.roleId);
        return role.roleName;
      })
    );

    const payload = { sub: userId, email, roles: roleNames, type: 'access' };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'access_secret',
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
    });
    console.log('ACCESS_EXPIRE', process.env.JWT_ACCESS_EXPIRATION_TIME);
    console.log(
      'sign secret',
      process.env.JWT_ACCESS_SECRET || 'access_secret'
    );

    const refreshToken = await this.jwt.signAsync(
      { ...payload, type: 'refresh' },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      }
    );
    return { accessToken, refreshToken };
  }

  async validateUser(userId: string) {
    console.log('validateUser id:', userId);
    const user = await this.usersService.getUserById(userId);
    console.log('found user:', user);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  async register(dto: RegisterDto) {
    const exist = await this.usersService.findByEmail(dto.email);
    if (exist) throw new ConflictException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser({

      email: dto.email,
      password: hashedPassword,
      displayName: dto.fullName,
    }
    );

    // gán role JobSeeker
    const jobSeekerRole = await this.rolesService.findByName('JobSeeker');
    await this.usersRoleService.createUserRole({
      userId: user.id,
      roleId: jobSeekerRole.id,
    });

    // tạo JobSeekerProfile
    const profile = this.jobSeekerRepo.create({
      userId: user.id,
      fullName: dto.fullName,
    });
    await this.jobSeekerRepo.create(profile);

    const { accessToken, refreshToken } = await this.signTokens(
      user.id,
      user.email
    );

    await this.usersService.update(user.id, {
      refreshToken: refreshToken,
    });

    return { user, profile, accessToken, refreshToken };
  }

  async registerEmployee(dto: registerEmployeeDto) {
    const exist = await this.usersService.findByEmail(dto.email);
    if (exist) throw new ConflictException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      email: dto.email,
      password: hashedPassword,
      displayName: dto.contactName,
    });

    // gán role Employer
    const EmployerRole = await this.rolesService.findByName('Employer');
    await this.usersRoleService.createUserRole({
      userId: user.id,
      roleId: EmployerRole.id,
    });

    // tạo Company
    const company = this.companyRepo.create({ name: dto.companyName });
    await this.em.persistAndFlush(company);

    // tạo EmployerProfile
    const profile = this.employerRepo.create({
      userId: user.id,
      company: company.id,
    });
    await this.employerRepo.create(profile);

    const { accessToken, refreshToken } = await this.signTokens(
      user.id,
      user.email
    );

    await this.usersService.update(user.id, {
      refreshToken: refreshToken,
    });

    return { user, accessToken, refreshToken };
  }

  async login(dto: loginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.password)
      throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const { accessToken, refreshToken } = await this.signTokens(
      user.id,
      user.email
    );
    await this.usersService.update(user.id, { refreshToken });

    const userRoleEntities = await this.usersRoleService.findByUser(user.id);
    const roleNames = await Promise.all(
      userRoleEntities.map(async ur => {
        const role = await this.rolesService.findOne(ur.roleId);
        return role.roleName;
      })
    );

    return {
      user: {
        ...user,
        roles: roleNames,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user?.refreshToken) throw new UnauthorizedException();

    const match = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!match) throw new UnauthorizedException();

    const { accessToken, refreshToken: newRefresh } = await this.signTokens(
      user.id,
      user.email
    );
    await this.usersService.update(user.id, { refreshToken: newRefresh });
    return { accessToken, refreshToken: newRefresh };
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
    return { success: true };
  }
}
