
import { fetchSiteSettings } from "../../lib/fetchSiteSettings";
import Image from "next/image";


export default async function Gallery() {
    const siteSettings = await fetchSiteSettings();
    const galleryContent = siteSettings?.galleryContent || "Thatched huts, wide river skies, old trees throwing afternoon shade, and campfires that outlast the stars.";
    const images = siteSettings?.galleryImages || [];

    return (
        <section className="gallery py-32 bg-[var(--moss)]" id="gallery">
            <div className="section-inner max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[var(--sage)] text-[0.72rem] font-medium tracking-widest uppercase mb-4 block">Gallery</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--cream)] mb-6">
                    The <em className="text-[var(--gold)] italic not-italic">view</em> from here
                </h2>
                <p className="gallery-intro text-[1rem] text-[rgba(245,240,232,0.65)] font-light leading-[1.8] max-w-[540px] mb-14">{galleryContent}</p>
                <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1">
                    {images.map((img: any, i: number) => (
                        <div key={img.asset?.url || i} className={`gallery-item overflow-hidden`}>
                            <Image
                                src={img.asset?.url}
                                alt={`Gallery image ${i + 1}`}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:saturate-110 hover:brightness-100 saturate-90 brightness-95"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
