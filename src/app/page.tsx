// src/app/page.tsx
'use client'
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Tabs, 
  Tab,
  Button,
  TextField,
} from '@mui/material';
import { 
  FlightTakeoff, 
  Hotel, 
  BeachAccess 
} from '@mui/icons-material';
import Image from 'next/image';
import { FlightSearch } from './components/shared/FlightSearch';
import { HotelSearch } from './components/shared/HotelSearch';
import { PackageSearch } from './components/shared/PackageSearch';
import { WeatherWidget } from './components/WeatherWidget';
import { useNavigation } from './contexts/NavigationContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default function Home() {
  const { activeSection, setActiveSection, getPageTitle } = useNavigation();
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const sections: ('flights' | 'hotels' | 'packages')[] = ['flights', 'hotels', 'packages'];
    setActiveSection(sections[newValue]);
  };

  const getTabValue = () => {
    switch (activeSection) {
      case 'flights': return 0;
      case 'hotels': return 1;
      case 'packages': return 2;
      default: return 0;
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '50vh', // Reduzido para 50% da viewport
          minHeight: '400px',
          maxHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          pb: 2, // Reduzido
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1
          }
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Travel background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        <Container 
          maxWidth="xl" 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            pt: '64px' // Compensar a navbar
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  fontSize: { 
                    xs: '2rem',
                    sm: '2.5rem',
                    md: '3rem'
                  },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  color: 'white',
                  mb: 2
                }}
              >
                {getPageTitle()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
              <WeatherWidget />
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                }}
              >
                <Tabs 
                  value={getTabValue()} 
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    '& .MuiTab-root': {
                      py: 1.5,
                      color: 'text.primary',
                      fontSize: '0.875rem'
                    },
                    '& .Mui-selected': {
                      color: 'primary.main',
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'primary.main',
                    }
                  }}
                >
                  <Tab 
                    icon={<FlightTakeoff sx={{ fontSize: '1.25rem' }} />} 
                    label="VOOS" 
                    iconPosition="start"
                    sx={{
                      fontWeight: 'medium',
                    }}
                  />
                  <Tab 
                    icon={<Hotel sx={{ fontSize: '1.25rem' }} />} 
                    label="HOTÉIS" 
                    iconPosition="start"
                    sx={{
                      fontWeight: 'medium',
                    }}
                  />
                  <Tab 
                    icon={<BeachAccess sx={{ fontSize: '1.25rem' }} />} 
                    label="PACOTES" 
                    iconPosition="start"
                    sx={{
                      fontWeight: 'medium',
                    }}
                  />
                </Tabs>

                <Box sx={{ p: 2, bgcolor: 'white' }}>
                  <TabPanel value={getTabValue()} index={0}>
                    <FlightSearch />
                  </TabPanel>
                  <TabPanel value={getTabValue()} index={1}>
                    <HotelSearch />
                  </TabPanel>
                  <TabPanel value={getTabValue()} index={2}>
                    <PackageSearch />
                  </TabPanel>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {[
              {
                title: 'Disney',
                location: 'Orlando, EUA',
                price: 5999,
                oldPrice: 7499,
                image: '/images/disney.jpg'
              },
              {
                title: 'Cancún',
                location: 'México',
                price: 4599,
                oldPrice: 5999,
                image: '/images/cancun.jpg'
              },
              {
                title: 'Lisboa',
                location: 'Portugal',
                price: 3799,
                oldPrice: 4999,
                image: '/images/lisboa.jpg'
              }
            ].map((offer, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'error.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)}% OFF
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontSize: '1.125rem' }}>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {offer.location}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        textDecoration: 'line-through',
                        mb: 0.5
                      }}
                    >
                      R$ {offer.oldPrice}
                    </Typography>
                    <Typography variant="h6" color="primary.main" gutterBottom sx={{ fontSize: '1.125rem' }}>
                      R$ {offer.price}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Ver detalhes
                    </Button>
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