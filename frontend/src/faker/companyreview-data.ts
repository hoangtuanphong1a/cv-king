export interface CompanyReviewData {
    title: string;
    content: string;
    role: string;
    date: string;
    rating: number; // 0 - 5, supports .5
    helpfulCount: number;
}

export const companyReviews: CompanyReviewData[] = [
    {
        title: "Môi trường tốt, đồng nghiệp thân thiện",
        content: `
<h3 class="text-base font-semibold mb-1">Điểm nổi bật</h3>
<p>
  Văn hóa cởi mở, sẵn sàng hỗ trợ. Quy trình làm việc rõ ràng, cơ hội học hỏi nhiều.
</p>
<ul>
  <li>Onboarding nhanh, tài liệu đầy đủ</li>
  <li>Mentor nhiệt tình</li>
  <li>Code review kỹ, góp ý xây dựng</li>
</ul>
`,
        role: "Frontend Engineer",
        date: "Jan 05, 2025",
        rating: 4.5,
        helpfulCount: 23,
    },
    {
        title: "Phúc lợi ổn, lộ trình thăng tiến rõ",
        content: `
<h3 class="text-base font-semibold mb-1">Phúc lợi & Thăng tiến</h3>
<p>
  OKR minh bạch, review định kỳ. Có ngân sách đào tạo, hỗ trợ thi chứng chỉ.
</p>
<ul>
  <li>Khám sức khỏe định kỳ</li>
  <li>Laptop cấu hình tốt</li>
  <li>Hybrid 2-3 ngày/tuần</li>
</ul>
`,
        role: "Backend Developer",
        date: "Dec 20, 2024",
        rating: 4,
        helpfulCount: 18,
    },
    {
        title: "Áp lực deadline nhưng xứng đáng",
        content: `
<h3 class="text-base font-semibold mb-1">Áp lực & Ghi nhận</h3>
<p>
  Dự án nhiều, deadline gắt nhưng quản lý hỗ trợ tốt. Sau mỗi đợt có tổng kết rút kinh nghiệm.
</p>
<ul>
  <li>Quy trình incident rõ ràng</li>
  <li>Retro sau mỗi sprint</li>
  <li>Bonus theo hiệu quả</li>
</ul>
`,
        role: "Product Manager",
        date: "Nov 30, 2024",
        rating: 4,
        helpfulCount: 31,
    },
    {
        title: "Quy trình bài bản, công nghệ cập nhật",
        content: `
<h3 class="text-base font-semibold mb-1">Công nghệ & Quy trình</h3>
<p>
  Stack hiện đại (React/Next.js, NestJS, CI/CD). Tài liệu khá đầy đủ, code review kỹ.
</p>
<ul>
  <li>CI/CD tự động hóa</li>
  <li>Testing đầy đủ</li>
  <li>Design system thống nhất</li>
</ul>
`,
        role: "Fullstack Engineer",
        date: "Oct 12, 2024",
        rating: 4.5,
        helpfulCount: 27,
    },
    {
        title: "KingTech coi trọng con người",
        content: `
<h3 class="text-base font-semibold mb-1">Văn hóa & Con người</h3>
<p>
  Minh bạch, trao quyền, khuyến khích thử nghiệm. Sếp cởi mở, ghi nhận đóng góp rõ ràng.
</p>
<ul>
  <li>One-on-one định kỳ</li>
  <li>Culture of feedback</li>
  <li>Ghi nhận kịp thời</li>
</ul>
`,
        role: "QA Engineer",
        date: "Sep 02, 2024",
        rating: 5,
        helpfulCount: 40,
    },
];

export const getAllCompanyReviews = (): CompanyReviewData[] => companyReviews;

export const getCompanyReviewByIndex = (index: number = 0): CompanyReviewData =>
    companyReviews[index] || companyReviews[0];


