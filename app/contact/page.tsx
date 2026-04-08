import ContactForm from "../components/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex flex-col items-center py-16 px-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Contact Us</h1>
            <ContactForm />
        </main>
    );
}
