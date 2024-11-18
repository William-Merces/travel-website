import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const mockHotels = [
    {
        id: '1',
        name: 'Hotel Example',
        description: 'Luxury hotel in the heart of the city',
        location: {
            address: 'Rua Example, 123',
            city: 'São Paulo',
            country: 'Brasil',
            coordinates: { latitude: -23.550520, longitude: -46.633308 }
        },
        rating: 4.5,
        amenities: ['WiFi', 'Pool', 'Spa'],
        images: ['/hotels/example1.jpg'],
        rooms: [
            {
                id: '1',
                type: 'Standard',
                description: 'Comfortable room with city view',
                capacity: 2,
                price: { amount: 300, currency: 'BRL' },
                amenities: ['TV', 'minibar'],
                available: true
            }
        ]
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // TODO: Implement actual hotel search logic
        return NextResponse.json(mockHotels);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}