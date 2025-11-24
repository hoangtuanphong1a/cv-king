/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import slugify from "slugify";

import BasicDetailsSection from "@/components/ui/client/job/post-job/BasicDetailsSection";
import JobContentSection from "@/components/ui/client/job/post-job/JobDetailsSection";
import SkillsSection from "@/components/ui/client/job/post-job/SkillsSection";
import ApplicationSection from "@/components/ui/client/job/post-job/ApplicationSection";
import RightSidebarPanel from "@/components/ui/client/job/post-job/SidebarPanel";

import { CreateJobSchema } from "@/api/Job/schema";
import { CreateJobFormData } from "@/api/Job/type";
import { CircularProgress } from "@mui/material";

import { useSkillsQuery } from "@/api/Skill/query";
import { useJobTagsQuery } from "@/api/Tag/query";

import { useCompaniesQuery } from "@/api/Company/query";
import { useJobCategoriesQuery } from "@/api/JobCategory/query";
import { useCreateJobMutation } from "@/api/Job/query";
import { toast } from "sonner";

type Option = { id: string; name: string };

export default function PostJobPage() {
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
      CompanyId: undefined,
      PostedByUserId: "jsadfkdhlkasd",
      Title: "",
      Slug: "",
      ShortDescription: "",
      Description: "",
      Requirements: "",
      Benefits: "",
      SalaryMin: undefined,
      SalaryMax: undefined,
      Currency: "USD",
      JobType: undefined,
      Location: "",
      CategoryId: undefined,
      ExpiresAt: undefined,
      skillIds: [],
      tagIds: [],
    },
  });

  const formData = watch();

  // Debug form
  useEffect(() => {
    console.log("Form Data:", formData);
    console.log("Errors:", errors);
    console.log("Is Valid:", isValid);
  }, [formData, errors, isValid]);

  // ===== fetch skills & tags ở parent =====
  const { data: skillsData, isLoading: skillsLoading } = useSkillsQuery();
  const { data: tagsData, isLoading: tagsLoading } = useJobTagsQuery();

  const suggestedSkills: Option[] = useMemo(
    () => (skillsData ?? []).map((s) => ({ id: s.id, name: s.name })),
    [skillsData]
  );
  const suggestedTags: Option[] = useMemo(
    () => (tagsData ?? []).map((t) => ({ id: t.id, name: t.name })),
    [tagsData]
  );
  // ===== ✅ fetch companies & categories bằng query =====
  const { data: companiesData, isLoading: companiesLoading } =
    useCompaniesQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useJobCategoriesQuery();


  const companies: Option[] = useMemo(
    () => (companiesData ?? []).map((c) => ({ id: c.id, name: c.name })),
    [companiesData]
  );
  const categories: Option[] = useMemo(
    () => (categoriesData ?? []).map((c) => ({ id: c.id, name: c.name })),
    [categoriesData]
  );

  const { mutateAsync: createJob, isPending } = useCreateJobMutation();
  const anyLoading =
    skillsLoading || tagsLoading || companiesLoading || categoriesLoading;
  const onSubmit = (draft: boolean) => (data: CreateJobFormData) => {
    const slug = slugify(data.Title, { lower: true, strict: true });
    const payload = {
      ...data,
      Slug: slug,
      SalaryMin:
        data.SalaryMin !== undefined ? Number(data.SalaryMin) : undefined,
      SalaryMax:
        data.SalaryMax !== undefined ? Number(data.SalaryMax) : undefined,
      ExpiresAt: data.ExpiresAt ? new Date(data.ExpiresAt) : undefined,
      status: draft ? "draft" : "active",
    };

    createJob(payload);
    toast.success(draft ? "Lưu nháp thành công!" : "Đăng tin thành công!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Đăng Tin Tuyển Dụng
        </h1>

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
