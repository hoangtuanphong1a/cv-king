USE [JOB_DB]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 📌 Lấy toàn bộ job applications
CREATE OR ALTER PROCEDURE SP_GetAllJobApplications
AS
BEGIN
  SET NOCOUNT ON;

  SELECT CAST((
    SELECT
      ja.id, ja.job_id, ja.job_seeker_id, ja.cover_letter,
      ja.status, ja.applied_at, ja.is_deleted, ja.created_at, ja.updated_at,

      (
        SELECT j.id, j.title, j.slug
        FROM Jobs j
        WHERE j.id = ja.job_id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS job

      --(
      --  SELECT u.id, u.fullName, u.email
      --  FROM Users u
      --  WHERE u.id = ja.jobSeekerId
      --  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      --) AS jobSeeker

    FROM job_applications ja
    WHERE ja.is_deleted = 0
    FOR JSON PATH, INCLUDE_NULL_VALUES
  ) AS NVARCHAR(MAX)) AS json_result;
END
GO
