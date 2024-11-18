// src/components/shared/SearchFilters.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (min: number, max: number) => void;
    stops: string[];
    onStopsChange: (stops: string[]) => void;
}

export default function SearchFilters({
    minPrice,
    maxPrice,
    onPriceChange,
    stops,
    onStopsChange
}: FilterProps) {
    return (
        <div className="p-4 space-y-4 border rounded-lg">
            <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
                        className="w-24 p-2 border rounded"
                        placeholder="Min"
                    />
                    <span>to</span>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
                        className="w-24 p-2 border rounded"
                        placeholder="Max"
                    />
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-2">Stops</h3>
                <div className="space-y-2">
                    {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                        <label key={stop} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={stops.includes(stop)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        onStopsChange([...stops, stop]);
                                    } else {
                                        onStopsChange(stops.filter((s) => s !== stop));
                                    }
                                }}
                                className="rounded"
                            />
                            {stop}
                        </label>
                    ))}
                </div>
            </div>

            <Button
                onClick={() => {
                    onPriceChange(0, 10000);
                    onStopsChange([]);
                }}
                variant="outline"
                className="w-full"
            >
                Reset Filters
            </Button>
        </div>
    );
}