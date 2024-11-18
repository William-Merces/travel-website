// src/app/api/airports/route.ts
import { NextRequest } from 'next/server';
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET,
  hostname: 'test.api.amadeus.com'
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return Response.json({ error: 'Keyword is required' }, { status: 400 });
  }

  try {
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: 'AIRPORT,CITY'
    });
    return Response.json(response.data);
  } catch (error) {
    console.error('Error fetching airports:', error);
    return Response.json(
      { error: 'Failed to fetch airports' },
      { status: 500 }
    );
  }
}