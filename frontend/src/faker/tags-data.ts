// Faker data cho company tags
export interface TagData {
  id: string;
  name: string;
  category: string;
  color?: string; // Tailwind CSS class cho màu nền
}

// Dữ liệu tags cho các công ty (mỗi công ty có một mảng tags)
const companyTagsData: TagData[][] = [
  // Company 0 - KingTech / TechVision
  [
    {
      id: "tag-1",
      name: "Công nghệ",
      category: "Industry",
      color: "bg-blue-500",
    },
    {
      id: "tag-2",
      name: "Startup",
      category: "Type",
      color: "bg-purple-500",
    },
    {
      id: "tag-3",
      name: "Remote Friendly",
      category: "Work Style",
      color: "bg-green-500",
    },
    {
      id: "tag-4",
      name: "AI/ML",
      category: "Technology",
      color: "bg-indigo-500",
    },
    {
      id: "tag-5",
      name: "Cloud Computing",
      category: "Technology",
      color: "bg-cyan-500",
    },
  ],
  // Company 1 - Creative Studio
  [
    {
      id: "tag-6",
      name: "Design",
      category: "Industry",
      color: "bg-pink-500",
    },
    {
      id: "tag-7",
      name: "Creative",
      category: "Type",
      color: "bg-rose-500",
    },
    {
      id: "tag-8",
      name: "Award Winning",
      category: "Achievement",
      color: "bg-yellow-500",
    },
    {
      id: "tag-9",
      name: "UI/UX",
      category: "Technology",
      color: "bg-fuchsia-500",
    },
  ],
  // Company 2 - Growth Marketing
  [
    {
      id: "tag-10",
      name: "Marketing",
      category: "Industry",
      color: "bg-orange-500",
    },
    {
      id: "tag-11",
      name: "Digital",
      category: "Type",
      color: "bg-red-500",
    },
    {
      id: "tag-12",
      name: "Data Driven",
      category: "Approach",
      color: "bg-teal-500",
    },
    {
      id: "tag-13",
      name: "SEO/SEM",
      category: "Technology",
      color: "bg-amber-500",
    },
  ],
  // Company 3 - CloudScale
  [
    {
      id: "tag-14",
      name: "Cloud",
      category: "Industry",
      color: "bg-sky-500",
    },
    {
      id: "tag-15",
      name: "Infrastructure",
      category: "Type",
      color: "bg-blue-600",
    },
    {
      id: "tag-16",
      name: "Scalable",
      category: "Feature",
      color: "bg-emerald-500",
    },
    {
      id: "tag-17",
      name: "AWS/Azure",
      category: "Technology",
      color: "bg-violet-500",
    },
  ],
  // Company 4 - InnovateLabs
  [
    {
      id: "tag-18",
      name: "Innovation",
      category: "Type",
      color: "bg-purple-600",
    },
    {
      id: "tag-19",
      name: "Product Development",
      category: "Industry",
      color: "bg-indigo-600",
    },
    {
      id: "tag-20",
      name: "Agile",
      category: "Methodology",
      color: "bg-lime-500",
    },
    {
      id: "tag-21",
      name: "Fast Growing",
      category: "Status",
      color: "bg-green-600",
    },
  ],
  // Company 5 - Global Sales Partners
  [
    {
      id: "tag-22",
      name: "Sales",
      category: "Industry",
      color: "bg-orange-600",
    },
    {
      id: "tag-23",
      name: "B2B",
      category: "Type",
      color: "bg-red-600",
    },
    {
      id: "tag-24",
      name: "Global",
      category: "Scope",
      color: "bg-blue-700",
    },
    {
      id: "tag-25",
      name: "Partnership",
      category: "Model",
      color: "bg-amber-600",
    },
  ],
];

/**
 * Lấy tags của công ty theo index
 * @param index - Index của công ty (mặc định 0)
 * @returns Mảng TagData của công ty đó
 */
export const getCompanyTagsByIndex = (index: number = 0): TagData[] => {
  if (index < 0 || index >= companyTagsData.length) {
    // Nếu index không hợp lệ, trả về tags của công ty đầu tiên
    return companyTagsData[0] || [];
  }
  return companyTagsData[index] || [];
};

/**
 * Lấy tất cả tags của tất cả công ty
 * @returns Mảng 2 chiều chứa tất cả tags
 */
export const getAllCompanyTags = (): TagData[][] => {
  return companyTagsData;
};

/**
 * Lấy tags theo category
 * @param category - Category cần tìm
 * @returns Mảng TagData có category tương ứng
 */
export const getTagsByCategory = (category: string): TagData[] => {
  const allTags: TagData[] = companyTagsData.flat();
  return allTags.filter((tag) => tag.category.toLowerCase() === category.toLowerCase());
};

/**
 * Tìm kiếm tags theo tên
 * @param query - Từ khóa tìm kiếm
 * @returns Mảng TagData khớp với query
 */
export const searchTags = (query: string): TagData[] => {
  const allTags: TagData[] = companyTagsData.flat();
  const lowercaseQuery = query.toLowerCase();
  return allTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(lowercaseQuery) ||
      tag.category.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Lấy tag theo ID
 * @param id - ID của tag
 * @returns TagData hoặc null nếu không tìm thấy
 */
export const getTagById = (id: string): TagData | null => {
  const allTags: TagData[] = companyTagsData.flat();
  return allTags.find((tag) => tag.id === id) || null;
};

