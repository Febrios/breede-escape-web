import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-04-08", // use today's date or latest
  useCdn: false, // `false` for fresh data
  token: process.env.SANITY_API_TOKEN,
});

// Example: Fetch all rooms
export const fetchRooms = async () => {
  return sanityClient.fetch(`*[_type == "room"]{_id, name, description, price, images}`);
};

// Fetch all images from all rooms for the gallery
export const fetchGalleryImages = async () => {
  const data = await sanityClient.fetch(`*[_type == \"room\" && defined(images)]{images[]{..., asset->}}`);
  // Flatten and map to { url, alt }
  const images = (data || [])
    .flatMap((room: any) => room.images || [])
    .map((img: any) => ({
      url: img?.asset?.url || "https://via.placeholder.com/800x600",
      alt: img?.alt || "Room image"
    }));
  return images;
};
