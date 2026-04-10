import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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

    // Authenticate with Google
    const jwt = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth: jwt });

    try {
        const events = await calendar.events.list({
            calendarId,
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
        });
        return NextResponse.json(events.data);
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Failed to fetch events" }, { status: 500 });
    }
}
