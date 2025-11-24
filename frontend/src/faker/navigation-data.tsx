import { Newspaper, User2 } from "lucide-react";

// Dữ liệu cho navItems
export const NAVIGATION = [
  {
    title: "Quản lý người dùng",
    icon: <User2 size={20} />,
    items: [{ name: "Thống kê người dùng", path: "/admin/user/statistics" }],
  },
  {
    title: "Quản lý cẩm nang nghề nghiệp",
    icon: <Newspaper size={20} />,
    items: [
      { name: "Bài viết", path: "/admin/posts" },
      { name: "Danh mục", path: "/admin/posts" },
    ],
  },
];
