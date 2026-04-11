
"use client";
import React, { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const onScroll = () => {
      if (nav) {
        if (window.scrollY > 80) {
          nav.style.background = "rgba(15,26,15,0.92)";
          nav.style.backdropFilter = "blur(12px)";
          (nav.style as any).WebkitBackdropFilter = "blur(12px)";
          nav.style.boxShadow = "0 2px 16px 0 rgba(0,0,0,0.18)";
        } else {
          nav.style.background = "rgba(15,26,15,0.7)";
          nav.style.backdropFilter = "blur(8px)";
          (nav.style as any).WebkitBackdropFilter = "blur(8px)";
          nav.style.boxShadow = "0 2px 16px 0 rgba(0,0,0,0.10)";
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <nav
      id="mainNav"
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 py-4 sm:py-6 flex items-center justify-between transition-all duration-400"
      style={{
        background: "rgba(15,26,15,0.7)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)"
      }}
    >
      <a
        href="#"
        className="nav-logo font-serif text-[1.3rem] font-bold tracking-wide text-[var(--cream)] no-underline"
        style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.03em" }}
      >
        Breede <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Escape</span>
      </a>
      <button
        className="sm:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="block w-6 h-0.5 bg-[var(--gold)] mb-1"></span>
        <span className="block w-6 h-0.5 bg-[var(--gold)] mb-1"></span>
        <span className="block w-6 h-0.5 bg-[var(--gold)]"></span>
      </button>
      <div className="flex items-center gap-2 sm:gap-8">
        <ul
          className={`nav-links ${menuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row gap-6 sm:gap-8 list-none absolute sm:static top-full left-0 w-full sm:w-auto bg-[rgba(15,26,15,0.97)] sm:bg-transparent px-4 sm:px-0 py-4 sm:py-0 transition-all duration-300`}
          onClick={() => setMenuOpen(false)}
        >
          <li><a href="#camps" className="text-[var(--cream)] text-base sm:text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors block py-2 sm:py-0">Camps</a></li>
          <li><a href="#rates" className="text-[var(--cream)] text-base sm:text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors block py-2 sm:py-0">Rates</a></li>
          <li><a href="#activities" className="text-[var(--cream)] text-base sm:text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors block py-2 sm:py-0">Activities</a></li>
          <li><a href="#location" className="text-[var(--cream)] text-base sm:text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors block py-2 sm:py-0">Getting Here</a></li>
        </ul>
        <a href="#booking" className="hidden sm:inline-block nav-cta bg-[var(--clay)] text-[var(--cream)] px-4 py-2 rounded-sm font-medium uppercase text-base sm:text-[0.85rem] no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors ml-2">Book Now</a>
      </div>
      {/* Mobile Book Now button */}
      <a href="#booking" className="sm:hidden nav-cta bg-[var(--clay)] text-[var(--cream)] px-4 py-2 rounded-sm font-medium uppercase text-base no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors ml-2 mt-2 block">Book Now</a>
    </nav>
  );
}
