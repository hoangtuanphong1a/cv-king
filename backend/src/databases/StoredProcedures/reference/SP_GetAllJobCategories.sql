use JOB_DB
go

create procedure [dbo].[SP_GetAllJobCategories]
as
begin
    select * from JobCategories
end
