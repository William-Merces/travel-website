'use client';

import React from 'react';
import { FlightSearch } from '@/app/components/shared/FlightSearch';
import { useFlights } from '@/hooks/useFlights';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Skeleton,
    Button,
    Box,
    Rating,
    Avatar
} from '@mui/material';
import { formatCurrency, formatDate, formatTime } from '@/utils/formatters';
import { TrendingUpIcon, ClockIcon, ShieldCheckIcon } from 'lucide-react';

const FlightsPage = () => {
    const { flights, loading, error } = useFlights();

    const features = [
        {
            icon: TrendingUpIcon,
            title: "Melhores Preços",
            description: "Garantimos as tarifas mais competitivas do mercado para suas viagens"
        },
        {
            icon: ClockIcon,
            title: "Reserva Rápida",
            description: "Processo de reserva simplificado e rápido em poucos cliques"
        },
        {
            icon: ShieldCheckIcon,
            title: "Pagamento Seguro",
            description: "Suas transações protegidas com tecnologia avançada"
        }
    ];

    const testimonials = [
        {
            name: "Maria Silva",
            location: "São Paulo, SP",
            rating: 5,
            comment: "Encontrei passagens com preços incríveis! O processo foi super fácil e rápido."
        },
        {
            name: "João Santos",
            location: "Rio de Janeiro, RJ",
            rating: 5,
            comment: "Melhor site para comprar passagens. O atendimento foi excelente do início ao fim!"
        },
        {
            name: "Ana Costa",
            location: "Belo Horizonte, MG",
            rating: 4,
            comment: "Interface super intuitiva e preços competitivos. Super recomendo!"
        }
    ];

    return (
        <Box sx={{ pt: 4 }}>
            <Container maxWidth="xl">
                {/* Search Section */}
                <Box sx={{
                    py: 4,
                    px: 3,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    mb: 8
                }}>
                    <FlightSearch />
                </Box>

                {/* Features Section */}
                <Box sx={{ mb: 10 }}>
                    <Typography variant="h3" sx={{ fontSize: '2.5rem', fontWeight: 500, mb: 1 }}>
                        Por que escolher nossa plataforma?
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                        Descubra as vantagens de viajar conosco
                    </Typography>
                    <Grid container spacing={6}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <feature.icon style={{ width: 32, height: 32, marginBottom: 16, color: '#2563eb' }} />
                                    <Typography variant="h5" sx={{ fontSize: '1.25rem', fontWeight: 500, mb: 1 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Flight Results */}
                <Box sx={{ mb: 10 }}>
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <Skeleton key={i} height={100} sx={{ my: 1 }} />
                        ))
                    ) : (
                        <Grid container spacing={3}>
                            {flights?.map(flight => (
                                <Grid item xs={12} key={flight.id}>
                                    <Card variant="outlined">
                                        <CardContent sx={{ p: 2 }}>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item xs={2}>
                                                    <img
                                                        src={flight.airline.logo}
                                                        alt={flight.airline.name}
                                                        style={{ height: 48, objectFit: 'contain' }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                        {`${flight.origin.code} → ${flight.destination.code}`}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {formatDate(flight.departureDate)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography>
                                                        {formatTime(flight.departureDate)} - {formatTime(flight.arrivalDate)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="h6" sx={{ color: '#2563eb', fontWeight: 500 }}>
                                                        {formatCurrency(flight.price.amount)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        href={`/booking/${flight.id}`}
                                                        sx={{
                                                            bgcolor: '#2563eb',
                                                            '&:hover': {
                                                                bgcolor: '#1d4ed8'
                                                            },
                                                            textTransform: 'none'
                                                        }}
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
                </Box>

                {/* Testimonials Section */}
                <Box sx={{ mb: 10 }}>
                    <Typography variant="h3" sx={{ fontSize: '2.5rem', fontWeight: 500, mb: 1 }}>
                        O que nossos clientes dizem
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                        Experiências reais de quem viajou conosco
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card variant="outlined">
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.200' }} />
                                            <Box sx={{ ml: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {testimonial.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Rating
                                            value={testimonial.rating}
                                            readOnly
                                            sx={{
                                                mb: 1.5,
                                                '& .MuiRating-iconFilled': {
                                                    color: '#FFB800',
                                                }
                                            }}
                                        />
                                        <Typography sx={{ color: 'text.primary' }}>
                                            "{testimonial.comment}"
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="h3" sx={{ fontSize: '2.5rem', fontWeight: 500, mb: 2 }}>
                        Sua viagem em boas mãos
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Mais de 100.000 clientes satisfeitos • Atendimento 24/7 • Garantia de menor preço
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default FlightsPage;