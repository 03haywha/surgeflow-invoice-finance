import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SurgeFlow Invoice Finance — Get paid faster",
  description:
    "Unlock cash from unpaid invoices. Funded in 24 hours. No fixed repayments. Compare 30+ UK invoice finance lenders in 60 seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
