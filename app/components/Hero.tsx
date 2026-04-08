export default function Hero() {
  return (
    <section className="w-full bg-zinc-200 dark:bg-zinc-900 py-16 px-4 text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">
        Welcome to Breede Escape
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-zinc-700 dark:text-zinc-300 mb-6">
        Experience boutique comfort in the heart of the Breede Valley. Explore unique rooms, nature, and personalized hospitality—all in one tranquil retreat.
      </p>
      <a href="#rooms" className="inline-block bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-6 py-3 rounded-full font-medium shadow-sm hover:scale-105 transition-transform">
        View Rooms
      </a>
    </section>
  );
}
