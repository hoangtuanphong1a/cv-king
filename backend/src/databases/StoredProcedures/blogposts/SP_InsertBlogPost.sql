USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_InsertBlogPost]
    @Title NVARCHAR(500),
    @Slug NVARCHAR(500),
    @Content NVARCHAR(MAX),
    @Excerpt NVARCHAR(1000) = NULL,
    @CoverImageUrl NVARCHAR(1000) = NULL,
    @AuthorId UNIQUEIDENTIFIER,
    @CategoryId UNIQUEIDENTIFIER = NULL,
    @IsPublished BIT = 0,
    @PublishedAt DATETIMEOFFSET = NULL,
    @TagIds NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    DECLARE @NewPostId UNIQUEIDtENTIFIER = NEWID();
    DECLARE @Now DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @UniqueSlug NVARCHAR(500) = @Slug;
    DECLARE @Counter INT = 1;

    WHILE EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE Slug = @UniqueSlug)
    BEGIN
        SET @UniqueSlug = CONCAT(@Slug, '-', CAST(@Counter AS NVARCHAR(10)));
        SET @Counter = @Counter + 1;
        IF @Counter > 1000
        BEGIN
            SELECT CAST('{"error": "Unable to generate unique slug for blog post"}' AS NVARCHAR(MAX)) AS json_result;
            RETURN;
        END
    END

    INSERT INTO dbo.BlogPosts (
        id, Title, Slug, Content, Excerpt, CoverImageUrl,
        AuthorUserId, category_id, IsPublished, PublishedAt,
        Status, ViewsCount, PostedAt, created_at, ShortDescription,
        requirements, benefits
    )
    VALUES (
        @NewPostId, @Title, @UniqueSlug, @Content, @Excerpt, @CoverImageUrl,
        @AuthorId, @CategoryId, @IsPublished, @PublishedAt,
        'Active', 0, @Now, @Now, NULL, NULL, NULL
    );

    IF @TagIds IS NOT NULL AND LEN(@TagIds) > 0
    BEGIN
        INSERT INTO dbo.BlogPostTags (id, BlogPostId, BlogTagId, created_at)
        SELECT NEWID(), @NewPostId, TRIM(value), @Now
        FROM STRING_SPLIT(@TagIds, ',');
    END

    COMMIT;
    EXEC SP_GetBlogPostById @NewPostId;
END;
GO
