
"use client";
import React, { useState } from "react";

export default function NoticeBar() {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    return (
        <div className="notice-bar fixed bottom-0 left-0 right-0 z-50 bg-[var(--clay)] py-3 px-10 flex justify-center items-center gap-6 flex-wrap text-[0.78rem] tracking-wider text-[var(--cream)] transition-transform duration-400" style={{ transform: 'translateY(0)' }}>
            <span role="img" aria-label="cow">🐄</span>
            <strong className="opacity-100">Working farm stay</strong>
            <span className="opacity-70">·</span>
            <span className="opacity-70">No Wi-Fi — just river sounds</span>
            <span className="opacity-70">·</span>
            <strong className="opacity-100">Pet friendly</strong> <span className="opacity-70">(pre-arrange, no pitbulls)</span>
            <button className="notice-close ml-auto bg-none border-none text-[var(--cream)] text-lg opacity-70 cursor-pointer" onClick={() => setVisible(false)}>✕</button>
        </div>
    );
}
