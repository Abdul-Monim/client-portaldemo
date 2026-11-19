import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClientPortal — White-Label Client Hub",
  description: "Lightweight white-label client hub for freelancers. PTUT-PRJ-100.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
