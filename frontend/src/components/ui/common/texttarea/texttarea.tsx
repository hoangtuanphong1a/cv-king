"use client";
import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface TextareaProps extends Omit<TextFieldProps, 'multiline' | 'variant'> {
  className?: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    minHeight: '64px', // min-h-16 = 4rem = 64px
    padding: 0,
    
    // Remove default MUI outline
    '& fieldset': {
      border: 'none',
    },
    
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      
      '& fieldset': {
        border: 'none',
      },
    },
    
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
      
      '& fieldset': {
        border: 'none',
      },
    },
    
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      boxShadow: `0 0 0 3px ${theme.palette.error.main}20`,
    },
    
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  
  '& .MuiOutlinedInput-input': {
    padding: '8px 12px', // px-3 py-2
    fontSize: '1rem', // text-base
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    resize: 'none',
    transition: 'color, box-shadow',
    
    // Placeholder styling
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    
    // Mobile text size
    [theme.breakpoints.up('md')]: {
      fontSize: '0.875rem', // md:text-sm
    },
    
    '&:disabled': {
      cursor: 'not-allowed',
      WebkitTextFillColor: theme.palette.text.disabled,
    },
  },
  
  // Field sizing content equivalent
  '& textarea': {
    fieldSizing: 'content',
  },
}));

function Textarea({ className, rows = 3, ...props }: TextareaProps) {
  return (
    <StyledTextField
      data-slot="textarea"
      className={className}
      multiline
      rows={rows}
      variant="outlined"
      {...props}
    />
  );
}

export { Textarea };
