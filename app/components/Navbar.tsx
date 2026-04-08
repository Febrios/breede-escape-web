export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b bg-white dark:bg-black">
      <div className="text-xl font-bold tracking-widest text-zinc-900 dark:text-zinc-100">Breede Escape</div>
      <div className="flex gap-6">
        <a className="text-zinc-800 dark:text-zinc-100 hover:underline" href="#rooms">Rooms</a>
        <a className="text-zinc-800 dark:text-zinc-100 hover:underline ml-4" href="/gallery">Gallery</a>
        <a className="text-zinc-800 dark:text-zinc-100 hover:underline ml-4" href="/availability">Availability</a>
        <a className="text-zinc-800 dark:text-zinc-100 hover:underline ml-4" href="/contact">Contact</a>
        <a className="text-zinc-800 dark:text-zinc-100 hover:underline" href="#gallery">Gallery</a>
        <a className="text-zinc-800 dark:text-zinc-100 hover:underline" href="#contact">Contact</a>
      </div>
    </nav>
  );
}
