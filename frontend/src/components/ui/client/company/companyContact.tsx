"use client"
import { Globe, Info, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { getCompanyContactData } from "@/faker/contactcompany-data";

interface CompanyContactProps {
    companyIndex?: number; 
}

const iconMap: Record<string, React.ReactNode> = {
    address: <span className="material-icons text-orange-400"><MapPin /></span>,
    phone: <span className="material-icons text-orange-400"><Phone /></span>,
    email: <span className="material-icons text-orange-400"><Mail /></span>,
    website: <span className="material-icons text-orange-400"><Globe /></span>,
};
const socialIconMap: Record<string, React.ReactNode> = {
    facebook: <i className="fab fa-facebook-f text-2xl text-blue-600"></i>,
    linkedin: <i className="fab fa-linkedin-in text-2xl text-blue-700"></i>,
    twitter: <i className="fab fa-twitter text-2xl text-sky-400"></i>,
    github: <i className="fab fa-github text-2xl text-black"></i>,
};

const CompanyContact: React.FC<CompanyContactProps> = ({ companyIndex = 0 }) => {
    const contactData = getCompanyContactData(companyIndex);

    return (
        <div className="bg-orange-50 rounded-2xl shadow p-4 border border-gray-200">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <span className="material-icons text-orange-400"><Info /></span>
                Thông tin liên hệ
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2">
                    {iconMap.address}
                    <span>Trụ sở chính:</span>{contactData.address}
                </div>
                <div className="flex items-center gap-2">
                    {iconMap.phone}
                    <span>Điện thoại:</span> {contactData.phone}
                </div>
                <div className="flex items-center gap-2">
                    {iconMap.email}
                    <span>Email</span>: <a href={`mailto:${contactData.email}`} className="text-blue-500 underline">{contactData.email}</a>
                </div>
                <div className="flex items-center gap-2">
                    {iconMap.website}
                    <span>Website</span>: <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{contactData.website}</a>
                </div>
                {contactData.social && (
                    <div className="flex items-center gap-3 mt-2">
                        {contactData.social.map((s, idx) => (
                            <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer">
                                {socialIconMap[s.type] || <i className="material-icons text-2xl">public</i>}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default CompanyContact; 