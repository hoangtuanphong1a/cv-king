use JOB_DB
go

create procedure [dbo].[SP_GetAllCVTemplates]
as
begin
    select * from CVTemplates
end
