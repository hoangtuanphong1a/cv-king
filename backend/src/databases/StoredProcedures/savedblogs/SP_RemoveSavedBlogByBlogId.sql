USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_RemoveSavedBlogByBlogId]
    @BlogPostId INT,
    @UserId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if saved blog exists
    IF NOT EXISTS (SELECT 1 FROM saved_blogs WHERE blog_post_id = @BlogPostId AND user_id = @UserId)
    BEGIN
        RAISERROR('Saved blog not found', 16, 1);
        RETURN;
    END

    DELETE FROM saved_blogs
    WHERE blog_post_id = @BlogPostId AND user_id = @UserId;

    SELECT CAST('{"message": "Blog removed from saved list successfully"}' AS NVARCHAR(MAX)) AS json_result;
END;
GO
