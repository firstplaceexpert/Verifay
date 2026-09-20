"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, MessageSquare, ShieldCheck, Info, Sparkles } from "lucide-react";

export function CTAFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    brandName: "",
    productType: "Smart NFC Di Bawah Logo",
    productScale: "500 - 2.000 Pcs",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
    whatsappUrl?: string;
  } | null>(null);

  const productTypeOptions = [
    "Smart NFC Di Bawah Logo",
    "QR ShieldTag Segel Kemasan",
    "Dual Protection (NFC + QR)",
  ];

  const productScaleOptions = [
    "100 - 500 Pcs",
    "500 - 2.000 Pcs",
    "2.000 - 10.000 Pcs",
    "> 10.000 Pcs",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengirim formulir. Silakan coba kembali.");
      }

      setStatusMessage({
        type: "success",
        text: data.message || "Terima kasih! Informasi brand Anda telah kami terima.",
        whatsappUrl: data.whatsappUrl,
      });

      // Reset form
      setFormData({
        fullName: "",
        whatsapp: "",
        email: "",
        brandName: "",
        productType: "Smart NFC Di Bawah Logo",
        productScale: "500 - 2.000 Pcs",
        notes: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kendala saat mengirim data.";
      setStatusMessage({
        type: "error",
        text: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="konsultasi" className="bg-[#0F1F1A] text-white relative overflow-hidden scroll-mt-16 border-t border-[#2D3E37]/50">
      
      {/* ===== TOP AREA: Prominent CTA + Form ===== */}
      <div className="pt-20 sm:pt-28 pb-20 sm:pb-28 relative">
        
        {/* Background decorative giant text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-black text-[80px] sm:text-[140px] md:text-[200px] lg:text-[260px] leading-none text-white/[0.03] tracking-tighter uppercase whitespace-nowrap">
            ORDER NOW
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          
          {/* Section headline - Full width, highly visible */}
          <div className="text-center mb-12 sm:mb-16 ppt-from-bottom">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C853]/15 text-[#00C853] text-[11px] font-black uppercase tracking-widest mb-5 border border-[#00C853]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Konsultasi Gratis &amp; Tanpa Komitmen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Mulai Lindungi{" "}
              <span className="text-[#00C853]">Keaslian Brand</span>{" "}
              Anda Sekarang
            </h2>
            <p className="text-sm sm:text-base text-white/60 mt-4 max-w-xl mx-auto leading-relaxed">
              Isi formulir di bawah dan tim kami akan menghubungi Anda dalam 1×24 jam untuk diskusi solusi proteksi terbaik.
            </p>
          </div>
          
          {/* Form Card - Centered and prominent */}
          <div className="max-w-2xl mx-auto ppt-from-bottom ppt-delay-1">
            
            {/* Glowing card container */}
            <div className="relative p-8 sm:p-10 rounded-[2rem] bg-gradient-to-b from-[#1B3B30] to-[#142A22] border border-[#2D3E37] shadow-2xl shadow-[#00C853]/5">
              
              {/* Subtle glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-b from-[#00C853]/10 via-transparent to-transparent rounded-[2.2rem] pointer-events-none -z-10 blur-xl" />

              {statusMessage && statusMessage.type === "success" ? (
                <div className="p-8 rounded-3xl bg-[#1B3B30] border border-[#00C853]/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00C853]/20 text-[#00C853] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Konsultasi Berhasil Terjadwal!</h4>
                  <p className="text-sm text-white/80 max-w-sm mx-auto leading-relaxed">
                    {statusMessage.text}
                  </p>
                  {statusMessage.whatsappUrl && (
                    <div className="pt-3">
                      <a
                        href={statusMessage.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00C853] text-[#0F1F1A] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#00C853]/25 hover:bg-[#00C853]/90 transition-all hover:scale-105"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>Chat WhatsApp Sekarang</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Form title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center text-[#00C853]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Formulir Konsultasi</h3>
                      <p className="text-[11px] text-white/50">Isi data brand Anda untuk memulai</p>
                    </div>
                  </div>

                  {statusMessage && statusMessage.type === "error" && (
                    <div className="p-3.5 rounded-2xl bg-rose-900/30 border border-rose-500/50 flex items-start gap-2.5 text-rose-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{statusMessage.text}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]/30 transition-all"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Nomor WhatsApp *"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Nama Brand / Bisnis *"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]/30 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email Bisnis"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]/30 transition-all"
                    />
                  </div>

                  {/* Product Interest Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-white/60 mb-2.5 uppercase tracking-wider">
                      Solusi Yang Dibutuhkan:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {productTypeOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, productType: type })}
                          className={`py-2.5 px-4 rounded-xl text-[12px] font-bold transition-all border text-left ${
                            formData.productType === type
                              ? "bg-[#00C853] text-[#0F1F1A] border-[#00C853] shadow-md shadow-[#00C853]/20"
                              : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:bg-white/10"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Segmented Options */}
                  <div>
                    <label className="block text-[11px] font-bold text-white/60 mb-2.5 uppercase tracking-wider">
                      Estimasi Jumlah Unit / Pcs:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {productScaleOptions.map((scale) => (
                        <button
                          key={scale}
                          type="button"
                          onClick={() => setFormData({ ...formData, productScale: scale })}
                          className={`py-2.5 px-3 rounded-lg text-[12px] font-bold transition-all border ${
                            formData.productScale === scale
                              ? "bg-[#00C853] text-[#0F1F1A] border-[#00C853] shadow-md shadow-[#00C853]/20"
                              : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:bg-white/10"
                          }`}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reassurance note */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[12px] text-white/70 leading-relaxed flex items-start gap-3">
                    <Info className="w-4 h-4 shrink-0 text-[#00C853] mt-0.5" />
                    <div>
                      <strong className="text-white">Alur Simpel:</strong> Kami menyediakan hardware &amp; memprogram chip mikro NFC dalam bentuk stiker <em>peel &amp; stick</em> siap pakai. Brand Anda tinggal memasangkannya di balik logo produk fisik (tas, baju, sepatu, parfum) di workshop/gudang Anda sendiri.
                    </div>
                  </div>

                  {/* Submit Button - Large and prominent */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-2xl bg-[#00C853] hover:bg-[#00E676] text-[#0F1F1A] font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#00C853]/25 hover:shadow-[#00C853]/40 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Menyimpan...</span>
                        </div>
                      ) : (
                        <>
                          <span>Kirim Permintaan Konsultasi</span>
                          <div className="w-7 h-7 rounded-full bg-[#0F1F1A] text-[#00C853] flex items-center justify-center shrink-0">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-white/40 leading-relaxed text-center">
                    *By submitting, the data provided will be used to perform your request according to the Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM AREA: Navigation Links (secondary, below the form) ===== */}
      <div className="border-t border-[#2D3E37]/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-14 ppt-from-bottom ppt-delay-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-white/60">
            {/* Column 1: Discover */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
                Discover
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#masalah" className="hover:text-[#00C853] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#cara-kerja" className="hover:text-[#00C853] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#keunggulan" className="hover:text-[#00C853] transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#keunggulan" className="hover:text-[#00C853] transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#implementasi" className="hover:text-[#00C853] transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Social */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
                Social
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#konsultasi" className="hover:text-[#00C853] transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#konsultasi" className="hover:text-[#00C853] transition-colors">
                    Behance
                  </a>
                </li>
                <li>
                  <a href="#konsultasi" className="hover:text-[#00C853] transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#konsultasi" className="hover:text-[#00C853] transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
                Info
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#" className="hover:text-[#00C853] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00C853] transition-colors">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact summary */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
                Contact
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Tim kami siap membantu konsultasi proteksi brand Anda kapan saja via WhatsApp.
              </p>
              <a
                href="#konsultasi"
                className="inline-flex items-center gap-1.5 text-[#00C853] text-xs font-bold hover:underline"
              >
                <span>Hubungi Kami</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CTAFormSection;
