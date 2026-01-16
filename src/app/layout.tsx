import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { OrderProvider } from "@/contexts/OrderContext";

export const metadata: Metadata = {
  title: "Aura Coffee - Premium Experience",
  description: "Artisanal coffee management and ordering system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <OrderProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </OrderProvider>
      </body>
    </html>
  );
}
