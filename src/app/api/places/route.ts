import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const input = searchParams.get('input');

    if (!input) {
        return NextResponse.json({ error: 'Missing input parameter' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Server-side only (no NEXT_PUBLIC_)

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:th&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
    }
}
