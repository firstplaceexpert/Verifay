import React from "react";
import Image from "next/image";
import { Layers } from "lucide-react";

export function EasyImplementationSection() {
  const stories = [
    {
      image: "/images/nfc-under-logo.jpg",
      title: "Pemasangan Mandiri di Bawah Logo",
      description:
        "Kami sediakan dan programkan chip mikro NFC siap tempel (peel & stick). Tim workshop brand Anda tinggal merekatkannya di balik patch logo kulit, label woven pakaian, atau emblem produk tanpa butuh alat khusus.",
    },
    {
      image: "/images/qr-shieldtag.jpg",
      title: "Penyegelan Box via QR ShieldTag",
      description:
        "Label segel tamper-evident optik berstandar tinggi. Cukup tempelkan pada bukaan box kemasan atau kartu sertifikat garansi resmi brand Anda.",
    },
    {
      image: "/images/product-authenticity.jpg",
      title: "Verifikasi Konsumen 1-Tap & 1-Scan",
      description:
        "Konsumen cukup menempelkan smartphone mereka pada logo atau memindai segel QR. Halaman verifikasi digital berlisensi resmi langsung terbuka seketika.",
    },
  ];

  return (
    <section id="implementasi" className="py-24 bg-[#F8FAF8] border-t border-[#0F1F1A]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header (Slides from Bottom) */}
        <div className="mb-14 ppt-from-bottom">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C853]/15 text-[#00C853] text-[11px] font-black uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Implementasi Praktis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1F1A] tracking-tight">
            Cara brand mengaplikasikan teknologi kami
          </h2>
        </div>

        {/* 3 Editorial Story Cards (Slides in dynamically from Left, Bottom, and Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((item, idx) => {
            const pptDirection =
              idx === 0
                ? "ppt-from-left ppt-delay-1"
                : idx === 1
                ? "ppt-from-bottom ppt-delay-2"
                : "ppt-from-right ppt-delay-3";

            return (
              <div key={idx} className={`group flex flex-col justify-between ${pptDirection}`}>
                <div>
                  {/* Photo container with smooth rounded corners and shimmer sweep */}
                  <div className="relative h-60 w-full rounded-3xl overflow-hidden mb-6 bg-[#0F1F1A]/5 img-shimmer border border-[#0F1F1A]/10 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-500">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#0F1F1A] mb-2 leading-snug group-hover:text-[#00C853] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#0F1F1A]/70 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* READ MORE Link with classic hover underline (Matching Frame 18) */}
                <div>
                  <a
                    href="#konsultasi"
                    className="inline-block text-xs font-black uppercase tracking-wider text-[#0F1F1A] hover:text-[#00C853] underline underline-offset-4 decoration-2 decoration-[#0F1F1A]/30 hover:decoration-[#00C853] transition-all"
                  >
                    READ MORE
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default EasyImplementationSection;
