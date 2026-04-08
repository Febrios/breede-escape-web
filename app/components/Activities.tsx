import { sanityClient } from "../../lib/sanity";

export default async function Activities() {
    // Fetch activities from Sanity
    const activities = await sanityClient.fetch(`*[_type == "activity"]|order(order asc){
    _id,
    name,
    icon,
    description
  }`);

    return (
        <section className="activities py-32 bg-[var(--cream)]" id="activities">
            <div className="section-inner max-w-[1200px] mx-auto px-[5vw]">
                <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">What To Do</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-10">
                    River life & <em className="text-[var(--clay)] italic not-italic">adventures</em>
                </h2>
                <div className="activities-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-b border-[rgba(26,46,26,0.1)] mt-16">
                    {activities.slice(0, 4).map((act: any, idx: number) => (
                        <div key={act._id} className="activity p-10 text-center transition-colors duration-300 hover:bg-[var(--forest)] group border-r border-[rgba(26,46,26,0.1)] last:border-r-0">
                            <span className="activity-icon text-4xl mb-4 block transition-colors group-hover:text-[var(--gold)]">{act.icon}</span>
                            <div className="activity-name font-serif text-xl font-bold text-[var(--forest)] mb-2 transition-colors group-hover:text-[var(--cream)]">{act.name}</div>
                            <p className="activity-desc text-[0.85rem] leading-[1.65] text-[#5a6a5a] font-light transition-colors group-hover:text-[rgba(245,240,232,0.65)]">{act.description}</p>
                        </div>
                    ))}
                </div>
                <div className="activities-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-b border-[rgba(26,46,26,0.1)]">
                    {activities.slice(4, 8).map((act: any, idx: number) => (
                        <div key={act._id} className="activity p-10 text-center transition-colors duration-300 hover:bg-[var(--forest)] group border-r border-[rgba(26,46,26,0.1)] last:border-r-0">
                            <span className="activity-icon text-4xl mb-4 block transition-colors group-hover:text-[var(--gold)]">{act.icon}</span>
                            <div className="activity-name font-serif text-xl font-bold text-[var(--forest)] mb-2 transition-colors group-hover:text-[var(--cream)]">{act.name}</div>
                            <p className="activity-desc text-[0.85rem] leading-[1.65] text-[#5a6a5a] font-light transition-colors group-hover:text-[rgba(245,240,232,0.65)]">{act.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
