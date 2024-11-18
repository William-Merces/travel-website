'use client'
import { useState } from 'react';
import { Card, CardContent, Grid, FormControlLabel, Switch, Button, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { AirportSelect } from './AirportSelect';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Plane, Users } from 'lucide-react';

export const FlightSearch = () => {
    const router = useRouter();
    const [searchData, setSearchData] = useState({
        origin: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        passengers: 1,
        isRoundTrip: false
    });

    const handleSearch = () => {
        const params = new URLSearchParams({
            origin: searchData.origin,
            destination: searchData.destination,
            departureDate: format(searchData.departureDate, 'yyyy-MM-dd'),
            ...(searchData.isRoundTrip && searchData.returnDate && {
                returnDate: format(searchData.returnDate, 'yyyy-MM-dd')
            }),
            passengers: searchData.passengers.toString()
        });

        router.push(`/flights?${params.toString()}`);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent>
                <Box className="space-y-4">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={searchData.isRoundTrip}
                                onChange={(e) => setSearchData(prev => ({ ...prev, isRoundTrip: e.target.checked }))}
                            />
                        }
                        label="Ida e volta"
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <AirportSelect
                                label="Origem"
                                value={searchData.origin}
                                onChange={(value) => setSearchData(prev => ({ ...prev, origin: value }))}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <AirportSelect
                                label="Destino"
                                value={searchData.destination}
                                onChange={(value) => setSearchData(prev => ({ ...prev, destination: value }))}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Data de ida"
                                    value={searchData.departureDate}
                                    onChange={(date) => setSearchData(prev => ({ ...prev, departureDate: date }))}
                                    className="w-full"
                                    disablePast
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Data de volta"
                                    value={searchData.returnDate}
                                    onChange={(date) => setSearchData(prev => ({ ...prev, returnDate: date }))}
                                    className="w-full"
                                    disabled={!searchData.isRoundTrip}
                                    disablePast
                                    minDate={searchData.departureDate}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Passageiros"
                                type="number"
                                value={searchData.passengers}
                                onChange={(e) => setSearchData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                                InputProps={{
                                    startAdornment: <Users className="mr-2" size={20} />,
                                    inputProps: { min: 1, max: 9 }
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Plane />}
                        onClick={handleSearch}
                        disabled={!searchData.origin || !searchData.destination || !searchData.departureDate}
                        className="w-full mt-4"
                    >
                        Buscar voos
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};