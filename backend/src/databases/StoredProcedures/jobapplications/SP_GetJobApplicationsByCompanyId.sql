USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE SP_GetJobApplicationsByCompanyId
    @CompanyId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ja.Id AS ApplicationId,
        ja.Status AS ApplicationStatus,
        ja.applied_at AS appliedAt,
        u.id AS job_seeker_id,
        u.display_name,
        u.email,
        j.Id AS JobId,
        j.Title AS JobTitle,
        j.Status AS JobStatus,
        c.Id AS CompanyId,
        c.Name AS CompanyName
    FROM dbo.Companies c
        INNER JOIN dbo.Jobs j ON j.Company_id = c.Id
        INNER JOIN dbo.Job_Applications ja ON ja.Job_id = j.Id
        INNER JOIN dbo.Users AS u ON ja.job_seeker_id = u.id
    WHERE 
        c.Id = @CompanyId
        AND ja.is_deleted = 0
    ORDER BY ja.applied_at DESC;
END;
GO
