use JOB_DB
go

create procedure [dbo].[SP_GetJobViewsByJobId]
(
    @JobId varchar(max)
)
as
begin
    select * from jobviews where job_id = @JobId
end
