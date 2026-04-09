"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CampSliderProps {
    images: { url: string; alt: string }[];
    interval?: number;
}

export default function CampSlider({ images, interval = 3500 }: CampSliderProps) {
    const [current, setCurrent] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (images.length <= 1) return;
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, interval);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, images.length, interval]);

    if (!images.length) return null;

    return (
        <>
            <div className="relative w-full h-[200px] sm:h-[250px] overflow-hidden rounded-md">
                {images.map((img, i) => (
                    <Image
                        key={i}
                        src={img.url}
                        alt={img.alt}
                        width={400}
                        height={250}
                        className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        onClick={() => { setModalOpen(true); setModalIndex(i); }}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                    {images.map((_, i) => (
                        <span
                            key={i}
                            className={`block w-2 h-2 rounded-full ${i === current ? 'bg-[var(--gold)]' : 'bg-white/40'} transition-colors`}
                        />
                    ))}
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setModalOpen(false)}>
                    <button
                        className="absolute top-4 right-6 text-white text-3xl z-60"
                        onClick={e => { e.stopPropagation(); setModalOpen(false); }}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-60 px-2 py-1 bg-black/40 rounded-full hover:bg-black/70"
                        onClick={e => { e.stopPropagation(); setModalIndex((modalIndex - 1 + images.length) % images.length); }}
                        aria-label="Previous image"
                    >
                        &#8592;
                    </button>
                    <div className="flex flex-col items-center">
                        <Image
                            src={images[modalIndex].url}
                            alt={images[modalIndex].alt}
                            width={1200}
                            height={800}
                            className="object-contain max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        />
                        <div className="text-white mt-4 text-center text-lg font-medium">
                            {images[modalIndex].alt}
                        </div>
                    </div>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-60 px-2 py-1 bg-black/40 rounded-full hover:bg-black/70"
                        onClick={e => { e.stopPropagation(); setModalIndex((modalIndex + 1) % images.length); }}
                        aria-label="Next image"
                    >
                        &#8594;
                    </button>
                </div>
            )}
        </>
    );
}
