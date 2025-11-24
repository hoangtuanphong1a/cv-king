import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Thể Loại</h4>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left text-sm px-3 py-2 rounded-md transition ${
              selectedCategory === category
                ? "bg-orange-50 text-orange-700"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            {category === "all" ? "TẤT CẢ CÁC THỂ LOẠI" : category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
