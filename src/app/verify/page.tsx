"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ExternalLink,
  Share2,
  ShieldCheck,
  Copy,
  Calendar,
  Tag,
  CheckCircle,
  Building2,
} from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();

  // Dynamic parameters with luxury defaults
  const serialParam = searchParams.get("id") || searchParams.get("sn") || "VF-9821-4820";
  const productParam = searchParams.get("product") || searchParams.get("p") || "Aura Classic Leather Bag";
  const brandParam = searchParams.get("brand") || searchParams.get("b") || "Aura Atelier";
  const targetUrlParam = searchParams.get("url") || searchParams.get("link") || "https://verifay.com";
  const batchParam = searchParams.get("batch") || "BATCH-2026-A1";

  // States
  const [copiedSerial, setCopiedSerial] = useState(false);
  const [shared, setShared] = useState(false);
  const [scanDate, setScanDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setScanDate(
      now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const handleCopySerial = () => {
    navigator.clipboard.writeText(serialParam);
    setCopiedSerial(true);
    setTimeout(() => setCopiedSerial(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Sertifikat Keaslian: ${productParam}`,
        text: `Produk ${productParam} oleh ${brandParam} terverifikasi 100% original. (Nomor Seri: ${serialParam})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#111817] flex flex-col justify-between antialiased selection:bg-[#00C853]/20 selection:text-[#0A1512]">
      {/* Top Minimalist Brand Header */}
      <header className="w-full pt-8 pb-4 px-6 flex items-center justify-between max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#111817] text-white flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#00C853]" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[#111817]">
            Verifay<span className="text-[#00C853]">.</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E9E5] text-[11px] font-semibold text-[#1B3B30] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
          <span>Sertifikat Digital Resmi</span>
        </div>
      </header>

      {/* Main Luxury Passport Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-[2rem] border border-[#E5EAE5] shadow-[0_20px_50px_rgba(15,31,26,0.06)] overflow-hidden">
          {/* Subtle Top Certificate Header Bar */}
          <div className="bg-[#FAFBF9] border-b border-[#EEF2EE] px-6 py-4 flex items-center justify-between text-xs">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7D76]">
              Digital Certificate of Authenticity
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#8B9B94]">
              {batchParam}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* Minimalist Verified Badge */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#E8F8EE] text-[#00C853] flex items-center justify-center mb-3 shadow-xs">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <span className="text-[11px] font-bold tracking-widest uppercase text-[#00A844] mb-1">
                Produk Asli & Terverifikasi
              </span>
              <h1 className="text-2xl font-extrabold text-[#0F1F1A] tracking-tight">
                {productParam}
              </h1>
              <p className="text-xs text-[#52645D] mt-0.5 font-medium flex items-center gap-1 justify-center">
                <Building2 className="w-3.5 h-3.5 opacity-60" />
                <span>Oleh {brandParam}</span>
              </p>
            </div>

            {/* Certificate Details List */}
            <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#EAEFEA] space-y-3 text-xs mb-6">
              {/* Serial Number */}
              <div className="flex items-center justify-between py-1 border-b border-[#E8EEE8]">
                <span className="text-[#657971] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#00A844]" />
                  <span>Nomor Seri</span>
                </span>
                <button
                  onClick={handleCopySerial}
                  className="inline-flex items-center gap-1.5 font-bold text-sm text-[#0F1F1A] hover:text-[#00C853] transition-colors cursor-pointer"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  title="Klik untuk menyalin"
                >
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{serialParam}</span>
                  {copiedSerial ? (
                    <Check className="w-3.5 h-3.5 text-[#00C853]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#889990]" />
                  )}
                </button>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between py-1 border-b border-[#E8EEE8]">
                <span className="text-[#657971]">Status Keaslian</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#00A844]">
                  <Check className="w-3.5 h-3.5" />
                  <span>100% Original</span>
                </span>
              </div>

              {/* Verified Date */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#657971] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00A844]" />
                  <span>Tanggal Verifikasi</span>
                </span>
                <span className="font-medium text-[#111817]">
                  {scanDate || "Hari ini"}
                </span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="space-y-3">
              {/* Main Primary Button: Visit Brand Website */}
              <a
                href={targetUrlParam}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#0F1F1A] hover:bg-[#18332B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Kunjungi Website Resmi Produk</span>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Secondary Share Button */}
              <button
                onClick={handleShare}
                className="w-full py-3 px-4 rounded-xl bg-transparent hover:bg-[#F2F5F2] text-[#4A5D55] hover:text-[#0F1F1A] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {shared ? (
                  <>
                    <Check className="w-4 h-4 text-[#00C853]" />
                    <span>Link Sertifikat Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 opacity-70" />
                    <span>Bagikan Sertifikat Keaslian</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Micro Footer Inside Card */}
          <div className="bg-[#FAFBF9] border-t border-[#EEF2EE] px-6 py-3.5 text-center">
            <p className="text-[10px] text-[#7A8E85] font-medium">
              Sertifikat kriptografi ini diotentikasi langsung oleh sistem proteksi brand <strong>Verifay</strong>.
            </p>
          </div>
        </div>
      </main>

      {/* Global Minimalist Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#7A8E85]">
        <p>© {new Date().getFullYear()} Verifay. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-[#0F1F1A]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#00C853] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#7A8E85] font-medium">Memuat Sertifikat...</p>
          </div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
