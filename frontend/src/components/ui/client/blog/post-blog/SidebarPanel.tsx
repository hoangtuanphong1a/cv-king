"use client";
import { CreateBlogPostFormData } from "@/api/BlogPosts/type";

interface Props {
  form: CreateBlogPostFormData;
  isValid: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  categories: { id: string; name: string }[];
  suggestedTags: { id: string; name: string }[];
}

export default function RightSidebarPanel({
  form,
  isValid,
  onSaveDraft,
  onPublish,
  categories,
  suggestedTags,
}: Props) {
  const getCategoryLabel = (id?: string) =>
    id ? categories.find((cat) => cat.id === id)?.name || "Danh mục không xác định" : "Chưa chọn danh mục";

  const getTagLabel = (id: string) => suggestedTags.find((t) => t.id === id)?.name;

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <aside className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem trước bài viết</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Tiêu đề:</strong>
            <span className="text-gray-600 flex-1">{form.title || "Chưa nhập tiêu đề"}</span>
          </div>

          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Slug:</strong>
            <span className="text-gray-600 flex-1">{form.slug || "Chưa có slug"}</span>
          </div>

          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Danh mục:</strong>
            <span className="text-gray-600 flex-1">{getCategoryLabel(form.categoryId)}</span>
          </div>

          {form.coverImageUrl && (
            <div className="flex items-start">
              <strong className="text-gray-700 w-28 font-medium">Ảnh bìa:</strong>
              <span className="text-gray-600 flex-1 truncate" title={form.coverImageUrl}>
                {form.coverImageUrl}
              </span>
            </div>
          )}

          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Thẻ:</strong>
            <div className="flex-1 flex flex-wrap gap-2">
              {form.tagIds?.length ? (
                form.tagIds.map((id) => (
                  <span key={id} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                    {getTagLabel(id)}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">Chưa chọn thẻ</span>
              )}
            </div>
          </div>

          {form.excerpt && (
            <div className="flex items-start">
              <strong className="text-gray-700 w-28 font-medium">Tóm tắt:</strong>
              <span className="text-gray-600 flex-1">{truncateText(form.excerpt)}</span>
            </div>
          )}

          {form.shortDescription && (
            <div className="flex items-start">
              <strong className="text-gray-700 w-28 font-medium">Mô tả ngắn:</strong>
              <span className="text-gray-600 flex-1">{truncateText(form.shortDescription)}</span>
            </div>
          )}

          {form.content && (
            <div className="flex items-start">
              <strong className="text-gray-700 w-28 font-medium">Nội dung:</strong>
              <span className="text-gray-600 flex-1">
                {form.content.length} ký tự
              </span>
            </div>
          )}

          <div className="flex items-start">
            <strong className="text-gray-700 w-28 font-medium">Trạng thái:</strong>
            <span className={`flex-1 ${form.isPublished ? "text-green-600" : "text-yellow-600"}`}>
              {form.isPublished ? "Công khai" : "Bản nháp"}
            </span>
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
          Đăng bài viết
        </button>
        {!isValid && <p className="text-xs text-red-500 text-center">Vui lòng kiểm tra lại form</p>}
      </div>
    </aside>
  );
}
