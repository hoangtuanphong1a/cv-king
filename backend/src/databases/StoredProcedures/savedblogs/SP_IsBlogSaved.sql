USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_IsBlogSaved]
    @BlogPostId INT,
    @UserId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @IsSaved BIT = 0;

    -- Check if blog is saved by user
    IF EXISTS (SELECT 1 FROM saved_blogs WHERE blog_post_id = @BlogPostId AND user_id = @UserId)
    BEGIN
        SET @IsSaved = 1;
    END

    SELECT @IsSaved as is_saved;
END;
GO
