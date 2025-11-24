"use client";
import * as React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { cn } from "@/lib/utils"; // Giả sử bạn vẫn giữ hàm cn để nối className

// Định nghĩa các biến thể cho Button
const buttonVariants = {
    variant: {
        default: {
            backgroundColor: "#000000",
            color: "primary.contrastText",
            marginLeft: '16px',
            marginRight: '4px',
            marginTop: '16px',
            marginBottom: '4px',
            "&:hover": {
                backgroundColor: "primary.dark",
            },

        },
        destructive: {
            backgroundColor: "error.main",
            color: "error.contrastText",
            margin: "16px",
            "&:hover": {
                backgroundColor: "error.dark",
            },
            "&:focus-visible": {
                boxShadow: `0 0 0 3px var(--mui-palette-error-light)`,
            },
        },
        outline: {
            border: "1px solid",
            borderColor: "grey.500",
            margin: "16px",
            backgroundColor: "background.paper",
            color: "text.primary",
            "&:hover": {
                backgroundColor: "grey.100",
                color: "text.primary",
            },
        },
        secondary: {
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": {
                backgroundColor: "secondary.dark",
            },
        },
        ghost: {
            backgroundColor: "transparent",
            color: "text.primary",
            "&:hover": {
                backgroundColor: "grey.100",
            },
        },
        link: {
            backgroundColor: "transparent",
            color: "primary.main",
            textDecoration: "underline",
            textDecorationOffset: "4px",
            "&:hover": {
                textDecoration: "underline",
            },
        },
    },
    size: {
        default: {
            height: 32,
            padding: "8px 16px",
            gap: "8px",
            "& svg": {
                width: 12,
                height: 12,
            },
        },
        sm: {
            height: 32,
            padding: "6px 12px",
            gap: "6px",
            "& svg": {
                width: 14,
                height: 14,
            },
        },
        lg: {
            height: 40,
            padding: "10px 24px",
            gap: "8px",
            "& svg": {
                width: 18,
                height: 18,
            },
        },
        icon: {
            height: 36,
            width: 36,
            padding: "8px",
            "& svg": {
                width: 16,
                height: 16,
            },
        },
    },
};

// Styled component để áp dụng các biến thể
const StyledButton = styled(MuiButton, {
    shouldForwardProp: (prop) => !["variant", "size"].includes(prop as string),
})<{ variant?: string; size?: string }>(({ theme, variant = "default", size = "default" }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    borderRadius: 90,
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "all 0.2s",
    "&:disabled": {
        pointerEvents: "none",
        opacity: 0.5,
    },
    "&:focus-visible": {
        outline: "none",
        boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
    },
    "&[aria-invalid='true']": {
        borderColor: theme.palette.error.main,
        boxShadow: `0 0 0 3px ${theme.palette.error.light}40`,
    },
    "& svg": {
        pointerEvents: "none",
        flexShrink: 0,
    },
    ...buttonVariants.variant[variant as keyof typeof buttonVariants.variant],
    ...buttonVariants.size[size as keyof typeof buttonVariants.size],
}));

// Định nghĩa props cho Button
interface ButtonProps extends MuiButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

// Component Button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <StyledButton
                className={cn(className)}
                variant={variant === "outline" ? "outlined" : "contained"}
                disableElevation
                ref={ref}
                {...props}
                sx={{
                    ...(variant ? buttonVariants.variant[variant] : {}),
                    ...(size ? buttonVariants.size[size] : {}),
                }}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };

