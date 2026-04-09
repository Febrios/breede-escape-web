import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breede Escape — River Camps, Bonnievale",
  description: "Escape to the banks of the Breede River — a working farm, thatched huts, and wide-open skies just 15km outside Bonnievale.",
};
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-[var(--cream)]">
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
