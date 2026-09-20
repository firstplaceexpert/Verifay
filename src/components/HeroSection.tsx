"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Plus, X, ShieldCheck, ArrowUpRight } from "lucide-react";
import { WatermarkModal } from "./WatermarkModal";

export function HeroSection() {
  const [isOpened, setIsOpened] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardToggled, setIsCardToggled] = useState(false);

  useEffect(() => {
    // Initial entrance animation: start closed and open smoothly
    setIsOpened(false);
    const timer = setTimeout(() => {
      setIsOpened(true);
    }, 60);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <section className="relative bg-[#F4F6F4] pt-4 sm:pt-6 pb-16 sm:pb-24 overflow-hidden select-none">
        
        {/* Soft studio ambient glow matching Frame 4 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,1)_0%,rgba(244,246,244,0.9)_65%,rgba(235,238,235,1)_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          
          {/* Main "NOW" Architectural Centerpiece (NW covers O initially, then parts open to reveal O) */}
          <div className="relative min-h-[460px] sm:min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex items-center justify-center">
            
            {/* Central 3D Sculptural Letter 'O' - Positioned BEHIND N and W (z-10) */}
            <div className="relative z-10 w-[280px] sm:w-[420px] md:w-[500px] lg:w-[560px] h-[280px] sm:h-[420px] md:h-[500px] lg:h-[560px] mx-auto flex items-center justify-center">
              {/* Clean Transparent 3D Cutout Sculpture - 100% transparent background matching page */}
              <div className="relative w-full h-full pointer-events-none drop-shadow-[0_25px_40px_rgba(15,31,26,0.09)]">
                <Image
                  src="/images/hero-podium-transparent.png"
                  alt="3D Architectural Letter O Sculpture with Invisible Watermark Luxury Product"
                  fill
                  priority
                  className="object-contain object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Center Floating Interactive Rotating Badge */}
              <div
                onClick={() => setIsModalOpen(true)}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  isOpened ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                title="Klik untuk simulasi interaktif produk"
              >
                <div className="relative w-28 h-28 sm:w-34 sm:h-34 flex items-center justify-center">
                  {/* Rotating Circular Typography Badge */}
                  <svg
                    className="absolute inset-0 w-full h-full animate-spin-slow"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="circleTextPath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                    <text className="text-[8px] font-black uppercase tracking-[0.24em] fill-[#0F1F1A] drop-shadow-xs">
                      <textPath href="#circleTextPath" startOffset="0%">
                        • VERIFAY • INVISIBLE SECURITY •
                      </textPath>
                    </text>
                  </svg>

                  {/* Pulsing Center Play Button */}
                  <div className="w-12 h-12 rounded-full bg-[#0F1F1A] border-2 border-[#00C853] flex items-center justify-center text-[#00C853] shadow-2xl group-hover:scale-110 group-hover:bg-[#00C853] group-hover:text-[#0F1F1A] transition-all duration-300 animate-pulse-ring">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* The Huge White Architectural Letters "N" and "W" positioned IN FRONT (z-20) covering the "O" initially */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
              <div className="relative flex items-center justify-center">
                {/* Massive Bold Architectural Letter 'N' - In front of O (z-20), opens smoothly to reveal O */}
                <span
                  className={`font-black text-[150px] sm:text-[240px] md:text-[320px] lg:text-[400px] leading-none text-white tracking-tighter select-none drop-shadow-[0_20px_40px_rgba(15,31,26,0.18)] transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpened
                      ? "-translate-x-[65px] sm:-translate-x-[110px] md:-translate-x-[140px] lg:-translate-x-[170px]"
                      : "translate-x-[35px] sm:translate-x-[55px] md:translate-x-[70px] lg:translate-x-[80px]"
                  }`}
                >
                  N
                </span>

                {/* Massive Bold Architectural Letter 'W' - In front of O (z-20), opens smoothly to reveal O */}
                <span
                  className={`font-black text-[150px] sm:text-[240px] md:text-[320px] lg:text-[400px] leading-none text-white tracking-tighter select-none drop-shadow-[0_20px_40px_rgba(15,31,26,0.18)] transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpened
                      ? "translate-x-[65px] sm:translate-x-[110px] md:translate-x-[140px] lg:translate-x-[170px]"
                      : "-translate-x-[35px] sm:-translate-x-[55px] md:-translate-x-[70px] lg:-translate-x-[80px]"
                  }`}
                >
                  W
                </span>
              </div>
            </div>

            {/* Bottom Subtle White Dome Horizon creating 3D depth (Matching Frame 4) */}
            <div className="absolute -bottom-24 sm:-bottom-32 inset-x-0 h-44 sm:h-56 bg-gradient-to-t from-white via-white/80 to-transparent rounded-t-[100%] pointer-events-none z-0" />
          </div>

          {/* Interlocking Bottom Docked Cards (Matching Frame 4 in HD Video) */}
          <div className="mt-2 sm:mt-4 relative z-20 transition-all duration-700 ease-out opacity-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch bg-transparent shadow-2xl rounded-3xl overflow-visible">
              
              {/* Left Dark Card: Produk 1 - Smart NFC Under-Logo Tag */}
              <div className="md:col-span-5 bg-[#0F1F1A] text-white rounded-3xl md:rounded-r-none p-7 sm:p-8 relative overflow-hidden border border-[#2D3E37] z-10 flex flex-col justify-between ppt-from-left ppt-delay-1">
                {/* Radial Emerald Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,200,83,0.22),transparent_65%)] pointer-events-none" />

                {/* SVG Flight Path with Airplane Positioned Directly on the Dashed Path */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 320 200"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    id="heroJetPath"
                    d="M 25 175 Q 130 95 285 135"
                    stroke="rgba(255,255,255,0.3)"
                    strokeDasharray="5 5"
                    strokeWidth="1.5"
                    fill="none"
                    className="animate-dash-flow"
                  />
                  
                  <path
                    d="M 40 190 Q 160 50 300 165"
                    stroke="rgba(255,255,255,0.15)"
                    strokeDasharray="4 4"
                    strokeWidth="1.2"
                    fill="none"
                    className="animate-dash-flow"
                    style={{ animationDirection: "reverse" }}
                  />

                  {/* Airplane Gliding Exactly on Curve with zero drift */}
                  <g>
                    <path
                      d="M 0 -10 L 1.5 -7 L 1.5 -1.2 L 9 2.2 L 9 3.2 L 1.8 2.2 L 1.8 5 L 4.5 6.8 L 4.5 7.6 L 0.7 7.2 L 0 8.5 L -0.7 7.2 L -4.5 7.6 L -4.5 6.8 L -1.8 5 L -1.8 2.2 L -9 3.2 L -9 2.2 L -1.5 -1.2 L -1.5 -7 Z"
                      fill="#FFFFFF"
                      opacity="0.95"
                      transform="rotate(90)"
                    />
                    <animateMotion
                      dur="7s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#heroJetPath" />
                    </animateMotion>
                  </g>
                </svg>

                {/* Protruding Interactive Toggle Pill Button */}
                <div className="mb-4 relative z-10 flex items-center justify-between">
                  <button
                    onClick={() => setIsCardToggled(!isCardToggled)}
                    className="w-10 h-10 rounded-full bg-[#E8B898] hover:bg-[#ffcaa8] text-[#0F1F1A] flex items-center justify-center shadow-lg border-2 border-[#0F1F1A] transition-transform hover:scale-110 active:scale-95"
                    title="Klik untuk membaca detail teknologi NFC"
                  >
                    {isCardToggled ? (
                      <X className="w-4 h-4 font-black transition-transform duration-300" />
                    ) : (
                      <Plus className="w-4 h-4 font-black transition-transform duration-300" />
                    )}
                  </button>

                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C853]/15 text-[#00C853] border border-[#00C853]/30">
                    Produk 1 • Smart NFC Tag
                  </span>
                </div>

                <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 block mb-1 relative z-10">
                  Kemudahan Verifikasi Konsumen
                </span>
                
                <div className="flex items-baseline gap-3 relative z-10">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                    1-TAP
                  </span>
                  <span className="text-2xl font-bold text-[#E8B898]">
                    •
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40">
                    Tanpa Install Aplikasi
                  </span>
                </div>

                <p className="text-xs text-white/75 mt-3 max-w-xs leading-relaxed relative z-10">
                  {isCardToggled
                    ? "Kami membelikan & memprogramkan chip micro-NFC terenkripsi siap tempel (peel & stick). Brand Anda memasangkannya sendiri di balik logo produk fisik—konsumen tinggal tap HP untuk verifikasi sertifikat orisinalitas."
                    : "Chip NFC mikro terprogram siap tempel. Brand Anda memasangkannya di bawah logo, konsumen tinggal tap HP untuk autentikasi."}
                </p>
              </div>

              {/* Right White Card: Produk 2 - QR ShieldTag & Pengenalan 2 Produk */}
              <div className="md:col-span-7 bg-white text-[#0F1F1A] rounded-3xl md:rounded-l-none p-7 sm:p-9 shadow-xl border border-slate-200 flex flex-col justify-between relative overflow-hidden clip-chamfer-tl ppt-from-right ppt-delay-2">
                
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C853]/10 text-[#00C853] text-[11px] font-black uppercase tracking-wider mb-3">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Solusi Keaslian Brand Generasi Baru</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1F1A] tracking-tight leading-tight">
                      Proteksi Orisinalitas Produk:{" "}
                      <span className="bg-gradient-to-r from-[#0F1F1A] via-[#0F1F1A]/80 to-[#00C853] bg-clip-text text-transparent">
                        NFC Di Balik Logo & QR ShieldTag
                      </span>
                    </h1>
                    
                    <p className="text-xs sm:text-sm md:text-base text-[#0F1F1A]/75 mt-3 max-w-lg leading-relaxed">
                      Kami membelikan dan memprogram chip mikro NFC siap tempel untuk dipasangkan sendiri oleh brand di balik logonya, serta memproduksi segel kemasan <strong>QR ShieldTag</strong> anti-tamper yang tidak dapat difotokopi.
                    </p>

                    {/* Dual Products Feature Quick Pills */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-2.5 rounded-2xl bg-[#F4F6F4] border border-[#0F1F1A]/10 flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#00C853] text-[#0F1F1A] flex items-center justify-center text-xs font-black shrink-0">1</span>
                        <div className="text-[11px] leading-tight">
                          <strong className="block text-[#0F1F1A]">Smart NFC Under-Logo</strong>
                          <span className="text-[#0F1F1A]/60">Siap tempel di balik logo produk</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-[#F4F6F4] border border-[#0F1F1A]/10 flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#0F1F1A] text-white flex items-center justify-center text-xs font-black shrink-0">2</span>
                        <div className="text-[11px] leading-tight">
                          <strong className="block text-[#0F1F1A]">QR ShieldTag Anti-Tamper</strong>
                          <span className="text-[#0F1F1A]/60">Segel optik anti-duplikasi foto</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Geodesic Wireframe Globe */}
                  <div className="hidden sm:flex w-16 h-16 shrink-0 items-center justify-center animate-spin-reverse-slow">
                    <svg
                      className="w-14 h-14 text-[#0F1F1A]/40 stroke-current fill-none stroke-[1.4]"
                      viewBox="0 0 100 100"
                    >
                      <circle cx="50" cy="50" r="45" />
                      <ellipse cx="50" cy="50" rx="45" ry="20" />
                      <ellipse cx="50" cy="50" rx="20" ry="45" />
                      <line x1="5" y1="50" x2="95" y2="50" />
                      <line x1="50" y1="5" x2="50" y2="95" />
                    </svg>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="#cara-kerja"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00C853] text-[#0F1F1A] font-extrabold text-xs uppercase tracking-wider hover:bg-[#00C853]/90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#00C853]/25"
                  >
                    <span>Lihat Cara Kerja Produk</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#0F1F1A]/20 text-[#0F1F1A] font-bold text-xs uppercase tracking-wider hover:bg-[#0F1F1A]/5 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-[#00C853]" />
                    Simulasi Tap & Scan
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Forensic Inspection Modal */}
      <WatermarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
