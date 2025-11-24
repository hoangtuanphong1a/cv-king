import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { JobsRepository } from './jobs.repository';
import { Job } from '../../entities/job.entity';

describe('JobsRepository', () => {
  let repository: JobsRepository;
  let em: EntityManager;

  const mockJob = {
    id: '1',
    CompanyId: '1',
    PostedByUserId: '1',
    Title: 'Test Job',
    Slug: 'test-job',
    ShortDescription: 'Short desc',
    Description: 'Test job description',
    Location: 'Hanoi',
    Status: 'Active',
    ViewsCount: 0,
    PostedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Job;

  const mockEM = {
    getConnection: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsRepository,
        {
          provide: EntityManager,
          useValue: mockEM,
        },
      ],
    }).compile();

    repository = module.get<JobsRepository>(JobsRepository);
    em = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call stored procedure and return results when not JSON', async () => {
      const mockConnection = { execute: jest.fn() };
      const mockResults = [mockJob];

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockResults);

      const result = await repository.findAll({});

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_GetAllJob');
      expect(result).toEqual(mockResults);
    });

    it('should parse JSON when results are JSON string', async () => {
      const mockConnection = { execute: jest.fn() };
      const mockJson = JSON.stringify([mockJob]);

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockJson);

      const result = await repository.findAll({});

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_GetAllJob');
      expect(result).toEqual([mockJob]);
    });
  });

  describe('findOne', () => {
    it('should call stored procedure and return job', async () => {
      const mockConnection = { execute: jest.fn() };
      const mockResults = [mockJob];

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockResults);

      const result = await repository.findOne('1');

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_GetJobById ?', ['1']);
      expect(result).toEqual(mockJob);
    });

    it('should return null if no job found', async () => {
      const mockConnection = { execute: jest.fn() };

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue([]);

      const result = await repository.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should call stored procedure with parameters', async () => {
      const mockConnection = { execute: jest.fn() };
      const createData = {
        companyId: 1,
        title: 'New Job',
        shortDescription: 'Short desc',
        description: 'Job description',
        location: 'Hanoi',
        salaryMin: 1000,
        salaryMax: 2000,
      } as any;
      const mockJson = JSON.stringify([mockJob]);

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockJson); // SP_InsertJob returns JSON

      const result = await repository.create(createData);

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'EXEC SP_InsertJob ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?',
        [
          1, // companyId
          null, // PostedByUserId
          'New Job', // title
          'new-job', // slug
          'Short desc', // shortDescription
          'Job description', // description
          null, // requirements
          null, // benefits
          1000, // salaryMin
          2000, // salaryMax
          null, // currency
          null, // jobType
          'Hanoi', // location
          null, // categoryId
          'Active', // status
          0, // viewsCount
          null, // postedAt
          null, // expiresAt
          '', // skillsStr
          '', // tagsStr
        ]
      );
      expect(result).toEqual(mockJob);
    });
  });

  describe('update', () => {
    it('should call stored procedure and return updated job', async () => {
      const mockConnection = { execute: jest.fn() };
      const updateData = {
        id: '1',
        title: 'Updated Title',
        shortDescription: 'Updated desc',
        description: 'Updated description',
      };
      const mockJson = JSON.stringify([mockJob]);

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockJson); // SP_UpdateJob call returns JSON

      const result = await repository.update(updateData);

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'EXEC SP_UpdateJob ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?',
        [
          '1', // id
          null, // companyId
          null, // postedByUserId
          'Updated Title', // title
          null, // slug
          'Updated desc', // shortDescription
          'Updated description', // description
          null, // requirements
          null, // benefits
          null, // salaryMin
          null, // salaryMax
          null, // currency
          null, // jobType
          null, // location
          null, // categoryId
          null, // status
          null, // viewsCount
          null, // postedAt
          null, // expiresAt
          '', // skills
          '', // tags
        ]
      );
      expect(result).toEqual(mockJob);
    });
  });

  describe('delete', () => {
    it('should call stored procedure and return true', async () => {
      const mockConnection = { execute: jest.fn() };

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(undefined);

      const result = await repository.delete('1');

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_DeleteJob ?', ['1']);
      expect(result).toBe(true);
    });
  });
});
