"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";

interface InputProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
}

export function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled = false,
    error = false,
    helperText,
}: InputProps) {
    return (
        <TextField
            fullWidth
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            helperText={helperText}
            size="small"
            variant="outlined" 
        />
    );
}
