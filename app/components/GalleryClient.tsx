"use client";
import Image from "next/image";
import { useState } from "react";
import { urlFor } from "../../lib/sanity";

export default function GalleryClient({ galleryContent, images }: { galleryContent: string; images: any[] }) {
    const [page, setPage] = useState(0);
    const imagesPerPage = 6;
    const totalPages = Math.ceil(images.length / imagesPerPage);
    const start = page * imagesPerPage;
    const end = start + imagesPerPage;
    const visibleImages = images.slice(start, end);

    return (
        <section className="gallery py-32 bg-[var(--moss)]" id="gallery">
            <div className="section-inner max-w-[1600px] mx-auto px-[3vw]">
                <span className="section-tag text-[var(--sage)] text-[0.72rem] font-medium tracking-widest uppercase mb-4 block">Gallery</span>
                <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--cream)] mb-6">
                    The <em className="text-[var(--gold)] italic not-italic">view</em> from here
                </h2>
                <p className="gallery-intro text-[1rem] text-[rgba(245,240,232,0.65)] font-light leading-[1.8] max-w-[540px] mb-14">{galleryContent}</p>
                <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 mb-6">
                    {visibleImages.map((img: any, i: number) => (
                        <div key={img.asset?._id || i + start} className={`gallery-item overflow-hidden`}>
                            <Image
                                src={urlFor(img.asset).width(600).height(400).fit("crop").url()}
                                alt={`Gallery image ${start + i + 1}`}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:saturate-110 hover:brightness-100 saturate-90 brightness-95"
                            />
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button
                            className="px-4 py-2 rounded bg-[var(--sage)] text-[var(--moss)] font-semibold disabled:opacity-50"
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <span className="text-[var(--cream)] font-mono">
                            {page + 1} / {totalPages}
                        </span>
                        <button
                            className="px-4 py-2 rounded bg-[var(--sage)] text-[var(--moss)] font-semibold disabled:opacity-50"
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page === totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}