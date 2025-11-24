USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetSkillById
    @SkillId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM dbo.Skills
    WHERE id = @SkillId;
END;
GO
