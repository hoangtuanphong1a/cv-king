USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_RecordBlogView]
    @BlogPostId UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER = NULL,
    @SessionId NVARCHAR(200) = NULL,
    @ViewedAt DATETIME2 = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if blog post exists
    IF NOT EXISTS (SELECT 1 FROM BlogPosts WHERE id = @BlogPostId)
    BEGIN
        RAISERROR('Blog post not found', 16, 1);
        RETURN;
    END

    SET @SessionId = COALESCE(@SessionId, 'session_' + CAST(GETUTCDATE() AS NVARCHAR(20)) + '_' + CAST(NEWID() AS NVARCHAR(36)));
    SET @ViewedAt = COALESCE(@ViewedAt, GETUTCDATE());

    INSERT INTO BlogViews (BlogPostId, ViewerUserId, SessionId, ViewedAt)
    VALUES (@BlogPostId, @UserId, @SessionId, @ViewedAt);

    SELECT
        bv.id,
        bv.BlogPostId as blog_post_id,
        bv.ViewerUserId as viewer_user_id,
        bv.SessionId as session_id,
        bv.ViewedAt as viewed_at
    FROM BlogViews bv
    WHERE bv.id = SCOPE_IDENTITY()
END
