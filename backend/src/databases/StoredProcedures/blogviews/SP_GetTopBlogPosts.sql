USE JOB_DB;
GO

DROP PROCEDURE IF EXISTS dbo.SP_GetTopBlogPosts;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetTopBlogPosts
    @Limit INT = 10,                -- số bài muốn lấy
    @Period NVARCHAR(20) = 'all',   -- khoảng thời gian: today / week / month / year / all
    @SortBy NVARCHAR(20) = 'views'  -- tiêu chí sắp xếp: views / created_at
AS
BEGIN
    SET NOCOUNT ON;

    ---------------------------------------------------
    -- 1️⃣ Xác định mốc thời gian theo Period
    ---------------------------------------------------
    DECLARE @StartDate DATETIME2 = CASE
        WHEN @Period = 'today' THEN CAST(CAST(GETUTCDATE() AS DATE) AS DATETIME2)
        WHEN @Period = 'week'  THEN DATEADD(DAY, -7,  GETUTCDATE())
        WHEN @Period = 'month' THEN DATEADD(MONTH, -1, GETUTCDATE())
        WHEN @Period = 'year'  THEN DATEADD(YEAR, -1,  GETUTCDATE())
        ELSE '2020-01-01'
    END;

    ---------------------------------------------------
    -- 2️⃣ Lấy danh sách bài viết Top
    ---------------------------------------------------
    SELECT TOP (@Limit)
        bp.id,
        bp.title,
        bp.slug,
        bp.views_count AS viewsCount,
        bp.created_at,
        bp.author_user_id AS authorId,
        u.display_name AS authorName,
        COUNT(bc.id) AS commentsCount
    FROM dbo.BlogPosts bp
        LEFT JOIN dbo.Users u ON u.id = bp.author_user_id
        LEFT JOIN dbo.BlogComments bc ON bc.BlogPostId = bp.id AND bc.IsApproved = 1
    WHERE bp.created_at >= @StartDate
    GROUP BY bp.id, bp.title, bp.slug, bp.views_count, bp.created_at, bp.author_user_id, u.display_name
    ORDER BY
        CASE WHEN @SortBy = 'views' THEN bp.views_count END DESC,
        CASE WHEN @SortBy = 'created_at' THEN bp.created_at END DESC;

    ---------------------------------------------------
    -- 3️⃣ Thống kê tổng hợp
    ---------------------------------------------------
    SELECT
        COUNT(*) AS totalPosts,
        AVG(CAST(bp.views_count AS FLOAT)) AS averageViews,
        MAX(bp.title) AS topPerformer
    FROM dbo.BlogPosts bp
    WHERE bp.views_count = (SELECT MAX(views_count) FROM dbo.BlogPosts);
END;
GO
