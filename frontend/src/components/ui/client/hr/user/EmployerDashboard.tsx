"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import {
  ArrowLeft,
  Menu,
  Briefcase,
  Building2,
  Settings,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "@/components/AppContext";
import Setting from "./Setting";
import CompanyProfile from "./CompanyProfile";
import JobPostings from "./JobPostings";
import CandidateManagement from "./CandidateManagement";
import SavedCandidates from "./SavedCandidates";
import Overview from "./Overview";
import EditCompanyProfile from "@/app/(client)/hr/[slug]/edit-companyprofile/page";

const EmployerDashboard = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<
    "overview" | "company" | "jobs" | "candidates" | "saved" | "settings"
  >("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  const navigationItems = [
    { id: "overview", label: "Tổng quan", icon: TrendingUp },
    { id: "company", label: "Hồ sơ công ty", icon: Building2 },
    { id: "jobs", label: "Tin tuyển dụng", icon: Briefcase },
    { id: "candidates", label: "Quản lý ứng viên", icon: Users },
    { id: "saved", label: "Ứng viên đã lưu", icon: Star },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "company":
        return isEditingCompany ? (
          <EditCompanyProfile />
        ) : (
          <CompanyProfile onEdit={() => setIsEditingCompany(true)} />
        );
      case "jobs":
        return <JobPostings />;
      case "candidates":
        return <CandidateManagement />;
      case "saved":
        return <SavedCandidates />;
      case "settings":
        return <Setting />;
      default:
        return <div>page not found</div>;
    }
  };

  return (
    // Toàn trang cao = chiều cao màn hình, khóa scroll ngoài
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Wrapper tương đối để overlay hoạt động mà không cần fixed */}
      <div className="relative h-full flex">
        {/* Overlay mobile (chỉ hiện khi mở sidebar trên mobile) */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar: NẰM TRONG MAIN, không dùng fixed; không cuộn */}
        <aside
          className={[
            "relative lg:static z-20 w-64 h-full bg-white shadow-lg px-[5px]",
            "transform transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "lg:translate-x-0 flex-shrink-0",
          ].join(" ")}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <Button
                variant="text"
                size="small"
                onClick={() => navigateTo("home")}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2>Employer Dashboard</h2>
            </div>
          </div>

          <nav className="mt-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={[
                    "w-full flex items-center px-6 py-3 text-left transition-colors border-r-2",
                    isActive
                      ? "bg-orange-50 text-primary border-primary"
                      : "text-gray-700 hover:bg-gray-100 border-transparent",
                  ].join(" ")}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content: chiếm phần còn lại, tự cuộn */}
        <main className="flex-1 h-full overflow-auto">
          {/* Header mobile */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-30">
            <Button
              variant="text"
              size="small"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1>Dashboard</h1>
            <Button
              variant="text"
              size="small"
              onClick={() => navigateTo("home")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>

          {/* Nội dung */}
          <div className="px-[45px] py-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
