import { sanityClient } from "./sanity";

export const fetchCamps = async (draftMode = false) => {
    // Always fetch all camps (including drafts)
    const query = `*[_type == "camp"]|order(order asc){
        _id,
        name,
        tagline,
        description,
        features,
        gallery[]{
            ...,
            asset->
        },
        link,
        googleCalendarId
    }`;
    const camps = await sanityClient.fetch(query) || [];

    // Group by base id (strip 'drafts.' prefix)
    const campMap = new Map();
    for (const camp of camps) {
        const baseId = camp._id.startsWith('drafts.') ? camp._id.replace('drafts.', '') : camp._id;
        if (draftMode) {
            // Prefer draft if available
            if (!campMap.has(baseId) || camp._id.startsWith('drafts.')) {
                campMap.set(baseId, camp);
            }
        } else {
            // Only use published (non-draft) docs
            if (!camp._id.startsWith('drafts.')) {
                campMap.set(baseId, camp);
            }
        }
    }
    return Array.from(campMap.values());
};
