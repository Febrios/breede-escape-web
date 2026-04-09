import Image from "next/image";
import { fetchSiteSettings } from "../../lib/fetchSiteSettings";
import { urlFor } from "../../lib/sanity";

export default async function About() {
    const siteSettings = await fetchSiteSettings();
    return (
        <section className="about py-20 sm:py-32 bg-[var(--cream)]" id="about">
            <div className="section-inner max-w-[1600px] mx-auto px-[3vw]">
                <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-20 items-center">
                    <div className="about-text">
                        <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">Our Story</span>
                        <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-6">
                            A place where<br />
                            <em className="text-[var(--clay)] italic not-italic">time slows down</em>
                        </h2>
                        {siteSettings?.aboutText && (
                            <p className="text-[1.05rem] leading-[1.85] text-[#3a4a3a] font-light mb-5 whitespace-pre-line">
                                {siteSettings.aboutText}
                            </p>
                        )}
                    </div>
                    <div className="about-image-wrap relative">
                        <Image
                            className="about-image w-full h-[48vw] min-h-[180px] max-h-[320px] sm:h-[500px] object-cover saturate-[0.9]"
                            src={siteSettings?.aboutImage ? urlFor(siteSettings.aboutImage).width(900).height(600).quality(100).url() : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80"}
                            alt="River camp at dusk"
                            width={600}
                            height={500}
                        />
                        <div className="about-image-accent absolute bottom-[-1rem] left-[-1rem] w-[90px] h-[90px] sm:bottom-[-2rem] sm:left-[-2rem] sm:w-[200px] sm:h-[200px] bg-[var(--clay)] opacity-10 z-[-1] rounded-full"></div>
                        <div className="about-since absolute top-[-0.75rem] right-[-0.75rem] sm:top-[-1.5rem] sm:right-[-1.5rem] bg-[var(--forest)] text-[var(--gold)] px-4 py-2 sm:px-6 sm:py-4 text-center">
                            <strong className="text-2xl block leading-none font-serif">1994</strong>
                            <span className="text-[0.65rem] tracking-widest uppercase text-[var(--sand)]">Est. on the Breede</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
