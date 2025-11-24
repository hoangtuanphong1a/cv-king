USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_DeleteBlogPostTags]
    @BlogPostId UNIQUEIDENTIFIER = NULL,
    @BlogTagId UNIQUEIDENTIFIER = NULL,
    @BlogPostTagId UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DeletedCount INT = 0;

    IF @BlogPostTagId IS NOT NULL
    BEGIN
        -- Delete by specific BlogPostTag ID (if such a column existed, but currently it's composite key)
        -- For now, just delete based on the provided parameters
        IF @BlogPostId IS NOT NULL AND @BlogTagId IS NOT NULL
        BEGIN
            DELETE FROM dbo.BlogPostTags
            WHERE BlogPostId = @BlogPostId AND BlogTagId = @BlogTagId;
            SET @DeletedCount = @@ROWCOUNT;
        END
    END
    ELSE IF @BlogPostId IS NOT NULL AND @BlogTagId IS NOT NULL
    BEGIN
        -- Delete specific relationship between BlogPost and BlogTag
        DELETE FROM dbo.BlogPostTags
        WHERE BlogPostId = @BlogPostId AND BlogTagId = @BlogTagId;
        SET @DeletedCount = @@ROWCOUNT;
    END
    ELSE IF @BlogPostId IS NOT NULL
    BEGIN
        -- Delete all relationships for a specific BlogPost
        DELETE FROM dbo.BlogPostTags
        WHERE BlogPostId = @BlogPostId;
        SET @DeletedCount = @@ROWCOUNT;
    END
    ELSE IF @BlogTagId IS NOT NULL
    BEGIN
        -- Delete all relationships for a specific BlogTag
        DELETE FROM dbo.BlogPostTags
        WHERE BlogTagId = @BlogTagId;
        SET @DeletedCount = @@ROWCOUNT;
    END
    ELSE
    BEGIN
        SELECT CAST('{"error": "At least one parameter (BlogPostId, BlogTagId, or both) must be provided"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    -- Return result
    SELECT CAST((
        SELECT @DeletedCount AS deletedCount,
               CASE WHEN @DeletedCount > 0 THEN 'success' ELSE 'no_changes' END AS status
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
