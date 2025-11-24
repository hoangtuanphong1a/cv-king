USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogPostTagById
    @BlogPostTagId NVARCHAR(36)
AS
BEGIN
    SELECT id, BlogPostId, BlogTagId
    FROM dbo.BlogPostTags
    WHERE id = @BlogPostTagId;
END;
GO
