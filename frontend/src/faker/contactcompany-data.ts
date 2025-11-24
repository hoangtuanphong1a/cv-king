export interface SocialLink {
    type: string;
    url: string;
}

export interface CompanyContactData {
    address: string;
    phone: string;
    email: string;
    website: string;
    social?: SocialLink[];
    tags?: string[];
    intro?: string; // Thêm intro
}

export const companyContactData: CompanyContactData[] = [
    {
        address: "Tầng 8, Tòa nhà Pearl Plaza, 561A Điện Biên Phủ, Quận 3, TP.HCM",
        phone: "028 7300 9999",
        email: "contact@fpt.com.vn",
        website: "https://fpt.com.vn",
        social: [
            {
                type: "facebook",
                url: "https://facebook.com/fptcorporation"
            },
            {
                type: "linkedin",
                url: "https://linkedin.com/company/fpt-corporation"
            },
            {
                type: "twitter",
                url: "https://twitter.com/fptcorporation"
            }
        ],
        tags: ["Công nghệ", "Phần mềm", "Digital Transformation", "AI/ML", "Cloud Computing"],
        intro: `
<h2 class="text-2xl font-bold mt-2 mb-3 scroll-mt-20">Về FPT Corporation</h2>
<p>
  FPT là tập đoàn công nghệ hàng đầu Việt Nam, thành lập năm 1988 với sứ mệnh đưa công nghệ đến mọi người, mọi nhà, mọi tổ chức.
  Hoạt động trong 3 lĩnh vực: <strong>Công nghệ</strong>, <strong>Viễn thông</strong>, <strong>Giáo dục</strong>.
</p>
<ul>
  <li>Đối tác: Microsoft, SAP, Oracle, IBM</li>
  <li>Hiện diện 40+ quốc gia</li>
  <li>30.000+ nhân sự</li>
</ul>
`
    },
    {
        address: "Lô E2-M3, Đường D1, Khu Công nghệ cao, Quận 9, TP.HCM",
        phone: "028 7300 8888",
        email: "hr@vng.com.vn",
        website: "https://vng.com.vn",
        social: [
            {
                type: "facebook",
                url: "https://facebook.com/vngcorp"
            },
            {
                type: "linkedin",
                url: "https://linkedin.com/company/vng-corporation"
            },
            {
                type: "github",
                url: "https://github.com/vng-corp"
            }
        ],
        tags: ["Game", "Fintech", "E-commerce", "Digital Payment", "Entertainment"],
        intro: `
<h2 class="text-2xl font-bold mt-2 mb-3 scroll-mt-20">Về VNG Corporation</h2>
<p>
  Thành lập 2004 (tiền thân VinaGame), phát triển từ công ty game thành tập đoàn công nghệ đa ngành.
</p>
<h3 class="text-xl font-semibold mt-6 mb-2">Lĩnh vực</h3>
<ul>
  <li>Game: ZingPlay, VNG Cloud</li>
  <li>Fintech: ZaloPay</li>
  <li>E-commerce: Tiki</li>
  <li>Digital Entertainment: Zing MP3, Zing TV</li>
  
</ul>
<p>Hơn 4.000 nhân sự, liên tục đổi mới cho hàng triệu người dùng.</p>
`
    },
    {
        address: "Tầng 4, Tòa nhà Viettel, 285 Cách Mạng Tháng 8, Quận 10, TP.HCM",
        phone: "028 7300 7777",
        email: "info@tiki.vn",
        website: "https://tiki.vn",
        social: [
            {
                type: "facebook",
                url: "https://facebook.com/tiki.vn"
            },
            {
                type: "linkedin",
                url: "https://linkedin.com/company/tiki-corporation"
            },
            {
                type: "twitter",
                url: "https://twitter.com/tiki_vn"
            }
        ],
        tags: ["E-commerce", "Retail", "Logistics", "Customer Service", "Digital Marketing"],
        intro: `
<h2 class="text-2xl font-bold mt-2 mb-3 scroll-mt-20">Về Tiki Corporation</h2>
<p>
  Nền tảng TMĐT hàng đầu Việt Nam (2010), mô hình <strong>B2C</strong>.
</p>
<ul>
  <li>Cam kết 100% hàng chính hãng</li>
  <li>10 triệu+ sản phẩm</li>
  <li>Giao nhanh, đáng tin cậy</li>
</ul>
<h3 class="text-xl font-semibold mt-6 mb-2">Hệ sinh thái</h3>
<ul>
  <li>TikiNOW (giao hàng 2 giờ)</li>
  <li>TikiPay (ví điện tử)</li>
</ul>
`
    },
    {
        address: "Tầng 5, Tòa nhà Saigon Trade Center, 37 Tôn Đức Thắng, Quận 1, TP.HCM",
        phone: "028 7300 6666",
        email: "careers@shopee.com",
        website: "https://shopee.vn",
        social: [
            {
                type: "facebook",
                url: "https://facebook.com/shopee.vn"
            },
            {
                type: "linkedin",
                url: "https://linkedin.com/company/shopee"
            },
            {
                type: "twitter",
                url: "https://twitter.com/Shopee_VN"
            }
        ],
        tags: ["E-commerce", "Marketplace", "Mobile App", "Digital Payment", "Logistics"],
        intro: `
<h2 class="text-2xl font-bold mt-2 mb-3 scroll-mt-20">Về Shopee Vietnam</h2>
<p>
  Nền tảng TMĐT (Sea Group), ra mắt 2015, dẫn đầu Việt Nam và khu vực.
</p>
<h3 class="text-xl font-semibold mt-6 mb-2">Mô hình</h3>
<ul>
  <li>C2C (Consumer to Consumer)</li>
  <li>B2C (Business to Consumer)</li>
  
</ul>
<p>2 triệu+ người bán, hàng chục triệu người mua. Shopee Live, Shopee Mall, ShopeePay...</p>
`
    },
    {
        address: "Tầng 6, Tòa nhà Diamond Plaza, 34 Lê Duẩn, Quận 1, TP.HCM",
        phone: "028 7300 5555",
        email: "hr@lazada.vn",
        website: "https://lazada.vn",
        social: [
            {
                type: "facebook",
                url: "https://facebook.com/lazada.vn"
            },
            {
                type: "linkedin",
                url: "https://linkedin.com/company/lazada"
            },
            {
                type: "twitter",
                url: "https://twitter.com/LazadaVN"
            }
        ],
        tags: ["E-commerce", "Retail", "Cross-border", "Digital Payment", "Customer Experience"],
        intro: `Lazada Vietnam là một phần của Lazada Group - nền tảng thương mại điện tử hàng đầu Đông Nam Á, thuộc sở hữu của Alibaba Group. Lazada được thành lập năm 2012 và đã phát triển mạnh mẽ tại Việt Nam.

Lazada nổi tiếng với mô hình B2C (Business to Consumer) chất lượng cao, tập trung vào việc kết nối các thương hiệu chính hãng với người tiêu dùng. Với hơn 100,000 người bán và hàng triệu sản phẩm đa dạng, Lazada đã trở thành điểm đến tin cậy cho việc mua sắm trực tuyến.

Lazada không chỉ là nền tảng mua sắm mà còn là hệ sinh thái thương mại điện tử toàn diện, bao gồm LazMall (trung tâm thương mại trực tuyến), Lazada Express (dịch vụ giao hàng), và nhiều dịch vụ tiện ích khác.`
    }
];

// Hàm helper để lấy dữ liệu theo index
export const getCompanyContactData = (index: number = 0): CompanyContactData => {
    return companyContactData[index] || companyContactData[0];
};

// Hàm helper để lấy tất cả dữ liệu
export const getAllCompanyContactData = (): CompanyContactData[] => {
    return companyContactData;
};

// Hàm helper để lấy tags theo index
export const getCompanyTags = (index: number = 0): string[] => {
    const data = getCompanyContactData(index);
    return data.tags || [];
};

// Hàm helper để lấy intro theo index
export const getCompanyIntro = (index: number = 0): string => {
    const data = getCompanyContactData(index);
    return data.intro || "";
};
