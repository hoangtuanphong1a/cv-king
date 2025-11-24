"use client";
import React from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { Bookmark } from "lucide-react";
interface Job {
    id: string;
    image: string | StaticImageData;
    title: string;
    company: string;
    salary: string;
    location: string;
    form: string;
}

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        console.log(`Navigating to job details for job ID: ${job.id}`);
    };

    return (
        <Card
            sx={{
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                padding: 0,
                "&:hover": {
                    borderColor: "orange",
                },
                minHeight: "100%",
                width: 340,
                height: 150,
                marginLeft: "10px",
            }}
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
        >
            <CardContent
                className="flex flex-row justify-start items-start space-x-3 cursor-pointer"
                sx={{ padding: "10px", paddingBottom: "0!important" }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: 68,
                        height: 68,
                        flex: "none",
                        marginBottom: "4px",
                    }}
                >
                    <Image
                        src={job.image || "/images.png"}
                        alt={job.title}
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-md border-2 border-gray-200"
                        onError={(e) => {
                            e.currentTarget.src = "/images/fallback-logo.png";
                        }}
                    />
                </Box>
                <Box>
                    {/* <p className="text-gray-800 text-md font-bold line-clamp-2 hover:text-orange-400">
            {job.title}
          </p> */}
                    <Typography
                        variant="body1"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: "bold",
                            lineHeight: "1.2rem",
                            wordBreak: "break-word",
                            maxWidth: "100%",
                            "&:hover": {
                                color: "#facc15",
                            },
                        }}
                    >
                        {job.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "0.8rem",
                            lineHeight: "1.2rem",
                            color: "gray",
                            fontWeight: "bold",
                            wordBreak: "break-word",
                            maxWidth: "100%",
                            "&:hover": {
                                color: "#facc15",
                            },
                        }}
                    >
                        {job.company}
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
                    <Box className="bg-gray-200 text-[13px] text-gray-700  font-semibold rounded-full px-2 py-0.5">
                        <p className="">{job.salary}</p>
                    </Box>
                           <Box className="bg-gray-200 text-[13px] text-gray-700   font-semibold  rounded-full px-2 py-0.5">
                        <p className="">{job.location}</p>
                    </Box>
                    <Box className="bg-gray-200 text-[13px] text-gray-700   font-semibold  rounded-full px-2 py-0.5">
                        <p className="">{job.form}</p>
                    </Box>
                </Box>
                <Box>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={handleFavoriteToggle}
                        size="small"
                    >
                        {isFavorite ? (
                            <Bookmark className="text-orange-400 fill-orange-600 w-5 h-5" />
                        ) : (
                            <Bookmark className="text-orange-400 w-5 h-5" />
                        )}
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobCard;
