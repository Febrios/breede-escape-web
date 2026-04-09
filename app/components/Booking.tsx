export default function Booking() {
    return (
        <section className="booking py-20 sm:py-32 bg-[linear-gradient(rgba(15,26,15,0.78),rgba(15,26,15,0.78)),url('https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1600&q=80')center/cover] text-center" id="booking">
            <div className="section-inner flex flex-col items-center max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[var(--sage)] text-[0.72rem] font-medium tracking-widest uppercase mb-4 block">Make a Reservation</span>
                <h2 className="font-serif text-[clamp(1.7rem,6vw,4.5rem)] font-bold leading-tight text-[var(--cream)] mb-6">
                    Ready to <em className="text-[var(--gold)] italic not-italic block">escape?</em>
                </h2>
                <p className="text-[0.98rem] sm:text-[1.05rem] text-[rgba(245,240,232,0.7)] font-light max-w-[95vw] sm:max-w-[480px] mx-auto mb-8 sm:mb-10 leading-[1.8]">
                    Contact us to check availability and confirm your dates. A 50% non-refundable deposit secures your camp.
                </p>
                <div className="flex gap-2 sm:gap-4 flex-wrap justify-center mb-8 sm:mb-10">
                    <a href="tel:+27828957951" className="btn-primary bg-[var(--clay)] text-[var(--cream)] px-5 py-3 sm:px-8 sm:py-4 rounded-sm font-medium uppercase text-sm sm:text-base no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">📞 Call Us Now</a>
                    <a href="mailto:info@breedeescape.co.za" className="btn-outline border border-[rgba(245,240,232,0.4)] text-[var(--cream)] px-5 py-3 sm:px-8 sm:py-4 rounded-sm font-medium uppercase text-sm sm:text-base no-underline hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">✉ Send an Email</a>
                </div>
                <div className="booking-contact flex flex-col items-center gap-2 mt-6 sm:mt-8 text-[rgba(245,240,232,0.5)] text-xs tracking-widest uppercase px-2">
                    <span>Phone &amp; WhatsApp</span>
                    <a href="tel:+27828957951" className="text-[var(--gold)] text-2xl font-serif font-bold no-underline">+27 82 895 7951</a>
                    <span className="text-[0.72rem] mt-2 text-center">No bachelor groups · No nudist groups · No youth groups · Strict no loud music policy</span>
                </div>
            </div>
        </section>
    );
}
