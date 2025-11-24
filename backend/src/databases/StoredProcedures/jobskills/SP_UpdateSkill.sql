USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_UpdateSkill
    @SkillId NVARCHAR(36),
    @Name NVARCHAR(200)
AS
BEGIN
     update Skills
        set name = @Name, updated_at =SYSDATETIMEOFFSET()
    where id = @SkillId
END;
GO
