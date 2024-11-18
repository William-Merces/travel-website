import { amadeus } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: searchParams.get('origin'),
            destinationLocationCode: searchParams.get('destination'),
            departureDate: searchParams.get('departureDate'),
            returnDate: searchParams.get('returnDate'),
            adults: searchParams.get('passengers') || '1',
            max: 10
        });

        const formattedFlights = response.data.map(flight => ({
            id: flight.id,
            origin: {
                code: flight.itineraries[0].segments[0].departure.iataCode,
                city: flight.itineraries[0].segments[0].departure.iataCode
            },
            destination: {
                code: flight.itineraries[0].segments[0].arrival.iataCode,
                city: flight.itineraries[0].segments[0].arrival.iataCode
            },
            departureDate: flight.itineraries[0].segments[0].departure.at,
            arrivalDate: flight.itineraries[0].segments[0].arrival.at,
            price: {
                amount: flight.price.total,
                currency: flight.price.currency
            },
            airline: {
                name: flight.validatingAirlineCodes[0],
                logo: `/airlines/${flight.validatingAirlineCodes[0].toLowerCase()}.png`
            }
        }));

        return NextResponse.json(formattedFlights);
    } catch (error) {
        console.error('Amadeus API error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}