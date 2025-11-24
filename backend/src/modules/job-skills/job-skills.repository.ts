import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Skill } from '@entities/skill.entity';
import {
  CreateSkillDto,
  UpdateSkillDto,
} from '@modules/job-skills/dtos/skill.dto';

@Injectable()
export class JobSkillsRepository {
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieve all skills
   * @returns List of all skills
   */
  async findAll(): Promise<any> {
    const results = await this.em
      .getConnection()
      .execute('EXEC SP_GetAllSkills');
    return results ?? [];
  }

  /**
   * Find a skill by ID
   * @param id ID of the skill
   * @returns Skill or null if not found
   */
  async findOne(id: string): Promise<any | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetSkillById ?', [id]);
    const skill = result?.[0] ?? result;
    return skill ?? null;
  }

  /**
   * Create a new skill
   * @param createSkillDto Data to create the skill
   * @returns Created skill
   */
  async create(createSkillDto: CreateSkillDto): Promise<any> {
    const result = this.em
      .getConnection()
      .execute('EXEC SP_InsertSkill ?', [createSkillDto.Name]);

    const newSkill = result?.[0] ?? result;
    return newSkill as any;
  }

  /**
   * Update a skill
   * @param updateSkillDto Data to update the skill
   * @returns Updated skill or null if not found
   */
  async update(updateSkillDto: UpdateSkillDto): Promise<any | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateSkill ?, ?', [
        updateSkillDto.id,
        updateSkillDto.Name,
      ]);
    return this.findOne(updateSkillDto.id);
  }

  /**
   * Delete a skill
   * @param id ID of the skill to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteSkill ?', [id]);
    return true;
  }
}
