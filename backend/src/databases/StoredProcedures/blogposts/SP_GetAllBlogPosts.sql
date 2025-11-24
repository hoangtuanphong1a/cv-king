USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetAllBlogPosts]
    @Page INT = 1,
    @PageSize INT = 10,
    @AuthorUserId UNIQUEIDENTIFIER = NULL,
    @IsPublished BIT = NULL,
    @Keyword NVARCHAR(500) = NULL,
    @TagId UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    SELECT CAST((
        SELECT
            bp.id, bp.Title, bp.Slug, bp.Excerpt, bp.CoverImageUrl,
            bp.AuthorUserId, bp.category_id, bp.IsPublished, bp.PublishedAt,
            bp.created_at, bp.updated_at, bp.Status, bp.ViewsCount, bp.PostedAt,
            bp.ExpiresAt, bp.ShortDescription,
            -- Remove bp.content from here to avoid GROUP BY issues

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
        LEFT JOIN dbo.BlogPostTags bpt ON bp.id = bpt.BlogPostId
        WHERE (@AuthorUserId IS NULL OR bp.AuthorUserId = @AuthorUserId)
          AND (@IsPublished IS NULL OR bp.IsPublished = @IsPublished)
          AND (@Keyword IS NULL OR bp.Title LIKE '%' + @Keyword + '%' OR bp.Excerpt LIKE '%' + @Keyword + '%')
          AND (@TagId IS NULL OR bpt.BlogTagId = @TagId)
        GROUP BY bp.id, bp.Title, bp.Slug, bp.Excerpt, bp.CoverImageUrl,
                 bp.AuthorUserId, bp.IsPublished, bp.PublishedAt, bp.created_at, bp.updated_at,
                 bp.Status, bp.ViewsCount, bp.PostedAt, bp.ExpiresAt, bp.ShortDescription,
                 bp.category_id
                 -- Remove bp.content from GROUP BY
        ORDER BY bp.created_at DESC
        OFFSET @Offset ROWS
        FETCH NEXT @PageSize ROWS ONLY
        FOR JSON PATH, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
