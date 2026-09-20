import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Verifay — Proteksi Keaslian Brand & Anti-Pemalsuan Produk",
  description:
    "Verifay menghadirkan solusi otentisitas produk generasi baru: Smart NFC tersembunyi di balik logo dan QR ShieldTag tamper-evident siap tempel.",
  keywords: [
    "Verifay",
    "verifay brand protection",
    "anti pemalsuan produk",
    "nfc under logo",
    "qr shieldtag",
    "autentikasi produk",
    "proteksi brand",
  ],
  authors: [{ name: "Verifay" }],
  icons: {
    icon: "/images/verifay-icon@2x.png",
    apple: "/images/verifay-icon@2x.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.className} ${plusJakartaSans.variable} scroll-smooth`}>
      <body className={`${plusJakartaSans.className} ${plusJakartaSans.variable} font-sans antialiased bg-[#0F1F1A] text-[#0F1F1A] selection:bg-[#00C853]/20 selection:text-[#00C853]`}>
        {children}
      </body>
    </html>
  );
}

