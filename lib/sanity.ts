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
