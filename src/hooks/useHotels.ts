import { useState, useEffect } from 'react';
import { Hotel } from '@/types/hotel';

export const useHotels = (searchParams?: any) => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams(searchParams);
                const response = await fetch(`/api/hotels?${params}`);
                if (!response.ok) throw new Error('Failed to fetch hotels');
                const data = await response.json();
                setHotels(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [searchParams]);

    return { hotels, loading, error };
};
