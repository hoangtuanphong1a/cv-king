use JOB_DB
go

create procedure [dbo].[SP_GetAllJobViews]
as
begin
    select * from jobviews
end
