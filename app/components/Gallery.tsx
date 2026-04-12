

import { fetchGallery } from "../../lib/fetchGallery";

// Inline client wrapper to render GalleryClient as a client component
function GalleryClientWrapper(props: { galleryContent: string; images: any[] }) {
    // @ts-expect-error
    return <GalleryClient {...props} />;
}

export default async function Gallery({ draftMode = false }: { draftMode?: boolean } = {}) {
    const gallerySettings = await fetchGallery(draftMode);
    const galleryContent = gallerySettings?.content || "";
    const images = gallerySettings?.images || [];

    // Lazy import to avoid SSR issues
    const GalleryClient = (await import("./GalleryClient")).default;
    return <GalleryClient galleryContent={galleryContent} images={images} />;
}
