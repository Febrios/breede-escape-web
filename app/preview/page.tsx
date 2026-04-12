export const revalidate = 0;
import Hero from "../components/Hero";
import About from "../components/About";
import Camps from "../components/Camps";
import Rates from "../components/Rates";
import Activities from "../components/Activities";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import Location from "../components/Location";
import Booking from "../components/Booking";
import Footer from "../components/Footer";

export default async function PreviewPage() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-[var(--cream)] font-sans">
            <Hero draftMode />
            <div className="pt-24 w-full">
                <About draftMode />
                <Camps draftMode />
                <Rates draftMode />
                <Activities draftMode />
                <Gallery draftMode />
                <Reviews />
                <Location draftMode />
                <Booking draftMode />
                <Footer />
            </div>
        </div>
    );
}