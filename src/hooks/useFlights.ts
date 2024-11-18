'use client';

import { useState } from 'react';
import { Flight } from '@/types/flight';

export function useFlights() {
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [error, setError] = useState<string | null>(null);

    const searchFlights = async (searchParams: any) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams),
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar voos');
            }

            const data = await response.json();
            setFlights(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar voos');
        } finally {
            setLoading(false);
        }
    };

    return { flights, loading, error, searchFlights };
}