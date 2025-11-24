USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_UpdateBlogPost]
    @Id UNIQUEIDENTIFIER,
    @Title NVARCHAR(500) = NULL,
    @Slug NVARCHAR(500) = NULL, 
    @Content NVARCHAR(MAX) = NULL,
    @Excerpt NVARCHAR(1000) = NULL,
    @CoverImageUrl NVARCHAR(1000) = NULL,
    @CategoryId UNIQUEIDENTIFIER = NULL,
    @IsPublished BIT = NULL,
    @PublishedAt DATETIMEOFFSET = NULL,
    @TagIds NVARCHAR(MAX) = NULL,
    @Status NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    DECLARE @Now DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @UniqueSlug NVARCHAR(500);

    IF @Slug IS NOT NULL
    BEGIN
        SET @UniqueSlug = @Slug;
        DECLARE @Counter INT = 1;

        WHILE EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE Slug = @UniqueSlug AND id != @Id)
        BEGIN
            SET @UniqueSlug = CONCAT(@Slug, '-', CAST(@Counter AS NVARCHAR(10)));
            SET @Counter = @Counter + 1;
            IF @Counter > 1000
            BEGIN
                SELECT CAST('{"error": "Unable to generate unique slug"}' AS NVARCHAR(MAX));
                RETURN;
            END
        END
    END

    UPDATE dbo.BlogPosts
    SET
        Title = COALESCE(@Title, Title),
        Slug = COALESCE(@UniqueSlug, Slug),
        Content = COALESCE(@Content, Content),
        Excerpt = COALESCE(@Excerpt, Excerpt),
        CoverImageUrl = COALESCE(@CoverImageUrl, CoverImageUrl),
        category_id = COALESCE(@CategoryId, category_id),
        IsPublished = COALESCE(@IsPublished, IsPublished),
        PublishedAt = COALESCE(@PublishedAt, PublishedAt),
        Status = COALESCE(@Status, Status),
        ShortDescription = NULL, -- Có thể thêm parameter nếu cần
        requirements = NULL, -- Có thể thêm parameter nếu cần
        benefits = NULL, -- Có thể thêm parameter nếu cần
        updated_at = @Now
    WHERE id = @Id;

    IF @TagIds IS NOT NULL
    BEGIN
        DELETE FROM dbo.BlogPostTags WHERE BlogPostId = @Id;
        IF LEN(@TagIds) > 0
        BEGIN
            INSERT INTO dbo.BlogPostTags (id, BlogPostId, BlogTagId, created_at)
            SELECT NEWID(), @Id, TRIM(value), @Now
            FROM STRING_SPLIT(@TagIds, ',');
        END
    END

    COMMIT;
    EXEC SP_GetBlogPostById @Id;
END;
GO
