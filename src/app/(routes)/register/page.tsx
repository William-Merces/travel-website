'use client';

import React from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log({
            nome: formData.get('nome'),
            email: formData.get('email'),
            senha: formData.get('senha'),
            confirmarSenha: formData.get('confirmarSenha')
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    marginTop: 8,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    Criar Conta
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="nome"
                                label="Nome completo"
                                name="nome"
                                autoComplete="name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                id="senha"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmarSenha"
                                label="Confirmar senha"
                                type="password"
                                id="confirmarSenha"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Registrar
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Já tem uma conta?{' '}
                            <Button
                                color="primary"
                                sx={{ p: 0, minWidth: 'auto' }}
                                onClick={() => router.push('/login')}
                            >
                                Faça login
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;