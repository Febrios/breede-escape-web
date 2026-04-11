import { NextRequest, NextResponse } from "next/server";

interface ServiceAccountJWTParams {
    client_email: string;
    private_key: string;
    scope: string;
}

// Helper to create a JWT for Google service account
function createJWT({ client_email, private_key, scope }: ServiceAccountJWTParams) {
    const header = {
        alg: "RS256",
        typ: "JWT"
    };
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;
    const payload = {
        iss: client_email,
        scope,
        aud: "https://oauth2.googleapis.com/token",
        exp,
        iat,
    };
    function base64url(obj) {
        return Buffer.from(JSON.stringify(obj)).toString("base64url");
    }
    const encodedHeader = base64url(header);
    const encodedPayload = base64url(payload);
    const toSign = `${encodedHeader}.${encodedPayload}`;
    const sign = require("crypto").createSign("RSA-SHA256");
    sign.update(toSign);
    sign.end();
    const signature = sign.sign(private_key, "base64url");
    return `${toSign}.${signature}`;
}

// GET /api/google-calendar?calendarId=...&timeMin=...&timeMax=...
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const calendarId = searchParams.get("calendarId");
    const timeMin = searchParams.get("timeMin");
    const timeMax = searchParams.get("timeMax");

    if (!calendarId || !timeMin || !timeMax) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Load service account credentials from env variable
    let credentials;
    try {
        const credRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
        if (!credRaw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON env variable");
        credentials = JSON.parse(credRaw);
    } catch (e) {
        return NextResponse.json({ error: "Missing or invalid service account JSON env variable" }, { status: 500 });
    }

    // Step 1: Create JWT and exchange for access token
    let accessToken;
    try {
        const jwt = createJWT({
            client_email: credentials.client_email,
            private_key: credentials.private_key,
            scope: "https://www.googleapis.com/auth/calendar.readonly"
        });
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt
            })
        });
        if (!tokenRes.ok) throw new Error("Failed to get access token");
        const tokenData = await tokenRes.json();
        accessToken = tokenData.access_token;
    } catch (e) {
        return NextResponse.json({ error: "Failed to authenticate with Google" }, { status: 500 });
    }

    // Step 2: Fetch events from Google Calendar API
    try {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;
        const eventsRes = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsRes.json();
        return NextResponse.json(eventsData);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch events from Google Calendar" }, { status: 500 });
    }
}
