import { sanityClient } from "./sanity";

export const fetchExperiences = async () => {
    const data = await sanityClient.fetch(`*[_type == "experience" && !(_id in path('drafts.**'))]{ _id, title, description, "imageUrl": image.asset->url, category }`);
    return data;
};
