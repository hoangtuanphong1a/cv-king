import React from "react";
import SearchSection from "@/components/ui/client/home/SearchSection";
import JobsSection from "@/components/ui/client/home/JobsSection";
import CompaniesSection from "@/components/ui/client/home/CompaniesSection";


const HomePage = () => {
  return (
    <>
      <div className="w-[1520px] mx-auto">
        <SearchSection />
        <JobsSection />
        <CompaniesSection />

</div>
    </>
  );
};

export default HomePage;
