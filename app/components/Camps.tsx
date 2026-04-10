import Image from "next/image";
import CampSlider from "./CampSlider";
import CampAvailability from "./CampAvailability";
import { sanityClient, urlFor } from "../../lib/sanity";

export default async function Camps() {
    // Fetch camps from Sanity
    const camps = await sanityClient.fetch(`*[_type == "camp"]|order(order asc){
            _id,
            name,
            tagline,
            description,
            features,
            image,
            gallery[]{
                ...,
                asset->
            },
            link,
            googleCalendarId
        }`);

    return (
        <section className="camps py-20 sm:py-32 bg-[var(--forest)]" id="camps">
            <div className="section-inner max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[var(--sage)] text-[0.72rem] font-medium tracking-widest uppercase mb-4 block">Accommodation</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--cream)] mb-10">
                    Choose your <em className="text-[var(--gold)] italic not-italic">camp</em>
                </h2>
                <div className="camps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {camps.map((camp: any, idx: number) => (
                        <div key={camp._id} className="camp-card flex flex-col gap-4 bg-[rgba(15,26,15,0.92)] rounded-lg shadow-lg p-0 sm:p-0">
                            {camp.gallery && camp.gallery.length > 0 && (
                                <CampSlider
                                    images={camp.gallery.map((img: any, i: number) => ({
                                        url: img.asset ? urlFor(img.asset).width(900).height(560).quality(100).url() : "https://via.placeholder.com/900x560",
                                        alt: camp.name + ' photo ' + (i + 1),
                                    }))}
                                />
                            )}
                            <div className="camp-overlay bg-gradient-to-t from-[rgba(15,26,15,0.92)] via-[rgba(15,26,15,0.3)] to-transparent p-4 sm:p-10 flex flex-col justify-end">
                                <div className="camp-tag text-[0.68rem] tracking-widest uppercase text-[var(--gold)] mb-2 font-medium">{camp.tagline}</div>
                                <div className="camp-name font-serif text-3xl font-bold text-[var(--cream)] leading-tight mb-4">{camp.name}</div>
                                <p className="camp-desc text-[0.9rem] leading-[1.7] text-[rgba(245,240,232,0.75)] font-light mb-4 sm:mb-6 max-w-[90vw] sm:max-w-[340px]">{camp.description}</p>
                                <div className="camp-features flex flex-wrap gap-2 mb-6">
                                    {camp.features && camp.features.map((feat: string, i: number) => (
                                        <span key={i} className="camp-feat text-[0.72rem] tracking-wider uppercase border border-[rgba(201,168,76,0.35)] text-[var(--gold)] px-3 py-1">{feat}</span>
                                    ))}
                                </div>
                                {camp.googleCalendarId && (
                                    <CampAvailability campName={camp.name} calendarId={camp.googleCalendarId} />
                                )}
                                <a href={camp.link || "#rates"} className="camp-link inline-flex items-center gap-2 text-[var(--cream)] text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors">
                                    View Rates <span>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
