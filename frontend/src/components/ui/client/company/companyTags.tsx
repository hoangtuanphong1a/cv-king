import { Tag } from "lucide-react";
import React from "react";
import { getCompanyTagsByIndex, TagData } from "@/faker/tags-data";

interface CompanyTagsProps {
    companyIndex?: number;
}

const CompanyTags: React.FC<CompanyTagsProps> = ({ companyIndex = 0 }) => {
    // Lấy dữ liệu tags từ faker
    const tags: TagData[] = getCompanyTagsByIndex(companyIndex);

    return (
        <div className="bg-orange-50 rounded-2xl shadow p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-orange-400"><Tag /></span>
                <span className="font-semibold text-lg text-gray-800">Tags</span>
            </div>
            <hr className="border-t border-gray-400 mb-3" />
            <div className="flex flex-wrap gap-3">
                {tags.map((tag, idx) => (
                    <span
                        key={tag.id}
                        className={`${tag.color || 'bg-orange-500'} text-white px-5 py-2 rounded-full text-base font-medium shadow-sm hover:shadow-md transition-shadow duration-200`}
                        title={`${tag.name} - ${tag.category}`}
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CompanyTags;
