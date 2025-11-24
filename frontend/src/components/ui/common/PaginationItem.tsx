import React from "react";
import { Stack, Pagination } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationItem: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center" sx={{ backgroundColor: "transparent !important" }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#f28c38",
            fontSize: "1.2rem", 
            "&.Mui-selected": {
              backgroundColor: "#f28c38",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#e07b30",
              },
            },
            "&:hover": {
              backgroundColor: "#fff3e0",
            },
          },
        }}
      />
    </Stack>
  );
};

export default PaginationItem;