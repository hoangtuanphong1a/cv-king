import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployerProfile } from '@entities/employer-profile.entity';
import { UpdateEmployerProfileDto } from './dtos/employer-profile.dto';
import { UpdateCompanyDto } from '@modules/company/dtos/company.dto';
import { Company } from '@entities/company.entity';

@Injectable()
export class EmployerProfilesRepository {
  constructor(
    @InjectRepository(EmployerProfile)
    private readonly repo: EntityRepository<EmployerProfile>,
    private readonly em: EntityManager
  ) { }

  async findAll(): Promise<EmployerProfile[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<EmployerProfile> {
    const profile = await this.repo.findOne({ id });
    if (!profile) throw new NotFoundException('EmployerProfile not found');
    return profile;
  }
  async findByUserId(userId: string): Promise<EmployerProfile> {
    const profile = await this.repo.findOne({ userId: userId });
    if (!profile) throw new NotFoundException('Employer profile not found');
    return profile;
  }


  async create(data: Partial<EmployerProfile>): Promise<EmployerProfile> {
    const profile = this.repo.create(data);
    await this.em.persistAndFlush(profile);
    return profile;
  }

  async update(
    id: string,
    data: Partial<EmployerProfile>
  ): Promise<EmployerProfile> {
    const profile = await this.findOne(id);
    this.repo.assign(profile, data);
    await this.em.flush();
    return profile;
  }

  async updateEmployerAndCompany(
    employerProfileId: string,
    employerProfileData: Partial<UpdateEmployerProfileDto>,
    companyData: Partial<UpdateCompanyDto>
  ) {
    return this.em.transactional(async (em) => {
      const profile = await this.repo.findOne(employerProfileId);
      if (!profile) throw new NotFoundException('EmployerProfile not found');

      em.assign(profile, employerProfileData);

      const company = await em.findOne(Company, { id: profile.company });
      if (!company) throw new NotFoundException('Company not found');

      em.assign(company, companyData);
      await em.flush();
      return { profile, company };
    })
  }

  async remove(id: string): Promise<boolean> {
    const profile = await this.findOne(id);
    await this.em.removeAndFlush(profile);
    return true;
  }
}
