// src/components/flights/AirportAutocomplete.tsx
'use client';

import { useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress, Box } from '@mui/material';

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AirportAutocomplete({ value, onChange, placeholder }: AirportAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue || inputValue.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/airports?keyword=${encodeURIComponent(inputValue)}`);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching airport suggestions:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => 
        typeof option === 'string' ? option : `${option.name} (${option.iataCode})`
      }
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
      filterSelectedOptions
      loading={loading}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        if (newValue) {
          onChange(newValue.iataCode);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <Box fontWeight="bold">{option.name}</Box>
            <Box fontSize="small" color="text.secondary">
              {option.iataCode} - {option.address.cityName}, {option.address.countryName}
            </Box>
          </Box>
        </Box>
      )}
    />
  );
}