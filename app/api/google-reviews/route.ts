
import { NextRequest, NextResponse } from 'next/server';
import { normalizeReview } from '../../../lib/normalizeGoogleReview';

export async function GET() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return NextResponse.json({ error: 'Missing API key or Place ID' }, { status: 500 });
    }

    // Use the new Places API (New) endpoint
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error || !data.reviews) {
        return NextResponse.json({ error: 'No reviews found or API error', details: data }, { status: 500 });
    }

    // Normalize to the expected shape for the frontend
    return NextResponse.json({
        reviews: Array.isArray(data.reviews) ? data.reviews.map(normalizeReview) : [],
        rating: data.rating,
        user_ratings_total: data.userRatingCount
    });
}
