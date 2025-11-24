"use client";
import { CreateJobFormData } from "@/api/Job/type";

interface Props {
  form: CreateJobFormData;
  isValid: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  companies: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  suggestedSkills: { id: string; name: string }[];
  suggestedTags: { id: string; name: string }[];
}

export default function RightSidebarPanel({ form, isValid, onSaveDraft, onPublish, companies, categories, suggestedSkills, suggestedTags }: Props) {
  // Maps skill ID to its name for UI display (returns name, not id)
  const getSkillLabel = (id: string) => suggestedSkills.find((s) => s.id === id)?.name;

  // Maps tag ID to its name for UI display (returns name, not id)
  const getTagLabel = (id: string) => suggestedTags.find((t) => t.id === id)?.name ;

  const getCompanyLabel = (id?: string) =>
    id ? companies.find((comp) => comp.id === id)?.name || "Công ty không xác định" : "Chưa chọn công ty";

  const getCategoryLabel = (id?: string) =>
    id ? categories.find((cat) => cat.id === id)?.name || "Danh mục không xác định" : "Chưa chọn danh mục";

  const getJobTypeLabel = (type?: string) => type || "Chưa chọn loại công việc";

  const formatSalary = () => {
    if (!form.SalaryMin && !form.SalaryMax) return "Chưa nhập mức lương";
    return `${form.SalaryMin?.toLocaleString() || "0"} - ${form.SalaryMax?.toLocaleString() || "0"} ${form.Currency || "USD"} / tháng`;
  };

  return (
    <aside className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem trước</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Người đăng:</strong>
            <span className="text-gray-600 flex-1">{form.PostedByUserId || "Chưa có ID người đăng"}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Chức danh:</strong>
            <span className="text-gray-600 flex-1">{form.Title || "Chưa nhập chức danh"}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Công ty:</strong>
            <span className="text-gray-600 flex-1">{getCompanyLabel(form.CompanyId)}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Địa điểm:</strong>
            <span className="text-gray-600 flex-1">{form.Location || "Chưa nhập địa điểm"}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Loại:</strong>
            <span className="text-gray-600 flex-1">{getJobTypeLabel(form.JobType)}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Danh mục:</strong>
            <span className="text-gray-600 flex-1">{getCategoryLabel(form.CategoryId)}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Mức lương:</strong>
            <span className="text-gray-600 flex-1">{formatSalary()}</span>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Kỹ năng:</strong>
            <div className="flex-1 flex flex-wrap gap-2">
              {form.skillIds?.length ? (
                form.skillIds.map((id) => (
                  <span key={id} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                    {getSkillLabel(id)} {/* Displays name, e.g., "React", not id */}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">Chưa chọn kỹ năng</span>
              )}
            </div>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Thẻ:</strong>
            <div className="flex-1 flex flex-wrap gap-2">
              {form.tagIds?.length ? (
                form.tagIds.map((id) => (
                  <span key={id} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                    {getTagLabel(id)} {/* Displays name, e.g., "Frontend", not id */}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">Chưa chọn thẻ</span>
              )}
            </div>
          </div>
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Tóm tắt:</strong>
            <span className="text-gray-600 flex-1">{form.ShortDescription || "Chưa nhập tóm tắt"}</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={onSaveDraft}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition duration-200 text-sm font-medium shadow-sm"
        >
          Lưu bản nháp
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={!isValid}
          className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 text-sm font-medium shadow-sm"
        >
          Đăng tuyển
        </button>
        {!isValid && <p className="text-xs text-red-500 text-center">Vui lòng kiểm tra lại form</p>}
      </div>
    </aside>
  );
}
