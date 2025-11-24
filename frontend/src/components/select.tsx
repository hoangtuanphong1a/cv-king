"use client";

import * as React from "react";
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    FormHelperText,
    Divider,
    ListSubheader,
    ListItemIcon,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type SelectProps = {
    label?: string;
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    children: React.ReactNode;
    helperText?: string;
    size?: "small" | "medium";
    fullWidth?: boolean;
    className?: string;
};

function Select({
    label,
    value,
    onChange,
    children,
    helperText,
    size = "small",
    fullWidth = false,
    className,
}: SelectProps) {
    const labelId = React.useId();

    return (
        <FormControl
            variant="outlined"
            size={size}
            fullWidth={fullWidth}
            className={className}
        >
            {label && <InputLabel id={labelId}>{label}</InputLabel>}
            <MuiSelect
                labelId={labelId}
                value={value}
                onChange={onChange}
                label={label}
                IconComponent={ArrowDropDownIcon} // thay ChevronDownIcon
            >
                {children}
            </MuiSelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}

type SelectGroupProps = {
    label: string;
    children: React.ReactNode;
};

function SelectGroup({ label, children }: SelectGroupProps) {
    return [
        <ListSubheader key={`group-${label}`}>{label}</ListSubheader>,
        children,
    ];
}

function SelectValue({ value }: { value: string }) {
    return <>{value}</>;
}
const SelectTrigger = Select;

function SelectContent({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

type SelectItemProps = {
    value: string;
    children: React.ReactNode;
    withCheck?: boolean;
};

function SelectItem({ value, children, withCheck = false }: SelectItemProps) {
    return (
        <MenuItem value={value}>
            {withCheck && (
                <ListItemIcon>
                    <CheckIcon fontSize="small" />
                </ListItemIcon>
            )}
            {children}
        </MenuItem>
    );
}
function SelectLabel({ children }: { children: React.ReactNode }) {
    return (
        <ListSubheader sx={{ fontSize: 12, color: "text.secondary" }}>
            {children}
        </ListSubheader>
    );
}

function SelectSeparator() {
    return <Divider />;
}

function SelectScrollUpButton() {
    return null;
}

function SelectScrollDownButton() {
    return null;
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectScrollDownButton,
    SelectScrollUpButton,
};
