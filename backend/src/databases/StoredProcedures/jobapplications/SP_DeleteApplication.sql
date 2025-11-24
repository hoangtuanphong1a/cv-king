use JOB_DB
go

-- 📌 Xóa application
CREATE OR ALTER PROCEDURE SP_DeleteJobApplication
  @Id UNIQUEIDENTIFIER
AS
BEGIN
  UPDATE job_applications
  SET is_deleted = 1, updated_at = GETDATE()
  WHERE id = @Id;
END
GO
