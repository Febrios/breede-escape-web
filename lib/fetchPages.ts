import { sanityClient } from "../../lib/sanity";

export const fetchPages = async () => {
    const data = await sanityClient.fetch(`*[_type == "page"]{ _id, title, slug, content }`);
    return data;
};
