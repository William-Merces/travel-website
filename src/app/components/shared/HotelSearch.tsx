// src/app/components/shared/HotelSearch.tsx
import React from 'react';
import {
    Grid,
    TextField,
    Button,
    InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocationOn, Person } from '@mui/icons-material';
import { LocationPicker } from './LocationPicker';

export const HotelSearch = () => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
                <LocationPicker
                    label="Destino"
                    placeholder="Para onde você vai?"
                    startAdornment={
                        <InputAdornment position="start">
                            <LocationOn />
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <DatePicker
                    label="Check-in"
                    slotProps={{
                        textField: {
                            fullWidth: true
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <DatePicker
                    label="Check-out"
                    slotProps={{
                        textField: {
                            fullWidth: true
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    fullWidth
                    label="Hóspedes"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ height: '56px' }}
                >
                    Buscar
                </Button>
            </Grid>
        </Grid>
    );
};