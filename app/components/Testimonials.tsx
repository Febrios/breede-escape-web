import Image from "next/image";
import { fetchTestimonials } from "../../lib/fetchTestimonials";

export default async function Testimonials() {
    const testimonials = await fetchTestimonials();
    return (
        <section className="w-full py-16 px-4 bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-3xl font-semibold text-center mb-8">What Our Guests Say</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {testimonials.map((t: any) => (
                    <div key={t._id} className="max-w-xs bg-white dark:bg-zinc-800 rounded-lg shadow p-6 flex flex-col items-center">
                        {t.imageUrl && (
                            <Image
                                src={t.imageUrl}
                                alt={t.name}
                                width={64}
                                height={64}
                                className="rounded-full mb-4 border"
                            />
                        )}
                        <p className="italic text-zinc-700 dark:text-zinc-200 mb-2">“{t.text}”</p>
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">{t.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
