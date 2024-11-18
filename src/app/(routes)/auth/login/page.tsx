'use client'
import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials);
    };

    return (
        <Box className="min-h-screen flex items-center justify-center p-4">
            <Paper className="p-8 w-full max-w-md space-y-6">
                <Typography variant="h4" component="h1" align="center">
                    Login
                </Typography>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={credentials.email}
                        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                        required
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        required
                    />

                    {error && (
                        <Typography color="error" className="text-sm">
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>

                <Typography align="center">
                    Não tem uma conta?{' '}
                    <Link href="/auth/register" className="text-primary">
                        Registre-se
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}