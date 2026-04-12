import { sanityClient } from "./sanity";

export const fetchGallery = async (draftMode = false) => {
  // Always fetch all gallerySettings docs (including drafts)
  const query = `*[_type == 'gallerySettings']{_id, content, images[]{asset->{_id, _type, url}}}`;
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
  // Return the first (only) gallerySettings doc, or null
  return Array.from(docMap.values())[0] || null;
};
