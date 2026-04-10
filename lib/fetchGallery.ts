import { sanityClient } from "./sanity";

export const fetchGallery = async () => {
    const data = await sanityClient.fetch(`*[_type == 'gallerySettings'][0]{
    content,
    images[]{asset->{url}}
  }`);
    return data;
};
