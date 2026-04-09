import { sanityClient } from "./sanity";

export const fetchSiteSettings = async () => {
  const data = await sanityClient.fetch(`*[_type == "siteSettings"][0]{
    contactEmail,
    phone,
    address,
    socialLinks,
    aboutText,
    rules,
    heroContent,
    heroBackground{
      asset->{url}
    },
    aboutImage,
    galleryContent
  }`);
  return data;
};
