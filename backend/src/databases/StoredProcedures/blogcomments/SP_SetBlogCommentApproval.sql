USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_SetBlogCommentApproval]
    @Id UNIQUEIDENTIFIER,
    @IsApproved BIT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if comment exists
    IF NOT EXISTS (SELECT 1 FROM dbo.BlogComments WHERE id = @Id)
    BEGIN
        SELECT CAST('{"error": "Blog comment not found"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    -- Update approval status
    UPDATE dbo.BlogComments
    SET IsApproved = @IsApproved
    WHERE id = @Id;

    -- Return updated comment
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
        WHERE bc.id = @Id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
