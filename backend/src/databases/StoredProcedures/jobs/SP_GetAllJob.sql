USE [JOB_DB]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[SP_GetAllJobs]
AS
BEGIN
  SET NOCOUNT ON;

  SELECT CAST((
    SELECT 
      j.id, j.created_at, j.company_id, j.posted_by_user_id,
      j.title, j.slug, j.short_description, j.description,
      j.requirements, j.benefits, j.salary_min, j.salary_max,
      j.currency, j.job_type, j.location, j.category_id,
      j.status, j.views_count, j.posted_at, j.expires_at,

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

    FROM Jobs j
    FOR JSON PATH, INCLUDE_NULL_VALUES
  ) AS NVARCHAR(MAX)) AS json_result;
END
