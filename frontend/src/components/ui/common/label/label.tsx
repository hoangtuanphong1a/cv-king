import * as React from "react";
import { FormLabel, FormLabelProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface LabelProps extends Omit<FormLabelProps, 'component'> {
  className?: string;
  htmlFor?: string;
}

const StyledLabel = styled(FormLabel)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem', // gap-2
  fontSize: '0.875rem', // text-sm
  lineHeight: 1, // leading-none
  fontWeight: 500, // font-medium
  userSelect: 'none', // select-none
  cursor: 'pointer',
  color: theme.palette.text.primary,
  
  // Group disabled states
  '.MuiFormControl-root[data-disabled="true"] &': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  
  // Peer disabled states (khi form control bị disabled)
  '.MuiFormControl-root .Mui-disabled ~ &': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  
  // Input disabled states
  'input:disabled ~ &, .Mui-disabled ~ &': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  
  // Hover states
  '&:hover': {
    color: theme.palette.text.primary,
  },
  
  // Focus states khi associate với input
  '.Mui-focused ~ &': {
    color: theme.palette.primary.main,
  },
  
  // Error states
  '.Mui-error ~ &': {
    color: theme.palette.error.main,
  },
}));

function Label({ className, htmlFor, children, ...props }: LabelProps) {
  return (
    <StyledLabel
      component="label"
      htmlFor={htmlFor}
      data-slot="label"
      className={className}
      {...props}
    >
      {children}
    </StyledLabel>
  );
}

export { Label };
