/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

// Ràng buộc mọi row đều có id
type IdLike = { id: string };

type ActionHandlers<T extends IdLike> = {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  baseColumns: ColumnDef<T, any>[];
};

// Component riêng để xử lý hành động — generic theo T
const ActionCell = <T extends IdLike>({
  row,
  onView,
  onEdit,
  onDelete,
}: {
  row: Row<T>;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(row.original.id);
      setDeleteDialogOpen(false);
    } catch (error: any) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Tooltip title="View" arrow>
        <span
          className="text-lg cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
          onClick={() => onView(row.original.id)}
        >
          <Eye size={20} />
        </span>
      </Tooltip>
      <Tooltip title="Edit" arrow>
        <span
          className="text-lg cursor-pointer text-green-500 hover:text-green-700 transition-colors"
          onClick={() => onEdit(row.original.id)}
        >
          <Edit size={20} />
        </span>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <span
          className="text-lg cursor-pointer text-red-500 hover:text-red-700 transition-colors"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 size={20} />
        </span>
      </Tooltip>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={loading}
            autoFocus
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const getColumns = <T extends IdLike>({
  onView,
  onEdit,
  onDelete,
  baseColumns,
}: ActionHandlers<T>): ColumnDef<T, unknown>[] => [
  ...baseColumns,
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionCell<T>
        row={row}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
