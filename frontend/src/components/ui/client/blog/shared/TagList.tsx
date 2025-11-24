import React from "react";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Thẻ phổ biến</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
