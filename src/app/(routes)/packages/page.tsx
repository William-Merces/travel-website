'use client'
import { useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper,
    Grid,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const mockPackages = [
    {
        id: 1,
        title: "Praias do Nordeste",
        location: "Porto de Galinhas, PE",
        description: "7 dias de aventura nas mais belas praias do nordeste brasileiro",
        price: 2499.90,
        image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80",
        rating: 4.5
    },
    {
        id: 2,
        title: "Serras Gaúchas",
        location: "Gramado, RS",
        description: "5 dias de experiência cultural e gastronomia no sul do Brasil",
        price: 1899.90,
        image: "https://images.unsplash.com/photo-1610405205665-7c5951fd2f35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80",
        rating: 4.8
    },
    {
        id: 3,
        title: "Amazônia Selvagem",
        location: "Manaus, AM",
        description: "6 dias de imersão na maior floresta tropical do mundo",
        price: 3299.90,
        image: "https://images.unsplash.com/photo-1628689469838-524a4a973b8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80",
        rating: 4.7
    },
    {
        id: 4,
        title: "Rio de Janeiro Maravilhoso",
        location: "Rio de Janeiro, RJ",
        description: "4 dias conhecendo as maravilhas da cidade mais famosa do Brasil",
        price: 1799.90,
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80",
        rating: 4.6
    },
    {
        id: 5,
        title: "Bonito Aventura",
        location: "Bonito, MS",
        description: "5 dias de ecoturismo e aventuras nas águas cristalinas",
        price: 2199.90,
        image: "https://images.unsplash.com/photo-1544989164-42fd3a130a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80",
        rating: 4.9
    },
    {
        id: 6,
        title: "Chapada Diamantina",
        location: "Lençóis, BA",
        description: "6 dias de trilhas e cachoeiras no coração da Bahia",
        price: 2399.90,
        image: "https://images.unsplash.com/photo-1586500036065-8ea65c5143df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80",
        rating: 4.8
    }
];

export default function PackagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [destination, setDestination] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleSearch = () => {
        // Implementar lógica de busca aqui
        console.log('Buscar:', { searchTerm, destination, priceRange });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Pacotes de Viagem
            </Typography>
            
            {/* Componente de Busca */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1 }} />
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Destino</InputLabel>
                            <Select
                                value={destination}
                                label="Destino"
                                onChange={(e) => setDestination(e.target.value)}
                                startAdornment={<LocationOnIcon sx={{ mr: 1 }} />}
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="nordeste">Nordeste</MenuItem>
                                <MenuItem value="sul">Sul</MenuItem>
                                <MenuItem value="norte">Norte</MenuItem>
                                <MenuItem value="sudeste">Sudeste</MenuItem>
                                <MenuItem value="centro-oeste">Centro-Oeste</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Faixa de Preço</InputLabel>
                            <Select
                                value={priceRange}
                                label="Faixa de Preço"
                                onChange={(e) => setPriceRange(e.target.value)}
                                startAdornment={<AttachMoneyIcon sx={{ mr: 1 }} />}
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="0-1000">Até R$ 1.000</MenuItem>
                                <MenuItem value="1000-2000">R$ 1.000 - R$ 2.000</MenuItem>
                                <MenuItem value="2000-3000">R$ 2.000 - R$ 3.000</MenuItem>
                                <MenuItem value="3000+">Acima de R$ 3.000</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            startIcon={<SearchIcon />}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Lista de Pacotes */}
            <Grid container spacing={3}>
                {mockPackages.map((pack) => (
                    <Grid item xs={12} sm={6} md={4} key={pack.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={pack.image}
                                alt={pack.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {pack.title}
                                </Typography>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {pack.location}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {pack.description}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" color="primary">
                                        R$ {pack.price.toLocaleString('pt-BR')}
                                    </Typography>
                                    <Rating value={pack.rating} precision={0.5} readOnly />
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
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