USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_UpdateBlogComment
    @Id UNIQUEIDENTIFIER,
    @Content NVARCHAR(MAX)
AS
BEGIN
    UPDATE dbo.BlogComments
    SET content = @Content, updated_at = SYSDATETIMEOFFSET()
    WHERE id = @Id;

    SELECT
        id,
        BlogPostId as blog_post_id,
        UserId as user_id,
        GuestName as guest_name,
        Content as content,
        IsApproved as is_approved,
        created_at,
        updated_at
    FROM dbo.BlogComments
    WHERE id = @Id;
END;
GO
