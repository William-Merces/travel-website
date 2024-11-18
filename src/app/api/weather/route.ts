import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');

        // TODO: Integrate with actual weather API
        const mockWeather = {
            city,
            temperature: 25,
            condition: 'sunny',
            humidity: 65,
            windSpeed: 12
        };

        return NextResponse.json(mockWeather);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}