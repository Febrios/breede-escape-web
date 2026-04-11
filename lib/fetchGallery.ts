import { sanityClient } from "./sanity";

export const fetchGallery = async () => {
  const data = await sanityClient.fetch(`*[_type == 'gallerySettings' && !(_id in path('drafts.**'))][0]{
    content,
    images[]{asset->{_id, _type, url}}
  }`);
  return data;
};
