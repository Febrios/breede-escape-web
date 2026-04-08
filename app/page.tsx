import { fetchRooms } from "../lib/sanity";
import Image from "next/image";

export default async function Home() {
  const rooms = await fetchRooms();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold mb-8">Breede Escape Rooms</h1>
        {rooms && rooms.length > 0 ? (
          <div className="grid gap-8 w-full">
            {rooms.map((room: any) => (
              <div key={room._id} className="rounded-lg border p-6 bg-zinc-100 dark:bg-zinc-900">
                <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
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
        ) : (
          <p className="text-zinc-700 dark:text-zinc-300">No rooms found in Sanity CMS.</p>
        )}
      </main>
    </div>
  );
}
