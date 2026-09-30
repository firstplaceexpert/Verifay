"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Smartphone,
  Lock,
  Calendar,
  Layers,
  ArrowRight,
  Share2,
  AlertTriangle,
  RotateCcw,
  Check,
  ChevronDown,
  Info,
} from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();

  // URL Query Parameters with sensible luxury defaults
  const serialParam = searchParams.get("id") || searchParams.get("sn") || "VF-9821-4820";
  const productParam = searchParams.get("product") || searchParams.get("p") || "Aura Classic Leather Jacket";
  const brandParam = searchParams.get("brand") || searchParams.get("b") || "Verifay Signature Edition";
  const targetUrlParam = searchParams.get("url") || searchParams.get("link") || "https://verifay.com";
  const batchParam = searchParams.get("batch") || "BATCH-2026-A1";
  const autoRedirectParam = searchParams.get("autoredirect") === "true";

  // States
  const [scanState, setScanState] = useState<"scanning" | "verified">("scanning");
  const [countdown, setCountdown] = useState<number | null>(autoRedirectParam ? 5 : null);
  const [copied, setCopied] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [scanTime, setScanTime] = useState("");

  // Scan simulation and timestamp initialization
  useEffect(() => {
    const now = new Date();
    setScanTime(
      now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) + " WIB"
    );

    const timer = setTimeout(() => {
      setScanState("verified");
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer for auto-redirect if activated
  useEffect(() => {
    if (countdown === null || scanState !== "verified") return;

    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    } else if (countdown === 0) {
      window.location.href = targetUrlParam;
    }
  }, [countdown, scanState, targetUrlParam]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Verifikasi Keaslian: ${productParam}`,
        text: `Produk ${productParam} oleh ${brandParam} terverifikasi asli (SN: ${serialParam}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1512] text-[#F8FAF8] flex flex-col justify-between selection:bg-[#00C853] selection:text-[#0A1512]">
      {/* Background Glow Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00C853]/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#10b981]/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between w-full mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center text-[#00C853] group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm tracking-wider uppercase text-emerald-400">
              Verifay
            </span>
          </Link>

          <span className="text-xs bg-[#152B23] border border-emerald-500/20 text-emerald-300/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
            NFC Live Verify
          </span>
        </div>

        {/* SCANNING STATE ANIMATION */}
        {scanState === "scanning" && (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00C853]/40 animate-spin" />
              <div className="absolute inset-2 rounded-full border border-[#00C853]/20 bg-[#00C853]/10 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-[#132A22] border border-[#00C853] flex items-center justify-center text-[#00C853] shadow-[0_0_30px_rgba(0,200,83,0.4)]">
                <Smartphone className="w-8 h-8 animate-pulse" />
              </div>
            </div>
            <h2 className="text-xl font-semibold tracking-wide text-white mb-2">
              Membaca Kriptografi Tag...
            </h2>
            <p className="text-sm text-gray-400 max-w-xs">
              Memvalidasi tanda tangan digital chip NFC anti-tamper dengan server Verifay.
            </p>
          </div>
        )}

        {/* VERIFIED SUCCESS STATE */}
        {scanState === "verified" && (
          <div className="w-full flex flex-col items-center transition-all duration-500">
            {/* Pulsing Verified Seal */}
            <div className="relative flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#00C853]/20 animate-pulse blur-md" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#00C853] to-[#047857] p-[2px] shadow-[0_0_40px_rgba(0,200,83,0.5)]">
                  <div className="w-full h-full rounded-full bg-[#0A1D17] flex items-center justify-center text-[#00C853]">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/40 text-[#00E676] text-xs font-semibold tracking-wide uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                100% Produk Asli & Terverifikasi
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight">
                Otentisitas Dikonfirmasi
              </h1>
              <p className="text-xs text-gray-400 text-center mt-1">
                Tanda tangan digital NFC sesuai dengan database resmi pabrikan.
              </p>
            </div>

            {/* Auto Redirect Banner (if enabled) */}
            {countdown !== null && (
              <div className="w-full mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="text-gray-300">
                  Mengarahkan ke website resmi dalam{" "}
                  <strong className="text-emerald-400 font-mono text-sm">{countdown}s</strong>...
                </span>
                <button
                  onClick={() => setCountdown(null)}
                  className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                >
                  Batalkan
                </button>
              </div>
            )}

            {/* Product Certificate Card */}
            <div className="w-full bg-[#11231D]/90 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden mb-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Brand and Product */}
              <div className="border-b border-emerald-500/15 pb-4 mb-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                  {brandParam}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {productParam}
                </h3>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-[#0B1814] border border-emerald-950">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Serial Number</span>
                  </div>
                  <div className="font-mono font-bold text-emerald-300 text-sm truncate">
                    {serialParam}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1814] border border-emerald-950">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Batch Produksi</span>
                  </div>
                  <div className="font-mono font-semibold text-gray-200 text-sm truncate">
                    {batchParam}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1814] border border-emerald-950 col-span-2">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Waktu Pemindaian NFC</span>
                  </div>
                  <div className="font-medium text-gray-200">
                    {scanTime || "Terverifikasi saat ini"}
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-200 font-medium">Status Garansi Resmi:</span>
                </div>
                <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
                  Aktif & Terlindungi
                </span>
              </div>
            </div>

            {/* CALL TO ACTION BUTTONS (Auto-link / Visit Product Website) */}
            <div className="w-full flex flex-col gap-3 mb-6">
              <a
                href={targetUrlParam}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#009624] text-[#0A1512] font-bold text-base shadow-[0_10px_25px_rgba(0,200,83,0.3)] hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <span>Kunjungi Website Resmi Produk</span>
                <ExternalLink className="w-5 h-5" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#152B23] border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-semibold text-gray-200 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Link Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-emerald-400" />
                      <span>Bagikan Bukti</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setScanState("scanning")}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#152B23] border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-semibold text-gray-200 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Scan Ulang</span>
                </button>
              </div>
            </div>

            {/* Collapsible Technical Security Details */}
            <div className="w-full bg-[#0E1E19] border border-emerald-950 rounded-2xl p-4 mb-4 text-xs">
              <button
                onClick={() => setShowTechDetails(!showTechDetails)}
                className="w-full flex items-center justify-between text-gray-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-500" />
                  <span>Informasi Teknis Tag & Kriptografi</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showTechDetails ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showTechDetails && (
                <div className="mt-3 pt-3 border-t border-emerald-950 space-y-2 text-gray-400 font-mono text-[11px] animate-fade-in">
                  <div className="flex justify-between">
                    <span>Chip Protocol:</span>
                    <span className="text-gray-200">ISO/IEC 14443 Type A (NTAG213/215)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enkripsi:</span>
                    <span className="text-gray-200">AES-128 Digital Signature</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Anti-Cloning:</span>
                    <span className="text-emerald-400">Aktif (Tamper-Proof Tag)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status Verifikasi:</span>
                    <span className="text-emerald-400">Verified by Verifay Cloud</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center text-gray-500 text-xs flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} Verifay Protection Engine. Hak Cipta Dilindungi.</p>
          <Link href="/" className="text-emerald-400/80 hover:underline">
            Pelajari Teknologi Verifay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A1512] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-mono">Memuat Sistem Verifay...</p>
          </div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
