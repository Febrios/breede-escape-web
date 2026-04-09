
"use client";
import React, { useEffect, useState } from 'react';

interface Review {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

interface GoogleReviewsData {
    reviews?: Review[];
    rating?: number;
    user_ratings_total?: number;
}

const GoogleReviews: React.FC = () => {
    const [data, setData] = useState<GoogleReviewsData>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/google-reviews')
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to load reviews');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading Google reviews...</div>;
    if (error) return <div>{error}</div>;
    if (!data.reviews || data.reviews.length === 0) return <div>No reviews found.</div>;

    return (
        <div className="w-full max-w-[1200px] mx-auto px-[5vw]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl font-bold text-[var(--forest)]">Google Reviews</h3>
                {data.rating && data.user_ratings_total && (
                    <div className="text-[var(--clay)] text-base font-medium">
                        <span className="mr-1">{data.rating}★</span>
                        <span className="text-xs text-gray-500">({data.user_ratings_total} reviews)</span>
                    </div>
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '2rem',
                    padding: '0.5rem 0 1.5rem 0',
                    scrollbarWidth: 'thin',
                }}
                className="custom-scrollbar"
            >
                {data.reviews.map((review, idx) => (
                    <div
                        key={idx}
                        className="bg-[var(--cream)] border border-[var(--clay)/10] rounded-lg shadow-md flex flex-col justify-between min-w-[340px] max-w-[360px] h-[220px] p-6"
                        style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)' }}
                    >
                        <div className="flex items-center mb-3">
                            {review.profile_photo_url ? (
                                <img
                                    src={review.profile_photo_url}
                                    alt={review.author_name}
                                    className="w-10 h-10 rounded-full mr-3 object-cover bg-gray-200"
                                    onError={e => (e.currentTarget.src = '/default-avatar.png')}
                                />
                            ) : (
                                <div
                                    className="w-10 h-10 rounded-full mr-3 flex items-center justify-center bg-[var(--clay)] text-[var(--cream)] font-bold text-lg select-none"
                                    style={{ fontFamily: 'Geist, Arial, sans-serif', userSelect: 'none' }}
                                    aria-label={review.author_name}
                                >
                                    {review.author_name && review.author_name.trim().length > 0
                                        ? review.author_name.trim().charAt(0).toUpperCase()
                                        : '?'}
                                </div>
                            )}
                            <div>
                                <span className="font-semibold text-[var(--forest)]">{review.author_name}</span>
                                <span className="ml-2 text-[var(--clay)]">{review.rating}★</span>
                                <div className="text-xs text-gray-500">{review.relative_time_description}</div>
                            </div>
                        </div>
                        <div className="mt-2 text-[1.05em] text-[var(--forest)] flex-1 overflow-hidden text-ellipsis" style={{ lineHeight: 1.5 }}>
                            <div
                                className="mt-2 text-[1.05em] text-[var(--forest)] flex-1 overflow-y-auto pr-1 custom-vertical-scrollbar"
                                style={{ lineHeight: 1.5, maxHeight: 110 }}
                            >
                                {review.text}
                            </div>
                        </div>
                    </div>
                ))}
                <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d6cfc2;
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar {
                    scrollbar-color: #d6cfc2 transparent;
                    scrollbar-width: thin;
                }
                .custom-vertical-scrollbar::-webkit-scrollbar {
                    width: 7px;
                }
                .custom-vertical-scrollbar::-webkit-scrollbar-thumb {
                    background: #e0d7c7;
                    border-radius: 6px;
                }
                .custom-vertical-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-vertical-scrollbar {
                    scrollbar-color: #e0d7c7 transparent;
                    scrollbar-width: thin;
                }
            `}</style>
            </div>
        </div>
    );
}

export default GoogleReviews;
