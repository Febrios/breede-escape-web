import { fetchGalleryImages } from "../../lib/sanity";
import Image from "next/image";

export default async function GalleryPage() {
    const images = await fetchGalleryImages();
    return (
        <main className="max-w-5xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((img: any, i: number) => (
                    <div key={i} className="rounded-lg overflow-hidden shadow bg-white dark:bg-zinc-900">
                        <Image
                            src={img.url}
                            alt={img.alt || `Gallery image ${i + 1}`}
                            width={400}
                            height={300}
                            className="w-full h-auto object-cover"
                        />
                        {img.caption && (
                            <div className="p-2 text-sm text-zinc-700 dark:text-zinc-300">{img.caption}</div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}
