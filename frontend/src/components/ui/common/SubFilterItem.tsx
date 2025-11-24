"use client";
import React, { useRef, useState } from "react";
import { Box } from "@mui/material";

interface SubFilterProps {
  subFilters: string[];
  selectedSubFilter: string | null;
  onSubFilterChange: (sub: string) => void;
}

const SubFilter: React.FC<SubFilterProps> = ({
  subFilters,
  selectedSubFilter,
  onSubFilterChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Box
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      sx={{
        paddingY: 0,
        paddingX: 1,
        borderRight: "2px solid #8d660d",
        borderLeft: "2px solid #8d660d",
        borderRadius: "50px",
        borderColor: "orange",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        overflowX: "auto",
        whiteSpace: "nowrap",
        gap: 1,
        cursor: isDragging ? "grabbing" : "grab",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {subFilters.map((sub) => (
        <Box
          key={sub}
          onClick={() => onSubFilterChange(sub)}
          className={`px-4 py-1 rounded-full text-sm font-semibold border cursor-pointer 
            ${
              selectedSubFilter === sub
                ? "bg-[#8d660d] text-white border-[#8d660d]"
                : "bg-gray-200 border-gray-200  text-black hover:bg-[#facc15] hover:border-[#facc15] hover:text-white"
            }`}
        >
          {sub}
        </Box>
      ))}
    </Box>
  );
};

export default SubFilter;
