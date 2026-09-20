import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function EditorialBanner() {
  return (
    <section className="relative w-full h-[480px] sm:h-[600px] lg:h-[700px] overflow-hidden my-6 sm:my-10 rounded-[2.5rem] border border-[#0F1F1A]/20 shadow-2xl group">
      {/* Background Image with subtle zoom on hover */}
      <Image
        src="/images/editorial-banner.jpg"
        alt="Confident brand founder protecting legacy"
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
      />

      {/* Subtle Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1A]/70 via-transparent to-[#0F1F1A]/40" />

      {/* Exact Split Architectural Typography from Video (Frame 5: 'ELEVATE YOUR' top-left, 'JOURNEY' bottom-right) */}
      <div className="absolute inset-0 p-8 sm:p-14 lg:p-20 flex flex-col justify-between pointer-events-none select-none z-10">
        
        {/* Top-Left: PROTECT YOUR (Slides from Left) */}
        <div className="max-w-xl ppt-from-left ppt-delay-1">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#00C853] text-[11px] font-black uppercase tracking-widest border border-white/20 mb-4 pointer-events-auto">
            Forensic Defense
          </span>
          <h2 className="font-black text-5xl sm:text-7xl lg:text-9xl tracking-tighter text-white uppercase leading-[0.88] drop-shadow-2xl">
            PROTECT <br />
            YOUR
          </h2>
        </div>

        {/* Bottom-Right: LEGACY with Action Pill (Slides from Right) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-auto ppt-from-right ppt-delay-2">
          <p className="text-xs sm:text-sm text-white font-medium max-w-sm leading-relaxed bg-[#0F1F1A]/80 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl">
            Jadikan logo dan kemasan produk Anda sebagai identitas pintar anti-pemalsuan dengan chip NFC terprogram siap tempel dan segel QR ShieldTag berstandar global.
          </p>

          <div className="text-right">
            <h2 className="font-black text-5xl sm:text-7xl lg:text-9xl tracking-tighter text-white uppercase leading-[0.88] drop-shadow-2xl">
              LEGACY
            </h2>
            <div className="mt-4 flex justify-end">
              <a
                href="#konsultasi"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#00C853] hover:bg-[#00C853]/90 text-[#0F1F1A] font-extrabold text-xs tracking-wider uppercase transition-all hover:scale-105 shadow-xl shadow-[#00C853]/30"
              >
                <span>Konsultasi Eksklusif</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default EditorialBanner;
