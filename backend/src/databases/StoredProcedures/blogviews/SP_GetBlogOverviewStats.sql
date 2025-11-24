USE JOB_DB;
GO

DROP PROCEDURE IF EXISTS dbo.SP_GetBlogOverviewStats;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogOverviewStats
    @Period NVARCHAR(20) = 'all',
    @GroupBy NVARCHAR(10) = 'day'
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalViews INT;
    DECLARE @TotalUniqueViews INT;
    DECLARE @PostCount INT;
    DECLARE @AverageViewsPerPost INT;

    SELECT @TotalViews = SUM(views_count)
    FROM dbo.BlogPosts;

    SELECT @TotalUniqueViews = COUNT(DISTINCT COALESCE(ViewerUserId, SessionId))
    FROM dbo.BlogViews;

    SELECT @PostCount = COUNT(*)
    FROM dbo.BlogPosts;

    SET @AverageViewsPerPost = CASE WHEN @PostCount > 0 THEN @TotalViews / @PostCount ELSE 0 END;

    SELECT TOP 10
        id,
        title,
        views_count AS viewsCount,
        slug
    FROM dbo.BlogPosts
    ORDER BY views_count DESC;

    SELECT
        ISNULL(@TotalViews, 0) AS totalViews,
        ISNULL(@TotalUniqueViews, 0) AS totalUniqueViews,
        ISNULL(@AverageViewsPerPost, 0) AS averageViewsPerPost;
END;
GO
