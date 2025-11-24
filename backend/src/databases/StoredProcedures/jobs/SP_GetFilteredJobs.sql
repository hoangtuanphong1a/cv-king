USE [JOB_DB]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GetFilteredJobs]
    @Keyword NVARCHAR(255) = NULL,
    @Location NVARCHAR(100) = NULL,
    @CategoryId NVARCHAR(36) = NULL,
    @SalaryMin INT = NULL,
    @SalaryMax INT = NULL,
    @JobType NVARCHAR(50) = NULL,
    @CompanyId NVARCHAR(36) = NULL,
    @SkillIds NVARCHAR(MAX) = NULL,
    @TagIds NVARCHAR(MAX) = NULL,
    @SortBy NVARCHAR(50) = 'posted_at',
    @SortOrder NVARCHAR(4) = 'DESC',
    @Offset INT = 0,
    @Limit INT = 10
AS
BEGIN
  SET NOCOUNT ON;

  -- Create temporary tables for filtering if needed
  DECLARE @SkillIdsTable TABLE (skill_id NVARCHAR(36))
  DECLARE @TagIdsTable TABLE (tag_id NVARCHAR(36))

  -- Parse skill IDs if provided
  IF @SkillIds IS NOT NULL AND LEN(@SkillIds) > 0
  BEGIN
    INSERT INTO @SkillIdsTable (skill_id)
    SELECT value FROM STRING_SPLIT(@SkillIds, ',')
  END

  -- Parse tag IDs if provided
  IF @TagIds IS NOT NULL AND LEN(@TagIds) > 0
  BEGIN
    INSERT INTO @TagIdsTable (tag_id)
    SELECT value FROM STRING_SPLIT(@TagIds, ',')
  END

  -- Calculate total count first
  DECLARE @TotalCount INT;
  SELECT @TotalCount = COUNT(*)
  FROM Jobs j
  LEFT JOIN Companies c ON c.id = j.company_id
  WHERE j.status = 'active'
    AND (@Keyword IS NULL OR
         j.title LIKE '%' + @Keyword + '%' OR
         j.short_description LIKE '%' + @Keyword + '%' OR
         j.description LIKE '%' + @Keyword + '%' OR
         c.Name LIKE '%' + @Keyword + '%')
    AND (@Location IS NULL OR j.location LIKE '%' + @Location + '%')
    AND (@CategoryId IS NULL OR j.category_id = @CategoryId)
    AND (@SalaryMin IS NULL OR j.salary_max >= @SalaryMin)
    AND (@SalaryMax IS NULL OR j.salary_min <= @SalaryMax)
    AND (@JobType IS NULL OR j.job_type = @JobType)
    AND (@CompanyId IS NULL OR j.company_id = @CompanyId)
    AND (@SkillIds IS NULL OR EXISTS (
      SELECT 1 FROM JobSkills js WHERE js.job_id = j.id
      AND js.skill_id IN (SELECT skill_id FROM @SkillIdsTable)
    ))
    AND (@TagIds IS NULL OR EXISTS (
      SELECT 1 FROM JobJobTags jjt WHERE jjt.job_id = j.id
      AND jjt.job_tag_id IN (SELECT tag_id FROM @TagIdsTable)
    ));

  -- Get paginated jobs with simple sorting by posted_at
  SELECT CAST((
    SELECT
      j.id, j.created_at, j.company_id, j.posted_by_user_id,
      j.title, j.slug, j.short_description, j.description,
      j.requirements, j.benefits, j.salary_min, j.salary_max,
      j.currency, j.job_type, j.location, j.category_id,
      j.status, j.views_count, j.posted_at, j.expires_at, @TotalCount as total,

      (
        SELECT jc.id, jc.Name
        FROM JobCategories jc
        WHERE jc.id = j.category_id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS category,

      (
        SELECT s.id, s.Name
        FROM JobSkills js
        JOIN Skills s ON s.id = js.skill_id
        WHERE js.job_id = j.id
        FOR JSON PATH
      ) AS skills,

      (
        SELECT t.id, t.Name
        FROM JobJobTags jjt
        JOIN JobTags t ON t.id = jjt.job_tag_id
        WHERE jjt.job_id = j.id
        FOR JSON PATH
      ) AS tags

    FROM (
      SELECT j.*,
        ROW_NUMBER() OVER (ORDER BY j.posted_at DESC) AS RowNum
      FROM Jobs j
      LEFT JOIN Companies c ON c.id = j.company_id
      WHERE j.status = 'active'
        AND (@Keyword IS NULL OR
             j.title LIKE '%' + @Keyword + '%' OR
             j.short_description LIKE '%' + @Keyword + '%' OR
             j.description LIKE '%' + @Keyword + '%' OR
             c.Name LIKE '%' + @Keyword + '%')
        AND (@Location IS NULL OR j.location LIKE '%' + @Location + '%')
        AND (@CategoryId IS NULL OR j.category_id = @CategoryId)
        AND (@SalaryMin IS NULL OR j.salary_max >= @SalaryMin)
        AND (@SalaryMax IS NULL OR j.salary_min <= @SalaryMax)
        AND (@JobType IS NULL OR j.job_type = @JobType)
        AND (@CompanyId IS NULL OR j.company_id = @CompanyId)
        AND (@SkillIds IS NULL OR EXISTS (
          SELECT 1 FROM JobSkills js WHERE js.job_id = j.id
          AND js.skill_id IN (SELECT skill_id FROM @SkillIdsTable)
        ))
        AND (@TagIds IS NULL OR EXISTS (
          SELECT 1 FROM JobJobTags jjt WHERE jjt.job_id = j.id
          AND jjt.job_tag_id IN (SELECT tag_id FROM @TagIdsTable)
        ))
    ) j
    WHERE RowNum > @Offset AND RowNum <= (@Offset + @Limit)
    FOR JSON PATH, INCLUDE_NULL_VALUES
  ) AS NVARCHAR(MAX)) AS json_result;
END
