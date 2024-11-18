'use client'
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { FlightSearch } from './components/shared/FlightSearch';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white',
          pb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1
          }
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Travel background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Encontre as melhores ofertas de voos
              </Typography>
              <Typography variant="h5" gutterBottom>
                Compare preços e reserve sua próxima viagem
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: 2
                }}
              >
                <FlightSearch />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Destinations */}
      <Box sx={{ 
        bgcolor: 'background.default',
        pt: 8,
        pb: 8
      }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Destinos Populares
          </Typography>
          <Grid container spacing={4}>
            {[
              { city: 'Rio de Janeiro', image: '/images/rio.jpg', price: 'desde R$ 299' },
              { city: 'São Paulo', image: '/images/sao-paulo.jpg', price: 'desde R$ 199' },
              { city: 'Salvador', image: '/images/salvador.jpg', price: 'desde R$ 399' },
            ].map((destination) => (
              <Grid item xs={12} md={4} key={destination.city}>
                <Paper
                  sx={{
                    position: 'relative',
                    height: 300,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                >
                  <Image
                    src={destination.image}
                    alt={destination.city}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6">{destination.city}</Typography>
                    <Typography>{destination.price}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}