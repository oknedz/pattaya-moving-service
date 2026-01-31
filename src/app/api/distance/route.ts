import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    if (!origin || !destination) {
        return NextResponse.json({ error: 'Missing origin or destination' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.rows[0]?.elements[0]?.status === 'OK') {
            const element = data.rows[0].elements[0];
            const distanceInMeters = element.distance.value;
            const distanceInKm = distanceInMeters / 1000;

            // Calculate price: 500 THB base + 120 THB per km
            const basePrice = 500;
            const pricePerKm = 120;
            const totalPrice = basePrice + (distanceInKm * pricePerKm);

            return NextResponse.json({
                distance: {
                    text: element.distance.text,
                    km: parseFloat(distanceInKm.toFixed(2))
                },
                duration: element.duration.text,
                price: {
                    base: basePrice,
                    perKm: pricePerKm,
                    total: Math.round(totalPrice)
                }
            });
        } else {
            return NextResponse.json({ error: 'Could not calculate distance' }, { status: 400 });
        }
    } catch (error) {
        console.error('Distance calculation error:', error);
        return NextResponse.json({ error: 'Failed to calculate distance' }, { status: 500 });
    }
}
