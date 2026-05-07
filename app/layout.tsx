import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rise at Seven | Award Winning Search-First Content Marketing Agency",
  description: "Rise at Seven is a search-first content marketing agency specialising in SEO, Digital PR, and Content Marketing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
