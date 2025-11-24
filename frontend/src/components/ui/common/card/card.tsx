// card.tsx
import * as React from "react";
import { Card as MuiCard, CardHeader as MuiCardHeader, CardContent as MuiCardContent, CardActions as MuiCardActions, Typography } from "@mui/material";
import { cn } from "@/lib/utils"; // Giả sử bạn vẫn giữ hàm cn để nối className

// Component Card
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiCard
      className={cn(className)}
      sx={{
        backgroundColor: "background.paper", // Ánh xạ bg-card
        color: "text.primary", // Ánh xạ text-card-foreground
        display: "flex",
        flexDirection: "column",
        gap: "24px", // Ánh xạ gap-6
        borderRadius: "12px", // Ánh xạ rounded-xl
        border: "1px solid", // Ánh xạ border
        borderColor: "divider",
      }}
      {...props}
    />
  );
}

// Component CardHeader
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiCardHeader
      className={cn(className)}
      sx={{
        display: "grid",
        gridTemplateRows: "auto auto",
        alignItems: "start",
        gap: "6px", // Ánh xạ gap-1.5
        padding: "24px 24px 0", // Ánh xạ px-6 pt-6
        "&[data-slot='card-header'][has-data-slot='card-action']": {
          gridTemplateColumns: "1fr auto", // Ánh xạ has-data-[slot=card-action]:grid-cols-[1fr_auto]
        },
        "&.border-b": {
          paddingBottom: "24px", // Ánh xạ [.border-b]:pb-6
        },
      }}
      {...props}
    />
  );
}

// Component CardTitle
function CardTitle({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <Typography
      variant="h6" // Ánh xạ h4
      className={cn(className)}
      sx={{
        lineHeight: 1, // Ánh xạ leading-none
        fontWeight: 500,
      }}
      {...props}
    />
  );
}

// Component CardDescription
function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <Typography
      variant="body2"
      className={cn(className)}
      sx={{
        color: "text.secondary", // Ánh xạ text-muted-foreground
      }}
      {...props}
    />
  );
}

// Component CardAction
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(className)}
      sx={{
        gridColumnStart: 2, // Ánh xạ col-start-2
        gridRow: "span 2", // Ánh xạ row-span-2
        gridRowStart: 1, // Ánh xạ row-start-1
        alignSelf: "start", // Ánh xạ self-start
        justifySelf: "end", // Ánh xạ justify-self-end
      }}
      {...props}
    />
  );
}

// Component CardContent
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiCardContent
      className={cn(className)}
      sx={{
        padding: "0 24px", // Ánh xạ px-6
        "&:last-child": {
          paddingBottom: "24px", // Ánh xạ [&:last-child]:pb-6
        },
      }}
      {...props}
    />
  );
}

// Component CardFooter
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiCardActions
      className={cn(className)}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0 24px 24px", // Ánh xạ px-6 pb-6
        "&.border-t": {
          paddingTop: "24px", // Ánh xạ [.border-t]:pt-6
        },
      }}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
