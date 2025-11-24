"use client";
import * as React from "react";
import {
  Select as MUISelect,
  MenuItem,
  FormControl,
  InputLabel,
  ListSubheader,
  Divider,
  SelectProps as MUISelectProps,
  MenuItemProps,
  ListSubheaderProps,
  DividerProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

// Styled Components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    padding: '8px 12px',
    fontSize: '0.875rem',
    minHeight: '36px',
    transition: 'color, box-shadow',
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  '& .MuiSelect-icon': {
    opacity: 0.5,
    width: '16px',
    height: '16px',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '2px',
  padding: '6px 32px 6px 8px',
  fontSize: '0.875rem',
  cursor: 'default',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  '&.Mui-disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  '& .select-item-indicator': {
    position: 'absolute',
    right: '8px',
    display: 'flex',
    width: '14px',
    height: '14px',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 500,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  margin: '4px -4px',
  height: '1px',
}));

// Interfaces
interface SelectProps extends Omit<MUISelectProps, 'size'> {
  size?: "sm" | "default";
  children?: React.ReactNode;
}

interface SelectTriggerProps {
  className?: string;
  size?: "sm" | "default";
  children?: React.ReactNode;
  placeholder?: string;
}

interface SelectContentProps {
  className?: string;
  children?: React.ReactNode;
  position?: "popper";
}

interface SelectItemProps extends Omit<MenuItemProps, 'children'> {
  className?: string;
  children?: React.ReactNode;
}

interface SelectLabelProps extends ListSubheaderProps {
  className?: string;
}

interface SelectSeparatorProps extends DividerProps {
  className?: string;
}

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

interface SelectGroupProps {
  children?: React.ReactNode;
  className?: string;
}

// Context để share state
const SelectContext = React.createContext<{
  value: any;
  onValueChange: (value: any) => void;
  placeholder?: string;
}>({
  value: '',
  onValueChange: () => {},
});

// Main Components
function Select({ children, value, onSelectionChange, ...props }: SelectProps & {
  onSelectionChange?: (value: any) => void;
}) {
  const [internalValue, setInternalValue] = React.useState(value || '');
  
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onSelectionChange?.(newValue);
  };

  return (
    <SelectContext.Provider value={{
      value: value || internalValue,
      onValueChange: handleChange,
    }}>
      <div data-slot="select">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ children, className }: SelectGroupProps) {
  return (
    <div data-slot="select-group" className={className}>
      {children}
    </div>
  );
}

function SelectValue({ placeholder, className }: SelectValueProps) {
  return (
    <span data-slot="select-value" className={className}>
      {placeholder}
    </span>
  );
}

function SelectTrigger({ 
  className, 
  size = "default", 
  children, 
  placeholder,
  ...props 
}: SelectTriggerProps & MUISelectProps) {
  const { value, onValueChange } = React.useContext(SelectContext);
  
  // Extract SelectContent from children to get menu items
  const selectContent = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === SelectContent
  );

  return (
    <StyledFormControl size={size === "sm" ? "small" : "medium"}>
      <MUISelect
        data-slot="select-trigger"
        data-size={size}
        value={value}
        onChange={onValueChange}
        displayEmpty
        className={className}
        IconComponent={ChevronDownIcon}
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ opacity: 0.7 }}>{placeholder}</span>;
          }
          return selected;
        }}
        {...props}
      >
        {selectContent && React.isValidElement(selectContent) 
          ? selectContent.props.children 
          : null}
      </MUISelect>
    </StyledFormControl>
  );
}

function SelectContent({ className, children, position }: SelectContentProps) {
  // This is just a wrapper - actual content is rendered by SelectTrigger
  return <div data-slot="select-content">{children}</div>;
}

function SelectLabel({ className, children, ...props }: SelectLabelProps) {
  return (
    <StyledListSubheader 
      data-slot="select-label" 
      className={className}
      {...props}
    >
      {children}
    </StyledListSubheader>
  );
}

function SelectItem({ className, children, value, ...props }: SelectItemProps) {
  return (
    <StyledMenuItem
      data-slot="select-item"
      className={className}
      value={value}
      {...props}
    >
      {children}
      <span className="select-item-indicator">
        <CheckIcon size={16} />
      </span>
    </StyledMenuItem>
  );
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <StyledDivider
      data-slot="select-separator"
      className={className}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className }: { className?: string }) {
  return (
    <div 
      data-slot="select-scroll-up-button"
      className={className}
      style={{ display: 'flex', cursor: 'default', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
    >
      <ChevronUpIcon size={16} />
    </div>
  );
}

function SelectScrollDownButton({ className }: { className?: string }) {
  return (
    <div 
      data-slot="select-scroll-down-button"
      className={className}
      style={{ display: 'flex', cursor: 'default', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
    >
      <ChevronDownIcon size={16} />
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
