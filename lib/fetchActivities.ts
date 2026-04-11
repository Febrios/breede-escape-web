import { sanityClient } from "./sanity";

export const fetchActivities = async () => {
    const data = await sanityClient.fetch(`*[_type == 'generalSettings' && !(_id in path('drafts.**'))][0].activities`);
    return data || [];
};
