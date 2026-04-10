import { sanityClient } from "./sanity";

export const fetchGeneral = async () => {
    const data = await sanityClient.fetch(`*[_type == 'generalSettings'][0]{
    phone,
    email,
    socials,
    rules
  }`);
    return data;
};
