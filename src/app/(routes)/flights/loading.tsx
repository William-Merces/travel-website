import { Box, CircularProgress, Container } from '@mui/material';

export default function Loading() {
    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        </Container>
    );
}