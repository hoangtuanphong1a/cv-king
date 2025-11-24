use JOB_DB
go

create procedure [dbo].[SP_GetCompanyBySlug]
(
    @slug nvarchar(300)
)
as
begin
    select * from Companies where slug = @slug
end
