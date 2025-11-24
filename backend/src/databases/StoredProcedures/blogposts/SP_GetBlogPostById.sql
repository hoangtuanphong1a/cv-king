USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetBlogPostById]
    @BlogPostId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Return the blog post data as properly formatted JSON
    SELECT CAST((
        SELECT
            bp.id, bp.Title, bp.Slug, bp.Content, bp.Excerpt, bp.CoverImageUrl,
            bp.AuthorUserId, bp.category_id, bp.IsPublished, bp.PublishedAt,
            bp.created_at, bp.updated_at, bp.Status, bp.ViewsCount, bp.PostedAt,
            bp.ExpiresAt, bp.ShortDescription,

            (
                SELECT bc.id, bc.Name
                FROM BlogCategories bc
                WHERE bc.id = bp.category_id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS category,

            (
                SELECT bt.id, bt.Name
                FROM BlogTags bt
                JOIN BlogPostTags bpt ON bt.id = bpt.blog_tag_id
                WHERE bpt.BlogPostId = bp.id
                FOR JSON PATH
            ) AS tags,

            (
                SELECT
                    bc.id, bc.Content as content, bc.UserId as user_id, bc.GuestName as guest_name,
                    bc.IsApproved as is_approved, bc.created_at
                FROM BlogComments bc
                WHERE bc.BlogPostId = bp.id AND bc.IsApproved = 1
                ORDER BY bc.created_at DESC
                FOR JSON PATH
            ) AS comments

        FROM dbo.BlogPosts bp
        WHERE bp.id = @BlogPostId
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
