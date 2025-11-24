USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_UpdateBlogTag]
    @Id UNIQUEIDENTIFIER,
    @Name NVARCHAR(200)
AS
BEGIN

    UPDATE BlogTags
    SET name = @Name, updated_at = SYSDATETIMEOFFSET()
    WHERE id = @Id;

    SELECT * FROM BlogTags WHERE id = @Id;
END;
GO