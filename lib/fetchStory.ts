import { sanityClient } from "./sanity";

export const fetchStory = async () => {
    const data = await sanityClient.fetch(`*[_type == "storySettings"][0]{
    content,
    image {
      asset->{url}
    }
  }`);
    return data;
};
