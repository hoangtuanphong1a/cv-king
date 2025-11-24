"use client";
import { Button } from "@/lib/button";
import { Card , CardContent } from "../../common/card/card";
import { Badge } from "@mui/material";
import { MapPin , Users , Star} from "lucide-react";
import { AppProvider, useApp } from "@/components/AppContext";
import Image from "next/image";
import company from "@/assets/images/employee.png";
const CompaniesSection = () => {
    const {navigateTo} = useApp(); 

 

  const companies = [
     {
  id: 1,
  name: 'TechCorp Innovation',
  logo: company,
  industry: 'Technology1',
  location: 'Ho Chi Minh City',
  employees: '500-1000',
  rating: 4.8,
  openJobs: 15,
  description: 'Công ty công nghệ hàng đầu chuyên về giải pháp AI và máy học.',
  founded: '2015',
  website: 'www.techcorp-innovation.com',
  benefits: ['Bảo hiểm y tế', 'Giờ làm việc linh hoạt', 'Làm việc từ xa', 'Ngân sách học tập'],
  culture: 'Văn hóa đổi mới, tập trung vào công nghệ tiên tiến và phát triển nghề nghiệp.'
},
{
  id: 2,
  name: 'StartupVN',
  logo: company,
  industry: 'Fintech',
  location: 'Hanoi',
  employees: '100-500',
  rating: 4.6,
  openJobs: 8,
  description: 'Startup fintech mang tính cách mạng, thay đổi thanh toán số tại Việt Nam.',
  founded: '2018',
  website: 'www.startupvn.com',
  benefits: ['Cổ phần', 'Bữa trưa miễn phí', 'Thẻ thành viên phòng gym', 'Sự kiện nhóm'],
  culture: 'Môi trường startup năng động, cơ hội phát triển sự nghiệp nhanh chóng.'
},
{
  id: 3,
  name: 'DesignStudio Pro',
  logo: company,
  industry: 'Design & Creative',
  location: 'Da Nang',
  employees: '50-100',
  rating: 4.9,
  openJobs: 5,
  description: 'Công ty thiết kế đạt nhiều giải thưởng, tạo ra trải nghiệm số xuất sắc.',
  founded: '2012',
  website: 'www.designstudio-pro.com',
  benefits: ['Tự do sáng tạo', 'Công cụ thiết kế', 'Ngân sách hội thảo', 'Lịch làm việc linh hoạt'],
  culture: 'Môi trường sáng tạo, hợp tác, đề cao sự xuất sắc trong thiết kế.'
},
{
  id: 4,
  name: 'CloudTech Solutions',
  logo: company,
  industry: 'Cloud Computing',
  location: 'Remote',
  employees: '200-500',
  rating: 4.7,
  openJobs: 12,
  description: 'Chuyên gia hạ tầng đám mây giúp doanh nghiệp mở rộng toàn cầu.',
  founded: '2016',
  website: 'www.cloudtech-solutions.com',
  benefits: ['100% làm từ xa', 'Cung cấp thiết bị', 'Đội ngũ toàn cầu', 'Mức lương cạnh tranh'],
  culture: 'Văn hóa làm việc từ xa, đề cao cân bằng công việc-cuộc sống và hợp tác toàn cầu.'
},
{
  id: 5,
  name: 'GrowthCo Marketing',
  logo: company,
  industry: 'Marketing',
  location: 'Ho Chi Minh City',
  employees: '100-200',
  rating: 4.5,
  openJobs: 7,
  description: 'Công ty marketing dựa trên dữ liệu, thúc đẩy tăng trưởng thương hiệu tại châu Á.',
  founded: '2017',
  website: 'www.growthco-marketing.com',
  benefits: ['Thưởng hiệu suất', 'Công cụ marketing', 'Tiếp xúc khách hàng', 'Phát triển sự nghiệp'],
  culture: 'Văn hóa định hướng kết quả, tập trung vào chiến lược marketing dựa trên dữ liệu.'
},
{
  id: 6,
  name: 'DataFlow Analytics',
  logo: company,
  industry: 'Data Science',
  location: 'Can Tho',
  employees: '50-100',
  rating: 4.8,
  openJobs: 9,
  description: 'Nền tảng phân tích nâng cao hỗ trợ ra quyết định dựa trên dữ liệu.',
  founded: '2019',
  website: 'www.dataflow-analytics.com',
  benefits: ['Công cụ khoa học dữ liệu', 'Thời gian nghiên cứu', 'Tham dự hội thảo', 'Dự án sáng tạo'],
  culture: 'Môi trường nghiên cứu, khuyến khích đổi mới và học hỏi liên tục.'
}];

 const handleCompanyClick = (company: any) => {
    navigateTo('company-detail', { company });
  };

  const handleViewJobs = (e: React.MouseEvent, company: any) => {
    e.stopPropagation();
    navigateTo('jobs', { 
      search: company.name,
      filters: { company: company.name }
    });
  };

  return (
   <section className="py-16 bg-gray-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl mb-4 text-gray-900">Top Companies</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
            Join innovative companies that are shaping the future of work
          </p>
        </div>

        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ml-4 mr-4  ">
          {companies.map((company) => (
            <Card 
              key={company.id} 
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer"
              onClick={() => handleCompanyClick(company)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Image
                                        width={30}
                                        height={30}
                    src={company.logo}
                    alt={company.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {company.name}
                  </h3>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                    {company.industry}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {company.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {company.rating}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {company.employees} employees
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {company.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-600">
                    {company.openJobs} open positions
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50"
                    onClick={(e) => handleViewJobs(e, company)}
                  >
                    View Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
            onClick={() => navigateTo('companies')}
          >
            Explore All Companies
          </Button>
        </div>
      </div>
    </section>
  );};

export default CompaniesSection;
