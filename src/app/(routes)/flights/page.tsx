// src/app/(routes)/flights/page.tsx
'use client';

import React from 'react';
import FlightSearchForm from '@/components/flights/FlightSearchForm';
import FlightCard from '@/components/flights/FlightCard';
import SearchFilters from '@/components/shared/SearchFilters';
import { useAmadeus } from '@/hooks/useAmadeus';

export default function FlightsPage() {
  const { loading, error, searchFlights } = useAmadeus();
  const [flights, setFlights] = React.useState([]);

  const handleSearch = async (searchParams) => {
    const results = await searchFlights(searchParams);
    if (results) {
      setFlights(results);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <FlightSearchForm onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SearchFilters />
        <div className="md:col-span-3 space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            flights.map((flight) => (
              <FlightCard key={flight.id} {...flight} />
            ))
          )}
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
}