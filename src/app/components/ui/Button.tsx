import { Button as MuiButton, ButtonProps } from '@mui/material';

export default function Button({ children, ...props }: ButtonProps) {
    return <MuiButton {...props}>{children}</MuiButton>;
}