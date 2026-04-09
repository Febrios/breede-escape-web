
// To use the Google Reviews widget, you need your Google Place ID.
// Replace PLACE_ID below with your actual Place ID.
// See: https://developers.google.com/maps/documentation/places/web-service/place-id

import GoogleReviews from "./GoogleReviews";

export default function Reviews() {
    return (
        <section className="reviews py-32 bg-[var(--cream)]" id="reviews">
            <div className="section-inner max-w-[1200px] mx-auto px-[5vw]">
                <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">Guest Stories</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-10">
                    What our guests <em className="text-[var(--clay)] italic not-italic">say</em>
                </h2>
                <div className="flex justify-center mt-16">
                    <GoogleReviews />
                </div>
                <div className="text-xs text-gray-500 mt-4 text-center">
                    <span>Powered by Google Reviews</span>
                </div>
            </div>
        </section>
    );
}
