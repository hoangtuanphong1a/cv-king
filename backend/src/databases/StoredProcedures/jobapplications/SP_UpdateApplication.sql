use JOB_DB
go

-- 📌 Cập nhật application
CREATE OR ALTER PROCEDURE SP_UpdateJobApplication
  @Id UNIQUEIDENTIFIER,
  @CoverLetter NVARCHAR(MAX),
  @Status NVARCHAR(50)
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE job_applications
  SET cover_letter = @CoverLetter,
      status = @Status,
      updated_at = GETDATE()
  WHERE id = @Id;

  EXEC SP_GetJobApplicationById @Id;
END
GO
