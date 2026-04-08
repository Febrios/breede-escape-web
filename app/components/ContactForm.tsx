"use client";
import React, { useState } from "react";

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending...");
        // TODO: Integrate backend/email API
        setTimeout(() => setStatus("Message sent! (Demo only)"), 1000);
    };

    return (
        <form className="flex flex-col gap-4 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
                className="border rounded px-4 py-2"
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                className="border rounded px-4 py-2"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <textarea
                className="border rounded px-4 py-2"
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
            />
            <button
                className="bg-zinc-900 text-zinc-100 rounded px-4 py-2 font-semibold hover:bg-zinc-700"
                type="submit"
            >
                Send
            </button>
            {status && <div className="text-sm text-zinc-600 dark:text-zinc-300">{status}</div>}
        </form>
    );
}
