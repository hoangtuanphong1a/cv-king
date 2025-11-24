USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetFilteredBlogPosts]
    @Keyword        NVARCHAR(255) = NULL,
    @CategoryId     UNIQUEIDENTIFIER = NULL,
    @AuthorId       UNIQUEIDENTIFIER = NULL,
    @TagIds         NVARCHAR(MAX) = NULL,
    @IsPublished    BIT = NULL,
    @Status         NVARCHAR(50) = NULL,
    @ViewsCountMin  INT = NULL,
    @DateFrom       DATETIME2 = NULL,
    @DateTo         DATETIME2 = NULL,
    @SortBy         NVARCHAR(50) = N'created_at',
    @SortOrder      NVARCHAR(10) = N'DESC',
    @Offset         INT = 0,
    @Limit          INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    -- Bảng tạm chứa bản ghi đã lọc (chỉ các cột cần thiết)
    CREATE TABLE #TempResults
    (
        id UNIQUEIDENTIFIER PRIMARY KEY,
        title NVARCHAR(500),
        slug NVARCHAR(500),
        excerpt NVARCHAR(1000),
        cover_image_url NVARCHAR(1000),
        author_user_id UNIQUEIDENTIFIER,
        category_id UNIQUEIDENTIFIER,
        is_published BIT,
        published_at DATETIMEOFFSET,
        created_at DATETIMEOFFSET,
        updated_at DATETIMEOFFSET,
        status NVARCHAR(50),
        views_count INT,
        posted_at DATETIMEOFFSET,
        expires_at DATETIMEOFFSET,
        short_description NVARCHAR(2000)
    );

    -- Đưa dữ liệu đã lọc vào bảng tạm
    INSERT INTO #TempResults
    SELECT
        bp.id, bp.Title, bp.Slug, bp.Excerpt, bp.CoverImageUrl,
        bp.AuthorUserId, bp.category_id, bp.IsPublished, bp.PublishedAt,
        bp.created_at, bp.updated_at, bp.Status, bp.ViewsCount, bp.PostedAt,
        bp.ExpiresAt, bp.ShortDescription
    FROM dbo.BlogPosts bp
    LEFT JOIN dbo.BlogPostTags bpt ON bp.id = bpt.BlogPostId
    LEFT JOIN dbo.BlogTags bt ON bpt.blog_tag_id = bt.id
    WHERE
        (
          @Keyword IS NULL OR
          bp.Title   LIKE N'%' + @Keyword + N'%' OR
          bp.Excerpt LIKE N'%' + @Keyword + N'%' OR
          bp.Content LIKE N'%' + @Keyword + N'%'
        )
        AND (@CategoryId    IS NULL OR bp.category_id    = @CategoryId)
        AND (@AuthorId      IS NULL OR bp.AuthorUserId = @AuthorId)
        AND (@IsPublished   IS NULL OR bp.IsPublished   = @IsPublished)
        AND (@Status        IS NULL OR bp.Status         = @Status)
        AND (@ViewsCountMin IS NULL OR bp.ViewsCount   >= @ViewsCountMin)
        AND (@DateFrom      IS NULL OR bp.created_at    >= @DateFrom)
        AND (@DateTo        IS NULL OR bp.created_at    <= @DateTo)
        AND (
              @TagIds IS NULL
              OR bt.id IN (
                    SELECT TRY_CONVERT(UNIQUEIDENTIFIER, LTRIM(RTRIM([value])))
                    FROM STRING_SPLIT(@TagIds, ',')
                 )
        )
    GROUP BY
        bp.id, bp.Title, bp.Slug, bp.Excerpt, bp.CoverImageUrl,
        bp.AuthorUserId, bp.category_id, bp.IsPublished, bp.PublishedAt,
        bp.created_at, bp.updated_at, bp.Status, bp.ViewsCount, bp.PostedAt,
        bp.ExpiresAt, bp.ShortDescription;

    -- Tổng số bản ghi sau khi lọc
    DECLARE @TotalCount INT = (SELECT COUNT(*) FROM #TempResults);

    -- Trả về JSON: total + data (có phân trang)
    SELECT CAST((
        SELECT
            @TotalCount AS total,
            (
                SELECT
                    tr.id, tr.title, tr.slug, tr.excerpt, tr.cover_image_url,
                    tr.author_user_id, tr.category_id, tr.is_published, tr.published_at,
                    tr.created_at, tr.updated_at, tr.status, tr.views_count, tr.posted_at,
                    tr.expires_at, tr.short_description,

                    -- Category info
                    (
                        SELECT bc.id, bc.Name
                        FROM dbo.BlogCategories bc
                        WHERE bc.id = tr.category_id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    ) AS category,

                    -- Tags info
                    (
                        SELECT bt.id, bt.Name
                        FROM dbo.BlogTags bt
                        JOIN dbo.BlogPostTags bpt ON bt.id = bpt.blog_tag_id
                        WHERE bpt.BlogPostId = tr.id
                        FOR JSON PATH
                    ) AS tags
                FROM #TempResults tr
                ORDER BY
                    CASE WHEN @SortBy = 'title'         AND @SortOrder = 'ASC'  THEN tr.title        END ASC,
                    CASE WHEN @SortBy = 'title'         AND @SortOrder = 'DESC' THEN tr.title        END DESC,
                    CASE WHEN @SortBy = 'created_at'    AND @SortOrder = 'ASC'  THEN tr.created_at   END ASC,
                    CASE WHEN @SortBy = 'created_at'    AND @SortOrder = 'DESC' THEN tr.created_at   END DESC,
                    CASE WHEN @SortBy = 'updated_at'    AND @SortOrder = 'ASC'  THEN tr.updated_at   END ASC,
                    CASE WHEN @SortBy = 'updated_at'    AND @SortOrder = 'DESC' THEN tr.updated_at   END DESC,
                    CASE WHEN @SortBy = 'published_at'  AND @SortOrder = 'ASC'  THEN tr.published_at END ASC,
                    CASE WHEN @SortBy = 'published_at'  AND @SortOrder = 'DESC' THEN tr.published_at END DESC,
                    CASE WHEN @SortBy = 'views_count'   AND @SortOrder = 'ASC'  THEN tr.views_count  END ASC,
                    CASE WHEN @SortBy = 'views_count'   AND @SortOrder = 'DESC' THEN tr.views_count  END DESC,
                    CASE WHEN @SortBy = 'status'        AND @SortOrder = 'ASC'  THEN tr.status       END ASC,
                    CASE WHEN @SortBy = 'status'        AND @SortOrder = 'DESC' THEN tr.status       END DESC,
                    CASE WHEN @SortBy = 'is_published'  AND @SortOrder = 'ASC'  THEN tr.is_published END ASC,
                    CASE WHEN @SortBy = 'is_published'  AND @SortOrder = 'DESC' THEN tr.is_published END DESC
                OFFSET @Offset ROWS
                FETCH NEXT @Limit ROWS ONLY
                FOR JSON PATH
            ) AS data
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS NVARCHAR(MAX)) AS json_result;

    DROP TABLE #TempResults;
END;
GO
