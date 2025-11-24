USE JOB_DB;
GO

DROP PROCEDURE IF EXISTS dbo.SP_GetBlogViewStats;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogViewStats
    @BlogPostId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalViews INT;
    DECLARE @UniqueViews INT;
    DECLARE @RecentViews INT;

    SELECT @TotalViews = views_count
    FROM dbo.BlogPosts
    WHERE id = @BlogPostId;

    SELECT @UniqueViews = COUNT(DISTINCT COALESCE(ViewerUserId, SessionId))
    FROM dbo.BlogViews
    WHERE BlogPostId = @BlogPostId;

    SELECT @RecentViews = COUNT(*)
    FROM dbo.BlogViews
    WHERE BlogPostId = @BlogPostId
      AND ViewedAt >= DATEADD(HOUR, -24, GETUTCDATE());

    SELECT
        ISNULL(@TotalViews, 0) AS totalViews,
        ISNULL(@UniqueViews, 0) AS uniqueViews,
        ISNULL(@RecentViews, 0) AS recentViews;
END;
GO
