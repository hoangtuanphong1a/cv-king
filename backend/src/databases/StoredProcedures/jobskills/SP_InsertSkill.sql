USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_InsertSkill
    @Name NVARCHAR(200)
AS
BEGIN
    DECLARE @NewId UNIQUEIDENTIFIER = NEWID();

    INSERT INTO Skills(id, name, created_at, updated_at)
    VALUES (@NewId, @Name, SYSDATETIMEOFFSET(), NULL);

    -- Trả về bản ghi vừa thêm
    SELECT * FROM Skills WHERE id = @NewId;
END;
GO
