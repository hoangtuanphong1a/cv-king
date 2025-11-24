import { Company } from '@entities/company.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repo: EntityRepository<Company>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<Company[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.repo.findOne({ id });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async create(data: Partial<Company>): Promise<Company> {
    const company = this.repo.create(data);
    await this.em.persistAndFlush(company);
    return company;
  }

  async update(id: string, data: Partial<Company>): Promise<Company> {
    const company = await this.findOne(id);
    this.repo.assign(company, data);
    await this.em.flush();
    return company;
  }

  async remove(id: string): Promise<boolean> {
    const company = await this.findOne(id);
    await this.em.removeAndFlush(company);
    return true;
  }
}
