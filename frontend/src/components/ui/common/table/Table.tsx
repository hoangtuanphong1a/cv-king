import * as React from "react";
import { cn } from "@/lib/utils";

// Table Component
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto rounded-t-2xl border-none">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm ", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// TableHeader Component
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(" dark:bg-gray-800 border-b-1 border-collapse", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// TableBody Component
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    // className={cn("divide-y divide-gray-200 dark:divide-gray-700", className)}
    className={cn("divide-y", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// TableFooter Component
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-50 dark:bg-gray-800 font-medium",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// TableRow Component
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// TableHead Component
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { sortable?: boolean }
>(({ className, sortable, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-4 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight",
      sortable && "cursor-pointer",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      {children}
      {sortable && <span className="text-xs">↕</span>}
    </div>
  </th>
));
TableHead.displayName = "TableHead";

// TableCell Component
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle text-sm", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// TableCaption Component
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
