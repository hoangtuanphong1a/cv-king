USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogCommentById
    @BlogCommentId NVARCHAR(36)
AS
BEGIN
    SELECT CAST((
        SELECT
            bc.id,
            bc.BlogPostId as blog_post_id,
            bc.UserId as user_id,
            bc.GuestName as guest_name,
            bc.Content as content,
            bc.IsApproved as is_approved,
            bc.created_at,
            bc.updated_at
        FROM dbo.BlogComments bc
        WHERE bc.id = @BlogCommentId
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
