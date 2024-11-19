'use client'
import { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    IconButton,
    Button,
    useTheme,
    useMediaQuery,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import {
    FlightTakeoff,
    Hotel,
    BeachAccess,
    Language,
    AccountCircle,
    Menu as MenuIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNavigation } from '../../contexts/NavigationContext';

export default function Navbar() {
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const { activeSection, setActiveSection } = useNavigation();

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const handleNavigation = (section: 'flights' | 'hotels' | 'packages') => {
        setActiveSection(section);
        router.push(`/${section}`);
        handleMobileMenuClose();
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'primary.main',
                boxShadow: 'none',
                height: '64px', // Altura reduzida
            }}
        >
            <Container maxWidth="xl">
                <Toolbar 
                    sx={{ 
                        justifyContent: 'space-between',
                        minHeight: '64px !important', // Forçar altura menor
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
                            <FlightTakeoff sx={{ mr: 1, fontSize: '1.5rem' }} />
                            <Typography 
                                variant="h6" 
                                component="div" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    mr: 4,
                                    fontSize: '1.25rem' // Tamanho reduzido
                                }}
                            >
                                VIAGENS
                            </Typography>
                        </Link>

                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    color="inherit"
                                    startIcon={<FlightTakeoff sx={{ fontSize: '1.25rem' }} />}
                                    onClick={() => handleNavigation('flights')}
                                    sx={{
                                        borderBottom: activeSection === 'flights' ? '2px solid white' : 'none',
                                        borderRadius: 0,
                                        fontSize: '0.875rem', // Tamanho reduzido
                                        py: 0.5
                                    }}
                                >
                                    Voos
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<Hotel sx={{ fontSize: '1.25rem' }} />}
                                    onClick={() => handleNavigation('hotels')}
                                    sx={{
                                        borderBottom: activeSection === 'hotels' ? '2px solid white' : 'none',
                                        borderRadius: 0,
                                        fontSize: '0.875rem', // Tamanho reduzido
                                        py: 0.5
                                    }}
                                >
                                    Hotéis
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<BeachAccess sx={{ fontSize: '1.25rem' }} />}
                                    onClick={() => handleNavigation('packages')}
                                    sx={{
                                        borderBottom: activeSection === 'packages' ? '2px solid white' : 'none',
                                        borderRadius: 0,
                                        fontSize: '0.875rem', // Tamanho reduzido
                                        py: 0.5
                                    }}
                                >
                                    Pacotes
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {!isMobile && (
                            <IconButton color="inherit" size="small">
                                <Language sx={{ fontSize: '1.25rem' }} />
                            </IconButton>
                        )}

                        {isMobile ? (
                            <>
                                <IconButton
                                    size="small"
                                    edge="end"
                                    color="inherit"
                                    onClick={handleMobileMenuOpen}
                                >
                                    <MenuIcon sx={{ fontSize: '1.5rem' }} />
                                </IconButton>
                                <Menu
                                    anchorEl={mobileMenuAnchor}
                                    open={Boolean(mobileMenuAnchor)}
                                    onClose={handleMobileMenuClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiMenuItem-root': {
                                                fontSize: '0.875rem',
                                                py: 1
                                            }
                                        },
                                    }}
                                >
                                    <MenuItem onClick={() => handleNavigation('flights')}>
                                        <FlightTakeoff sx={{ mr: 1, fontSize: '1.25rem' }} /> Voos
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigation('hotels')}>
                                        <Hotel sx={{ mr: 1, fontSize: '1.25rem' }} /> Hotéis
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigation('packages')}>
                                        <BeachAccess sx={{ mr: 1, fontSize: '1.25rem' }} /> Pacotes
                                    </MenuItem>
                                    <MenuItem onClick={handleMobileMenuClose}>
                                        <Language sx={{ mr: 1, fontSize: '1.25rem' }} /> Idioma
                                    </MenuItem>
                                    <MenuItem onClick={handleMobileMenuClose} component={Link} href="/profile">
                                        <AccountCircle sx={{ mr: 1, fontSize: '1.25rem' }} /> Minha Conta
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                startIcon={<AccountCircle sx={{ fontSize: '1.25rem' }} />}
                                component={Link}
                                href="/profile"
                                sx={{
                                    fontSize: '0.875rem', // Tamanho reduzido
                                    py: 0.5
                                }}
                            >
                                Minha Conta
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}