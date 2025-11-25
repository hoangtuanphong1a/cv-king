// app/job-postings/[slug]/edit/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { toast } from "sonner";

import BasicDetailsSection from "@/components/ui/client/job/post-job/BasicDetailsSection";
import JobContentSection from "@/components/ui/client/job/post-job/JobDetailsSection";
import SkillsSection from "@/components/ui/client/job/post-job/SkillsSection";
import ApplicationSection from "@/components/ui/client/job/post-job/ApplicationSection";
import RightSidebarPanel from "@/components/ui/client/job/post-job/SidebarPanel";

import { CreateJobSchema } from "@/api/Job/schema";
import { CreateJobFormData } from "@/api/Job/type";
import { MockJob } from "@/types/job.type";
import { jobs } from "@/faker/jobposting-data";

import { useSkillsQuery } from "@/api/Skill/query";
import { useJobTagsQuery } from "@/api/Tag/query";
import { useCompaniesQuery } from "@/api/Company/query";
import { useJobCategoriesQuery } from "@/api/JobCategory/query";
import { useUpdateJobMutation } from "@/api/Job/query";

type Option = { id: string; name: string };

// Helper function to convert MockJob (from faker data) to CreateJobFormData
function mockJobToFormData(job: MockJob): CreateJobFormData {
  const jobType = job.type as "Toàn thời gian" | "Bán thời gian" | "Hợp đồng" | "Freelance";
  const expiresAt = job.expires ? new Date(job.expires) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default to 30 days from now
  
  return {
    CompanyId: "", // MockJob doesn't have companyId, will need to be set manually
    PostedByUserId: "", // MockJob doesn't have postedByUserId, will need to be set manually
    Title: job.title || "",
    ShortDescription: job.description || "",
    Description: job.description || "",
    Requirements: job.requirements || "",
    Benefits: job.benefits || "",
    SalaryMin: job.salaryMin ? Number(job.salaryMin) : undefined,
    SalaryMax: job.salaryMax ? Number(job.salaryMax) : undefined,
    Currency: job.salaryCurrency || "USD",
    JobType: jobType || "Toàn thời gian",
    Location: job.location || "",
    CategoryId: "", // MockJob doesn't have categoryId, will need to be set manually
    ExpiresAt: expiresAt,
    skillIds: [], // MockJob has skills as string[], not JobSkill[], so we can't map to IDs
    tagIds: [], // MockJob doesn't have tags
  };
}

export default function EditJobPage() {
  const params = useParams<{ slug: string }>();
  const job = useMemo(() => jobs.find((j) => j.slug === params.slug), [params.slug]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      CompanyId: "",
      PostedByUserId: "",
      Title: "",
      ShortDescription: "",
      Description: "",
      Requirements: "",
      Benefits: "",
      SalaryMin: undefined,
      SalaryMax: undefined,
      Currency: "USD",
      JobType: "Toàn thời gian",
      Location: "",
      CategoryId: "",
      ExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now
      skillIds: [],
      tagIds: [],
    },
  });

  const formData = watch();

  // Initialize form with job data
  useEffect(() => {
    if (job) {
      const formData = mockJobToFormData(job);
      reset(formData);
    }
  }, [job, reset]);

  // Fetch data
  const { data: skillsData, isLoading: skillsLoading } = useSkillsQuery();
  const { data: tagsData, isLoading: tagsLoading } = useJobTagsQuery();
  const { data: companiesData, isLoading: companiesLoading } = useCompaniesQuery();
  const { data: categoriesData, isLoading: categoriesLoading } = useJobCategoriesQuery();

  const suggestedSkills: Option[] = useMemo(
    () => (skillsData ?? []).map((s) => ({ id: s.id, name: s.name })),
    [skillsData]
  );
  const suggestedTags: Option[] = useMemo(
    () => (tagsData ?? []).map((t) => ({ id: t.id, name: t.name })),
    [tagsData]
  );
  const companies: Option[] = useMemo(
    () => (companiesData ?? []).map((c) => ({ id: c.id, name: c.name })),
    [companiesData]
  );
  const categories: Option[] = useMemo(
    () => (categoriesData ?? []).map((c) => ({ id: c.id, name: c.name })),
    [categoriesData]
  );

  const { mutateAsync: updateJob } = useUpdateJobMutation();
  const anyLoading = skillsLoading || tagsLoading || companiesLoading || categoriesLoading;

  if (!job) notFound();

  const onSubmit = (draft: boolean) => {
    return (data: CreateJobFormData) => {
      if (!job.id) {
        toast.error("Không tìm thấy ID công việc");
        return;
      }

      const payload = {
        Title: data.Title,
        ShortDescription: data.ShortDescription || null,
        Description: data.Description || null,
        Requirements: data.Requirements || null,
        Benefits: data.Benefits || null,
        SalaryMin: data.SalaryMin !== undefined ? Number(data.SalaryMin) : null,
        SalaryMax: data.SalaryMax !== undefined ? Number(data.SalaryMax) : null,
        Currency: data.Currency || null,
        JobType: data.JobType || null,
        Location: data.Location || null,
        CategoryId: data.CategoryId || null,
        ExpiresAt: data.ExpiresAt ? new Date(data.ExpiresAt).toISOString() : null,
        Status: draft ? "draft" : "active",
        skillIds: data.skillIds || [],
        tagIds: data.tagIds || [],
      };

      updateJob({ id: String(job.id), data: payload });
      toast.success(draft ? "Lưu nháp thành công!" : "Cập nhật tin thành công!");
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Chỉnh sửa Tin Tuyển Dụng</h1>

        {anyLoading ? (
          <div className="flex justify-center py-16">
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit(false))}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <BasicDetailsSection
                  control={control}
                  errors={errors}
                  companies={companies}
                  categories={categories}
                />

                <JobContentSection control={control} errors={errors} />

                <SkillsSection
                  skills={formData.skillIds || []}
                  tags={formData.tagIds || []}
                  onSkillsChange={(skills) =>
                    setValue("skillIds", skills, { shouldValidate: true })
                  }
                  onTagsChange={(tags) =>
                    setValue("tagIds", tags, { shouldValidate: true })
                  }
                  errors={errors}
                  suggestedSkills={suggestedSkills}
                  suggestedTags={suggestedTags}
                />

                <ApplicationSection
                  control={control}
                  errors={errors}
                  setValue={setValue}
                />
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <RightSidebarPanel
                    form={formData}
                    isValid={isValid}
                    onSaveDraft={handleSubmit(onSubmit(true))}
                    onPublish={handleSubmit(onSubmit(false))}
                    companies={companies}
                    categories={categories}
                    suggestedSkills={suggestedSkills}
                    suggestedTags={suggestedTags}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
