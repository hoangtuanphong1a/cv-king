import React from "react";
import { DollarSign, MapPin } from "lucide-react";

interface RelatedJob {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  posted: string;
  urgent?: boolean;
}

interface RelatedJobsSidebarProps {
  relatedJobs: RelatedJob[];
  onJobClick: (id: string) => void;
  onViewMore: () => void;
}

export default function RelatedJobsSidebar({
  relatedJobs,
  onJobClick,
  onViewMore,
}: RelatedJobsSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Việc làm liên quan</h3>
      <div className="space-y-4">
        {relatedJobs.map((relatedJob) => (
          <div
            key={relatedJob.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-[#f26b38] cursor-pointer transition-colors group"
            onClick={() => onJobClick(relatedJob.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 group-hover:text-[#f26b38] transition-colors line-clamp-1">
                {relatedJob.title}
              </h4>
              {relatedJob.urgent && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex-shrink-0">
                  URGENT
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{relatedJob.company}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {relatedJob.salary}
              </span>
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {relatedJob.location}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Đăng {relatedJob.posted}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onViewMore}
        className="w-full border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] px-4 py-2 rounded-lg transition-colors mt-4"
      >
        Xem thêm việc làm
      </button>
    </div>
  );
}
