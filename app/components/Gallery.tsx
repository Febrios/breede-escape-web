"use client";
import React, { useState } from "react";
import Image from "next/image";

interface GalleryProps {
    images: { url: string; alt?: string }[];
}

export default function Gallery({ images }: GalleryProps) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                    <button
                        key={i}
                        className="focus:outline-none"
                        onClick={() => setSelected(i)}
                        aria-label={img.alt || `Gallery image ${i + 1}`}
                    >
                        <Image
                            src={img.url}
                            alt={img.alt || `Gallery image ${i + 1}`}
                            width={300}
                            height={200}
                            className="rounded shadow hover:scale-105 transition-transform"
                        />
                    </button>
                ))}
            </div>
            {selected !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setSelected(null)}>
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <Image
                            src={images[selected].url}
                            alt={images[selected].alt || `Gallery image ${selected + 1}`}
                            width={800}
                            height={600}
                            className="rounded-lg shadow-lg"
                        />
                        <button
                            className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 text-black hover:bg-opacity-100"
                            onClick={() => setSelected(null)}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
