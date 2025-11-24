"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import BreadcrumbTabActive from "@/components/ui/common/breadcrumb/BreadcrumbTabActive";
import JobHeader from "@/components/ui/client/job/job-details/JobHeader";
import JobContent from "@/components/ui/client/job/job-details/JobContent";
import CompanySidebar from "@/components/ui/client/job/job-details/CompanySidebar";
import ApplyModal from "@/components/ui/client/job/job-details/ApplyModal";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useJobByIdQuery } from "@/api/Job/query";
import { useMyProfileQuery } from "@/api/user/query";

export default function JobDetailPage() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  
  const { data: myProfile} = useMyProfileQuery();
  // Lấy chi tiết công việc
  const { data: job, isLoading, isError } = useJobByIdQuery(slug);

  // Xử lý sự kiện ứng tuyển
  const handleApply = useCallback(() => {
    setShowApplyModal(false);
  }, []);

  // Xử lý trạng thái tải
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  // Xử lý lỗi hoặc không tìm thấy công việc
  if (isError || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Không tìm thấy công việc hoặc có lỗi xảy ra.</p>
      </div>
    );
  }

  // Định dạng lương
  const salary = job.salary_min && job.salary_max && job.currency
    ? `${job.salary_min} - ${job.salary_max} ${job.currency}`
    : job.salary_min && job.currency
    ? `${job.salary_min} ${job.currency}+`
    : job.salary_max && job.currency
    ? `Lên đến ${job.salary_max} ${job.currency}`
    : "Thỏa thuận";

  // Định dạng ngày đăng và ngày hết hạn
  const posted = job.posted_at
    ? formatDistanceToNow(new Date(job.posted_at), { addSuffix: true, locale: vi })
    : "Không xác định";
  const deadline = job.expires_at
    ? new Date(job.expires_at).toLocaleDateString("vi-VN")
    : "Không xác định";

  // Định dạng tags từ skills và tags
  const tags = [
    ...(job.skills?.map(skill => skill.Name) || []),
    ...(job.tags?.map(tag => tag.Name) || []),
  ];

  // Định dạng thông tin công ty từ job.company
  const companyInfo = {
    name: job.company?.Name || job.company_id || "Công ty không xác định",
    address: job.company?.location || job.location || "Không xác định",
    website: job.company?.website || "",
    industry: job.category?.Name || "Không xác định",
    companySize: job.company?.company_size || "Không xác định",
    specialties: job.tags?.map(tag => tag.Name) || [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <BreadcrumbTabActive
            items={[
              { name: "Trang chủ", link: "/" },
              { name: "Việc làm", link: "/job" },
              { name: job.title || "Công việc" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Job info */}
          <div className="lg:col-span-2 space-y-6">
            <JobHeader
              job={{
                id: job.id,
                title: job.title || "Công việc không xác định",
                company: job.company?.Name || job.company_id || "Công ty không xác định",
                logo: job.company?.logo_url || undefined,
                location: job.location || "Không xác định",
                salary,
                posted,
                deadline,
                tags,
                views: job.views_count || 0,
              }}
              onApply={() => setShowApplyModal(true)}
              onViewCompany={() => {}}
            />
            <JobContent
              job={{
                description: job.description || "",
                requirements: job.requirements ? job.requirements.split("\n") : [],
                benefits: job.benefits ? job.benefits.split("\n") : [],
              }}
            />
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start space-y-6">
              <CompanySidebar
                companyInfo={companyInfo}
                onViewCompanyDetail={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyModal
          jobTitle={job.title || "Công việc"}
          jobId={job.id}
          jobSeekerId={myProfile?.id??""}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
}
