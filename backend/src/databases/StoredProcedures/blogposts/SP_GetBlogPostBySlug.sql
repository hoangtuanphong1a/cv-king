USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetBlogPostBySlug]
    @Slug NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

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
            ) AS tags

        FROM dbo.BlogPosts bp
        WHERE bp.Slug = @Slug
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
