import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B2B Sales Assistant",
  description: "Turkish B2B Sales Assistant + CRM dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-8">{children}</main>
      </body>
    </html>
  );
}
