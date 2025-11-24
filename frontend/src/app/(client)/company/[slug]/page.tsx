import React from "react";
import info from "@/assets/images/company1.png";
import CompanyBanner from "@/components/ui/client/company/companyBanner";
import CompanyInfoCard from "@/components/ui/client/company/companyInfoCard";
import CompanyTabs from "@/components/ui/client/company/CompanyTabs";
import BreadcrumbTabActive from "@/components/ui/common/breadcrumb/BreadcrumbTabActive";

const CompanyDetailPage = () => {
    return (
        <>
            <BreadcrumbTabActive
                items={[
                    { name: "Danh sách công ty", link: 'danh-sach-cong-ty' },
                    { name: "Công ty MSB", link: 'cong-ty-msb' },
                ]}
            />
            <div className="relative">
                <CompanyBanner />
                <div className="absolute bottom-[-55%] left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-2 md:px-6">
                    <CompanyInfoCard
                        logo={info}
                        name="Ngân hàng TMCP Hàng Hải Việt Nam (MSB)"
                        industry="Banking"
                        location="Ho Chi Minh City"
                        employees="5000+ employees"
                        founded="Founded 1991"
                        website="https://jobs.msb.com.vn/"
                        rating={4.8}
                        reviews={125}
                        openPositions={15}
                        followers={590}
                    />
                </div>
            </div>
            <div className="h-[150px]"></div>
            <div className="mt-6">
                <CompanyTabs />
            </div>
            {/* <div className="max-w-6xl mx-auto px-2 md:px-6 mt-20 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2 flex flex-col gap-4">
                    <CompanyTags companyIndex={0} />
                    <CompanyIntro companyIndex={0} />
                </div>
                <div className="flex flex-col gap-4">
                    <CompanyJobs></CompanyJobs>
                </div>
            </div> */}
        </>
    );
};

export default CompanyDetailPage; 