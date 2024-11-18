// AirportSelect.tsx
'use client'
import { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { MapPin } from 'lucide-react';

interface AirportOption {
    iataCode: string;
    name: string;
    city: string;
    country: string;
}

interface AirportSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const AirportSelect = ({ label, value, onChange }: AirportSelectProps) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<AirportOption[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (inputValue.length < 2) {
            setOptions([]);
            return;
        }

        setLoading(true);
        fetch(`/api/airports?search=${inputValue}`)
            .then(response => response.json())
            .then(data => {
                setOptions(data);
            })
            .catch(error => {
                console.error('Error fetching airports:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [inputValue]);

    return (
        <Autocomplete
            value={value}
            onChange={(_, newValue) => {
                onChange(newValue || '');
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={options}
            getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return `${option.city} (${option.iataCode})`;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading && <CircularProgress color="inherit" size={16} />}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: '40px'
                        }
                    }}
                />
            )}
            loading={loading}
            filterOptions={(x) => x}
            isOptionEqualToValue={(option, value) =>
                option.iataCode === value || option.iataCode === value.iataCode
            }
            noOptionsText="Nenhum aeroporto encontrado"
            loadingText="Buscando..."
            sx={{
                width: '100%'
            }}
        />
    );
};