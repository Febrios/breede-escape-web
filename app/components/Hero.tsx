export default function Hero() {
  return (
    <header
      className="hero min-h-screen flex flex-col justify-end relative overflow-hidden px-[5vw] pb-[8vh]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(15,26,15,0.55) 0%, rgba(15,26,15,0.3) 50%, rgba(15,26,15,0.75) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80') center/cover no-repeat",
      }}
    >
      <div className="hero-badge inline-block text-[0.75rem] font-medium tracking-widest uppercase text-[var(--gold)] border border-[rgba(201,168,76,0.4)] px-4 py-2 mb-6 bg-transparent" style={{ opacity: 1, animation: 'fadeUp 0.8s 0.3s forwards' }}>
        Since 1994 · Bonnievale, Western Cape
      </div>
      <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] text-[var(--cream)] mb-4" style={{ opacity: 1, animation: 'fadeUp 0.9s 0.5s forwards' }}>
        Life at the <em className="text-[var(--gold)] italic not-italic block">River.</em>
      </h1>
      <p className="hero-sub mt-6 text-[clamp(0.95rem,2vw,1.15rem)] text-[rgba(245,240,232,0.75)] font-light max-w-[480px] leading-[1.7] mb-4" style={{ opacity: 1, animation: 'fadeUp 0.9s 0.7s forwards' }}>
        Escape to the banks of the Breede River — a working farm, thatched huts, and wide-open skies just 15km outside Bonnievale.
      </p>
      <div className="hero-actions flex gap-4 mt-10" style={{ opacity: 1, animation: 'fadeUp 0.9s 0.9s forwards' }}>
        <a href="#booking" className="btn-primary bg-[var(--clay)] text-[var(--cream)] px-8 py-4 text-[0.9rem] font-medium uppercase tracking-wide rounded-sm no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">Reserve Your Camp</a>
        <a href="#camps" className="btn-outline border border-[rgba(245,240,232,0.5)] text-[var(--cream)] px-8 py-4 text-[0.9rem] font-medium uppercase tracking-wide rounded-sm no-underline hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">Explore Camps</a>
      </div>
      <div className="hero-stats absolute bottom-10 left-[5vw] flex gap-10" style={{ opacity: 1, animation: 'fadeUp 0.9s 1.1s forwards' }}>
        <div className="stat text-center">
          <div className="stat-num font-serif text-3xl font-bold text-[var(--gold)] leading-none">30+</div>
          <div className="stat-label text-xs text-[rgba(245,240,232,0.6)] uppercase tracking-wider mt-1">Max Guests</div>
        </div>
        <div className="stat text-center">
          <div className="stat-num font-serif text-3xl font-bold text-[var(--gold)] leading-none">4.8★</div>
          <div className="stat-label text-xs text-[rgba(245,240,232,0.6)] uppercase tracking-wider mt-1">Google Rating</div>
        </div>
        <div className="stat text-center">
          <div className="stat-num font-serif text-3xl font-bold text-[var(--gold)] leading-none">30yr</div>
          <div className="stat-label text-xs text-[rgba(245,240,232,0.6)] uppercase tracking-wider mt-1">Family Farm</div>
        </div>
      </div>
      <div className="hero-scroll absolute bottom-10 right-[5vw] flex flex-col items-center gap-2 text-[rgba(245,240,232,0.5)] text-xs uppercase tracking-widest" style={{ opacity: 1, animation: 'fadeIn 1s 1.5s forwards' }}>
        Scroll
        <span className="block w-px h-16 bg-gradient-to-b from-[rgba(245,240,232,0.5)] to-transparent animate-pulse"></span>
      </div>
    </header>
  );
}
