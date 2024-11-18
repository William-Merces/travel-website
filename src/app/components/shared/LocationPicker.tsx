'use client'
import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { MapPin } from 'lucide-react';

const locations = [
    { id: '1', city: 'São Paulo', country: 'Brasil', code: 'GRU' },
    { id: '2', city: 'Rio de Janeiro', country: 'Brasil', code: 'GIG' },
    // ... mais locais
];

export const LocationPicker = ({ value, onChange }) => {
    return (
        <Autocomplete
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            options={locations}
            getOptionLabel={(option) => `${option.city}, ${option.country}`}
            renderOption={(props, option) => (
                <Box component="li" {...props} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <div>
                        <div>{option.city}</div>
                        <div className="text-sm text-gray-500">{option.country}</div>
                    </div>
                </Box>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Localização" fullWidth />
            )}
        />
    );
};