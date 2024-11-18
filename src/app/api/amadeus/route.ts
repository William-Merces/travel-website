// src/app/api/amadeus/route.ts
import { NextResponse } from 'next/server';
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET,
    hostname: 'test.api.amadeus.com'
});

export async function POST(request: Request) {
    const body = await request.json();
    const { action, params } = body;

    try {
        switch (action) {
            case 'searchFlights':
                const flights = await amadeus.shopping.flightOffersSearch.get(params);
                return NextResponse.json(flights.data);

            case 'getFlightPrice':
                const price = await amadeus.shopping.flightOffers.pricing.post(
                    JSON.stringify({
                        data: {
                            type: 'flight-offers-pricing',
                            flightOffers: [{ id: params.flightId }]
                        }
                    })
                );
                return NextResponse.json(price.data);

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Amadeus API error:', error);
        return NextResponse.json({ error: 'API Error' }, { status: 500 });
    }
}