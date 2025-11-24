"use client";

import { ArrowRight } from "lucide-react";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
const SearchSection: React.FC = () => {
    const [statsData, setStatsData] = useState([
        {
            id: 1,
            number: "60K+",
            description: "Ứng viên đã tìm việc",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            )
        },
        {
            id: 2,
            number: "1,200",
            description: "Việc làm mỗi nhật",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            )
        },
        {
            id: 3,
            number: "95%",
            description: "Tỷ lệ thành công",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            )
        },
        {
            id: 4,
            number: "60K+",
            description: "Ứng viên đã tìm việc",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            )
        },
        {
            id: 5,
            number: "1,200",
            description: "Việc làm mỗi nhật",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            )
        },

    ]);
    const StatsCard = ({ card }) => {
        return (
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 w-[200px] h-[200px] ml-[15px] mr-[15px]">
                <div className="flex flex-col items-center text-center h-full justify-center">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {card.icon}
                        </svg>
                    </div>
                    {/* Number */}
                    <div className="text-3xl font-bold text-gray-800 mb-2">{card.number}</div>
                    {/* Description */}
                    <div className="text-sm text-gray-600 leading-relaxed">{card.description}</div>
                </div>
            </div>
        );
    };

    return (
        <div
            className="w-full mx-auto py-5 px-6 h-[708px] bg-[#FBE4B2]"

        >
            <div className="ml-[389px] mt-[64px] w-[754px] h-[54px] rounded-[50px] bg-[#FFD09B] flex items-center justify-center">

                <p className="text-[20] font-bold">Tim viec lam nhanh , viec lam moi tren toan quoc </p>
            </div>
            <div className="mt-[21px] ml-[267px] w-[998px] h-[100px]">
                <div className="text-center">
                    <p className="text-[50px] font-bold text-gray-800" style={{ letterSpacing: "0.1px", lineHeight: "50px", }}>
                        Tiếp cận{' '}
                        <span className="text-[50px] font-bold" style={{
                            background: 'linear-gradient(90deg, #CD6D00 0%, #CD6D00 85%, #FF0000 91%, #FF0000 100%)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent'
                        }}>60,000+</span>{' '}
                        cơ hội việc làm từ hàng nghìn doanh nghiệp tại Việt Nam
                    </p>
                </div>

            </div>
            <div className="w-[1010px] h-[29px] mt-[25px] ml-[255px] flex items-center justify-center text-[24px]">

                <p>Tim viec lam nhanh , viec lam moi nhat tu hang nghin doanh nghiep uy tin tai Viet Nam</p>
            </div>
            <div className="w-full h-[71px] mt-[25px] ml-[403px]  inline-flex items-center gap-1" >
                <Button className="w-[402px] h-[71px] bg-[#DA5D1A] flex items-center justify-center rounded-[50px]" variant={"link"}><Link className="inline-flex items-center gap-1 text-[24px] font-bold text-[#FFFFFF]" href={"/login"}>Kham Pha ngay tai CVKING <ArrowRight className="w-4 h-4" /> </Link></Button>
                <Button variant={"outline"} className="w-[244px] h-full ml-[30px] rounded-[50px]"  ><Link href={"#"} className="font-bold text-[24px]">Tao CV mien phi</Link></Button>
            </div>
            <div className=" p-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center mb-8">
                        {statsData.map((card) => (
                            <StatsCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
