USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetAllBlogComments]
    @BlogPostId NVARCHAR(36) = NULL
AS
BEGIN
    SET NOCOUNT ON;

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
        WHERE (@BlogPostId IS NULL OR bc.BlogPostId = @BlogPostId)
        ORDER BY bc.created_at DESC
        FOR JSON PATH
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
