import AvailabilityCalendar from "../components/AvailabilityCalendar";

export default function AvailabilityPage() {
    return (
        <main className="flex flex-col items-center py-16 px-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Availability</h1>
            <div className="w-full flex flex-col items-center">
                <p className="mb-4">Check which rooms are available for your dates.</p>
                <div className="rounded border p-8 bg-zinc-100 dark:bg-zinc-900">
                    <AvailabilityCalendar />
                </div>
            </div>
        </main>
    );
}
