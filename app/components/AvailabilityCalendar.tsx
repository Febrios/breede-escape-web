
"use client";
import React, { useState } from "react";

const today = new Date();
const getDateString = (date: Date) => date.toISOString().split("T")[0];

export default function AvailabilityCalendar() {
    const [start, setStart] = useState(getDateString(today));
    const [end, setEnd] = useState(getDateString(new Date(today.getTime() + 86400000)));
    const [status, setStatus] = useState<string | null>(null);

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with backend/booking API
        setStatus("All rooms available! (Demo)");
    };

    return (
        <form className="flex flex-col gap-4 items-center" onSubmit={handleCheck}>
            <div className="flex gap-2">
                <label className="flex flex-col text-sm font-medium">
                    Check-in
                    <input type="date" value={start} onChange={e => setStart(e.target.value)} className="border rounded px-2 py-1" required />
                </label>
                <label className="flex flex-col text-sm font-medium">
                    Check-out
                    <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="border rounded px-2 py-1" required />
                </label>
            </div>
            <button type="submit" className="bg-zinc-900 text-zinc-100 rounded px-4 py-2 font-semibold hover:bg-zinc-700">Check Availability</button>
            {status && <div className="text-green-700 dark:text-green-400 font-medium mt-2">{status}</div>}
        </form>
    );
}
