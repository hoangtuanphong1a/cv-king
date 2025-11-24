USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_InsertBlogPostTag
    @BlogPostId UNIQUEIDENTIFIER,
    @BlogTagId UNIQUEIDENTIFIER
AS
BEGIN

    INSERT INTO BlogPostTags ([BlogPostId], [BlogTagId])
    VALUES (@BlogPostId, @BlogTagId);

    SELECT * FROM BlogPostTags WHERE BlogPostId = @BlogPostId AND BlogTagId = @BlogTagId;

END;
GO
