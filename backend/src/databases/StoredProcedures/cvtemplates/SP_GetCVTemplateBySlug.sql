use JOB_DB
go

create procedure [dbo].[SP_GetCVTemplateBySlug]
(
    @slug nvarchar(200)
)
as
begin
    select * from CVTemplates where slug = @slug
end
