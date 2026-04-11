
import { fetchHero } from "../../lib/fetchHero";
import { urlFor } from "../../lib/sanity";


export default async function Hero() {
  // Fetch hero content from Sanity heroSettings
  const heroSettings = await fetchHero();
  const heroContent = heroSettings?.content;
  const heroBgUrl = heroSettings?.backgroundImage ? urlFor(heroSettings.backgroundImage).width(1600).quality(100).url() : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80";


  return (
    <header
      className="hero min-h-screen flex flex-col justify-end relative overflow-hidden w-full"
      style={{
        background:
          `linear-gradient(to bottom, rgba(15,26,15,0.55) 0%, rgba(15,26,15,0.3) 50%, rgba(15,26,15,0.75) 100%), url('${heroBgUrl}') center/cover no-repeat`,
      }}
    >
      <div className="section-inner max-w-[1600px] mx-auto px-[3vw] w-full pb-[8vh]">
        <div className="hero-badge inline-block text-[0.75rem] font-medium tracking-widest uppercase text-[var(--gold)] border border-[rgba(201,168,76,0.4)] px-4 py-2 mb-6 bg-transparent" style={{ opacity: 1, animation: 'fadeUp 0.8s 0.3s forwards' }}>
          Since 1994 · Bonnievale, Western Cape
        </div>
        <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] text-[var(--cream)] mb-4" style={{ opacity: 1, animation: 'fadeUp 0.9s 0.5s forwards' }}>
          Life at the <em className="text-[var(--gold)] italic not-italic">River.</em>
        </h1>
        <p className="hero-sub mt-6 text-[clamp(0.95rem,2vw,1.15rem)] text-[rgba(245,240,232,0.75)] font-light max-w-[480px] leading-[1.7] mb-4" style={{ opacity: 1, animation: 'fadeUp 0.9s 0.7s forwards' }}>
          {heroContent}
        </p>
        <div className="flex flex-row items-center gap-12 mt-10 w-full" style={{ opacity: 1, animation: 'fadeUp 0.9s 0.9s forwards' }}>
          <div className="hero-actions flex gap-4">
            <a href="#booking" className="btn-primary bg-[var(--clay)] text-[var(--cream)] px-8 py-4 text-[0.9rem] font-medium uppercase tracking-wide rounded-sm no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">Reserve Your Camp</a>
            <a href="#camps" className="btn-outline border border-[rgba(245,240,232,0.5)] text-[var(--cream)] px-8 py-4 text-[0.9rem] font-medium uppercase tracking-wide rounded-sm no-underline hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">Explore Camps</a>
          </div>
        </div>
      </div>
    </header>
  );
}
