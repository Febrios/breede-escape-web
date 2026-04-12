import { sanityClient } from "./sanity";

export const fetchExperiences = async (draftMode = false) => {
    // Always fetch all experiences (including drafts)
    const query = `*[_type == "experience"]{ _id, title, description, "imageUrl": image.asset->url, category }`;
    const experiences = await sanityClient.fetch(query) || [];

    // Group by base id (strip 'drafts.' prefix)
    const expMap = new Map();
    for (const exp of experiences) {
        const baseId = exp._id.startsWith('drafts.') ? exp._id.replace('drafts.', '') : exp._id;
        if (draftMode) {
            if (!expMap.has(baseId) || exp._id.startsWith('drafts.')) {
                expMap.set(baseId, exp);
            }
        } else {
            if (!exp._id.startsWith('drafts.')) {
                expMap.set(baseId, exp);
            }
        }
    }
    return Array.from(expMap.values());
};
