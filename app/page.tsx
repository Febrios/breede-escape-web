import Hero from "./components/Hero";
import About from "./components/About";
import NoticeBar from "./components/NoticeBar";
import Camps from "./components/Camps";
import Rates from "./components/Rates";
import Activities from "./components/Activities";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[var(--cream)] font-sans">
      <Hero />
      <About />
      <Camps />
      <Rates />
      <Activities />
      <Gallery />
      <Reviews />
      <Location />
      <Booking />
      <Footer />
      <NoticeBar />
    </div>
  );
}
