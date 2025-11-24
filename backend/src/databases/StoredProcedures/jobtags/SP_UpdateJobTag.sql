USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_UpdateJobTag
    @JobTagId NVARCHAR(36),
    @Name NVARCHAR(200)
AS
BEGIN
     update JobTags
        set name = @Name, updated_at =SYSDATETIMEOFFSET()
    where id = @JobTagId
END;
GO
