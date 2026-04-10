import { sanityClient } from "./sanity";

export const fetchLocation = async () => {
    const data = await sanityClient.fetch(`*[_type == 'findingUsSettings'][0]{
    content,
    towns,
    directions
  }`);
    return data;
};
