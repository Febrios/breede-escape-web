import Image from "next/image";

export default function About() {
    return (
        <section className="about py-32 bg-[var(--cream)]" id="about">
            <div className="section-inner max-w-[1200px] mx-auto px-[5vw]">
                <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="about-text">
                        <span className="section-tag text-[0.72rem] font-medium tracking-widest uppercase text-[var(--clay)] mb-4 block">Our Story</span>
                        <h2 className="section-title font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight text-[var(--forest)] mb-6">
                            A place where<br />
                            <em className="text-[var(--clay)] italic not-italic">time slows down</em>
                        </h2>
                        <p className="text-[1.05rem] leading-[1.85] text-[#3a4a3a] font-light mb-5">
                            Tucked into 12 hectares of fertile valley land along the Breede River, Breede Escape is where families, friends and colleagues come to reconnect — with each other and with nature. We're centrally situated between the Overberg, the Langeberg Meander and the Robertson Wine Valley.
                        </p>
                        <p className="text-[1.05rem] leading-[1.85] text-[#3a4a3a] font-light mb-5">
                            We're a working farm producing vegetable seeds, with a herd of friendly Jersey cows you'll see grazing on the green pastures. There's no Wi-Fi here — just the sound of the river, old shady trees, and a campfire with your name on it.
                        </p>
                        <p className="text-[1.05rem] leading-[1.85] text-[#3a4a3a] font-light mb-5">
                            Total relaxation, privacy, safety, and a close-to-nature experience. That's the Breede Escape promise.
                        </p>
                    </div>
                    <div className="about-image-wrap relative">
                        <Image
                            className="about-image w-full h-[500px] object-cover saturate-[0.9]"
                            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80"
                            alt="River camp at dusk"
                            width={600}
                            height={500}
                        />
                        <div className="about-image-accent absolute bottom-[-2rem] left-[-2rem] w-[200px] h-[200px] bg-[var(--clay)] opacity-10 z-[-1] rounded-full"></div>
                        <div className="about-since absolute top-[-1.5rem] right-[-1.5rem] bg-[var(--forest)] text-[var(--gold)] px-6 py-4 text-center">
                            <strong className="text-2xl block leading-none font-serif">1994</strong>
                            <span className="text-[0.65rem] tracking-widest uppercase text-[var(--sand)]">Est. on the Breede</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
