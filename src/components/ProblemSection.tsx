import React from "react";
import Image from "next/image";
import { TrendingDown, AlertTriangle, SearchX, Sparkles } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      number: "01",
      tag: "ANCAMAN PEMALSUAN LOGO",
      title: "Logo Fisik Sangat Mudah Ditiru Pembajak",
      description:
        "Logo bordir, sablon, maupun plat logam mudah diduplikasi di pabrik gelap. Tanpa chip NFC terenkripsi di baliknya, konsumen awam tidak bisa membedakan produk asli dan tiruan.",
      icon: TrendingDown,
    },
    {
      number: "02",
      tag: "KELEMAHAN QR CODE BIASA",
      title: "QR Code Biasa Rentan Difotokopi & Diprint Ulang",
      description:
        "QR code standar tidak memiliki proteksi fisik. Siapapun bisa memotretnya dan mencetak stiker palsu. QR ShieldTag kami memiliki lapisan optik tamper-evident yang rusak jika dilepas.",
      icon: AlertTriangle,
    },
    {
      number: "03",
      tag: "ALUR KERJA PLUG & PLAY",
      title: "Kami Program & Siapkan, Anda Tinggal Tempel",
      description:
        "Anda tidak perlu merekrut tim IT atau memprogram hardware. Kami kirimkan chip NFC & QR ShieldTag yang sudah terenkripsi siap tempel langsung ke produk dan box kemasan Anda.",
      icon: SearchX,
    },
  ];

  return (
    <section id="masalah" className="py-24 bg-[#F8FAF8] border-t border-[#0F1F1A]/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Top Feature Layout (Matching Frame 6 in HD Video) */}
        <div className="relative mb-20">
          
          {/* Top Star Accent on Left */}
          <div className="w-9 h-9 rounded-full bg-[#0F1F1A]/5 border border-[#0F1F1A]/10 flex items-center justify-center text-[#0F1F1A] mb-4">
            <Sparkles className="w-5 h-5 text-[#00C853]" />
          </div>

          <div className="max-w-3xl relative ppt-from-bottom">
            {/* Signature Headline without blurry text gradient */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1F1A] tracking-tight leading-[1.18]">
              Dua lini proteksi canggih untuk menghentikan pemalsuan produk brand Anda{" "}
              <span className="text-[#00C853] font-black">
                dari dalam & luar.
              </span>
            </h2>

            {/* Elegant Curved Dotted Trajectory Line with Jet Airplane - Positioned above in open space */}
            <div className="hidden lg:block absolute -right-20 -top-8 w-80 h-36 pointer-events-none z-10">
              <svg className="w-full h-full stroke-[#0F1F1A]/20 fill-none" viewBox="0 0 320 120">
                <path
                  id="problemJetPath"
                  d="M 10 95 Q 160 70 310 15"
                  strokeDasharray="5 5"
                  strokeWidth="1.5"
                  className="animate-dash-flow"
                />
                <g>
                  <path
                    d="M 0 -10 L 1.5 -7 L 1.5 -1.2 L 9 2.2 L 9 3.2 L 1.8 2.2 L 1.8 5 L 4.5 6.8 L 4.5 7.6 L 0.7 7.2 L 0 8.5 L -0.7 7.2 L -4.5 7.6 L -4.5 6.8 L -1.8 5 L -1.8 2.2 L -9 3.2 L -9 2.2 L -1.5 -1.2 L -1.5 -7 Z"
                    fill="#0F1F1A"
                    opacity="0.85"
                    transform="rotate(90)"
                  />
                  <animateMotion
                    dur="7s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#problemJetPath" />
                  </animateMotion>
                </g>
              </svg>
            </div>
          </div>

          {/* Asymmetric 3-Column Staggered Image Layout (NFC Under-Logo & QR ShieldTag) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-14 items-end">
            
            {/* Column 1: Produk 1 - Smart NFC Under-Logo Tap Shot (Slides from Left) */}
            <div className="md:col-span-5 relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border border-[#0F1F1A]/10 group img-shimmer hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ppt-from-left ppt-delay-1">
              <Image
                src="/images/nfc-under-logo.jpg"
                alt="Smartphone tapping luxury bag with smart NFC tag beneath logo"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1A]/90 via-[#0F1F1A]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C853] block mb-1">
                  Produk 1 • Smart Embedded NFC
                </span>
                <h3 className="text-lg sm:text-xl font-bold leading-snug">
                  Ditanam rahasia di balik logo brand Anda—cukup tap HP untuk autentikasi
                </h3>
              </div>
            </div>

            {/* Column 2: Produk 2 - QR ShieldTag Luxury Packaging Shot (Slides from Left) */}
            <div className="md:col-span-4 relative h-[300px] sm:h-[360px] rounded-3xl overflow-hidden shadow-xl border border-[#0F1F1A]/10 group img-shimmer hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ppt-from-left ppt-delay-2">
              <Image
                src="/images/qr-shieldtag.jpg"
                alt="Luxury packaging sealed with cryptographic QR ShieldTag"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1A]/85 via-[#0F1F1A]/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white z-20">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C853] block mb-1">
                  Produk 2 • QR ShieldTag Seal
                </span>
                <h4 className="text-sm sm:text-base font-bold">
                  Segel optik anti-tamper & anti-duplikasi foto kemasan
                </h4>
              </div>
            </div>

            {/* Column 3: Narrative Text Block (Slides from Right) */}
            <div className="md:col-span-3 pb-4 space-y-3 ppt-from-right ppt-delay-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#00C853] block">
                Dual Authentication
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#0F1F1A] leading-snug">
                Proteksi Komprehensif Tanpa Ribet
              </h4>
              <p className="text-xs sm:text-sm text-[#0F1F1A]/70 leading-relaxed">
                Kami tangani pengadaan chip hardware dan pemrograman kriptografi cloud. Brand Anda tinggal menempelkan tag pada produk fisik dan box kemasan.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Problem Cards Grid (Staggered Fly In from Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#0F1F1A]/10">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            const delayClass = idx === 0 ? "ppt-delay-1" : idx === 1 ? "ppt-delay-2" : "ppt-delay-3";
            return (
              <div
                key={prob.number}
                className={`bg-white p-8 rounded-3xl border border-[#0F1F1A]/10 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden ppt-from-bottom ${delayClass}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#0F1F1A]/20 group-hover:text-[#00C853] transition-colors">
                    {prob.number}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-[#E8F5E9] text-[#00C853] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C853] block mb-2">
                  {prob.tag}
                </span>

                <h3 className="text-lg font-bold text-[#0F1F1A] mb-3 leading-snug">
                  {prob.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#0F1F1A]/70 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
