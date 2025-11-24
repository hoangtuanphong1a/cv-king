USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_InsertJobTag
    @Name NVARCHAR(200)
AS
BEGIN

DECLARE @NewId UNIQUEIDENTIFIER = NEWID();

    insert into JobTags(id,name,created_at, updated_at)
    values (@NewId, @Name, SYSDATETIMEOFFSET(),null)

    SELECT * FROM JobTags WHERE id = @NewId;
END;
GO
