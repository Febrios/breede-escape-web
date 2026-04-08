import { sanityClient } from "./sanity";

export const fetchGalleryImages = async () => {
    const data = await sanityClient.fetch(`*[_type == "galleryImage"]{ _id, "url": image.asset->url, alt, caption, category }`);
    return data;
};
