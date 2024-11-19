import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton,
    Stack,
    Divider
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Phone,
    Email,
    LocationOn
} from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 6,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Sobre Nós
                        </Typography>
                        <Typography variant="body2">
                            Somos especialistas em viagens, oferecendo as melhores opções de voos
                            e pacotes turísticos para destinos nacionais e internacionais.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Links Rápidos
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="/flights" color="inherit">Voos</Link>
                            <Link href="/hotels" color="inherit">Hotéis</Link>
                            <Link href="/packages" color="inherit">Pacotes</Link>
                            <Link href="/profile" color="inherit">Minha Conta</Link>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Contato
                        </Typography>
                        <Stack spacing={2}>
                            <Box display="flex" alignItems="center">
                                <Phone sx={{ mr: 1 }} />
                                <Typography variant="body2">0800 123 4567</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Email sx={{ mr: 1 }} />
                                <Typography variant="body2">contato@seusite.com.br</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <LocationOn sx={{ mr: 1 }} />
                                <Typography variant="body2">São Paulo, SP</Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Redes Sociais
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} Seu Site de Viagens. Todos os direitos reservados.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;