import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: Implement actual authentication logic
        const mockUser = {
            id: '1',
            email: body.email,
            name: 'User Name'
        };

        return NextResponse.json(mockUser);
    } catch (error) {
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 401 }
        );
    }
}
