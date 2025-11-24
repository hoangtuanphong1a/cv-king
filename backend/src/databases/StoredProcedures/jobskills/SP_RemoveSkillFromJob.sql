USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.sp_RemoveSkillFromJob
    @JobId INT,
    @SkillId INT,
    @OutAffectedRows INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Kiểm tra xem quan hệ Job-Skill có tồn tại không
    IF NOT EXISTS (SELECT 1 FROM dbo.JobSkills WHERE Job_id = @JobId AND Skill_id = @SkillId)
    BEGIN
        RAISERROR('Skill (ID: %d) is not associated with Job (ID: %d).', 16, 1, @SkillId, @JobId);
        SET @OutAffectedRows = 0;
        RETURN;
    END

    -- 2. Xóa quan hệ Job-Skill
    DELETE FROM dbo.JobSkills
    WHERE Job_id = @JobId AND Skill_id = @SkillId;

    -- 3. Trả về số hàng bị ảnh hưởng
    SET @OutAffectedRows = @@ROWCOUNT;

    -- 4. Thông báo (tuỳ chọn)
    PRINT CAST(@OutAffectedRows AS NVARCHAR(10)) + ' row(s) deleted from JobSkills.';
END;
GO
