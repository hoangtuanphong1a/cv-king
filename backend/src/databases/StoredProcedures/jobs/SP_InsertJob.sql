use JOB_DB
go

CREATE PROCEDURE SP_InsertJobFull
  @CompanyId NVARCHAR(MAX),
  @PostedByUserId NVARCHAR(MAX) = NULL,
  @Title NVARCHAR(500),
  @Slug NVARCHAR(500),
  @ShortDescription NVARCHAR(1000) = NULL,
  @Description NVARCHAR(MAX) = NULL,
  @Requirements NVARCHAR(MAX) = NULL,
  @Benefits NVARCHAR(MAX) = NULL,
  @SalaryMin INT = NULL,
  @SalaryMax INT = NULL,
  @Currency NVARCHAR(10) = NULL,
  @JobType NVARCHAR(50) = NULL,
  @Location NVARCHAR(300) = NULL,
  @CategoryId NVARCHAR(MAX) = NULL,
  @ExpiresAt DATETIME2 = NULL,
  @SkillIds NVARCHAR(MAX) = NULL, -- JSON: ["...","..."]
  @TagIds NVARCHAR(MAX) = NULL    -- JSON: ["...","..."]
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRANSACTION;

  DECLARE @NewId NVARCHAR(MAX) = NEWID();
  INSERT INTO Jobs (
    id, company_id, posted_by_user_id, Title, Slug, short_description, Description,
    Requirements, Benefits, salary_min, salary_max, Currency, job_type, Location,
    category_id, Status, views_count, posted_at, expires_at, created_at
  )
  VALUES (
    @NewId, @CompanyId, @PostedByUserId, @Title, @Slug, @ShortDescription, @Description,
    @Requirements, @Benefits, @SalaryMin, @SalaryMax, @Currency, @JobType, @Location,
    @CategoryId, 'Active', 0, SYSDATETIMEOFFSET(), @ExpiresAt, SYSDATETIMEOFFSET()
  );

  -- Thêm skills
  IF @SkillIds IS NOT NULL
  BEGIN
    INSERT INTO JobSkills (id,job_id, skill_id, created_at)
    SELECT NEWID(), @NewId, value, SYSDATETIMEOFFSET()
    FROM OPENJSON(@SkillIds);
  END

  -- Thêm tags
  IF @TagIds IS NOT NULL
  BEGIN
    INSERT INTO JobJobTags (id,job_id, job_tag_id, created_at)
    SELECT NEWID(),@NewId, value, SYSDATETIMEOFFSET()
    FROM OPENJSON(@TagIds);
  END

  COMMIT;

  EXEC SP_GetJobById @NewId;
END
GO