"use client";

import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { BriefcaseBusiness, Check, CirclePlus } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface Company {
  id: string;
  name: string;
  industry: string;
  image: string | StaticImageData;
  location: string;
  totalJobs: number;
  description: string;
}

interface CompanyCardProps {
  company: Company;
  isFollowed: boolean;
  onFollow: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, isFollowed, onFollow }) => {
  return (
    <Box className="group relative transition-all duration-300 overflow-hidden">
      <Card
        sx={{
          borderRadius: "12px",
          border: "1px solid #facc15",
          padding: 0,
          minHeight: "100%",
          width: "100%",
        }}
        onClick={() => console.log(`Navigating to company details for company ID: ${company.id}`)}
      >
        <CardContent
          className="flex flex-row justify-start items-start space-x-3 cursor-pointer"
          sx={{ padding: "10px", paddingBottom: "0!important" }}
        >
          <Box
            sx={{
              position: "relative",
              width: 80,
              height: 80,
              flex: "none",
              marginBottom: "4px",
            }}
          >
            <Image
              src={company.image || "/images/fallback-logo.png"}
              alt={company.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md border-2 border-gray-200"
              onError={(e) => {
                e.currentTarget.src = "/images/fallback-logo.png";
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bold",
                lineHeight: "1.5rem",
                wordBreak: "break-word",
                maxWidth: "100%",
                "&:hover": {
                  color: "#facc15",
                },
              }}
            >
              {company.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bold",
                color: "gray",
                wordBreak: "break-word",
                maxWidth: "100%",
                "&:hover": {
                  color: "#facc15",
                },
              }}
            >
              {company.industry}
            </Typography>
          </Box>
        </CardContent>

        <CardContent
          className="flex justify-between items-center space-x-3"
          sx={{
            padding: "10px",
            paddingTop: "4px!important",
            paddingBottom: "8px!important",
          }}
        >
          <Box className="flex flex-row gap-1.5 items-center">
            <Box className="text-[13px] text-gray-700 font-semibold rounded-full px-2 py-0.5">
              <Box className="flex items-center">
                <BriefcaseBusiness size={18} className="text-gray-700 mr-2" />
                <p>{company.totalJobs} việc làm</p>
              </Box>
            </Box>
          </Box>

          <Box
            onClick={(e) => {
              e.stopPropagation();
              onFollow();
            }}
            className={`flex font-semibold items-center justify-center absolute w-28 h-9 ${
              isFollowed ? "bg-gray-200 text-gray-600 w-36" : "bg-[#facc15] text-white"
            } bottom-2 right-2 rounded-full opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-0 transition-all duration-300 cursor-pointer`}
          >
            {isFollowed ? <Check size={17} /> : <CirclePlus size={17} />}
            <p className="ml-1 text-md">{isFollowed ? "Đang theo dõi" : "Theo dõi"}</p>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompanyCard;
