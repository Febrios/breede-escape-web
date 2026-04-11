import { sanityClient } from "./sanity";

export const fetchPages = async () => {
    const data = await sanityClient.fetch(`*[_type == "page" && !(_id in path('drafts.**'))]{ _id, title, slug, content }`);
    return data;
};
