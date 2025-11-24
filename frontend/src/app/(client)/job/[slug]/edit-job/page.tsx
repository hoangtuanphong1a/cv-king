/* eslint-disable @typescript-eslint/no-explicit-any */
// app/job-postings/[slug]/edit/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import BasicDetailsSection from "@/components/ui/client/job/post-job/BasicDetailsSection";
import JobContentSection from "@/components/ui/client/job/post-job/JobDetailsSection";
import SkillsSection from "@/components/ui/client/job/post-job/SkillsSection";
import ApplicationSection from "@/components/ui/client/job/post-job/ApplicationSection";
import RightSidebarPanel from "@/components/ui/client/job/post-job/SidebarPanel";
import { Job } from "@/types/job.type";
import { jobs } from "@/faker/jobposting-data";

export default function EditJobPage() {
  const { slug } = useParams<{ slug: string }>();
  const job = useMemo(() => jobs.find((j) => j.slug === slug), [slug]);

  if (!job) notFound();

  const [form, setForm] = useState<Job>(job as Job);

  useEffect(() => {
    if (job) setForm(job);
  }, [job]);

  const onChangeText = (name: keyof Job, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const onChangeSelect = (name: keyof Job, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value as any }));

  const onToggle = (name: keyof Job, value: boolean) =>
    setForm((prev) => ({ ...prev, [name]: value as any }));

  const handleSubmit = (isDraft: boolean) => {
    const payload = { ...form, status: (isDraft ? "draft" : "active") as Job["status"] };
    console.log(isDraft ? "Lưu nháp (edit)" : "Cập nhật (edit)", payload);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <BasicDetailsSection
          form={form}
          onChangeText={onChangeText}
          onChangeSelect={onChangeSelect}
        />

        <JobContentSection form={form} onChangeText={onChangeText} />

        <SkillsSection
          skills={form.skills}
          onSkillsChange={(s) => setForm((p) => ({ ...p, skills: s }))}
        />

        <ApplicationSection form={form} onChangeText={onChangeText} onToggle={onToggle} />
      </div>

      <RightSidebarPanel
        form={form}
        onSaveDraft={() => handleSubmit(true)}
        onPublish={() => handleSubmit(false)}
      />
    </div>
  );
}
