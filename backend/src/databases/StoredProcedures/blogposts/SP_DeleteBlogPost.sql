USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_DeleteBlogPost]
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if blog post exists
    IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE id = @Id)
    BEGIN
        RAISERROR('Blog post not found', 16, 1);
        RETURN;
    END

    -- Delete related blog post tags first
    DELETE FROM dbo.BlogPostTags WHERE BlogPostId = @Id;

    -- Delete related blog comments
    DELETE FROM dbo.BlogComments WHERE BlogPostId = @Id;

    -- Delete related blog views
    DELETE FROM dbo.BlogViews WHERE BlogPostId = @Id;

    -- Delete the blog post
    DELETE FROM dbo.BlogPosts WHERE id = @Id;
END;
GO
