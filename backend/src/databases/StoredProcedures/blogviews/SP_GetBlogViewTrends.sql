USE JOB_DB;
GO

DROP PROCEDURE IF EXISTS dbo.SP_GetBlogViewTrends;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogViewTrends
    @Period NVARCHAR(20) = 'all',
    @GroupBy NVARCHAR(10) = 'day',
    @DateFrom DATETIME2 = NULL,
    @DateTo DATETIME2 = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StartDate DATETIME2 = CASE
        WHEN @Period = 'today' THEN CAST(CAST(GETUTCDATE() AS DATE) AS DATETIME2)
        WHEN @Period = 'week' THEN DATEADD(DAY, -7, GETUTCDATE())
        WHEN @Period = 'month' THEN DATEADD(MONTH, -1, GETUTCDATE())
        WHEN @Period = 'year' THEN DATEADD(YEAR, -1, GETUTCDATE())
        ELSE '2020-01-01'
    END;

    SET @StartDate = COALESCE(@DateFrom, @StartDate);

    SELECT
        CAST(bv.viewed_at AS DATE) AS date,
        COUNT(*) AS views,
        COUNT(DISTINCT bv.viewer_user_id) AS uniqueViews,
        COUNT(DISTINCT bv.session_id) AS uniqueSessions
    FROM dbo.BlogViews bv
    WHERE bv.viewed_at >= @StartDate
      AND (@DateTo IS NULL OR bv.viewed_at <= @DateTo)
    GROUP BY CAST(bv.viewed_at AS DATE)
    ORDER BY date DESC;

    SELECT
        COUNT(*) AS totalViews,
        0 AS growth,
        MAX(CAST(bv.viewed_at AS DATE)) AS peakDay
    FROM dbo.BlogViews bv
    WHERE bv.ViewedAt >= @StartDate
      AND (@DateTo IS NULL OR bv.viewed_at <= @DateTo);
END;
GO
