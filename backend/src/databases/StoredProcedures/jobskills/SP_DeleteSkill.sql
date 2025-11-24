USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_DeleteSkill
    @SkillId NVARCHAR(36)
AS
BEGIN

    DELETE FROM dbo.Skills
    WHERE id = @SkillId;
END;
GO
