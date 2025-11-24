"use client";

import { useState } from "react";
import { Box, Select, MenuItem, Button, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/common/table/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import { getColumns } from "@/components/ui/common/table/Column";
import { useTheme } from "@/context/ThemeContext";
import type { StaticImageData } from "next/image";
import BreadcrumbDisplay from "@/components/ui/common/breadcrumb/BreadcumbDisplay";
import { User } from "@/types/user.type";
import { sampleUserData } from "@/faker/user-data";


const userColumns: ColumnDef<User>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row }) => <h1 className="font-bold ">{row.index + 1}</h1>,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar
        src={
          typeof row.original.avatar === "string"
            ? row.original.avatar
            : (row.original.avatar as StaticImageData).src
        }
      >
        {row.original.lastName}
      </Avatar>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },

  {
    id: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <span>{`${row.original.firstName || ""} ${
        row.original.lastName || ""
      }`}</span>
    ),
  },
];

const UsersPage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const pageSizeOptions = [5, 10];
  const router = useRouter();
  const { theme } = useTheme();

  const paginatedData = sampleUserData.slice(
    page * pageSize,
    (page + 1) * pageSize
  );
  const totalPages = Math.ceil(sampleUserData.length / pageSize);

  const handleView = (id: string) => {
    router.push(`/users/view/${id}`);
    toast("Success", { description: `Viewing user with ID: ${id}` });
  };

  const handleEdit = (id: string) => {
    router.push(`/users/edit/${id}`);
    toast("Success", { description: `Editing user with ID: ${id}` });
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast("Success", { description: `Deleted user with ID: ${id}` });
    } catch (error) {
      toast("Error", {
        description: `Failed to delete user. Please try again ${error}`,
      });
    }
  };

  const columns = getColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    baseColumns: userColumns,
  });

  return (
    <Box>
      <Box className="mb-4">
        <BreadcrumbDisplay />
      </Box>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Users
      </h1>

      <Box className="border-1 border-collapse rounded-2xl">
        <DataTable columns={columns} data={paginatedData} />
        <Box className="flex items-center justify-between p-4 border-t-1 border-collapse">
          <Box className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-white">
              Rows per page:
            </span>
            <Select
              className=""
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
              size="small"
              sx={{
                height: "2rem",
                border: theme === "dark" ? "1px solid white" : "",
                color: theme === "dark" ? "white" : "",
                "& .MuiSelect-icon": {
                  color: theme === "dark" ? "white" : "inherit",
                },
              }}
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size} className="dark:text-white">
                  {size}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className="flex items-center gap-2">
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              size="small"
            >
              <span className="text-gray-400 hover:text-blue-600">
                Previous
              </span>
            </Button>
            <span className="text-sm text-gray-600 dark:text-white">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              size="small"
            >
              <span className="text-gray-400 hover:text-blue-600">Next</span>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersPage;
