// src/hooks/useAmadeus.ts
'use client';

import { useState } from 'react';
import type { FlightSearchParams, HotelSearchParams } from '@/types/amadeus';

export function useAmadeus() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function searchFlights(params: FlightSearchParams) {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/flights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to search flights');
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function searchHotels(params: HotelSearchParams) {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/hotels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to search hotels');
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        searchFlights,
        searchHotels,
    };
}