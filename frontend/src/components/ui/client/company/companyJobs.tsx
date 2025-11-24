"use client";
import React from "react";
import { jobs } from "@/faker/jobscompany-data";
import { Briefcase, CalendarDays, Clock8, MapPin } from "lucide-react";

const CompanyJobs: React.FC = () => {
    const getPostedText = (id: string): string => {
        const days = (parseInt(id, 10) % 7) + 1; // 1-7 days for demo
        return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="flex flex-col gap-4">
            {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-4"
                    >
                        <div className="grid grid-cols-12 items-center gap-4">
                            {/* Title + Location */}
                            <div className="col-span-12 md:col-span-5">
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold text-[16px] text-gray-900">{job.title}</div>
                                    {job.id === '2' && (
                                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                                            URGENT
                                        </span>
                                    )}
                                </div>
                                <div className="mt-1 text-[13px] text-gray-600 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>

                            {/* Salary */}
                            <div className="col-span-6 md:col-span-2 text-[14px] text-gray-800">
                                {job.salary}
                            </div>

                            {/* Type */}
                            <div className="col-span-6 md:col-span-2 text-[14px] text-gray-800">
                                {job.type}
                            </div>

                            {/* Posted time */}
                            <div className="col-span-6 md:col-span-2 text-[13px] text-gray-500">
                                {getPostedText(job.id)}
                            </div>

                            {/* Apply button */}
                            <div className="col-span-6 md:col-span-1 flex md:justify-end">
                                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 text-[13px] font-semibold">
                                    Đăng ký ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-400 col-span-full text-center">Chưa có việc làm nào</div>
            )}
        </div>
    );
};

export default CompanyJobs;
