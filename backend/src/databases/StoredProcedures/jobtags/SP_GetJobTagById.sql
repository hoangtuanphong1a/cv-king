USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetJobTagById
    @JobTagId NVARCHAR(36)
AS
BEGIN
    SELECT  * 
    FROM dbo.JobTags
    WHERE id = @JobTagId;
END;
GO
