import { sanityClient } from "./sanity";

export const fetchRates = async (draftMode = false) => {
    // Always fetch all rates (including drafts)
    const query = `*[_type == "rate"]|order(order asc){
        _id,
        label,
        name,
        price,
        unit,
        includes,
        note,
        "campName": camp->name
    }`;
    const rates = await sanityClient.fetch(query) || [];

    // Group by base id (strip 'drafts.' prefix)
    const rateMap = new Map();
    for (const rate of rates) {
        const baseId = rate._id.startsWith('drafts.') ? rate._id.replace('drafts.', '') : rate._id;
        if (draftMode) {
            // Prefer draft if available
            if (!rateMap.has(baseId) || rate._id.startsWith('drafts.')) {
                rateMap.set(baseId, rate);
            }
        } else {
            // Only use published (non-draft) docs
            if (!rate._id.startsWith('drafts.')) {
                rateMap.set(baseId, rate);
            }
        }
    }
    return Array.from(rateMap.values());
};
