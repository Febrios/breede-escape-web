export default function Location() {
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
                            We're situated 15km outside Bonnievale, centrally placed between the Overberg, the Langeberg Meander and the Robertson Wine Valley. Nearby towns:
                        </p>
                        <ul className="nearby-towns list-none mb-8">
                            <li className="flex items-center justify-between py-3 border-b border-[rgba(245,240,232,0.1)] first:border-t"><span className="town-name text-[var(--cream)]">Bonnievale</span><span className="town-dist text-[var(--sage)] text-xs tracking-wider">15 km</span></li>
                            <li className="flex items-center justify-between py-3 border-b border-[rgba(245,240,232,0.1)]"><span className="town-name text-[var(--cream)]">Swellendam</span><span className="town-dist text-[var(--sage)] text-xs tracking-wider">~40 km</span></li>
                            <li className="flex items-center justify-between py-3 border-b border-[rgba(245,240,232,0.1)]"><span className="town-name text-[var(--cream)]">Robertson</span><span className="town-dist text-[var(--sage)] text-xs tracking-wider">~24 km</span></li>
                            <li className="flex items-center justify-between py-3 border-b border-[rgba(245,240,232,0.1)]"><span className="town-name text-[var(--cream)]">Montagu</span><span className="town-dist text-[var(--sage)] text-xs tracking-wider">~45 km</span></li>
                        </ul>
                        <div className="directions-list mt-10">
                            <div className="direction-item flex gap-6 py-4 border-b border-[rgba(245,240,232,0.08)]">
                                <div className="dir-from text-[var(--gold)] font-medium min-w-[100px] text-xs tracking-wider uppercase pt-1">From N1</div>
                                <div className="dir-text text-[rgba(245,240,232,0.6)] leading-[1.6] font-light text-sm">Follow N1 through Worcester → turn RIGHT into Rabie Street (2.7 km) → follow signs to Robertson then Bonnievale → follow Breede Escape tourism signs.</div>
                            </div>
                            <div className="direction-item flex gap-6 py-4 border-b border-[rgba(245,240,232,0.08)]">
                                <div className="dir-from text-[var(--gold)] font-medium min-w-[100px] text-xs tracking-wider uppercase pt-1">From N2</div>
                                <div className="dir-text text-[rgba(245,240,232,0.6)] leading-[1.6] font-light text-sm">Follow N2 past Caledon → take LEFT at Stormsvlei for Bonnievale → carry on 15 km → turn RIGHT for Gelukshoop/Drew → follow Breede Escape signs for 2.7 km.</div>
                            </div>
                            <div className="direction-item flex gap-6 py-4 border-b border-[rgba(245,240,232,0.08)]">
                                <div className="dir-from text-[var(--gold)] font-medium min-w-[100px] text-xs tracking-wider uppercase pt-1">Swellendam</div>
                                <div className="dir-text text-[rgba(245,240,232,0.6)] leading-[1.6] font-light text-sm">N2 toward Ashton → turn RIGHT onto R60 (25 km) → turn LEFT for Bonnievale/Drew → cross the Breede River bridge → turn RIGHT at T-junction → follow signs.</div>
                            </div>
                        </div>
                    </div>
                    <div className="reveal">
                        <div className="map-placeholder bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] h-[180px] sm:h-[380px] flex flex-col items-center justify-center gap-4 text-[rgba(245,240,232,0.4)] text-sm tracking-wider uppercase">
                            <div className="pin-icon text-4xl opacity-40">📍</div>
                            <div>Breede Escape · Bonnievale 6730</div>
                            <div className="text-xs opacity-50 mt-1">+27 82 895 7951</div>
                            <a href="https://maps.google.com/?q=Breede+Escape+Bonnievale" target="_blank" className="btn-primary bg-[var(--clay)] text-[var(--cream)] px-6 py-3 rounded-sm font-medium uppercase text-sm no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors mt-4">Open in Maps</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
