"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import employee from "@/assets/images/employee.png";
import { Bookmark, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "../../common/button/button";
import { Card, CardContent } from "../../common/card/card";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Thêm để tối ưu SEO
import { Badge } from "@mui/material";
import { StaticImageData } from "next/image";

// Định nghĩa giao diện Job
interface Job {
  id: number;
  title: string;
  company: string;
  logo: string | StaticImageData;
  location: string;
  salary: string;
  type: string | null | undefined;
  posted: string;
  tags: string[] | null | undefined;
  featured: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
}

const JobsSection = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Giả lập fetch dữ liệu từ API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Giả lập dữ liệu (thay bằng API call thực tế)
        const mockJobs: Job[] = [
          {
            id: 1,
            title: "Chuyên viên Backend Python",
            company: "Công ty DevPro1",
            logo: employee,
            location: "Hà Nội",
            salary: "40.000.000 - 60.000.000 VND",
            type: "Toàn thời gian",
            posted: "1 ngày trước",
            tags: ["Python", "Django", "API"],
            featured: true,
            description: "Tuyển dụng chuyên viên Backend để phát triển hệ thống quản lý doanh nghiệp...",
            requirements: ["3+ năm kinh nghiệm Python", "Thành thạo Django", "Kinh nghiệm với REST API"],
            benefits: ["Lương cạnh tranh", "Bảo hiểm y tế", "Hỗ trợ đào tạo"],
          },
          {
            id: 2,
            title: "Nhân viên Thiết kế UI/UX",
            company: "CreativeHub",
            logo: employee,
            location: "Thành phố Hồ Chí Minh",
            salary: "30.000.000 - 50.000.000 VND",
            type: "Làm việc từ xa",
            posted: "3 ngày trước",
            tags: ["Figma", "Adobe XD", "UI/UX"],
            featured: false,
            description: "Cần tuyển nhân viên thiết kế giao diện người dùng cho các dự án ứng dụng di động...",
            requirements: ["2+ năm kinh nghiệm thiết kế", "Thành thạo Figma", "Hiểu biết UX research"],
            benefits: ["Lương linh hoạt", "Hỗ trợ thiết bị", "Thưởng dự án"],
          },
          {
            id: 3,
            title: "Kỹ sư DevOps",
            company: "CloudMaster",
            logo: employee,
            location: "Đà Nẵng",
            salary: "50.000.000 - 70.000.000 VND",
            type: "Toàn thời gian",
            posted: "5 ngày trước",
            tags: ["AWS", "Docker", "CI/CD"],
            featured: true,
            description: "Tuyển dụng kỹ sư DevOps để quản lý hạ tầng và triển khai tự động...",
            requirements: ["3+ năm kinh nghiệm DevOps", "Thành thạo AWS", "Kinh nghiệm với Docker"],
            benefits: ["Lương cao", "Bảo hiểm y tế", "Làm việc từ xa"],
          },
          {
            id: 4,
            title: "Nhân viên Marketing Số",
            company: "DigitalWave",
            logo: employee,
            location: "Cần Thơ",
            salary: "25.000.000 - 40.000.000 VND",
            type: "Bán thời gian",
            posted: "2 ngày trước",
            tags: ["SEO", "Google Ads", "Content"],
            featured: false,
            description: "Tuyển nhân viên marketing số để quản lý chiến dịch quảng cáo trực tuyến...",
            requirements: ["2+ năm kinh nghiệm marketing", "Thành thạo SEO", "Kỹ năng sáng tạo nội dung"],
            benefits: ["Thưởng hiệu suất", "Hỗ trợ chi phí", "Đào tạo chuyên môn"],
          },
          {
            id: 5,
            title: "Chuyên viên Phân tích Dữ liệu",
            company: "DataInsight",
            logo: employee,
            location: "Hải Phòng",
            salary: "45.000.000 - 65.000.000 VND",
            type: "Toàn thời gian",
            posted: "4 ngày trước",
            tags: ["SQL", "Python", "Data Analysis"],
            featured: true,
            description: "Cần tuyển chuyên viên phân tích dữ liệu để hỗ trợ ra quyết định kinh doanh...",
            requirements: ["3+ năm kinh nghiệm phân tích", "Thành thạo SQL", "Kinh nghiệm với Python"],
            benefits: ["Lương cạnh tranh", "Bảo hiểm y tế", "Hỗ trợ nghiên cứu"],
          },
          {
            id: 6,
            title: "Lập trình viên Mobile",
            company: "MobileTech",
            logo: employee,
            location: "Huế",
            salary: "35.000.000 - 55.000.000 VND",
            type: "Làm việc từ xa",
            posted: "6 ngày trước",
            tags: ["Flutter", "Dart", "Android"],
            featured: false,
            description: "Tuyển dụng lập trình viên mobile để phát triển ứng dụng cho iOS và Android...",
            requirements: ["2+ năm kinh nghiệm với Flutter", "Thành thạo Dart", "Hiểu biết về Android"],
            benefits: ["Lương linh hoạt", "Hỗ trợ thiết bị", "Thưởng dự án"],
          },
        ];
        setJobs(mockJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job: Job) => {
    router.push(`/jobs-detail?job=${encodeURIComponent(JSON.stringify(job))}`);
  };

  const handleApplyClick = (e?: React.MouseEvent<HTMLButtonElement>, job?: Job) => {
    e?.stopPropagation();
    if (job) {
      router.push(`/jobs-detail?job=${encodeURIComponent(JSON.stringify(job))}`);
    }
  };

  const handleSaveJob = (e?: React.MouseEvent<HTMLButtonElement>, job?: Job) => {
    e?.stopPropagation();
    if (job) {
      alert(`Job "${job.title}" saved to your list!`);
    }
  };

  if (loading) {
    return <div className="text-center py-16">Đang tải công việc...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-900">Featured Jobs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked job opportunities from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="group hover:shadow-background transition-all duration-300 border-gray-100 shadow-md cursor-pointer"
              onClick={() => handleJobClick(job)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      width={50}
                      height={40}
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-400 hover:text-orange-600"
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => handleSaveJob(e, job)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 ml-3.5">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.posted}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags?.map((tag) => (
                    <Badge key={tag} variant="standard" className="text-xs bg-orange-100 text-orange-700">
                      {tag}
                    </Badge>
                  )) ?? null}
                </div>

                <div className="flex items-center max-w-full justify-between">
                  <Badge
                    variant="standard"
                    className={job.type === "Toàn thời gian" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                  >
                    {job.type ?? "Chưa xác định"}
                  </Badge>
                  <Button
                    size="sm"
                    className="text-white group-hover:bg-orange-600 transition-colors"
                    style={{ backgroundColor: "#f26b38" }}
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => handleApplyClick(e, job)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/job" passHref>
            <Button
              variant="outline"
              size="lg"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
