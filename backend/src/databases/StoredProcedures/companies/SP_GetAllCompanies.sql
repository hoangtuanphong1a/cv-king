use JOB_DB
go

create procedure [dbo].[SP_GetAllCompanies]
as
begin
    select
        c.*,
        (select name from Industry where id = CONVERT(int, c.industryId)) as industryName,
        (select email from Users where id = CONVERT(int, c.userId)) as postedByEmail
    from Companies c
end
