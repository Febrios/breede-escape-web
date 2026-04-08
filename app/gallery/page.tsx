import Gallery from "../components/Gallery";
import { fetchGalleryImages } from "../../lib/sanity";

export default async function GalleryPage() {
    const images = await fetchGalleryImages();
    return (
        <main className="flex flex-col items-center py-16 px-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Gallery</h1>
            <Gallery images={images} />
        </main>
    );
}
