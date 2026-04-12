import { fetchRates } from "../../lib/fetchRates";

export default async function Rates({ draftMode = false }: { draftMode?: boolean } = {}) {
    // Fetch rates from Sanity (drafts if enabled), including camp reference
    const rates = await fetchRates(draftMode);

    return (
        <section className="rates py-32 bg-[var(--sand)]" id="rates">
            <div className="section-inner max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">Pricing</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-10">
                    Simple, honest <em className="text-[var(--clay)] italic not-italic">rates</em>
                </h2>
                <div className="rates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {rates.map((rate: any, idx: number) => (
                        <div key={rate._id} className={`rate-card relative bg-[var(--cream)] p-10 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${idx === 1 ? 'featured' : ''}`}>
                            <div className="rate-label text-[0.72rem] tracking-widest uppercase text-[var(--clay)] font-medium mb-2">{rate.label}</div>
                            <div className="rate-name font-serif text-2xl font-bold text-[var(--forest)] mb-6 leading-tight">{rate.name}</div>
                            <div className="rate-price font-serif text-4xl font-normal text-[var(--forest)] leading-none mb-1"><sup className="text-xl align-top">R</sup>{rate.price}</div>
                            <div className="rate-unit text-[0.78rem] text-[#6a7a6a] mb-6 font-light">{rate.unit}</div>
                            <hr className="rate-divider border-t border-[rgba(26,46,26,0.12)] my-6" />
                            <ul className="rate-includes list-none mb-2">
                                {rate.includes && rate.includes.map((inc: string, i: number) => (
                                    <li key={i} className="text-[0.88rem] text-[#3a4a3a] py-2 flex items-center gap-2 font-light before:content-['✓'] before:text-[var(--sage)] before:font-bold before:mr-2">{inc}</li>
                                ))}
                            </ul>
                            {rate.note && <p className="rate-note text-[0.78rem] text-[#8a9a8a] mt-4 leading-snug italic">{rate.note}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
