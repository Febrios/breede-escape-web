export default function Footer() {
    return (
        <footer className="bg-[var(--dark)] text-[rgba(245,240,232,0.4)] py-12 px-[5vw] flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="footer-logo font-serif text-[var(--cream)] text-lg font-bold mb-4 md:mb-0">
                Breede <span className="text-[var(--gold)] italic">Escape</span>
            </div>
            <div className="footer-links flex gap-6 mb-4 md:mb-0">
                <a href="#about" className="text-[rgba(245,240,232,0.4)] no-underline text-xs hover:text-[var(--gold)]">About</a>
                <a href="#camps" className="text-[rgba(245,240,232,0.4)] no-underline text-xs hover:text-[var(--gold)]">Camps</a>
                <a href="#rates" className="text-[rgba(245,240,232,0.4)] no-underline text-xs hover:text-[var(--gold)]">Rates</a>
                <a href="#activities" className="text-[rgba(245,240,232,0.4)] no-underline text-xs hover:text-[var(--gold)]">Activities</a>
                <a href="#booking" className="text-[rgba(245,240,232,0.4)] no-underline text-xs hover:text-[var(--gold)]">Contact</a>
            </div>
            <div className="text-xs">© 2024 Breede Escape · Bonnievale, Western Cape</div>
        </footer>
    );
}
