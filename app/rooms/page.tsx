import { fetchRooms } from "../../lib/sanity";
import Image from "next/image";

export default async function RoomsPage() {
    const rooms = await fetchRooms();
    return (
        <main className="max-w-5xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Rooms</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room: any) => (
                    <div key={room._id} className="rounded-lg border bg-white dark:bg-zinc-900 p-6 flex flex-col">
                        <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
                        <p className="mb-2 text-zinc-700 dark:text-zinc-300">{room.description}</p>
                        <div className="mb-2 text-sm italic">Price per night: R{room.price}</div>
                        {room.images && room.images.length > 0 && (
                            <div className="flex flex-row gap-2 overflow-x-auto pt-2">
                                {room.images.map((img: any, i: number) =>
                                    img && img.asset ? (
                                        <Image
                                            key={img.asset._ref || img.asset._id || i}
                                            src={img.asset.url || "https://via.placeholder.com/120x90"}
                                            alt={room.name}
                                            width={120}
                                            height={90}
                                            style={{ borderRadius: 8 }}
                                        />
                                    ) : null
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}
