import React, { memo } from "react";
import { Globe, ExternalLink } from "lucide-react";

interface CompanyInfo {
  name: string;
  address: string | null;
  website: string | null;
  industry: string | null;
  companySize: string | null;
  specialties: string[];
}

interface CompanySidebarProps {
  companyInfo: CompanyInfo;
  onViewCompanyDetail: () => void;
}

/**
 * Component hiển thị thông tin công ty, sử dụng dữ liệu từ job.company trong JobSchema.
 */
const CompanySidebar = memo(function CompanySidebar({ companyInfo, onViewCompanyDetail }: CompanySidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Thông tin công ty</h3>
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-500">Tên công ty</span>
          <p className="font-medium text-gray-900">{companyInfo.name}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Địa chỉ</span>
          <p className="text-gray-700">{companyInfo.address || "Không xác định"}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Lĩnh vực</span>
          <p className="font-medium text-gray-900">{companyInfo.industry || "Không xác định"}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Quy mô</span>
          <p className="font-medium text-gray-900">{companyInfo.companySize || "Không xác định"}</p>
        </div>
        {companyInfo.website && (
          <div className="pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500 block mb-3">Thông tin liên hệ</span>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a
                  href={companyInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f26b38] hover:underline"
                >
                  Website
                </a>
              </div>
            </div>
          </div>
        )}
        <div>
          <span className="text-sm text-gray-500">Chuyên môn</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {companyInfo.specialties.length > 0 ? (
              companyInfo.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {specialty}
                </span>
              ))
            ) : (
              <span className="text-gray-700">Không có thông tin</span>
            )}
          </div>
        </div>
        <button
          onClick={onViewCompanyDetail}
          className="w-full border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          disabled
        >
          <ExternalLink className="h-4 w-4" />
          Xem thông tin chi tiết
        </button>
      </div>
    </div>
  );
});

export default CompanySidebar;
