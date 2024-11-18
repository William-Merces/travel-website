import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

interface DatePickerProps {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
}

export default function DatePicker({ label, value, onChange }: DatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <MuiDatePicker
                label={label}
                value={value}
                onChange={onChange}
                slotProps={{ textField: { fullWidth: true } }}
            />
        </LocalizationProvider>
    );
}