// components/flights/FlightDetails.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAmadeus } from '@/hooks/useAmadeus';
import type { FlightOffer, PriceDetails } from '@/types/amadeus';

interface FlightDetailsProps {
    flightId: string;
}

export default function FlightDetails({ flightId }: FlightDetailsProps) {
    const { loading, error, getFlightPrice, confirmBooking } = useAmadeus();
    const [flightDetails, setFlightDetails] = React.useState<FlightOffer | null>(null);
    const [priceDetails, setPriceDetails] = React.useState<PriceDetails | null>(null);

    React.useEffect(() => {
        const fetchFlightDetails = async () => {
            const price = await getFlightPrice(flightId);
            if (price) {
                setPriceDetails(price);
                setFlightDetails(price.flightOffers[0]);
            }
        };

        fetchFlightDetails();
    }, [flightId, getFlightPrice]);

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-6">{error}</div>;
    }

    if (!flightDetails) {
        return <div className="text-center p-6">No flight details found</div>;
    }

    const mainSegment = flightDetails.itineraries[0].segments[0];
    
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Flight Details</h1>
                
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Departure</h2>
                        <p className="text-gray-600">{mainSegment.departure.iataCode}</p>
                        <p className="text-gray-600">Terminal {mainSegment.departure.terminal}</p>
                        <p className="text-gray-600">
                            {new Date(mainSegment.departure.at).toLocaleString()}
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Arrival</h2>
                        <p className="text-gray-600">{mainSegment.arrival.iataCode}</p>
                        <p className="text-gray-600">Terminal {mainSegment.arrival.terminal}</p>
                        <p className="text-gray-600">
                            {new Date(mainSegment.arrival.at).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Flight Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-gray-600">
                            Airline: {mainSegment.carrierCode} {mainSegment.number}
                        </p>
                        <p className="text-gray-600">
                            Aircraft: {mainSegment.aircraft.code}
                        </p>
                        <p className="text-gray-600">
                            Duration: {mainSegment.duration.replace('PT', '')}
                        </p>
                        <p className="text-gray-600">
                            Available Seats: {flightDetails.numberOfBookableSeats}
                        </p>
                    </div>
                </div>

                {priceDetails && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Base Fare</span>
                                <span>{priceDetails.basePrice} {flightDetails.price.currency}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes</span>
                                <span>{priceDetails.taxes} {flightDetails.price.currency}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>{priceDetails.total} {flightDetails.price.currency}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-end space-x-4">
                    <Link href="/flights">
                        <Button variant="outline">Back to Search</Button>
                    </Link>
                    <Link href={`/checkout?flightId=${flightId}`}>
                        <Button>Continue to Booking</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}