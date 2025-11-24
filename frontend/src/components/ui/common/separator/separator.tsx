import * as React from "react";
import { Divider, DividerProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface SeparatorProps extends Omit<DividerProps, 'orientation'> {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop) => prop !== 'decorative',
})<{ decorative?: boolean }>(({ theme, orientation }) => ({
  backgroundColor: 'hsl(var(--border))', // Giữ nguyên màu border từ shadcn/ui
  flexShrink: 0,
  ...(orientation === 'horizontal' && {
    height: '1px',
    width: '100%',
  }),
  ...(orientation === 'vertical' && {
    height: '100%',
    width: '1px',
  }),
}));

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <StyledDivider
      orientation={orientation}
      decorative={decorative}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      className={className}
      {...props}
    />
  );
}

export { Separator };
