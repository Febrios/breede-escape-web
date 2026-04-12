import { sanityClient } from "./sanity";

export const fetchPages = async (draftMode = false) => {
    const query = draftMode
        ? `*[_type == "page"]{ _id, title, slug, content }`
        : `*[_type == "page" && !(_id in path('drafts.**'))]{ _id, title, slug, content }`;
    const data = await sanityClient.fetch(query);
    return data;
};
