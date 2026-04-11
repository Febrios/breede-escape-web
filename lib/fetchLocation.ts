import { sanityClient } from "./sanity";

export const fetchLocation = async () => {
  const data = await sanityClient.fetch(`*[_type == 'findingUsSettings' && !(_id in path('drafts.**'))][0]{
    content,
    towns,
    directions
  }`);
  return data;
};
