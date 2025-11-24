import SB from "@/assets/images/SB.png";
import {
  ChevronDown,
  Bookmark,
  Briefcase,
  UserCheck,
} from "lucide-react";

// Dữ liệu cho navItems
export const navItems = [
  {
    name: "Việc làm",
    href: "/job",
    icon: <ChevronDown />,
    menu: {
      menuLeft: {
        name: "Tìm việc làm",
        item: [
          {
            name: "Việc làm đã lưu",
            icon: <Bookmark size={16} />,
            href: "/viec-lam-da-luu",
          },
          {
            name: "Việc làm đang tuyển",
            icon: <Briefcase size={16} />,
            href: "/viec-lam-dang-tuyen",
          },
          {
            name: "Việc làm phù hợp",
            icon: <UserCheck size={16} />,
            href: "/viec-lam-phu-hop",
          },
        ],
      },
      menuRight: {
        name: "Tìm việc làm",
        item: [
          {
            name: "Việc làm đã lưu",
            icon: <Bookmark size={16} />,
            href: "/viec-lam-da-luu",
          },
          {
            name: "Việc làm đang tuyển",
            icon: <Briefcase size={16} />,
            href: "/viec-lam-dang-tuyen",
          },
          {
            name: "Việc làm phù hợp",
            icon: <UserCheck size={16} />,
            href: "/viec-lam-phu-hop",
          },
        ],
      },
    },
  },
  {
    name: "Tạo CV",
    href: "/taocv",
    icon: <ChevronDown />,
    menu: {
      menuLeft: {
        name: "Tìm việc làm",
        item: [
          {
            name: "Việc làm đã lưu",
            icon: <Bookmark size={16} />,
            href: "/viec-lam-da-luu",
          },
          {
            name: "Việc làm đang tuyển",
            icon: <Briefcase size={16} />,
            href: "/viec-lam-dang-tuyen",
          },
          {
            name: "Việc làm phù hợp",
            icon: <UserCheck size={16} />,
            href: "/viec-lam-phu-hop",
          },
        ],
      },
    },
  },
  {
    name: "Cẩm nang nghề nghiệp",
    href: "/camnang",
    icon: <ChevronDown />,
    menu: {
      menuLeft: {
        name: "Tìm việc làm",
        item: [
          {
            name: "Việc làm đã lưu",
            icon: <Bookmark size={16} />,
            href: "/viec-lam-da-luu",
          },
          {
            name: "Việc làm đang tuyển",
            icon: <Briefcase size={16} />,
            href: "/viec-lam-dang-tuyen",
          },
          {
            name: "Việc làm phù hợp",
            icon: <UserCheck size={16} />,
            href: "/viec-lam-phu-hop",
          },
        ],
      },
      menuRight: {
        name: "Tìm việc làm",
        item: [],
        postItem: [
          {
            title: "Tổng hợp 60 câu hỏi phỏng vấn kèm đáp án",
            description:
              "Các câu hỏi kèm đáp án thường xuất hiện trong các buổi phỏng vấn xin việc tại các công ty khởi nghiệp, công ty nước ngoài, tập đoàn lớn tại Việt Nam. Do vậy, hãy chuẩn bị thật kỹ để tạo ấn tượng tốt với nhà tuyển dụng nhé!",
            imageUrl: SB,
          },
          {
            title: "Khám phá mức lương khởi nghiệp 2025",
            description:
              "Kết quả nghiên cứu mới nhất cho thấy mức lương khởi nghiệp tại Việt Nam đang có sự thay đổi đáng kể. Hãy cùng tìm hiểu thêm để nắm bắt cơ hội nghề nghiệp nhé!",
            imageUrl: SB,
          },
        ],
      },
    },
  },
];

// Dữ liệu cho actionItems
export const actionItems = [
  {
    name: "Việc làm",
    href: "/job",
    icon: <ChevronDown />,
    subAction: {
      item: [
        {
          name: "Việc làm đã lưu",
          icon: <Bookmark size={16} />,
          href: "/viec-lam-da-luu",
        },
        {
          name: "Việc làm đã ứng tuyển",
          icon: <Briefcase size={16} />,
          href: "/viec-lam-dang-tuyen",
        },
      ],
    },
  },
  {
    name: "Quản lý CV & Cover letter",
    href: "/vieclam",
    icon: <ChevronDown />,
    subAction: {
      item: [
        {
          name: "CV của tôi",
          icon: <Bookmark size={16} />,
          href: "/viec-lam-da-luu",
        },
        {
          name: "Cover Letter của tôi",
          icon: <Briefcase size={16} />,
          href: "/viec-lam-dang-tuyen",
        },
      ],
    },
  },
  {
    name: "Cài đặt email & thông báo",
    href: "/vieclam",
    icon: <ChevronDown />,
    subAction: {
      item: [
        {
          name: "CV của tôi",
          icon: <Bookmark size={16} />,
          href: "/viec-lam-da-luu",
        },
        {
          name: "Cover Letter của tôi",
          icon: <Briefcase size={16} />,
          href: "/viec-lam-dang-tuyen",
        },
      ],
    },
  },
];