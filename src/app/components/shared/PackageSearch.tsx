// src/app/components/shared/PackageSearch.tsx
import React from 'react';
import {
    Grid,
    TextField,
    Button,
    InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FlightTakeoff, FlightLand, Person } from '@mui/icons-material';
import { AirportSelect } from './AirportSelect';

export const PackageSearch = () => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
                <AirportSelect
                    label="Origem"
                    placeholder="De onde você vai?"
                    startAdornment={
                        <InputAdornment position="start">
                            <FlightTakeoff />
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <AirportSelect
                    label="Destino"
                    placeholder="Para onde você vai?"
                    startAdornment={
                        <InputAdornment position="start">
                            <FlightLand />
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <DatePicker
                    label="Ida"
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
                    label="Passageiros"
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