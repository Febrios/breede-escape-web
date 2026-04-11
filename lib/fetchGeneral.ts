import { sanityClient } from "./sanity";

export const fetchGeneral = async () => {
  const data = await sanityClient.fetch(`*[_type == 'generalSettings' && !(_id in path('drafts.**'))][0]{
    phone,
    email,
    socials,
    rules,
    contactUsContent
  }`);
  return data;
};
