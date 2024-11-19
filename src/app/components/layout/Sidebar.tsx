import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    Typography,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    FlightTakeoff,
    Hotel,
    CardTravel,
    Person,
    Menu as MenuIcon,
    ChevronLeft,
    Dashboard,
    Bookmark,
    Settings
} from '@mui/icons-material';
import { useRouter } from 'next/router';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Voos', icon: <FlightTakeoff />, path: '/flights' },
    { text: 'Hotéis', icon: <Hotel />, path: '/hotels' },
    { text: 'Pacotes', icon: <CardTravel />, path: '/packages' },
    { text: 'Reservas', icon: <Bookmark />, path: '/bookings' },
    { text: 'Perfil', icon: <Person />, path: '/profile' },
    { text: 'Configurações', icon: <Settings />, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const theme = useTheme();
    const router = useRouter();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const drawerWidth = 240;

    const handleNavigate = (path: string) => {
        router.push(path);
        if (isMobile) {
            onClose();
        }
    };

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={open}
            onClose={onClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" noWrap component="div">
                    Travel Site
                </Typography>
                {isMobile && (
                    <IconButton onClick={onClose}>
                        <ChevronLeft />
                    </IconButton>
                )}
            </Box>

            <Divider />

            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => handleNavigate(item.path)}
                        selected={router.pathname === item.path}
                        sx={{
                            '&.Mui-selected': {
                                bgcolor: 'primary.light',
                                '&:hover': {
                                    bgcolor: 'primary.light',
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: router.pathname === item.path ? 'primary.main' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;