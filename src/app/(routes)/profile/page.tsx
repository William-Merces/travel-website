'use client';

import { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Tabs,
    Tab,
    TextField,
    Button,
    Typography,
    Avatar
} from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function ProfilePage() {
    const [tabValue, setTabValue] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Add authentication logic here later
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement login logic
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement register logic
    };

    if (isLoggedIn) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={4}>
                        <Avatar sx={{ width: 80, height: 80 }}>
                            <AccountCircle fontSize="large" />
                        </Avatar>
                        <Box>
                            <Typography variant="h5">Nome do Usuário</Typography>
                            <Typography color="text.secondary">usuario@email.com</Typography>
                        </Box>
                    </Box>
                    {/* Add more profile content here */}
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Registrar" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            required
                            type="email"
                            InputProps={{
                                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Senha"
                            margin="normal"
                            required
                            type="password"
                            InputProps={{
                                startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: <AccountCircle sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            required
                            type="email"
                            InputProps={{
                                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Senha"
                            margin="normal"
                            required
                            type="password"
                            InputProps={{
                                startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            Registrar
                        </Button>
                    </Box>
                </TabPanel>
            </Paper>
        </Container>
    );
}