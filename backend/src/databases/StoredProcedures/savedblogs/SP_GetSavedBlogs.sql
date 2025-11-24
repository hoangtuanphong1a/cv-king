use JOB_DB
go

CREATE OR ALTER PROCEDURE [dbo].[SP_GetSavedBlogs]
    @UserId NVARCHAR(36),
    @SortBy NVARCHAR(50) = 'savedAt',
    @SortOrder NVARCHAR(10) = 'DESC',
    @Limit INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (@Limit)
        sb.id,
        sb.blog_post_id,
        sb.user_id,
        sb.created_at,
        bp.Title,
        bp.Slug,
        bp.Excerpt,
        bp.CoverImageUrl,
        u.displayName as authorName,
        bp.created_at as blogCreatedAt,
        bp.ViewsCount as blogViewsCount
    FROM saved_blogs sb
    INNER JOIN BlogPosts bp ON sb.blog_post_id = bp.id
    LEFT JOIN Users u ON bp.AuthorUserId = u.id
    WHERE sb.user_id = @UserId
    ORDER BY
        CASE WHEN @SortBy = 'savedAt' AND @SortOrder = 'ASC' THEN sb.created_at END ASC,
        CASE WHEN @SortBy = 'savedAt' AND @SortOrder = 'DESC' THEN sb.created_at END DESC,
        CASE WHEN @SortBy = 'title' AND @SortOrder = 'ASC' THEN bp.Title END ASC,
        CASE WHEN @SortBy = 'title' AND @SortOrder = 'DESC' THEN bp.Title END DESC,
        CASE WHEN @SortBy = 'createdAt' AND @SortOrder = 'ASC' THEN bp.created_at END ASC,
        CASE WHEN @SortBy = 'createdAt' AND @SortOrder = 'DESC' THEN bp.created_at END DESC
END
