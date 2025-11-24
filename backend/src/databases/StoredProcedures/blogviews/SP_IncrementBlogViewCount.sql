USE JOB_DB;
GO

-- Xóa nếu đã tồn tại để tránh lỗi trùng
DROP PROCEDURE IF EXISTS dbo.SP_IncrementBlogViewCount;
GO

-- Tạo hoặc cập nhật procedure
CREATE OR ALTER PROCEDURE dbo.SP_IncrementBlogViewCount
    @BlogPostId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Tăng lượt xem cho bài viết
    UPDATE dbo.BlogPosts
    SET views_count = ISNULL(views_count, 0) + 1
    WHERE id = @BlogPostId;

    -- Trả về thông báo kết quả
    SELECT
        @BlogPostId AS BlogPostId,
        '✅ View count incremented successfully' AS Message;
END;
GO
