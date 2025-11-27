import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Skill } from '../../entities/skill.entity';
import { CreateSkillDto, UpdateSkillDto } from './dtos/skill.dto';

@Injectable()
export class JobSkillsRepository {
  constructor(
    @InjectRepository(Skill)
    private readonly repo: EntityRepository<Skill>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all skills
   * @returns List of all skills
   */
  async findAll(): Promise<Skill[]> {
    return this.repo.findAll({ orderBy: { createdAt: -1 } });
  }

  /**
   * Find a skill by ID
   * @param id ID of the skill
   * @returns Skill or null if not found
   */
  async findOne(id: string): Promise<Skill | null> {
    return this.repo.findOne({ id });
  }

  /**
   * Create a new skill
   * @param createSkillDto Data to create the skill
   * @returns Created skill
   */
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.repo.create({ Name: createSkillDto.Name });
    await this.em.persistAndFlush(skill);
    return skill;
  }

  /**
   * Update a skill
   * @param updateSkillDto Data to update the skill
   * @returns Updated skill or null if not found
   */
  async update(updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(updateSkillDto.id);
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    this.repo.assign(skill, { Name: updateSkillDto.Name });
    await this.em.flush();
    return skill;
  }

  /**
   * Delete a skill
   * @param id ID of the skill to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const skill = await this.findOne(id);
    if (!skill) {
      return false;
    }

    await this.em.removeAndFlush(skill);
    return true;
  }
}
