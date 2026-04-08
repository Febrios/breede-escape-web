import { sanityClient } from "./sanity";

export const fetchTestimonials = async () => {
    const data = await sanityClient.fetch(`*[_type == "testimonial"]|order(date desc){
    _id,
    name,
    text,
    "imageUrl": image.asset->url,
    date
  }`);
    return data;
};
