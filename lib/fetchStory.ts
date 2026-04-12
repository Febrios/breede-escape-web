import { sanityClient } from "./sanity";

export const fetchStory = async (draftMode = false) => {
  // Always fetch all storySettings docs (including drafts)
  const query = `*[_type == "storySettings"]{_id, content, image { asset->{url} }, badges[]{ icon, url, title }}`;
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
  // Return the first (only) storySettings doc, or null
  return Array.from(docMap.values())[0] || null;
};
