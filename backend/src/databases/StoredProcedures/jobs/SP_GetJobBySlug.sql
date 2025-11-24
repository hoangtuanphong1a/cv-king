use JOB_DB
go

create procedure [dbo].[SP_GetJobBySlug]
(
    @slug nvarchar(500)
)
as
begin
    select (
        select
            j.*,
            (select name from Companies where id = j.company_id) as companyName,
            (select UserName from Users where id = j.posted_by_user_id) as postedByUserName,
            (select count(*) from jobviews where job_id = j.id) as viewCount,
            (
                select
                    jt.id as id,
                    jt.name as name
                from JobTags jt
                inner join JobJobTags jjt on jjt.job_tag_id = jt.id
                where jjt.job_id = j.id
                for json path
            ) as tags,
            (
                select
                    s.skill_id as id,
                    s.name as name
                from Skills s
                inner join JobSkills js on js.skill_id = s.skill_id
                where js.job_id = j.id
                for json path
            ) as skills
        from Jobs j
        where j.slug = @slug
        for json path, without_array_wrapper
    ) as jobDetail
end
go
