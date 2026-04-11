import { sanityClient } from "./sanity";

export const fetchHero = async () => {
  const data = await sanityClient.fetch(`*[_type == "heroSettings" && !(_id in path('drafts.**'))][0]{
      content,
      backgroundImage
    }`);
  return data;
};
