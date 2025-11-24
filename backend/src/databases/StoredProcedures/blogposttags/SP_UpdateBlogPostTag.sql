USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_UpdateBlogPostTag
    @BlogPostTagId UNIQUEIDENTIFIER,
    @BlogPostId UNIQUEIDENTIFIER,
    @BlogTagId UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE BlogPostTags
    SET BlogPostId = @BlogPostId,
        BlogTagId = @BlogTagId,
        updated_at = SYSDATETIMEOFFSET()
    WHERE id = @BlogPostTagId;

    SELECT * FROM BlogPostTags WHERE id = @BlogPostTagId;
END;
GO
