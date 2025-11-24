use JOB_DB
go

create procedure [dbo].[SP_GetAllSavedJobs]
as
begin
    select
        sj.*,
        (select title from Jobs where jobId = sj.jobId) as jobTitle,
        (select email from Users where id = sj.jobSeekerId) as userEmail,
        (select name from Companies where id = (select companyId from Jobs where jobId = sj.jobId)) as companyName
    from SavedJobs sj
end
