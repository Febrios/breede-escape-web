"use client";
import React, { useEffect, useState } from "react";

interface CampAvailabilityProps {
    campName: string;
    calendarId: string;
}

function getMonthDays(year: number, month: number) {
    // month: 0-indexed
    return new Date(year, month + 1, 0).getDate();
}

function getDateString(date: Date) {
    return date.toISOString().split("T")[0];
}

const CampAvailability: React.FC<CampAvailabilityProps> = ({ campName, calendarId }) => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            setError(null);
            const timeMin = new Date(year, month, 1).toISOString();
            const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
            try {
                const res = await fetch(`/api/google-calendar?calendarId=${encodeURIComponent(calendarId)}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`);
                if (!res.ok) throw new Error("Failed to fetch events");
                const data = await res.json();
                setEvents(data.items || []);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [calendarId, year, month]);

    // Build a set of booked dates (YYYY-MM-DD)
    const bookedDates = new Set<string>();
    events.forEach(ev => {
        const start = ev.start?.date || ev.start?.dateTime;
        const end = ev.end?.date || ev.end?.dateTime;
        if (start && end) {
            let d = new Date(start);
            let last = new Date(end);
            // Google Calendar end date is exclusive for all-day events
            last.setDate(last.getDate() - 1);
            while (d <= last) {
                bookedDates.add(getDateString(d));
                d.setDate(d.getDate() + 1);
            }
        }
    });

    const daysInMonth = getMonthDays(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = Array(firstDay).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);

    function prevMonth() {
        if (month === 0) {
            setYear(y => y - 1);
            setMonth(11);
        } else {
            setMonth(m => m - 1);
        }
    }
    function nextMonth() {
        if (month === 11) {
            setYear(y => y + 1);
            setMonth(0);
        } else {
            setMonth(m => m + 1);
        }
    }

    return (
        <section className="camp-availability my-8">
            <h3 className="text-xl font-bold mb-4 text-[var(--forest)]">{campName} Availability</h3>
            <div className="flex items-center justify-between mb-2 gap-2">
                <button onClick={prevMonth} className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Previous month">←</button>
                <div className="font-semibold text-lg">{new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}</div>
                <button onClick={nextMonth} className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Next month">→</button>
            </div>
            <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border">
                <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="text-center">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {weeks.flat().map((day, idx) => {
                        if (day === null) return <div key={idx} />;
                        const dateStr = getDateString(new Date(year, month, day));
                        const booked = bookedDates.has(dateStr);
                        return (
                            <div
                                key={idx}
                                className={`text-center py-2 rounded cursor-default select-none font-medium ${booked ? "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300 line-through" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}
                                title={booked ? "Fully booked" : "Available"}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
                {loading && <div className="text-center text-xs mt-2 text-zinc-400">Loading…</div>}
                {error && <div className="text-center text-xs mt-2 text-red-500">{error}</div>}
                {!loading && !error && events.length === 0 && <div className="text-center text-xs mt-2 text-zinc-400">No bookings this month.</div>}
            </div>
            <div className="flex gap-4 mt-4 justify-center text-xs">
                <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-green-200 dark:bg-green-900"></span> Available</div>
                <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded bg-red-200 dark:bg-red-900"></span> Fully booked</div>
            </div>
        </section>
    );
};

export default CampAvailability;
