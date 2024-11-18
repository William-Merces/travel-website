'use client'
import { Container, Grid, Typography, Box, Rating, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useState } from 'react';

interface HotelOffer {
    hotel: {
        hotelId: string;
        name: string;
        rating: string;
        cityCode: string;
        media: {
            uri: string;
        }[];
        amenities: string[];
    };
    offers: {
        id: string;
        checkInDate: string;
        price: {
            currency: string;
            total: string;
            variations: {
                average: {
                    base: string;
                };
            };
        };
    }[];
}

const mockHotels: HotelOffer[] = [
    {
        hotel: {
            hotelId: "HTRIO437",
            name: "Copacabana Palace",
            rating: "5",
            cityCode: "RIO",
            media: [
                { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg" }
            ],
            amenities: ["RESTAURANT", "SWIMMING_POOL", "SPA", "BEACH"]
        },
        offers: [{
            id: "1",
            checkInDate: "2024-03-20",
            price: {
                currency: "BRL",
                total: "1200.00",
                variations: {
                    average: {
                        base: "1200.00"
                    }
                }
            }
        }]
    },
    {
        hotel: {
            hotelId: "HTSAO123",
            name: "Renaissance São Paulo",
            rating: "5",
            cityCode: "SAO",
            media: [
                { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d3/c0/e9/exterior.jpg" }
            ],
            amenities: ["BUSINESS_CENTER", "FITNESS_CENTER", "RESTAURANT"]
        },
        offers: [{
            id: "2",
            checkInDate: "2024-03-20",
            price: {
                currency: "BRL",
                total: "850.00",
                variations: {
                    average: {
                        base: "850.00"
                    }
                }
            }
        }]
    },
    {
        hotel: {
            hotelId: "HTSAL789",
            name: "Fasano Salvador",
            rating: "5",
            cityCode: "SSA",
            media: [
                { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/3e/98/6b/tivoli-ecoresort-praia.jpg" }
            ],
            amenities: ["BEACH", "SPA", "RESTAURANT", "POOL"]
        },
        offers: [{
            id: "3",
            checkInDate: "2024-03-20",
            price: {
                currency: "BRL",
                total: "950.00",
                variations: {
                    average: {
                        base: "950.00"
                    }
                }
            }
        }]
    },
    {
        hotel: {
            hotelId: "HTFLN456",
            name: "Costão do Santinho Resort",
            rating: "4",
            cityCode: "FLN",
            media: [
                { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/34/f9/57/costao-santinho-resort.jpg" }
            ],
            amenities: ["ALL_INCLUSIVE", "BEACH", "KIDS_CLUB", "GOLF"]
        },
        offers: [{
            id: "4",
            checkInDate: "2024-03-20",
            price: {
                currency: "BRL",
                total: "890.00",
                variations: {
                    average: {
                        base: "890.00"
                    }
                }
            }
        }]
    },
    {
        hotel: {
            hotelId: "HTNAT789",
            name: "Ocean Palace Resort",
            rating: "5",
            cityCode: "NAT",
            media: [
                { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg" }
            ],
            amenities: ["ALL_INCLUSIVE", "BEACH_ACCESS", "SPA", "TENNIS_COURT"]
        },
        offers: [{
            id: "5",
            checkInDate: "2024-03-20",
            price: {
                currency: "BRL",
                total: "780.00",
                variations: {
                    average: {
                        base: "780.00"
                    }
                }
            }
        }]
    },
    {
        hotel: {
            hotelId: "HTFOR123",
            name: "Vila Galé Fortaleza",
            rating: "4",
            cityCode: "FOR",
            media: [
                { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d3/c0/e9/exterior.jpg" }
            ],
            amenities: ["POOL", "RESTAURANT", "BEACH_ACCESS", "FITNESS_CENTER"]
        },
        offers: [{
            id: "6",
            checkInDate: "2024-03-20",
            price: {
                currency: "BRL",
                total: "650.00",
                variations: {
                    average: {
                        base: "650.00"
                    }
                }
            }
        }]
    }
];

const formatAmenity = (amenity: string) => {
    return amenity
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');
};

const useHotels = () => {
    const [hotels] = useState(mockHotels);
    const [loading] = useState(false);
    const [error] = useState(null);

    return { hotels, loading, error };
};

export default function HotelsPage() {
    const { hotels, loading, error } = useHotels();

    if (loading) {
        return (
            <Container maxWidth="xl" className="py-8">
                <Typography>Carregando...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" className="py-8">
                <Typography>Erro ao carregar hotéis.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" className="py-8">
            <Typography variant="h4" component="h1" className="mb-6">
                Hotéis em Destaque
            </Typography>

            <Grid container spacing={4}>
                {hotels?.map((hotelOffer) => (
                    <Grid item key={hotelOffer.hotel.hotelId} xs={12} sm={6} md={4}>
                        <Card className="h-full flex flex-col">
                            <CardMedia
                                component="img"
                                height="200"
                                image={hotelOffer.hotel.media[0].uri}
                                alt={hotelOffer.hotel.name}
                                className="h-48 object-cover"
                            />
                            <CardContent className="flex-1">
                                <Box className="flex justify-between items-start mb-2">
                                    <Typography variant="h6" component="h2">
                                        {hotelOffer.hotel.name}
                                    </Typography>
                                    <Rating 
                                        value={Number(hotelOffer.hotel.rating)} 
                                        readOnly 
                                        size="small" 
                                    />
                                </Box>

                                <Typography color="text.secondary" className="mb-2">
                                    {hotelOffer.hotel.cityCode}
                                </Typography>

                                <Typography variant="h6" color="primary" className="mb-4">
                                    A partir de R$ {Number(hotelOffer.offers[0].price.total).toFixed(2)}
                                </Typography>

                                <Box className="flex flex-wrap gap-1 mb-4">
                                    {hotelOffer.hotel.amenities.slice(0, 3).map((amenity) => (
                                        <Typography
                                            key={amenity}
                                            variant="caption"
                                            className="px-2 py-1 bg-gray-100 rounded-full"
                                        >
                                            {formatAmenity(amenity)}
                                        </Typography>
                                    ))}
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    href={`/hotels/${hotelOffer.hotel.hotelId}`}
                                    sx={{ bgcolor: 'rgb(37, 99, 235)' }}
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