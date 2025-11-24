// import * as React from "react";

// import { cn } from "./utils";

// function Card({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-header"
//       className={cn(
//         "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <h4
//       data-slot="card-title"
//       className={cn("leading-none", className)}
//       {...props}
//     />
//   );
// }

// function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <p
//       data-slot="card-description"
//       className={cn("text-muted-foreground", className)}
//       {...props}
//     />
//   );
// }

// function CardAction({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-action"
//       className={cn(
//         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardContent({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-content"
//       className={cn("px-6 [&:last-child]:pb-6", className)}
//       {...props}
//     />
//   );
// }

// function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-footer"
//       className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
//       {...props}
//     />
//   );
// }

// export {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardAction,
//   CardDescription,
//   CardContent,
// };
"use client";

import * as React from "react";
import MuiCard from "@mui/material/Card";
import CardHeaderMui from "@mui/material/CardHeader";
import CardContentMui from "@mui/material/CardContent";
import CardActionsMui from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return <MuiCard className={className} onClick={onClick}>{children}</MuiCard>;
}

export function CardHeader({
  title,
  subheader,
  action,
}: {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return <CardHeaderMui title={title} subheader={subheader} action={action} />;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h6" component="div">
      {children}
    </Typography>
  );
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  );
}

export function CardAction({ children }: { children: React.ReactNode }) {
  return <CardActionsMui>{children}</CardActionsMui>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <CardContentMui className={className}>{children}</CardContentMui>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <CardActionsMui
      sx={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
    >
      {children}
    </CardActionsMui>
  );
}

