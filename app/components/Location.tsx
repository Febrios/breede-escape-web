
import { fetchLocation } from "../../lib/fetchLocation";

export default async function Location() {
    const location = await fetchLocation();
    const towns = location?.towns || [];
    const directions = location?.directions || [];
    return (
        <section className="location py-20 sm:py-32 bg-[var(--forest)]" id="location">
            <div className="section-inner max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[var(--sage)] text-[0.72rem] font-medium tracking-widest uppercase mb-4 block">Finding Us</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--cream)] mb-10">
                    Getting <em className="text-[var(--gold)] italic not-italic">here</em>
                </h2>
                <div className="location-grid grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-20 items-start">
                    <div>
                        <p className="location-desc text-[1rem] text-[rgba(245,240,232,0.7)] leading-[1.85] font-light mb-8">
                            {location?.content || "We're situated 15km outside Bonnievale, centrally placed between the Overberg, the Langeberg Meander and the Robertson Wine Valley. Nearby towns:"}
                        </p>
                        <ul className="nearby-towns list-none mb-8">
                            {towns.map((town: any, idx: number) => (
                                <li key={idx} className="flex items-center justify-between py-3 border-b border-[rgba(245,240,232,0.1)] first:border-t">
                                    <span className="town-name text-[var(--cream)]">{town.name}</span>
                                    <span className="town-dist text-[var(--sage)] text-xs tracking-wider">{town.distance}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="directions-list mt-10">
                            {directions.map((dir: any, idx: number) => (
                                <div key={idx} className="direction-item flex gap-6 py-4 border-b border-[rgba(245,240,232,0.08)]">
                                    <div className="dir-from text-[var(--gold)] font-medium min-w-[100px] text-xs tracking-wider uppercase pt-1">{dir.name}</div>
                                    <div className="dir-text text-[rgba(245,240,232,0.6)] leading-[1.6] font-light text-sm">{dir.direction}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal">
                        <div className="google-map-embed border border-[rgba(255,255,255,0.1)] h-[180px] sm:h-[380px] rounded overflow-hidden">
                            <iframe
                                title="Breede Escape Location"
                                src="https://www.google.com/maps?q=Breede+Escape+Bonnievale&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
