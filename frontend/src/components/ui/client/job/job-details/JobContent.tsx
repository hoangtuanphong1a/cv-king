import React, { memo } from "react";
import { CheckCircle } from "lucide-react";

interface JobContentProps {
  job: {
    description: string | null;
    requirements: string[];
    benefits: string[];
  };
}

/**
 * Component hiển thị mô tả, yêu cầu và quyền lợi của công việc.
 * Xử lý các trường nullable từ JobSchema.
 */
const JobContent = memo(function JobContent({ job }: JobContentProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Mô tả công việc</h2>
        <div className="prose prose-gray max-w-none">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {job.description || "Không có mô tả công việc."}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Yêu cầu công việc</h2>
        <ul className="space-y-3">
          {job.requirements.length > 0 ? (
            job.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-700">Không có yêu cầu cụ thể.</li>
          )}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Quyền lợi</h2>
        <ul className="space-y-3">
          {job.benefits.length > 0 ? (
            job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-700">Không có thông tin quyền lợi.</li>
          )}
        </ul>
      </div>
    </div>
  );
});

export default JobContent;
