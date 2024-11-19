'use client'
import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';

export const useWeather = (city: string = 'São Paulo') => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
                if (!response.ok) throw new Error('Failed to fetch weather data');
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    return { weather, loading, error };
};