"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CampSliderProps {
    images: { url: string; alt: string }[];
    interval?: number;
}

export default function CampSlider({ images, interval = 3500 }: CampSliderProps) {
    const [current, setCurrent] = useState(0);
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
        <div className="relative w-full h-[200px] sm:h-[250px] overflow-hidden rounded-md">
            {images.map((img, i) => (
                <Image
                    key={i}
                    src={img.url}
                    alt={img.alt}
                    width={400}
                    height={250}
                    className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
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
    );
}
