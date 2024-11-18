import { Select as MuiSelect, SelectProps, FormControl, InputLabel } from '@mui/material';

interface CustomSelectProps extends SelectProps {
    label: string;
}

export default function Select({ label, children, ...props }: CustomSelectProps) {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <MuiSelect label={label} {...props}>
                {children}
            </MuiSelect>
        </FormControl>
    );
}