// src/app/components/WeatherWidget.tsx
'use client'
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { useWeather } from '@/hooks/useWeather';
import { WbSunny, Cloud, Grain, AcUnit } from '@mui/icons-material';

const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
        case 'clear':
            return <WbSunny sx={{ fontSize: '2rem' }} />;
        case 'clouds':
            return <Cloud sx={{ fontSize: '2rem' }} />;
        case 'rain':
            return <Grain sx={{ fontSize: '2rem' }} />;
        case 'snow':
            return <AcUnit sx={{ fontSize: '2rem' }} />;
        default:
            return <WbSunny sx={{ fontSize: '2rem' }} />;
    }
};

export const WeatherWidget = () => {
    const { weather, loading, error } = useWeather();

    if (loading) return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100px'
            }}
        >
            <CircularProgress size={24} sx={{ color: 'white' }} />
        </Paper>
    );

    if (error || !weather) return null;

    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getWeatherIcon(weather.condition)}
                <Typography variant="h6" sx={{ fontSize: '1.125rem' }}>
                    {weather.temperature}°C
                </Typography>
            </Box>
            {weather.forecast && weather.forecast.length > 0 && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {weather.forecast.slice(0, 3).map((day, index) => (
                        <Box key={index} sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" display="block">
                                {day.day}
                            </Typography>
                            {getWeatherIcon(day.condition)}
                            <Typography variant="caption" display="block">
                                {day.temperature}°C
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Paper>
    );
};