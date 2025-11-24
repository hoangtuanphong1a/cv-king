USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE SP_GetJobApplicationsByJobSeekerId
  @JobSeekerId UNIQUEIDENTIFIER
AS
BEGIN
  SET NOCOUNT ON;

  SELECT CAST((
    SELECT
      ja.id,
      ja.job_id AS jobId,
      ja.job_seeker_id AS jobSeekerId,
      ja.cover_letter AS coverLetter,
      ja.status,
      ja.applied_at AS appliedAt,
      ja.is_deleted AS isDeleted,
      ja.created_at AS createdAt,
      ja.updated_at AS updatedAt,

      (
        SELECT j.id, j.title, j.slug
        FROM Jobs j
        WHERE j.id = ja.job_id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
      ) AS job

    FROM job_applications ja
    WHERE ja.job_seeker_id = @JobSeekerId AND ja.is_deleted = 0
    FOR JSON PATH, INCLUDE_NULL_VALUES
  ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
