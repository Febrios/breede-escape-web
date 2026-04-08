import { fetchSiteSettings } from "../../lib/fetchSiteSettings";

export default async function ContactPage() {
    const settings = await fetchSiteSettings();
    return (
        <main className="max-w-xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
                <div className="mb-4">
                    <div className="font-semibold">Email:</div>
                    <a href={`mailto:${settings.contactEmail}`} className="text-blue-600 underline">{settings.contactEmail}</a>
                </div>
                <div className="mb-4">
                    <div className="font-semibold">Phone:</div>
                    <a href={`tel:${settings.phone}`} className="text-blue-600 underline">{settings.phone}</a>
                </div>
                {settings.address && (
                    <div className="mb-4">
                        <div className="font-semibold">Address:</div>
                        <div>{settings.address}</div>
                    </div>
                )}
                {settings.socialLinks && settings.socialLinks.length > 0 && (
                    <div className="mb-4">
                        <div className="font-semibold">Social Links:</div>
                        <ul className="list-disc ml-6">
                            {settings.socialLinks.map((link: any, i: number) => (
                                <li key={i}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </main>
    );
}
