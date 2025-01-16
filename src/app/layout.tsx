import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/common/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KhatraEvents - Amazing Events in Nepal",
  description: "Discover and book amazing events in Nepal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <ToastContainer />

          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
