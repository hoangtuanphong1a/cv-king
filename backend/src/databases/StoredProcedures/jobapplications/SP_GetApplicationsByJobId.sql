use JOB_DB
go

-- 📌 Lấy application theo ID
CREATE OR ALTER PROCEDURE SP_GetJobApplicationById
  @Id UNIQUEIDENTIFIER
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
    --SELECT u.id, u.fullName, u.email
    --FROM Users u
    --WHERE u.id = ja.jobSeekerId
    --FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    --) AS jobSeeker

    FROM job_applications ja
    WHERE ja.id = @Id
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
  ) AS NVARCHAR(MAX)) AS json_result;
END
GO
