"use client";
import { FieldErrors } from "react-hook-form";
import { CreateBlogPostFormData } from "@/api/BlogPosts/type";

type Option = { id: string; name: string };

interface Props {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  errors: FieldErrors<CreateBlogPostFormData>;
  suggestedTags: Option[];
}

export default function TagsSection({
  tags,
  onTagsChange,
  errors,
  suggestedTags,
}: Props) {
  const addExistingTagById = (id: string) => {
    if (tags.includes(id)) return;
    onTagsChange([...tags, id]);
  };

  const removeTag = (id: string) =>
    onTagsChange(tags.filter((t) => t !== id));

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Thẻ bài viết</h2>

      <div>
        {errors.tagIds && (
          <p className="text-red-500 text-sm mb-2">{errors.tagIds.message}</p>
        )}

        {!!tags.length && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Thẻ đã chọn</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((id) => {
                const tag = suggestedTags.find((t) => t.id === id) || {
                  id,
                  name: id,
                };
                return (
                  <span
                    key={id}
                    className="px-3 py-1 text-sm bg-orange-100 border border-orange-200 rounded-full flex items-center"
                  >
                    {tag.name}
                    <button
                      className="ml-2 text-orange-600 hover:text-orange-800"
                      onClick={() => removeTag(id)}
                      type="button"
                      aria-label={`Xóa ${tag.name}`}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Chọn thẻ</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={`px-3 py-1 text-sm rounded-full border transition duration-200 ${
                  tags.includes(tag.id)
                    ? "bg-orange-200 text-orange-800 border-orange-300"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => addExistingTagById(tag.id)}
                disabled={tags.includes(tag.id)}
              >
                {tags.includes(tag.id) ? tag.name : `+ ${tag.name}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
