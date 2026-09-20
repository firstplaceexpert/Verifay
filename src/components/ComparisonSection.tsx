"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShieldCheck, Check, X } from "lucide-react";

export function ComparisonSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Gallery of luxury product lifestyle photos that continuously slide above testimonials
  const galleryPhotos = [
    { src: "/images/nfc-under-logo.jpg", alt: "Smart NFC Tag Under-Logo Tap", tag: "Produk 1 • Smart NFC" },
    { src: "/images/qr-shieldtag.jpg", alt: "Cryptographic QR ShieldTag Seal", tag: "Produk 2 • QR ShieldTag" },
    { src: "/images/product-authenticity.jpg", alt: "Haute fragrance authenticity verification", tag: "Luxury Fragrance" },
    { src: "/images/luxury-watch.jpg", alt: "Swiss luxury chronograph security", tag: "Horology & Watches" },
    { src: "/images/luxury-packaging.jpg", alt: "Minimalist skincare cosmetics with smart security", tag: "Cosmetics Packaging" },
  ];

  const infiniteGallery = [...galleryPhotos, ...galleryPhotos];

  const testimonials = [
    {
      avatar: "/images/nfc-under-logo.jpg",
      name: "Emily Reynolds",
      role: "Head of Design, Maison Leathercraft",
      quote:
        "Chip NFC yang sudah diprogramkan oleh tim Verifay sangat memudahkan workshop kami. Kami hanya tinggal merekatkan chip di bawah patch logo tas kulit kami. Saat pelanggan menempelkan HP ke logo tas, halaman otentisitas resmi langsung muncul seketika tanpa perlu aplikasi!",
      verdict: "NFC Under-Logo: 100% Tersembunyi di Balik Logo Brand",
      qrText: "QR Code Biasa: Merusak estetika bahan kulit & gampang difotokopi",
      hologramText: "Stiker Hologram: Rawan terkelupas, miring, & terlihat murahan",
    },
    {
      avatar: "/images/qr-shieldtag.jpg",
      name: "Daniel Hayes",
      role: "CEO, Aetherial Fragrance Labs",
      quote:
        "QR ShieldTag memberi perlindungan ganda pada box parfum kami. Lapisan segel tamper-evident langsung rusak jika ada pihak yang mencoba membuka kemasan atau memindahkan stiker ke botol tiruan. Konsumen di counter retail cukup scan dengan kamera HP standar.",
      verdict: "QR ShieldTag: Segel Tamper-Evident Anti-Fotokopi",
      qrText: "QR Code Biasa: Tidak ada pengaman fisik jika stiker dipindah",
      hologramText: "Stiker Hologram: Banyak beredar bebas hologram tiruan di pasar gelap",
    },
    {
      avatar: "/images/luxury-watch.jpg",
      name: "Sophia Mitchell",
      role: "Managing Director, Chrono Atelier",
      quote:
        "Yang paling berharga bagi kami adalah kemudahan plug-and-play. Verifay membelikan hardware-nya dan memprogram seluruh token kriptografinya. Kami tidak perlu repot coding. Tim kami tinggal memasang tag di produk, dan orisinalitas langsung terjamin.",
      verdict: "Plug-and-Play: Kami Program, Brand Anda Tinggal Tempel",
      qrText: "Sistem Manual: Boros ratusan juta rupiah untuk bangun sistem IT sendiri",
      hologramText: "Hologram Pasif: Tidak memiliki verifikasi data digital ke smartphone",
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeSlide];

  return (
    <section id="keunggulan" className="py-24 bg-[#F8FAF8] border-t border-[#0F1F1A]/10 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Continuous Auto-Sliding Luxury Brand Gallery Marquee (Scales in like PPT focus) */}
        <div className="relative mb-16 overflow-hidden -mx-6 sm:-mx-10 lg:-mx-14 ppt-from-scale ppt-delay-1">
          {/* Left & Right Editorial Vignette Edge Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAF8] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FAF8] to-transparent z-20" />

          {/* Infinite continuous auto-sliding track (hover to pause inspection) */}
          <div className="animate-marquee-infinite flex gap-6 px-4 py-2">
            {infiniteGallery.map((photo, idx) => {
              const isCurrent = idx % testimonials.length === activeSlide;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveSlide(idx % testimonials.length)}
                  className={`relative min-w-[290px] sm:min-w-[350px] md:min-w-[390px] h-64 sm:h-72 rounded-3xl overflow-hidden border shrink-0 cursor-pointer group img-shimmer transition-all duration-500 ${
                    isCurrent
                      ? "ring-2 ring-[#00C853] shadow-2xl scale-[1.02] border-transparent z-10"
                      : "opacity-85 hover:opacity-100 shadow-md border-[#0F1F1A]/10 hover:scale-[1.02]"
                  }`}
                  title="Klik untuk memilih cerita brand ini"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0F1F1A]/85 text-white text-[11px] font-semibold border border-white/20 shadow-sm">
                    {photo.tag}
                  </div>
                  {isCurrent && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0F1F1A]/95 text-[#00C853] text-[10px] font-extrabold uppercase tracking-widest border border-[#00C853]/50 flex items-center gap-1.5 shadow-xl">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
                      Active Inspection
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial & Comparison Slider (Matching Frame 12, 14, 16 in HD video) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Avatar & Author (Slides from Left) */}
          <div className="lg:col-span-3 flex sm:flex-col items-center sm:items-start gap-4 ppt-from-left ppt-delay-2">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md border border-[#0F1F1A]/10 shrink-0 img-shimmer group">
              <Image
                key={current.avatar}
                src={current.avatar}
                alt={current.name}
                fill
                className="object-cover object-center animate-in fade-in zoom-in-95 duration-500 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#0F1F1A]">
                {current.name}
              </h4>
              <p className="text-xs text-[#0F1F1A]/50 font-medium">
                {current.role}
              </p>
            </div>
          </div>

          {/* Center & Right Quote (Slides from Right) */}
          <div className="lg:col-span-9 space-y-8 ppt-from-right ppt-delay-2">
            <div className="min-h-[140px] sm:min-h-[120px]">
              <p
                key={activeSlide}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F1F1A] tracking-tight leading-relaxed animate-in fade-in slide-in-from-right-4 duration-500"
              >
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>

            {/* Slider Navigation Buttons & Counter (Exact layout from Frame 14: arrows + 1/3) */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-[#0F1F1A]/20 flex items-center justify-center text-[#0F1F1A] hover:bg-[#0F1F1A] hover:text-white transition-all hover:scale-105 active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border border-[#0F1F1A]/20 flex items-center justify-center text-[#0F1F1A] hover:bg-[#0F1F1A] hover:text-white transition-all hover:scale-105 active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Counter: e.g. 1/3, 2/3, 3/3 */}
              <span className="text-xs font-mono font-bold tracking-widest text-[#0F1F1A]/50">
                {activeSlide + 1}/{testimonials.length}
              </span>
            </div>

            {/* Comparison Mini Verdict Pills */}
            <div className="pt-6 border-t border-[#0F1F1A]/10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00C853] text-[#0F1F1A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0F1F1A] block">
                    Verifay Digital
                  </span>
                  <p className="text-[11px] text-[#1B3B30] mt-0.5">
                    {current.verdict}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#0F1F1A]/10 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0F1F1A] block">
                    QR Code Konvensional
                  </span>
                  <p className="text-[11px] text-[#0F1F1A]/60 mt-0.5">
                    {current.qrText}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#0F1F1A]/10 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0F1F1A] block">
                    Stiker Hologram
                  </span>
                  <p className="text-[11px] text-[#0F1F1A]/60 mt-0.5">
                    {current.hologramText}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Full-width Horizontal Dotted Line with Floating Airplane Gliding Smoothly along the Line */}
        <div className="relative mt-20 pt-8">
          <div className="relative w-full h-8 flex items-center justify-center">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 32">
              <path
                id="horizontalFlightLine"
                d="M 0 16 L 1000 16"
                stroke="#0F1F1A"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-dash-flow"
              />
              <g>
                <path
                  d="M 0 -10 L 1.5 -7 L 1.5 -1.2 L 9 2.2 L 9 3.2 L 1.8 2.2 L 1.8 5 L 4.5 6.8 L 4.5 7.6 L 0.7 7.2 L 0 8.5 L -0.7 7.2 L -4.5 7.6 L -4.5 6.8 L -1.8 5 L -1.8 2.2 L -9 3.2 L -9 2.2 L -1.5 -1.2 L -1.5 -7 Z"
                  fill="#0F1F1A"
                  opacity="0.8"
                  transform="rotate(90)"
                />
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href="#horizontalFlightLine" />
                </animateMotion>
              </g>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
