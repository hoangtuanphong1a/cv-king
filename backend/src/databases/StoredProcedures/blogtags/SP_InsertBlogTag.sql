USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_InsertBlogTag]
    @Name NVARCHAR(200)
AS
BEGIN

DECLARE @NewId UNIQUEIDENTIFIER = NEWID();

    insert into BlogTags(id,name,created_at, updated_at)
    values (@NewId, @Name, SYSDATETIMEOFFSET(),null)

    SELECT * FROM BlogTags WHERE id = @NewId;
END;
GO