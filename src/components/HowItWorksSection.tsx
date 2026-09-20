import React from "react";
import { ArrowUpRight, Zap } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      badge: "Tahap 01",
      priceTag: "Tugas Kami",
      title: "Membelikan & Memprogramkan Chip NFC",
      subtitle: "Hardware & cloud kriptografi kami tangani penuh",
      description:
        "Kami membelikan chip micro-NFC berkualitas industri serta segel QR ShieldTag, lalu menginjeksikan token orisinalitas unik dan menyambungkannya ke sertifikat digital brand Anda.",
    },
    {
      badge: "Tahap 02",
      priceTag: "Tugas Brand Klien",
      title: "Memasangkan Tag di Bawah Logo & Box",
      subtitle: "Ditempelkan sendiri oleh brand / workshop pemesan",
      description:
        "Chip NFC dikirim dalam format siap tempel (peel & stick). Brand yang order memasangkan sendiri chip tersebut di bawah/balik logo fisik (tas, jaket, sepatu, parfum) dan menempelkan QR ShieldTag pada kemasan box.",
    },
    {
      badge: "Tahap 03",
      priceTag: "Konsumen Akhir",
      title: "Verifikasi 1-Tap Langsung di Logo",
      subtitle: "Autentikasi seketika tanpa perlu aplikasi",
      description:
        "Konsumen akhir cukup menempelkan HP mereka ke logo produk untuk membaca chip NFC, atau scan segel QR ShieldTag di box. Halaman sertifikat keaslian resmi langsung muncul.",
    },
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-[#F8FAF8] border-t border-[#0F1F1A]/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3 Staggered Step-Stair Cards (Matching mid_008.png & mid_010.png) */}
          <div className="lg:col-span-6 relative">
            <div className="space-y-6">
              
              {/* Card 1 (Top Left - Slides from Left) */}
              <div className="w-full sm:w-80 bg-[#EBF0EC] border border-[#0F1F1A]/10 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative ppt-from-left ppt-delay-1">
                <div className="flex justify-end mb-8">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-md bg-white/90 text-[#0F1F1A] border border-[#0F1F1A]/10 shadow-xs">
                    {steps[0].priceTag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F1F1A] mb-1">
                  {steps[0].title}
                </h3>
                <p className="text-xs text-[#0F1F1A]/60 font-medium">
                  {steps[0].subtitle}
                </p>
                <p className="text-xs text-[#0F1F1A]/70 mt-3 leading-relaxed">
                  {steps[0].description}
                </p>
              </div>

              {/* Card 2 (Indented Right - Slides from Left with Delay) */}
              <div className="w-full sm:w-80 sm:ml-auto bg-[#E5ECE7] border border-[#0F1F1A]/10 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative ppt-from-left ppt-delay-2">
                <div className="flex justify-end mb-8">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-md bg-white/90 text-[#00C853] border border-[#00C853]/30 shadow-xs">
                    {steps[1].priceTag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F1F1A] mb-1">
                  {steps[1].title}
                </h3>
                <p className="text-xs text-[#00C853] font-bold">
                  {steps[1].subtitle}
                </p>
                <p className="text-xs text-[#0F1F1A]/70 mt-3 leading-relaxed">
                  {steps[1].description}
                </p>
              </div>

              {/* Card 3 (Bottom Left - Slides from Left) */}
              <div className="w-full sm:w-80 bg-[#EBF0EC] border border-[#0F1F1A]/10 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative ppt-from-left ppt-delay-3">
                <div className="flex justify-end mb-8">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-md bg-white/90 text-[#0F1F1A] border border-[#0F1F1A]/10 shadow-xs">
                    {steps[2].priceTag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F1F1A] mb-1">
                  {steps[2].title}
                </h3>
                <p className="text-xs text-[#0F1F1A]/60 font-medium">
                  {steps[2].subtitle}
                </p>
                <p className="text-xs text-[#0F1F1A]/70 mt-3 leading-relaxed">
                  {steps[2].description}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Editorial (Slides from Right) */}
          <div className="lg:col-span-6 relative pl-0 lg:pl-6 ppt-from-right ppt-delay-2">
            
            {/* Animated Curved Flight Path crossing to the left towards Card 2 */}
            <div className="hidden lg:block absolute -left-36 top-10 w-64 h-32 pointer-events-none">
              <svg className="w-full h-full stroke-[#0F1F1A]/20 fill-none" viewBox="0 0 240 120">
                <path
                  id="howItWorksJetPath"
                  d="M 230 20 Q 120 50 10 90"
                  strokeDasharray="5 5"
                  strokeWidth="1.5"
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
                    dur="7s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#howItWorksJetPath" />
                  </animateMotion>
                </g>
              </svg>
            </div>

            <div className="max-w-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C853]/15 text-[#00C853] text-[11px] font-black uppercase tracking-wider mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>Alur Kerja Praktis & Efisien</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1F1A] tracking-tight leading-snug">
                Kami tangani teknologinya, Anda tinggal menempelkannya ke{" "}
                <span className="text-[#00C853] font-black">
                  logo & kemasan
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#0F1F1A]/70 mt-5 leading-relaxed">
                Brand Anda tidak perlu membeli mesin pemrograman mahal atau merekrut developer khusus. Chip NFC mikro dan segel QR ShieldTag kami kirimkan dalam kondisi siap pakai untuk ditempel oleh tim Anda.
              </p>

              {/* Circular Arrow Button */}
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#konsultasi"
                  className="group inline-flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E8B898] group-hover:bg-[#ffcaa8] text-[#0F1F1A] flex items-center justify-center font-black shadow-md transition-transform group-hover:scale-110 active:scale-95">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#0F1F1A]">
                    Konsultasikan Kebutuhan Brand
                  </span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
