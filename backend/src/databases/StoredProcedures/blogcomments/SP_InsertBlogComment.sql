USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_InsertBlogComment]
    @Content NVARCHAR(MAX),
    @BlogPostId NVARCHAR(36),
    @UserId NVARCHAR(36) = NULL,
    @GuestName NVARCHAR(200) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate that either UserId or GuestName is provided
    IF @UserId IS NULL AND (@GuestName IS NULL OR LEN(@GuestName) = 0)
    BEGIN
        SELECT CAST('{"error": "Either UserId or GuestName must be provided"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    -- Check if blog post exists
    IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE id = @BlogPostId)
    BEGIN
        SELECT CAST('{"error": "Blog post not found"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    INSERT INTO dbo.BlogComments (
        BlogPostId, Content, UserId, GuestName, IsApproved, created_at
    )
    VALUES (
        @BlogPostId, @Content, @UserId, @GuestName, 0, SYSDATETIMEOFFSET()  -- Comments start as unapproved
    );

    -- Return created comment (find by BlogPostId and recent created_at)
    SELECT CAST((
        SELECT TOP 1
            bc.id,
            bc.BlogPostId as blog_post_id,
            bc.UserId as user_id,
            bc.GuestName as guest_name,
            bc.Content as content,
            bc.IsApproved as is_approved,
            bc.created_at,
            bc.updated_at
        FROM dbo.BlogComments bc
        WHERE bc.BlogPostId = @BlogPostId
        ORDER BY bc.created_at DESC
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
