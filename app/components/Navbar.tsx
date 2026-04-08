
"use client";
import React, { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="mainNav"
      className="fixed top-0 left-0 right-0 z-50 px-10 py-6 flex items-center justify-between transition-all duration-400"
      style={{
        background: "rgba(15,26,15,0.0)",
        backdropFilter: "none",
      }}
    >
      <a
        href="#"
        className="nav-logo font-serif text-[1.3rem] font-bold tracking-wide text-[var(--cream)] no-underline"
        style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.03em" }}
      >
        Breede <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Escape</span>
      </a>
      <ul className="nav-links flex gap-8 list-none">
        <li><a href="#camps" className="text-[var(--cream)] text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors">Camps</a></li>
        <li><a href="#rates" className="text-[var(--cream)] text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors">Rates</a></li>
        <li><a href="#activities" className="text-[var(--cream)] text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors">Activities</a></li>
        <li><a href="#location" className="text-[var(--cream)] text-[0.85rem] font-medium uppercase tracking-wider no-underline hover:text-[var(--gold)] transition-colors">Getting Here</a></li>
        <li>
          <a href="#booking" className="nav-cta bg-[var(--clay)] text-[var(--cream)] px-4 py-2 rounded-sm font-medium uppercase text-[0.85rem] no-underline hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-colors">Book Now</a>
        </li>
      </ul>
    </nav>
  );
}
