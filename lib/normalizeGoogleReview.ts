// Utility to normalize Google Places API (New) review objects for the frontend
export function normalizeReview(review: any) {
    // The new API returns review.text as an object: { text: string, languageCode: string }
    return {
        author_name: review.authorAttribution?.displayName || review.authorAttribution?.name || "Anonymous",
        profile_photo_url: review.authorAttribution?.photoUri || "",
        rating: review.rating,
        relative_time_description: review.relativePublishTimeDescription || "",
        text: typeof review.text === "object" && review.text.text ? review.text.text : review.text || ""
    };
}
