/* eslint-disable @next/next/no-img-element */
"use client";
import React, { memo, useState, useCallback } from "react";
import { MapPin, DollarSign, Clock, Bookmark, Share2, Building2, Calendar, Send, Eye } from "lucide-react";
import { Button } from "@mui/material";

interface JobHeaderProps {
  job: {
    id: string;
    title: string;
    company: string;
    logo?: string;
    location: string;
    salary: string;
    posted: string;
    deadline: string;
    tags: string[];
    views: number;
  };
  onApply: () => void;
  onViewCompany: () => void;
}

/**
 * Component hiển thị tiêu đề và thông tin cơ bản của công việc.
 * Sử dụng dữ liệu từ JobSchema, bao gồm thông tin công ty từ job.company.
 */
const JobHeader = memo(function JobHeader({ job, onApply, onViewCompany }: JobHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Xử lý chia sẻ công việc
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} - ${job.company}`,
        text: `Tìm hiểu về vị trí ${job.title} tại ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [job.title, job.company]);

  // Xử lý lỗi tải logo
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="96" height="96" rx="12" fill="#f26b38"/>
        <path d="M48 24C54.6274 24 60 29.3726 60 36V60C60 66.6274 54.6274 72 48 72C41.3726 72 36 66.6274 36 60V36C36 29.3726 41.3726 24 48 24ZM48 30C44.6863 30 42 32.6863 42 36V60C42 63.3137 44.6863 66 48 66C51.3137 66 54 63.3137 54 60V36C54 32.6863 51.3137 30 48 30Z" fill="white"/>
      </svg>
    `)}`;
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          {job.logo && (
            <div className="flex-shrink-0">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover"
                onError={handleImageError}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-2 flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-gray-400" />
              {job.company}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {job.views} lượt xem
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? "text-[#f26b38] border-[#f26b38] bg-orange-50"
                : "text-gray-400 border-gray-300 hover:text-[#f26b38] hover:border-[#f26b38]"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
          <Button
            onClick={handleShare}
            className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:text-[#f26b38] hover:border-[#f26b38] transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span>Đăng {job.posted}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span>Hạn: {job.deadline}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-orange-50 text-[#f26b38] text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onApply}
          className="flex-1 sm:flex-none bg-[#f26b38] hover:bg-[#e55a2b] text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          Ứng tuyển ngay
        </button>
        <button
          onClick={onViewCompany}
          className="flex-1 sm:flex-none border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          disabled
        >
          <Building2 className="h-4 w-4" />
          Xem công ty
        </button>
      </div>
    </div>
  );
});

export default JobHeader;
