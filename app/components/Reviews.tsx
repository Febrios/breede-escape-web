import { sanityClient } from "../../lib/sanity";
import Image from "next/image";

export default async function Reviews() {
    // Fetch testimonials from Sanity
    const testimonials = await sanityClient.fetch(`*[_type == "testimonial"]|order(order asc){
    _id,
    name,
    text,
    source,
    stars,
    "imageUrl": image.asset->url
  }`);

    return (
        <section className="reviews py-32 bg-[var(--cream)]" id="reviews">
            <div className="section-inner max-w-[1200px] mx-auto px-[5vw]">
                <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">Guest Stories</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-10">
                    What our guests <em className="text-[var(--clay)] italic not-italic">say</em>
                </h2>
                <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {testimonials.map((t: any) => (
                        <div key={t._id} className="review-card bg-white shadow-lg p-10 relative flex flex-col items-start">
                            <div className="review-stars text-[var(--gold)] text-base mb-2">{'★★★★★'.slice(0, t.stars || 5)}</div>
                            <p className="review-text text-[0.92rem] leading-[1.8] text-[#3a4a3a] font-light italic mb-6">{t.text}</p>
                            <div className="review-author font-medium text-[var(--forest)] text-sm">{t.name}</div>
                            {t.source && <div className="review-source text-xs text-[#8a9a8a]">{t.source}</div>}
                            {t.imageUrl && (
                                <Image src={t.imageUrl} alt={t.name} width={48} height={48} className="rounded-full mt-4 border" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
