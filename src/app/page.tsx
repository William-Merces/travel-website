// src/app/page.tsx
'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Alert,
  IconButton
} from '@mui/material';
import {
  Flight,
  Hotel,
  Search,
  DateRange,
  Person,
  Schedule
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useAmadeus } from '@/hooks/useAmadeus';
import { AirportAutocomplete } from '@/components/flights/AirportAutocomplete';

type SearchType = 'flight' | 'hotel' | 'package';

interface SearchData {
  type: SearchType;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  guests?: number;
  roomType?: string;
  duration?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  adults: number;
  children: number;
  infants: number;
}

const initialSearchData: SearchData = {
  type: 'flight',
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  adults: 1,
  children: 0,
  infants: 0,
  travelClass: 'ECONOMY'
};

export default function Home() {
  const { loading, error, searchFlights, searchHotels } = useAmadeus();
  const [searchType, setSearchType] = useState<SearchType>('flight');
  const [searchData, setSearchData] = useState<SearchData>(initialSearchData);
  const [weather, setWeather] = useState<{ temp: number; description: string } | null>(null);

  const offers = [
    {
      id: 1,
      from: 'São Paulo',
      to: 'Miami',
      details: 'Voo direto + 5 diárias',
      price: 3499,
      oldPrice: 4999,
      image: '/images/miami.jpg',
    },
    {
      id: 2,
      from: 'Rio',
      to: 'Paris',
      details: 'Voo + 7 diárias',
      price: 4299,
      oldPrice: 5999,
      image: '/images/paris.jpg',
    },
    {
      id: 3,
      from: 'São Paulo',
      to: 'Roma',
      details: 'Voo + 6 diárias',
      price: 3999,
      oldPrice: 5499,
      image: '/images/roma.jpg',
    },
  ];

  const destinations = [
    { id: 4, name: 'Rio de Janeiro', price: 299, image: '/images/rio.jpg' },
    { id: 5, name: 'Salvador', price: 399, image: '/images/salvador.jpg' },
    { id: 6, name: 'Florianópolis', price: 349, image: '/images/florianopolis.jpg' },
    { id: 7, name: 'Fortaleza', price: 449, image: '/images/fortaleza.jpg' }
  ];

  const fetchWeather = async (city: string) => {
    if (!city) return;
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const weatherData = await response.json();
      setWeather(weatherData);
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const name = e.target.name as keyof SearchData;
    const value = e.target.value;

    setSearchData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'destination') fetchWeather(value as string);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      switch (searchType) {
        case 'flight': {
          const flightResults = await searchFlights({
            originLocationCode: searchData.origin,
            destinationLocationCode: searchData.destination,
            departureDate: searchData.departureDate,
            returnDate: searchData.returnDate || undefined,
            adults: searchData.adults,
            children: searchData.children,
            infants: searchData.infants,
            travelClass: searchData.travelClass,
            nonStop: true,
            currencyCode: 'BRL'
          });
          if (flightResults) {
            window.location.href = `/flights?results=${encodeURIComponent(JSON.stringify(flightResults))}`;
          }
          break;
        }

        case 'hotel': {
          const hotelResults = await searchHotels({
            cityCode: searchData.destination,
            checkInDate: searchData.departureDate,
            checkOutDate: searchData.returnDate,
            adults: searchData.adults,
            radius: 50,
            radiusUnit: 'KM',
            ratings: ['3', '4', '5']
          });
          if (hotelResults) {
            window.location.href = `/hotels?results=${encodeURIComponent(JSON.stringify(hotelResults))}`;
          }
          break;
        }
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const renderSearchForm = () => {
    const commonFields = (
      <>
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <TextField
              type="number"
              label="Adultos"
              name="adults"
              value={searchData.adults}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 1, max: 9 } }}
              fullWidth
            />
            <TextField
              type="number"
              label="Crianças"
              name="children"
              value={searchData.children}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 0, max: 9 } }}
              fullWidth
            />
            <TextField
              type="number"
              label="Bebês"
              name="infants"
              value={searchData.infants}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 0, max: 9 } }}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Data de ida"
            name="departureDate"
            value={searchData.departureDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </>
    );

    switch (searchType) {
      case 'hotel':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AirportAutocomplete
                value={searchData.destination}
                onChange={(value) => setSearchData(prev => ({ ...prev, destination: value }))}
                placeholder="Cidade de destino"
              />
            </Grid>
            {commonFields}
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Data de volta"
                name="returnDate"
                value={searchData.returnDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        );

      case 'flight':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <AirportAutocomplete
                value={searchData.origin}
                onChange={(value) => setSearchData(prev => ({ ...prev, origin: value }))}
                placeholder="Cidade de origem"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AirportAutocomplete
                value={searchData.destination}
                onChange={(value) => setSearchData(prev => ({ ...prev, destination: value }))}
                placeholder="Cidade de destino"
              />
            </Grid>
            {commonFields}
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Data de volta"
                name="returnDate"
                value={searchData.returnDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Classe</InputLabel>
                <Select
                  name="travelClass"
                  value={searchData.travelClass}
                  onChange={handleInputChange}
                  label="Classe"
                >
                  <MenuItem value="ECONOMY">Econômica</MenuItem>
                  <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
                  <MenuItem value="BUSINESS">Executiva</MenuItem>
                  <MenuItem value="FIRST">Primeira Classe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              TravelWay
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom>
            Explore o mundo com TravelWay
          </Typography>
          <Typography variant="h6">
            Passagens, hotéis e pacotes incríveis, tudo em um só lugar.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                {[
                  { type: 'flight' as const, label: 'Voos', icon: <Flight /> },
                  { type: 'hotel' as const, label: 'Hotéis', icon: <Hotel /> }
                ].map(({ type, label, icon }) => (
                  <Grid item key={type}>
                    <Button
                      variant={searchType === type ? 'contained' : 'outlined'}
                      onClick={() => {
                        setSearchType(type);
                        setSearchData({ ...initialSearchData, type });
                      }}
                      startIcon={icon}
                    >
                      {label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <form onSubmit={handleSearch}>
              {renderSearchForm()}

              {weather && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Clima em {searchData.destination}: {weather.temp}°C, {weather.description}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
                sx={{ mt: 3 }}
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Ofertas Especiais
          </Typography>
          <Grid container spacing={3}>
            {offers.map((offer) => (
              <Grid item xs={12} md={4} key={offer.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', pt: '56.25%' }}>
                    <Image
                      src={offer.image}
                      alt={`${offer.to}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6">
                      {offer.from} → {offer.to}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.details}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        R${offer.oldPrice}
                      </Typography>
                      <Typography variant="h6" color="primary.main">
                        R${offer.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Destinos Populares
          </Typography>
          <Grid container spacing={3}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={3} key={destination.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', pt: '75%' }}>
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.3)',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      <Typography variant="h6" color="white">
                        Reserve Agora
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6">
                      {destination.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
                      A partir de R${destination.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                TravelWay
              </Typography>
              <Typography variant="body2" color="grey.400">
                Sua próxima aventura começa aqui.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contato
              </Typography>
              <Typography variant="body2" color="grey.400">
                Email: contato@travelway.com
              </Typography>
              <Typography variant="body2" color="grey.400">
                Tel: (11) 9999-9999
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Redes Sociais
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link href="#" style={{ color: 'inherit' }}>Instagram</Link>
                <Link href="#" style={{ color: 'inherit' }}>Facebook</Link>
                <Link href="#" style={{ color: 'inherit' }}>Twitter</Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}