import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-04-08", // use today's date or latest
  useCdn: false, // `false` for fresh data
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}
