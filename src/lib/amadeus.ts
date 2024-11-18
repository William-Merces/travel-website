// lib/amadeus.ts
'use server';

import Amadeus from 'amadeus';
import { FlightSearchParams, FlightOffer, PriceDetails, ApiResponse } from '../types/amadeus';

const amadeus = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET,
    hostname: 'test.api.amadeus.com'
});

export const searchFlights = async (params: FlightSearchParams): Promise<FlightOffer[]> => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            ...params,
            max: 20
        });
        return response.data;
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }
};

export const getFlightPrice = async (flightOfferId: string): Promise<PriceDetails> => {
    try {
        const response = await amadeus.shopping.flightOffers.pricing.post(
            JSON.stringify({
                data: {
                    type: 'flight-offers-pricing',
                    flightOffers: [{ id: flightOfferId }]
                }
            })
        ) as ApiResponse<PriceDetails>;
        return response.data;
    } catch (error) {
        console.error('Error getting flight price:', error);
        throw error;
    }
};

export const confirmBooking = async (flightOffer: FlightOffer, travelers: unknown[]): Promise<unknown> => {
    try {
        const response = await amadeus.booking.flightOrders.post(
            JSON.stringify({
                data: {
                    type: 'flight-order',
                    flightOffers: [flightOffer],
                    travelers
                }
            })
        );
        return response.data;
    } catch (error) {
        console.error('Error confirming booking:', error);
        throw error;
    }
};

export default amadeus;