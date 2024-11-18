'use client'

import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Menu as MenuIcon,
    FlightTakeoff,
    Hotel,
    CardTravel,
    Language,
    AccountCircle
} from '@mui/icons-material';
import Link from 'next/link';

const navigation = [
    { name: 'Voos', href: '/flights', icon: <FlightTakeoff /> },
    { name: 'Hotéis', href: '/hotels', icon: <Hotel /> },
    { name: 'Pacotes', href: '/packages', icon: <CardTravel /> },
];

const userMenu = [
    { name: 'Perfil', href: '/profile' },
    { name: 'Minhas Reservas', href: '/booking' },
    { name: 'Sair', href: '/auth/logout' },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const drawer = (
        <Box onClick={() => setMobileOpen(false)}>
            <List>
                {navigation.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton component={Link} href={item.href}>
                            {item.icon}
                            <ListItemText primary={item.name} sx={{ ml: 2 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <FlightTakeoff sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        VIAGENS
                    </Typography>

                    {/* Mobile menu button */}
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Mobile logo */}
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        VIAGENS
                    </Typography>

                    {/* Desktop navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {navigation.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                href={item.href}
                                startIcon={item.icon}
                                sx={{ my: 2, color: 'white', display: 'flex' }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Language selector */}
                    <IconButton sx={{ mr: 2 }} color="inherit">
                        <Language />
                    </IconButton>

                    {/* User menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir configurações">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                    <AccountCircle />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userMenu.map((item) => (
                                <MenuItem
                                    key={item.name}
                                    onClick={handleCloseUserMenu}
                                    component={Link}
                                    href={item.href}
                                >
                                    <Typography textAlign="center">{item.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;