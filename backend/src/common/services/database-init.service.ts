import { Injectable, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Roles } from '../../entities/role.entity';
import { JobCategory } from '../../entities/job-category.entity';
import { Skill } from '../../entities/skill.entity';
import { JobTag } from '../../entities/job-tag.entity';
import { Company } from '../../entities/company.entity';
import { BlogCategory } from '../../entities/blog-category.entity';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    console.log('🚀 Initializing database...');

    try {
      // Ensure database exists
      const generator = this.orm.getSchemaGenerator();
      await generator.ensureDatabase();
      console.log('✅ Database ensured successfully');

      // Drop existing schema and recreate (for development/clean setup)
      console.log('📋 Dropping existing schema...');
      await generator.dropSchema();
      console.log('✅ Existing schema dropped');

      console.log('📋 Creating fresh database schema...');
      await generator.createSchema();
      console.log('✅ Schema created successfully');

      // Seed initial data
      await this.seedInitialData();
      console.log('✅ Database initialization completed successfully');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  private async seedInitialData() {
    const em = this.orm.em.fork();

    try {
      // Seed Roles
      await this.seedRoles(em);

      // Seed Job Categories
      await this.seedJobCategories(em);

      // Seed Skills
      await this.seedSkills(em);

      // Seed Job Tags
      await this.seedJobTags(em);

      // Seed Companies
      await this.seedCompanies(em);

      // Seed Blog Categories
      await this.seedBlogCategories(em);

      await em.flush();
    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  }

  private async seedRoles(em: any) {
    const roles = [
      { roleName: 'Admin', description: 'Administrator user role' },
      { roleName: 'Employer', description: 'Employer user role' },
      { roleName: 'JobSeeker', description: 'Job seeker user role' },
    ];

    for (const role of roles) {
      const existing = await em.findOne(Roles, { roleName: role.roleName });
      if (!existing) {
        const newRole = em.create(Roles, role);
        em.persist(newRole);
        console.log(`📝 Created role: ${role.roleName}`);
      }
    }
  }

  private async seedJobCategories(em: any) {
    const jobCategories = [
      { Name: 'Technology' },
      { Name: 'Design' },
      { Name: 'Marketing' },
      { Name: 'Sales' },
      { Name: 'Finance' },
      { Name: 'Human Resources' },
      { Name: 'Operations' },
      { Name: 'Customer Service' },
      { Name: 'Engineering' },
      { Name: 'Product Management' },
      { Name: 'Data Science' },
      { Name: 'DevOps' },
      { Name: 'Quality Assurance' },
      { Name: 'Project Management' },
      { Name: 'Business Analysis' },
      { Name: 'Content Writing' },
      { Name: 'Digital Marketing' },
      { Name: 'UX/UI Design' },
      { Name: 'Mobile Development' },
      { Name: 'Web Development' },
      { Name: 'AI/ML' },
      { Name: 'Cybersecurity' },
      { Name: 'Cloud Computing' },
      { Name: 'Blockchain' },
      { Name: 'Game Development' },
    ];

    for (const category of jobCategories) {
      const existing = await em.findOne(JobCategory, { Name: category.Name });
      if (!existing) {
        const newCategory = em.create(JobCategory, category);
        em.persist(newCategory);
        console.log(`📝 Created job category: ${category.Name}`);
      }
    }
  }

  private async seedSkills(em: any) {
    const skills = [
      // Frontend Skills
      { Name: 'JavaScript' },
      { Name: 'TypeScript' },
      { Name: 'React' },
      { Name: 'Vue.js' },
      { Name: 'Angular' },
      { Name: 'Next.js' },
      { Name: 'Nuxt.js' },
      { Name: 'HTML5' },
      { Name: 'CSS3' },
      { Name: 'SASS/SCSS' },
      { Name: 'Tailwind CSS' },

      // Backend Skills
      { Name: 'Node.js' },
      { Name: 'Python' },
      { Name: 'Java' },
      { Name: 'C#' },
      { Name: 'PHP' },
      { Name: 'Ruby' },
      { Name: 'Go' },
      { Name: 'Rust' },
      { Name: 'C++' },
      { Name: 'Spring Boot' },
      { Name: '.NET' },
      { Name: 'Django' },
      { Name: 'Flask' },
      { Name: 'Express.js' },
      { Name: 'Laravel' },
      { Name: 'Ruby on Rails' },

      // Database Skills
      { Name: 'MySQL' },
      { Name: 'PostgreSQL' },
      { Name: 'MongoDB' },
      { Name: 'Redis' },
      { Name: 'Elasticsearch' },
      { Name: 'Firebase' },

      // DevOps & Cloud
      { Name: 'Docker' },
      { Name: 'Kubernetes' },
      { Name: 'AWS' },
      { Name: 'Azure' },
      { Name: 'Google Cloud' },
      { Name: 'Jenkins' },
      { Name: 'GitLab CI' },
      { Name: 'GitHub Actions' },
      { Name: 'Terraform' },

      // Design Skills
      { Name: 'Figma' },
      { Name: 'Adobe XD' },
      { Name: 'Sketch' },
      { Name: 'Photoshop' },
      { Name: 'Illustrator' },
      { Name: 'InVision' },
      { Name: 'Zeplin' },

      // Marketing Skills
      { Name: 'Digital Marketing' },
      { Name: 'SEO' },
      { Name: 'SEM' },
      { Name: 'Social Media Marketing' },
      { Name: 'Content Marketing' },
      { Name: 'Email Marketing' },
      { Name: 'Google Analytics' },
      { Name: 'Facebook Ads' },
      { Name: 'Google Ads' },

      // Business Skills
      { Name: 'Project Management' },
      { Name: 'Agile' },
      { Name: 'Scrum' },
      { Name: 'Kanban' },
      { Name: 'JIRA' },
      { Name: 'Trello' },
      { Name: 'Asana' },

      // Data Science & AI
      { Name: 'Machine Learning' },
      { Name: 'Deep Learning' },
      { Name: 'TensorFlow' },
      { Name: 'PyTorch' },
      { Name: 'Pandas' },
      { Name: 'NumPy' },
      { Name: 'SQL' },
      { Name: 'Tableau' },
      { Name: 'Power BI' },

      // Mobile Development
      { Name: 'React Native' },
      { Name: 'Flutter' },
      { Name: 'iOS Development' },
      { Name: 'Android Development' },
      { Name: 'Swift' },
      { Name: 'Kotlin' },

      // Cybersecurity
      { Name: 'Network Security' },
      { Name: 'Ethical Hacking' },
      { Name: 'Penetration Testing' },
      { Name: 'OWASP' },

      // Soft Skills
      { Name: 'Communication' },
      { Name: 'Leadership' },
      { Name: 'Team Management' },
      { Name: 'Problem Solving' },
      { Name: 'Critical Thinking' },
    ];

    for (const skill of skills) {
      const existing = await em.findOne(Skill, { Name: skill.Name });
      if (!existing) {
        const newSkill = em.create(Skill, skill);
        em.persist(newSkill);
        console.log(`📝 Created skill: ${skill.Name}`);
      }
    }
  }

  private async seedJobTags(em: any) {
    const jobTags = [
      // Work Types
      { Name: 'Remote' },
      { Name: 'On-site' },
      { Name: 'Hybrid' },
      { Name: 'Full-time' },
      { Name: 'Part-time' },
      { Name: 'Contract' },
      { Name: 'Freelance' },
      { Name: 'Internship' },
      { Name: 'Temporary' },

      // Experience Levels
      { Name: 'Entry Level' },
      { Name: 'Junior' },
      { Name: 'Mid Level' },
      { Name: 'Senior Level' },
      { Name: 'Lead' },
      { Name: 'Principal' },
      { Name: 'Staff' },
      { Name: 'VP' },
      { Name: 'Director' },
      { Name: 'Executive' },

      // Company Types
      { Name: 'Startup' },
      { Name: 'Scale-up' },
      { Name: 'Enterprise' },
      { Name: 'Agency' },
      { Name: 'Consulting' },
      { Name: 'Non-profit' },
      { Name: 'Government' },

      // Technical Focus
      { Name: 'Frontend' },
      { Name: 'Backend' },
      { Name: 'Full-stack' },
      { Name: 'Mobile' },
      { Name: 'DevOps' },
      { Name: 'Data Science' },
      { Name: 'AI/ML' },
      { Name: 'Cybersecurity' },
      { Name: 'Cloud' },
      { Name: 'Blockchain' },

      // Business Focus
      { Name: 'B2B' },
      { Name: 'B2C' },
      { Name: 'SaaS' },
      { Name: 'Fintech' },
      { Name: 'Healthtech' },
      { Name: 'Edtech' },
      { Name: 'E-commerce' },
      { Name: 'Gaming' },
      { Name: 'IoT' },
      { Name: 'AR/VR' },

      // Skills Focus
      { Name: 'React' },
      { Name: 'Node.js' },
      { Name: 'Python' },
      { Name: 'Java' },
      { Name: 'C#' },
      { Name: 'Go' },
      { Name: 'Rust' },
      { Name: 'Design' },
      { Name: 'Marketing' },
      { Name: 'Sales' },

      // Benefits & Perks
      { Name: 'Equity' },
      { Name: 'Health Insurance' },
      { Name: 'Dental Insurance' },
      { Name: 'Vision Insurance' },
      { Name: '401k' },
      { Name: 'PTO' },
      { Name: 'Flexible Hours' },
      { Name: 'Professional Development' },
      { Name: 'Gym Membership' },
      { Name: 'Free Lunch' },

      // Locations
      { Name: 'San Francisco' },
      { Name: 'New York' },
      { Name: 'London' },
      { Name: 'Berlin' },
      { Name: 'Singapore' },
      { Name: 'Sydney' },
      { Name: 'Toronto' },
      { Name: 'Amsterdam' },
      { Name: 'Stockholm' },
      { Name: 'Tokyo' },
    ];

    for (const tag of jobTags) {
      const existing = await em.findOne(JobTag, { Name: tag.Name });
      if (!existing) {
        const newTag = em.create(JobTag, tag);
        em.persist(newTag);
        console.log(`📝 Created job tag: ${tag.Name}`);
      }
    }
  }

  private async seedCompanies(em: any) {
    const companies = [
      {
        name: 'TechCorp Innovation',
        slug: 'techcorp-innovation',
        industry: 'Technology',
        companySize: '500-1000 employees',
        website: 'https://techcorp-innovation.com',
        location: 'Ho Chi Minh City, Vietnam',
      },
      {
        name: 'Creative Studio Pro',
        slug: 'creative-studio-pro',
        industry: 'Design & Creative',
        companySize: '50-100 employees',
        website: 'https://creativestudiopro.com',
        location: 'Hanoi, Vietnam',
      },
      {
        name: 'Growth Marketing Co.',
        slug: 'growth-marketing-co',
        industry: 'Marketing & Advertising',
        companySize: '100-500 employees',
        website: 'https://growthmarketingco.com',
        location: 'Da Nang, Vietnam',
      },
      {
        name: 'CloudScale Systems',
        slug: 'cloudscale-systems',
        industry: 'Cloud Computing',
        companySize: '200-500 employees',
        website: 'https://cloudscalesystems.com',
        location: 'Can Tho, Vietnam',
      },
      {
        name: 'InnovateLabs',
        slug: 'innovatelabs',
        industry: 'Product Development',
        companySize: '100-200 employees',
        website: 'https://innovatelabs.com',
        location: 'Hai Phong, Vietnam',
      },
      {
        name: 'Global Sales Partners',
        slug: 'global-sales-partners',
        industry: 'Sales & Business Development',
        companySize: '300-500 employees',
        website: 'https://globalsalespartners.com',
        location: 'Ho Chi Minh City, Vietnam',
      },
    ];

    for (const company of companies) {
      const existing = await em.findOne(Company, { name: company.name });
      if (!existing) {
        const newCompany = em.create(Company, company);
        em.persist(newCompany);
        console.log(`📝 Created company: ${company.name}`);
      }
    }
  }

  private async seedBlogCategories(em: any) {
    const blogCategories = [
      { name: 'Technology' },
      { name: 'Career Advice' },
      { name: 'Company Culture' },
      { name: 'Industry Trends' },
      { name: 'Job Search Tips' },
      { name: 'Interview Preparation' },
    ];

    for (const category of blogCategories) {
      const existing = await em.findOne(BlogCategory, { name: category.name });
      if (!existing) {
        const newCategory = em.create(BlogCategory, category);
        em.persist(newCategory);
        console.log(`📝 Created blog category: ${category.name}`);
      }
    }
  }
}
