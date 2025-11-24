import { CompanyIntroData } from "@/components/ui/client/company/companyIntro";

// Hàm parseHtml để render HTML content
export const parseHtml = (html: string) => {
    return { __html: html };
};

export const companyIntroData: CompanyIntroData[] = [
    {
        id: "kingtech",
        companyName: "KingTech",
        foundedYear: 2015,
        employeeCount: "200 - 500",
        headquarters: "Hà Nội, Việt Nam",
        industry: "Công nghệ thông tin",
        website: "https://kingtech.example.com",
        intro: `
            <!-- Nội dung intro dạng HTML (dùng cho dangerouslySetInnerHTML) -->
            <h2 id="gioi-thieu" class="text-2xl font-bold mt-2 mb-3 scroll-mt-20">
              Về KingTech
            </h2>
            <p>
              KingTech là doanh nghiệp công nghệ tập trung phát triển các nền tảng chuyển đổi số
              cho doanh nghiệp vừa và nhỏ. Chúng tôi hướng đến sản phẩm đơn giản, dễ dùng, đáp ứng
              chuẩn bảo mật và khả năng mở rộng.
            </p>

            <h3 id="tam-nhin" class="text-xl font-semibold mt-6 mb-2 scroll-mt-20">
              Tầm nhìn & Sứ mệnh
            </h3>
            <ul>
              <li>Đưa công nghệ đến gần hơn với mọi doanh nghiệp.</li>
              <li>Tạo môi trường làm việc lấy con người làm trung tâm.</li>
              <li>Phát triển bền vững cùng cộng đồng.</li>
            </ul>

            <h3 id="san-pham" class="text-xl font-semibold mt-6 mb-2 scroll-mt-20">
              Sản phẩm chủ lực
            </h3>
            <p>
              Bộ giải pháp ERP Cloud, hệ thống CRM đa kênh và nền tảng phân tích dữ liệu thời gian thực,
              giúp doanh nghiệp tối ưu quy trình và ra quyết định nhanh chóng.
            </p>

            <div class="my-4 text-center">
              <button class="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition">
                Khám phá sản phẩm
              </button>
            </div>

            <h3 id="van-hoa" class="text-xl font-semibold mt-6 mb-2 scroll-mt-20">
              Văn hóa & Môi trường làm việc
            </h3>
            <p>
              Chúng tôi coi trọng sự minh bạch, tinh thần học hỏi không ngừng và trao quyền cho nhân viên.
              KingTech khuyến khích thử nghiệm, sáng tạo và ghi nhận đóng góp dựa trên hiệu quả.
            </p>
        `,
        highlights: [
            "Sản phẩm phục vụ 1M+ người dùng",
            "Văn hóa học hỏi và phát triển",
            "Lộ trình thăng tiến rõ ràng",
            "Chế độ phúc lợi cạnh tranh"
        ]
    },
    
];

// Hàm helper để lấy dữ liệu theo id
export const getCompanyIntroById = (id: string): CompanyIntroData | null => {
    return companyIntroData.find(company => company.id === id) || null;
};

// Hàm helper để lấy dữ liệu theo index
export const getCompanyIntroByIndex = (index: number = 0): CompanyIntroData => {
    return companyIntroData[index] || companyIntroData[0];
};

// Hàm helper để lấy tất cả dữ liệu
export const getAllCompanyIntros = (): CompanyIntroData[] => {
    return companyIntroData;
};

// Hàm helper để lấy intro text theo index
export const getCompanyIntroText = (index: number = 0): string => {
    const data = getCompanyIntroByIndex(index);
    return data.intro || "";
};

// Hàm helper để lấy highlights theo index
export const getCompanyHighlights = (index: number = 0): string[] => {
    const data = getCompanyIntroByIndex(index);
    return data.highlights || [];
};

// Hàm helper để tìm kiếm công ty theo tên
export const searchCompanyIntro = (query: string): CompanyIntroData[] => {
    const lowercaseQuery = query.toLowerCase();
    return companyIntroData.filter(company =>
        company.companyName.toLowerCase().includes(lowercaseQuery) ||
        (company.industry?.toLowerCase().includes(lowercaseQuery) || false) ||
        company.intro.toLowerCase().includes(lowercaseQuery)
    );
};

// Hàm helper để lấy công ty theo industry
export const getCompaniesByIndustry = (industry: string): CompanyIntroData[] => {
    return companyIntroData.filter(company =>
        company.industry?.toLowerCase() === industry.toLowerCase()
    );
}; 