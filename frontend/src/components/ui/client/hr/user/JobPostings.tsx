// app/job-postings/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Eye, Pencil, MapPin, DollarSign, CalendarDays, Clock, Users } from "lucide-react";
import { jobs } from "@/faker/jobposting-data"; 
import { JobStatus } from "@/types/job.type";

const tabs: (JobStatus | "all")[] = ["all", "active", "draft", "expired"];

function formatSalary(min?: string, max?: string, cur: "USD" | "VND" = "USD") {
  if (!min && !max) return "Negotiable";
  const s = cur === "VND" ? "đ" : "$";
  const a = min ? `${s}${min}` : "";
  const b = max ? `${s}${max}` : "";
  return a && b ? `${a} - ${b}` : a || b;
}

export default function JobPostings() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>("all");

  const filteredJobs = useMemo(
    () => (selectedTab === "all" ? jobs : jobs.filter((j) => j.status === selectedTab)),
    [selectedTab]
  );

  const getCount = (status: (typeof tabs)[number]) =>
    status === "all" ? jobs.length : jobs.filter((j) => j.status === status).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Job Postings ({getCount("all")})</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          onClick={() => router.push("/job/post-job")}
        >
          + Post New Job
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-full border text-sm font-medium ${
              selectedTab === tab ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab === "all" && `All Jobs (${getCount("all")})`}
            {tab === "active" && `Active (${getCount("active")})`}
            {tab === "draft" && `Draft (${getCount("draft")})`}
            {tab === "expired" && `Expired (${getCount("expired")})`}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No job postings found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 space-x-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      Posted: {job.posted}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Expires: {job.expires}
                    </span>
                  </div>
                  <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applications} applications
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {job.views} views
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-600"
                        : job.status === "expired"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex mt-4 space-x-2">
                <button
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100 flex items-center gap-1"
                  onClick={() => router.push(`/job/${job.slug}`)}
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100 flex items-center gap-1"
                  onClick={() => router.push(`/job/${job.slug}/edit-job`)}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
