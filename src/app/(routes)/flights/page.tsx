'use client'
import { FlightSearch } from '@/components/shared/FlightSearch';
import { useFlights } from '@/hooks/useFlights';
import { Container, Grid, Card, CardContent, Typography, Skeleton, Button } from '@mui/material';
import { formatCurrency, formatDate, formatTime } from '@/utils/formatters';

export default function FlightsPage() {
    const { flights, loading, error } = useFlights();

    return (
        <Container maxWidth="xl" className="py-8">
            <FlightSearch />

            {loading ? (
                Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} height={100} className="my-2" />
                ))
            ) : (
                <Grid container spacing={3} className="mt-4">
                    {flights?.map(flight => (
                        <Grid item xs={12} key={flight.id}>
                            <Card>
                                <CardContent>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={2}>
                                            <img
                                                src={flight.airline.logo}
                                                alt={flight.airline.name}
                                                className="h-12 object-contain"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="h6">
                                                {`${flight.origin.code} → ${flight.destination.code}`}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDate(flight.departureDate)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>
                                                {formatTime(flight.departureDate)} - {formatTime(flight.arrivalDate)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6" color="primary">
                                                {formatCurrency(flight.price.amount)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                href={`/booking/${flight.id}`}
                                            >
                                                Selecionar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}