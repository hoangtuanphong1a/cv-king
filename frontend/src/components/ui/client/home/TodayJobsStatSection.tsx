"use client";

import * as React from "react";
import { Box, Button } from "@mui/material";
import { LineChart, RadarChart } from "@mui/x-charts";
import { BarChart } from '@mui/x-charts';
import { ChartNoAxesCombined } from "lucide-react";
const jobData = [
    { "work": "Lập trình viên", "jobs": 1500,"findJobs":400},
    { "work": "Thiết kế đồ họa", "jobs": 800 ,"findJobs":400},
    { "work": "Kỹ sư xây dựng", "jobs": 600 ,"findJobs":400},
    { "work": "Marketing", "jobs": 1200 ,"findJobs":400},
    { "work": "Quản trị nhân sự", "jobs": 400 ,"findJobs":400}];

const salaryData = [
    { range: "Dưới 3 triệu", jobs: 150 },
    { range: "Từ 3-10 triệu", jobs: 450 },
    { range: "Từ 10-20 triệu", jobs: 700 },
    { range: "Từ 20-30 triệu", jobs: 300 },
    { range: "Trên 30 triệu", jobs: 120 },
    { range: "Thỏa thuận", jobs: 250 },
];

const TodayJobsStatSection = React.forwardRef<HTMLDivElement>(() => {
    const today = new Date().toLocaleDateString("vi-VN");
    const valueFormatter = (
        value: number | null,
        context: { dataIndex?: number }
    ) => {
        if (context.dataIndex !== undefined) {
            const range = salaryData[context.dataIndex]?.range;
            return `${range}: ${value} việc làm`;
        }
        return `${value} việc làm`;
    };

    return (
        <section
            id="TodayJobsStatSection"
            className="max-w-6xl mx-auto py-5 px-6 lg:p-0"
        >
            <Box
                sx={{
                    borderRadius: "24px",
                    p: 4,
                }}
            >
                <Box sx={{ background: "linear-gradient(to right, #CC6600, #F3C246)", }} className=" h-[200px] rounded-4xl flex items-center justify-between  mb-4">
                    <div className="flex-col"><p className="text-4xl font-bold text-white ml-5 ">
                        Thị Trường Việc Làm
                    </p>
                        <Box className=" ml-5 w-26 h-7 mt-1 h-8 py-1 px-3 bg-white rounded-full">
                            <p className="text-lg font-bold text-orange-400">{today}</p>
                        </Box>

                    </div>
                    <div className="max-w-full flex mr-8 text-2xl font-bold">
                        <Button  ><h1 className="flex items-center justify-center bg-white h-14 w-64 rounded-4xl">Tìm việc ngay</h1></Button>
                        <Button  ><h1 className="flex items-center justify-center bg-white h-14 w-64 rounded-4xl">Đăng Tuyển</h1></Button>
                    </div>
                </Box>

                <Box className="grid grid-cols-1 md:grid-cols-3 gap-3 text-white mb-6">
                    <Box className="shadow-2xl p-4 rounded-lg bg-white text-black">
                        <p className="text-2xl font-bold">1.200</p>
                        <p className="text-md font-semibold">Việc làm mới nhất</p>
                    </Box>
                    <Box className="shadow-2xl p-4 rounded-lg bg-white text-black">
                        <p className="text-2xl font-bold">8.500</p>
                        <p className="text-md font-semibold">Tổng việc đang tuyển</p>
                    </Box>
                    <Box className="shadow-2xl p-4 rounded-lg bg-white text-black">
                        <p className="text-2xl font-bold">620</p>
                        <p className="text-md font-semibold">Công ty đang tuyển</p>
                    </Box>
                </Box>

                <Box className="grid grid-cols-1  gap-6">
                    <Box
                        sx={{
                            background: "transparent",
                            p: 2,
                        }}
                        className="shadow-2xl max-w-full"
                    >
                        <Box className="flex-col items-center ">
                            <Box className="items-center justify-center bg-white/20 p-2 rounded-full mr-2">
                                <ChartNoAxesCombined size={20} className="bg-black text-white" />
                            </Box>
                            <p className="font-bold text-black">Xu hướng việc làm</p>
                        </Box>
                        <BarChart

                            dataset={jobData}
                            xAxis={[{
                                scaleType: 'band',
                                dataKey: 'work',
                                categoryGapRatio: 0.3,
                                barGapRatio: 0.1,

                            }]}
                            yAxis={[{
                            }]}
                            series={[{
                                dataKey: 'jobs',
                                label: 'Tuyển dụng',
                                color: '#FFD3A1', // Màu xanh chủ đạo của MUI
                            },{
                                    dataKey :'findJobs',
                                    label :'Tìm việc',
                                    color: '#EF6B6B',
                                }]
                            }

                            width={950}
                            height={400}
                            borderRadius={0}
                            grid={{ horizontal: true }}
                        />
                    </Box>
                </Box>
            </Box>
        </section>
    );
});

TodayJobsStatSection.displayName = "TodayJobsStatSection";

export default TodayJobsStatSection;
