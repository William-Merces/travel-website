'use client'
import { Container, Grid, Typography, Box, Rating, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useHotels } from '@/hooks/useHotels';
import { Hotel } from '@/types/hotel';
import { formatCurrency } from '@/utils/formatters';

export default function HotelsPage() {
    const { hotels, loading, error } = useHotels();

    return (
        <Container maxWidth="xl" className="py-8">
            <Typography variant="h4" component="h1" className="mb-6">
                Hotéis em Destaque
            </Typography>

            <Grid container spacing={4}>
                {hotels?.map((hotel: Hotel) => (
                    <Grid item key={hotel.id} xs={12} sm={6} md={4}>
                        <Card className="h-full flex flex-col">
                            <CardMedia
                                component="img"
                                height="200"
                                image={hotel.images[0]}
                                alt={hotel.name}
                                className="h-48 object-cover"
                            />
                            <CardContent className="flex-1">
                                <Box className="flex justify-between items-start mb-2">
                                    <Typography variant="h6" component="h2">
                                        {hotel.name}
                                    </Typography>
                                    <Rating value={hotel.rating} readOnly size="small" />
                                </Box>

                                <Typography color="text.secondary" className="mb-2">
                                    {hotel.location.city}, {hotel.location.country}
                                </Typography>

                                <Typography variant="h6" color="primary" className="mb-4">
                                    A partir de {formatCurrency(hotel.rooms[0]?.price.amount)}
                                </Typography>

                                <Box className="flex flex-wrap gap-1 mb-4">
                                    {hotel.amenities.slice(0, 3).map((amenity) => (
                                        <Typography
                                            key={amenity}
                                            variant="caption"
                                            className="px-2 py-1 bg-gray-100 rounded-full"
                                        >
                                            {amenity}
                                        </Typography>
                                    ))}
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    href={`/hotels/${hotel.id}`}
                                >
                                    Ver Detalhes
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}