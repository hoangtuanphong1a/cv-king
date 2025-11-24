use JOB_DB
go

CREATE OR ALTER PROCEDURE [dbo].[SP_GetSavedBlogById]
    @Id NVARCHAR(36),
    @UserId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        sb.id,
        sb.blog_post_id,
        sb.user_id,
        sb.created_at,
        bp.Title,
        bp.Slug,
        bp.Content,
        bp.Excerpt,
        bp.CoverImageUrl,
        u.displayName as authorName,
        bp.created_at as blogCreatedAt,
        bp.ViewsCount as blogViewsCount
    FROM saved_blogs sb
    INNER JOIN BlogPosts bp ON sb.blog_post_id = bp.id
    LEFT JOIN Users u ON bp.AuthorUserId = u.id
    WHERE sb.id = @Id AND sb.user_id = @UserId
END
