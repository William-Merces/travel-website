'use client'
import { Card, CardContent, Grid, Typography, Button, Divider, Box } from '@mui/material';
import { Flight } from '@/types/flight';
import { formatCurrency, formatDate, formatTime } from '@/utils/formatters';
import { Plane } from 'lucide-react';

interface FlightSummaryProps {
    flight: Flight;
    onNext: () => void;
}

export const FlightSummary = ({ flight, onNext }: FlightSummaryProps) => {
    return (
        <Box className="space-y-6">
            <Typography variant="h5" component="h2" className="mb-4">
                Detalhes do Voo
            </Typography>

            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <img
                                src={flight.airline.logo}
                                alt={flight.airline.name}
                                className="h-12 object-contain"
                            />
                            <Typography variant="subtitle2">{flight.airline.name}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box className="flex items-center justify-between mb-4">
                                <div>
                                    <Typography variant="h6">{flight.origin.code}</Typography>
                                    <Typography variant="body2">{formatTime(flight.departureDate)}</Typography>
                                </div>
                                <Plane className="mx-4" />
                                <div>
                                    <Typography variant="h6">{flight.destination.code}</Typography>
                                    <Typography variant="body2">{formatTime(flight.arrivalDate)}</Typography>
                                </div>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(flight.departureDate)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Typography variant="h5" color="primary" className="mb-2">
                                {formatCurrency(flight.price.amount)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                por pessoa
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Button
                variant="contained"
                size="large"
                onClick={onNext}
                className="mt-4"
                fullWidth
            >
                Continuar para dados dos passageiros
            </Button>
        </Box>
    );
};