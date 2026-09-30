"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Tag,
  Package,
} from "lucide-react";

export default function ProgrammerPage() {
  // Config States
  const [brand, setBrand] = useState("Aura Leather");
  const [product, setProduct] = useState("Heritage Leather Bag");
  const [prefix, setPrefix] = useState("VF-SN-");
  const [serialNum, setSerialNum] = useState(1);
  const [targetUrl, setTargetUrl] = useState("https://auraleather.com");
  const [copied, setCopied] = useState(false);

  // Audio Context Ref for clean feedback tone
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      } catch {
        // audio context optional
      }
    }
  }, []);

  const playBeep = () => {
    try {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // ignore
    }
  };

  // Generate Current Tag URL
  const currentSerial = `${prefix}${String(serialNum).padStart(3, "0")}`;
  const getFullUrl = (sn: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://verifay-mu.vercel.app";
    const params = new URLSearchParams({
      id: sn,
      brand: brand.trim(),
      product: product.trim(),
      url: targetUrl.trim(),
    });
    return `${baseUrl}/verify?${params.toString()}`;
  };

  const handleCopy = () => {
    const url = getFullUrl(currentSerial);
    navigator.clipboard.writeText(url);
    if (navigator.vibrate) navigator.vibrate(60);
    playBeep();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    setSerialNum((prev) => prev + 1);
    playBeep();
  };

  const handlePrev = () => {
    setSerialNum((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="min-h-screen bg-[#0C1713] text-[#F8FAF8] flex flex-col justify-between selection:bg-[#00C853] selection:text-[#0C1713]">
      {/* Top Header */}
      <header className="w-full pt-6 pb-2 px-6 flex items-center justify-between max-w-lg mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#00C853]/20 border border-[#00C853]/30 flex items-center justify-center text-[#00C853]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">
            Verifay<span className="text-[#00C853]">.OS</span>
          </span>
        </Link>

        <a
          href={getFullUrl(currentSerial)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#00C853] hover:text-emerald-300 font-medium flex items-center gap-1 bg-[#132A20] px-3 py-1.5 rounded-full border border-emerald-500/20 transition-colors"
        >
          <span>Tes Buka Sertifikat</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </header>

      {/* Main Single Centered Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#11231C] border border-emerald-500/20 rounded-[2.2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#00C853]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Title */}
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00C853] flex items-center gap-1.5 mb-1">
              <Smartphone className="w-3.5 h-3.5" />
              NFC Tag Programmer (iPhone Ready)
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Tulis Data Stiker Produk
            </h1>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 text-xs mb-6">
            {/* Brand Name */}
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#00C853]" />
                <span>Nama Brand:</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Contoh: Aura Leather"
                className="w-full px-4 py-3 rounded-xl bg-[#091510] border border-emerald-950 focus:border-[#00C853] text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#00C853]" />
                <span>Nama Produk:</span>
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Contoh: Heritage Leather Bag"
                className="w-full px-4 py-3 rounded-xl bg-[#091510] border border-emerald-950 focus:border-[#00C853] text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Target Client Website */}
            <div>
              <label className="block text-gray-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#00C853]" />
                <span>Website Resmi Klien (Tujuan Pembeli):</span>
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-[#091510] border border-emerald-950 focus:border-[#00C853] text-[#00E676] text-xs focus:outline-none transition-colors"
              />
            </div>

            {/* Serial Number Stepper */}
            <div className="pt-2">
              <label className="block text-gray-300 font-semibold mb-2">
                Nomor Seri Stiker:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-24 px-3 py-3 rounded-xl bg-[#091510] border border-emerald-950 text-white text-center text-sm font-semibold uppercase focus:outline-none focus:border-[#00C853]"
                  title="Prefix Serial"
                />

                <div className="flex-1 flex items-center justify-between bg-[#091510] border border-emerald-950 rounded-xl px-2 py-1.5">
                  <button
                    onClick={handlePrev}
                    disabled={serialNum <= 1}
                    className="w-9 h-9 rounded-lg bg-[#142920] hover:bg-[#1C3B2E] disabled:opacity-30 disabled:hover:bg-[#142920] text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Kurang 1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="text-base font-extrabold text-[#00E676] tracking-wider tabular-nums">
                    {String(serialNum).padStart(3, "0")}
                  </span>

                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-lg bg-[#142920] hover:bg-[#1C3B2E] text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Tambah 1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview URL Pill */}
          <div className="mb-6 p-3 rounded-xl bg-[#08130E] border border-emerald-950/80">
            <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider mb-1 flex items-center justify-between">
              <span>Link Stiker #{currentSerial}:</span>
            </div>
            <p className="text-[11px] text-emerald-300/90 truncate select-all">
              {getFullUrl(currentSerial)}
            </p>
          </div>

          {/* PRIMARY MASSIVE COPY BUTTON (Optimized for iPhone thumb) */}
          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                copied
                  ? "bg-[#00C853] text-[#07130F] scale-[1.01]"
                  : "bg-gradient-to-r from-[#00C853] to-[#009624] text-[#07130F] hover:brightness-110 active:scale-[0.98]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>BERHASIL DISALIN!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>SALIN LINK STIKER ({currentSerial})</span>
                </>
              )}
            </button>

            {/* Quick Advance to Next Tag Button */}
            <button
              onClick={handleNext}
              className="w-full py-3.5 px-4 rounded-xl bg-[#142820] hover:bg-[#1B362B] text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-emerald-500/10"
            >
              <span>Lanjut ke Stiker Berikutnya (+1)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick 3-Step Reminder */}
          <div className="mt-6 pt-4 border-t border-emerald-950/80 text-[11px] text-gray-400 text-center">
            Buka <strong>NFC Tools</strong> di iPhone ➔ <strong>Write &gt; Add record &gt; URL</strong> ➔ Paste & Tulis ke stiker.
          </div>
        </div>
      </main>

      {/* Global Minimalist Footer */}
      <footer className="w-full py-4 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Verifay Protection Engine</p>
      </footer>
    </div>
  );
}
