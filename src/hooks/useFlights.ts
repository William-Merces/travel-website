import { useState, useEffect } from 'react';
import { Flight } from '@/types/flight';

export const useFlights = (searchParams?: any) => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchParams) return;

        const fetchFlights = async () => {
            setLoading(true);
            try {
                const queryString = new URLSearchParams(searchParams).toString();
                const response = await fetch(`/api/flights?${queryString}`);
                if (!response.ok) throw new Error('Failed to fetch flights');
                const data = await response.json();
                setFlights(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [searchParams]);

    return { flights, loading, error };
};