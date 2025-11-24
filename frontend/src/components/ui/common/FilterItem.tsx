"use client";
import React, { useRef, useState } from "react";
import { Box, Menu, MenuItem, ListItemText } from "@mui/material";
import { ListFilter, ChevronUp, ChevronDown } from "lucide-react";

interface FilterItemProps {
  filterData: Record<string, string[]>;
  filterOptions: readonly string[];
  onFilterChange?: (filter: string, subFilter: string | null) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  filterData,
  filterOptions,
  onFilterChange,
}) => {
  const filterBoxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterOptions[1]
  );
  const [selectedSubFilter, setSelectedSubFilter] = useState<string | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedSubFilter(null);
    onFilterChange?.(filter, null);
    handleMenuClose();
  };

  const handleSelectSubFilter = (sub: string) => {
    setSelectedSubFilter(sub);
    onFilterChange?.(selectedFilter, sub);
  };

  // Xử lý kéo chuột
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

  const menuWidth = filterBoxRef.current?.offsetWidth || "auto";

  return (
    <Box className="w-[400px] ml-0">
      <Box
        className={`
          w-full flex flex-col gap-2 sm:flex-row sm:items-center
        `}
      >
        {/* Bộ lọc chính */}
        <Box component="nav" className="shrink-0">
          <Box
            ref={filterBoxRef}
            onClick={handleMenuOpen}
            tabIndex={0}
            className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer bg-white whitespace-nowrap ${
              anchorEl ? "border-orange-500" : "border-gray-300"
            }`}
          >
            <ListFilter size={18} className="text-gray-400" />
            <p className="font-semibold text-gray-400">
              Lọc theo:
            </p>
            <p className="text-black font-semibold">
              {selectedFilter}
            </p>
            {selectedSubFilter && (
              <p className="text-orange-500 font-semibold">
                ({selectedSubFilter})
              </p>
            )}
            {anchorEl ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableScrollLock={true}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  borderRadius: "8px",
                  mt: 1,
                  px: 1,
                  width: menuWidth,
                },
              },
            }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          >
            {filterOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleSelectFilter(option)}
                selected={selectedFilter === option}
              >
                <ListItemText
                  className={`font-semibold ${
                    selectedFilter === option
                      ? "text-orange-500"
                      : "text-gray-800"
                  }`}
                >
                  {option}
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Subfilter - cuộn ngang desktop, xuống dòng mobile */}
        {selectedFilter !== "Tất cả" &&
          filterData[selectedFilter]?.length > 0 && (
            <Box
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              sx={{
                paddingY: 0,
                paddingX: 1,
                borderRight: "2px solid #e0e0e0",
                borderLeft: "2px solid #e0e0e0",
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
              {filterData[selectedFilter].map((sub) => (
                <Box
                  key={sub}
                  onClick={() => handleSelectSubFilter(sub)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold border cursor-pointer 
                  ${
                    selectedSubFilter === sub
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-200 border-gray-200  text-black hover:bg-white hover:border-orange-400 hover:text-orange-400"
                  }`}
                >
                  {sub}
                </Box>
              ))}
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default FilterItem;
