// src/app/api/flights/route.ts
import Amadeus from 'amadeus';
import { NextRequest } from 'next/server';

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET,
  hostname: 'test.api.amadeus.com'
});

export async function POST(request: NextRequest) {
  try {
    const params = await request.json();
    const response = await amadeus.shopping.flightOffersSearch.get(params);
    return Response.json(response.data);
  } catch (error) {
    console.error('Flight search error:', error);
    return Response.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}