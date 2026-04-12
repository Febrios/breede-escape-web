import { sanityClient } from "./sanity";

export const fetchActivities = async (draftMode = false) => {
    // Always fetch all generalSettings docs (including drafts)
    const query = `*[_type == 'generalSettings']{_id, activities}`;
    const docs = await sanityClient.fetch(query) || [];

    // Group by base id (strip 'drafts.' prefix)
    const docMap = new Map();
    for (const doc of docs) {
        const baseId = doc._id.startsWith('drafts.') ? doc._id.replace('drafts.', '') : doc._id;
        if (draftMode) {
            if (!docMap.has(baseId) || doc._id.startsWith('drafts.')) {
                docMap.set(baseId, doc);
            }
        } else {
            if (!doc._id.startsWith('drafts.')) {
                docMap.set(baseId, doc);
            }
        }
    }
    // Return the activities from the first (only) settings doc, or []
    const first = Array.from(docMap.values())[0];
    return first?.activities || [];
};
