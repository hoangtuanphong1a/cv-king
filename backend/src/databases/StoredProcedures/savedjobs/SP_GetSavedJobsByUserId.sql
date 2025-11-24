use JOB_DB
go

create procedure [dbo].[SP_GetSavedJobsByUserId]
(
    @UserId int
)
as
begin
    select sj.*, j.title, j.slug, c.name as companyName from SavedJobs sj
    join Jobs j on sj.jobId = j.jobId
    join Companies c on j.companyId = c.companyId
    where sj.jobSeekerProfileId = (select jobSeekerProfileId from JobSeekerProfiles where userId = @UserId)
end
