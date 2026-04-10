
import { fetchGeneral } from "../../lib/fetchGeneral";

export default async function Booking() {
    const general = await fetchGeneral();
    return (
        <section className="booking py-20 sm:py-32 bg-[var(--cream)] text-center text-[var(--forest)]" id="booking">
            <div className="section-inner flex flex-col items-center max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">Make a Reservation</span>
                <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-6">
                    Ready to <em className="text-[var(--clay)] italic not-italic block">escape?</em>
                </h2>
                <p className="text-[1.05rem] leading-[1.85] text-[#3a4a3a] font-light mb-5 max-w-[95vw] sm:max-w-[480px] mx-auto">
                    {general?.contactUsContent}
                </p>
                <div className="flex gap-2 sm:gap-4 flex-wrap justify-center mb-8 sm:mb-10">
                    <a href={`tel:${general?.phone || ''}`} className="btn-primary bg-[var(--clay)] text-[var(--cream)] px-5 py-3 sm:px-8 sm:py-4 rounded-sm font-medium uppercase text-sm sm:text-base no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">📞 Call Us Now</a>
                    <a href={`mailto:${general?.email || ''}`} className="btn-outline border border-[var(--clay)] text-[var(--clay)] px-5 py-3 sm:px-8 sm:py-4 rounded-sm font-medium uppercase text-sm sm:text-base no-underline hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">✉ Send an Email</a>
                </div>
                <div className="booking-contact flex flex-col items-center gap-2 mt-6 sm:mt-8 text-[var(--forest)] text-xs tracking-widest uppercase px-2">
                    <span>Find us on</span>
                    {general?.socials && Array.isArray(general.socials) && general.socials.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mt-1 mb-1">
                            {general.socials.map((link: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--clay)] underline hover:text-[var(--gold)] text-xs font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                    <a href={`tel:${general?.phone || ''}`} className="text-[var(--gold)] text-2xl font-serif font-bold no-underline">{general?.phone || ''}</a>
                    {general?.rules && Array.isArray(general.rules) && general.rules.length > 0 && (
                        <span className="text-[0.72rem] mt-2 text-center text-[var(--clay)]">
                            {general.rules.join(' · ')}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}
