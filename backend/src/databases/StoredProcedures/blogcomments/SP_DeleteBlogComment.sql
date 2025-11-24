USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_DeleteBlogComment
    @BlogCommentId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM dbo.BlogComments
    WHERE id = @BlogCommentId;

    SELECT CAST('{"message": "Blog comment deleted successfully"}' AS NVARCHAR(MAX)) AS json_result;
END;
GO
