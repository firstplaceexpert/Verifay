"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Radio,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  History,
  QrCode,
  ArrowUpRight,
} from "lucide-react";

interface BurnRecord {
  id: string;
  serial: string;
  brand: string;
  product: string;
  url: string;
  timestamp: string;
}

export default function ProgrammerPage() {
  // Batch & Product Configuration
  const [brand, setBrand] = useState("Aura Leather");
  const [product, setProduct] = useState("Heritage Leather Bag");
  const [prefix, setPrefix] = useState("VF-SN-");
  const [serialNum, setSerialNum] = useState(1);
  const [targetUrl, setTargetUrl] = useState("https://auraleather.com");
  const [batchCode, setBatchCode] = useState("BATCH-2026-A1");

  // Options
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [justBurnedSerial, setJustBurnedSerial] = useState<string | null>(null);

  // History log of programmed tags in this session
  const [history, setHistory] = useState<BurnRecord[]>([
    {
      id: "demo-0",
      serial: "VF-SN-000",
      brand: "Aura Leather",
      product: "Heritage Leather Bag",
      url: "https://verifay-mu.vercel.app/verify?id=VF-SN-000",
      timestamp: "Sesi Dimulai",
    },
  ]);

  // Audio Context Ref for tactile mechanical feedback tone
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

  const playMechanicalClick = useCallback((pitchMultiplier = 1) => {
    try {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(650 * pitchMultiplier, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200 * pitchMultiplier, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore audio errors
    }
  }, []);

  const playSuccessTone = useCallback(() => {
    try {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }, []);

  // Generate Current Tag URL
  const currentSerial = `${prefix}${String(serialNum).padStart(3, "0")}`;

  const getFullUrl = useCallback(
    (sn: string) => {
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://verifay-mu.vercel.app";
      const params = new URLSearchParams({
        id: sn,
        brand: brand.trim(),
        product: product.trim(),
        url: targetUrl.trim(),
        batch: batchCode.trim(),
      });
      return `${baseUrl}/verify?${params.toString()}`;
    },
    [brand, product, targetUrl, batchCode]
  );

  // Core Copy Handler
  const handleCopy = useCallback(() => {
    const activeUrl = getFullUrl(currentSerial);
    navigator.clipboard.writeText(activeUrl);

    if (navigator.vibrate) {
      navigator.vibrate(40);
    }
    playSuccessTone();

    // Add to history
    const now = new Date();
    const timeStr = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newRecord: BurnRecord = {
      id: `${currentSerial}-${Date.now()}`,
      serial: currentSerial,
      brand: brand.trim(),
      product: product.trim(),
      url: activeUrl,
      timestamp: timeStr,
    };

    setHistory((prev) => [newRecord, ...prev.slice(0, 19)]);
    setJustBurnedSerial(currentSerial);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);

    // If auto-advance enabled, jump to next serial number automatically
    if (autoAdvance) {
      setSerialNum((prev) => prev + 1);
    }
  }, [currentSerial, getFullUrl, brand, product, autoAdvance, playSuccessTone]);

  const handleNext = () => {
    playMechanicalClick(1.2);
    setSerialNum((prev) => prev + 1);
  };

  const handlePrev = () => {
    playMechanicalClick(0.9);
    setSerialNum((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleCopyHistoryItem = (url: string, sn: string) => {
    navigator.clipboard.writeText(url);
    if (navigator.vibrate) navigator.vibrate(30);
    playSuccessTone();
    setJustBurnedSerial(sn);
  };

  // Keyboard shortcut: Spacebar to copy & advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleCopy();
      } else if (e.code === "ArrowUp" || e.key === "+") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowDown" || e.key === "-") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCopy]);

  return (
    <div className="min-h-screen bg-[#0A0E0D] text-[#E0E7E4] flex flex-col antialiased selection:bg-[#00E676] selection:text-[#0A0E0D]">
      {/* Precision Top Workbench Header */}
      <header className="border-b border-[#1A2421] bg-[#0E1513]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#14231E] border border-[#00E676]/30 flex items-center justify-center text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.15)]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  VERIFAY<span className="text-[#00E676]">.LAB</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-[#182B24] text-[#00E676] border border-[#00E676]/20 uppercase">
                  NFC Workbench v2.4
                </span>
              </div>
              <p className="text-[10px] text-[#6E827B] font-medium tracking-wide">
                Hardware Encoder & Serial Sequencer
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#7E938B] bg-[#121B18] px-3 py-1.5 rounded-lg border border-[#1E2B26]">
            <Radio className="w-3.5 h-3.5 text-[#00E676] animate-pulse" />
            <span>ENCODER STATUS: READY</span>
          </div>

          <a
            href={getFullUrl(currentSerial)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00E676] hover:text-white font-semibold flex items-center gap-1.5 bg-[#14241E] hover:bg-[#1E372E] px-3.5 py-1.5 rounded-lg border border-[#00E676]/30 transition-all shadow-xs"
          >
            <span>Live Verify Test</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main 2-Column Workstation Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter & Sequencer Deck (7 Columns) */}
        <section className="lg:col-span-7 space-y-5">
          {/* Deck 01: Batch Configuration Panel */}
          <div className="bg-[#101715] border border-[#1A2622] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1A2622]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-widest text-[#00E676] uppercase">
                  01 / BATCH CONFIGURATION
                </span>
              </div>
              <span className="text-[10px] text-[#5E736B] uppercase font-mono tracking-wider">
                Production Session
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#8EA39B] uppercase tracking-wider mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Aura Leather"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0C] border border-[#202E29] focus:border-[#00E676] text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8EA39B] uppercase tracking-wider mb-1.5">
                  Product Label
                </label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Heritage Leather Bag"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0C] border border-[#202E29] focus:border-[#00E676] text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8EA39B] uppercase tracking-wider mb-1.5">
                  Target Client URL (Redirect)
                </label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://client-brand.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0C] border border-[#202E29] focus:border-[#00E676] text-[#69F0AE] text-xs font-mono focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8EA39B] uppercase tracking-wider mb-1.5">
                  Batch Code
                </label>
                <input
                  type="text"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  placeholder="BATCH-2026-A1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D0C] border border-[#202E29] focus:border-[#00E676] text-white text-xs font-mono focus:outline-none transition-colors uppercase"
                />
              </div>
            </div>
          </div>

          {/* Deck 02: Tactile Serial Sequencer Console */}
          <div className="bg-[#101715] border border-[#1A2622] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1A2622]">
              <span className="text-[11px] font-bold tracking-widest text-[#00E676] uppercase">
                02 / HARDWARE SERIAL SEQUENCER
              </span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs text-[#8EA39B] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="accent-[#00E676] w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Auto-Advance (+1) saat Disalin</span>
                </label>
              </div>
            </div>

            {/* Industrial Digital Display Counter */}
            <div className="bg-[#080C0B] border border-[#1A2622] rounded-2xl p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="w-24">
                  <span className="block text-[10px] font-bold text-[#5E736B] uppercase mb-1">
                    Prefix
                  </span>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#111A17] border border-[#22332D] text-white text-center text-sm font-bold uppercase focus:border-[#00E676] focus:outline-none font-mono"
                  />
                </div>

                <div className="flex-1 sm:w-56 text-center sm:text-left pl-2">
                  <span className="block text-[10px] font-bold text-[#5E736B] uppercase mb-1">
                    Active Serial Number
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#00E676] tracking-tight font-mono">
                    {String(serialNum).padStart(3, "0")}
                  </div>
                </div>
              </div>

              {/* Stepper Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrev}
                  disabled={serialNum <= 1}
                  className="px-4 py-3 rounded-xl bg-[#14201C] hover:bg-[#1B2C26] active:scale-95 disabled:opacity-30 disabled:hover:bg-[#14201C] text-white font-bold flex items-center gap-1.5 transition-all border border-[#22332D] cursor-pointer"
                  title="Kurang 1 (Shortcut: Panah Bawah / -)"
                >
                  <Minus className="w-4 h-4" />
                  <span className="text-xs">PREV (-1)</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-3 rounded-xl bg-[#14201C] hover:bg-[#1B2C26] active:scale-95 text-[#00E676] font-bold flex items-center gap-1.5 transition-all border border-[#22332D] cursor-pointer"
                  title="Tambah 1 (Shortcut: Panah Atas / +)"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-xs">NEXT (+1)</span>
                </button>
              </div>
            </div>

            {/* Live Payload URI Stream Display */}
            <div className="mb-5 bg-[#080C0B] border border-[#1A2622] rounded-xl p-3.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5E736B] mb-1.5">
                <span>NFC PAYLOAD URL (TAG #{currentSerial}):</span>
                <span className="text-[#00E676]">READY TO WRITE</span>
              </div>
              <p className="text-xs text-[#8BE9FD] font-mono truncate select-all bg-[#0F1614] px-3 py-2 rounded-lg border border-[#1E2D27]">
                {getFullUrl(currentSerial)}
              </p>
            </div>

            {/* Master Action Burn Button */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <button
                onClick={handleCopy}
                className={`sm:col-span-3 py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                  copied
                    ? "bg-[#00E676] text-[#0A0E0D] ring-4 ring-[#00E676]/30 scale-[1.01]"
                    : "bg-[#00E676] hover:bg-[#00C853] text-[#0A0E0D] hover:shadow-[0_0_25px_rgba(0,230,118,0.3)] active:scale-[0.99]"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span className="tracking-wide">
                      BERHASIL DISALIN! (TAG #{currentSerial})
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="tracking-wide">
                      SALIN LINK STIKER ({currentSerial})
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                className="sm:col-span-1 py-4 px-3 rounded-xl bg-[#14221C] hover:bg-[#1C3229] active:scale-95 text-[#A5C0B7] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-[#22332D] cursor-pointer"
                title="Lompati nomor seri ini dan lanjut ke angka berikutnya"
              >
                <span>Lewati (+1)</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ergonomic Workflow Guide */}
            <div className="mt-4 pt-3.5 border-t border-[#1A2622] flex flex-wrap items-center justify-between text-[11px] text-[#6B8077] gap-2">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#00E676]" />
                Di iPhone: Buka <strong>NFC Tools</strong> ➔ <strong>Write &gt; URL</strong> ➔ Paste.
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-[#556961]">
                SHORTCUT: [SPACE] = Salin & Next
              </span>
            </div>
          </div>
        </section>

        {/* Right Column: Physical Tag Virtualizer & Production Log (5 Columns) */}
        <section className="lg:col-span-5 space-y-5">
          {/* Deck 03: Virtual NFC Tag Hardware Visualizer */}
          <div className="bg-[#101715] border border-[#1A2622] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1A2622]">
              <span className="text-[11px] font-bold tracking-widest text-[#00E676] uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                VIRTUAL TAG HARDWARE
              </span>
              <span className="text-[10px] text-[#5E736B] font-mono uppercase">
                Under-Logo Inlay
              </span>
            </div>

            {/* Authentic Tactile Smart Tag Mockup */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-[#1A2220] via-[#0E1513] to-[#070B0A] border-4 border-[#253630] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-5 text-center transition-all hover:scale-[1.02] group">
                {/* Etched Copper Antenna Traces (Concentric Circles) */}
                <div className="absolute inset-2 rounded-full border border-[#00E676]/15 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-[#00E676]/10 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-[#00E676]/5 pointer-events-none" />

                {/* Central RFID Microchip Core */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#14231E] border border-[#00E676]/40 flex items-center justify-center text-[#00E676] mb-2 shadow-[0_0_12px_rgba(0,230,118,0.2)]">
                    <Radio className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-[#6F8A80] uppercase">
                    {brand || "BRAND NAME"}
                  </span>

                  <div className="text-base font-extrabold text-white tracking-wider my-0.5 font-mono">
                    {currentSerial}
                  </div>

                  <span className="text-[9px] text-[#00E676] font-semibold bg-[#11241C] px-2 py-0.5 rounded-full border border-[#00E676]/30 uppercase">
                    NTAG213 • 144 BYTES
                  </span>
                </div>

                {/* Bottom Chip Spec */}
                <div className="absolute bottom-3 text-[9px] font-mono text-[#4A5E57] uppercase tracking-widest">
                  {batchCode}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-center text-[#6B8077] pt-1">
              Pratinjau fisik stiker NFC anti-pemalsuan yang sedang Anda encode.
            </p>
          </div>

          {/* Deck 04: Production Burn Log (Session History) */}
          <div className="bg-[#101715] border border-[#1A2622] rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#1A2622]">
              <span className="text-[11px] font-bold tracking-widest text-[#00E676] uppercase flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                SESSION BURN LOG
              </span>
              <span className="text-[10px] text-[#5E736B] font-mono">
                {history.length} TAGS GENERATED
              </span>
            </div>

            {/* Feed List of Recently Programmed Tags */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {history.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                    justBurnedSerial === item.serial
                      ? "bg-[#14261F] border-[#00E676]/40"
                      : "bg-[#090E0C] border-[#182420] hover:border-[#273832]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-[#111C18] border border-[#20302A] text-[10px] font-mono text-[#00E676] flex items-center justify-center font-bold">
                      {idx === 0 ? "★" : idx}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-white font-mono flex items-center gap-1.5">
                        <span>{item.serial}</span>
                        {idx === 0 && (
                          <span className="text-[9px] bg-[#00E676]/20 text-[#00E676] px-1.5 rounded uppercase font-sans font-semibold">
                            Terbaru
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#5E736B] truncate">
                        {item.timestamp} • {item.product}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyHistoryItem(item.url, item.serial)}
                    className="p-2 rounded-lg bg-[#14201C] hover:bg-[#1E332A] text-[#7EA395] hover:text-[#00E676] transition-colors cursor-pointer shrink-0 ml-2"
                    title="Salin ulang link tag ini"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {history.length > 1 && (
              <div className="mt-3 pt-2 text-right">
                <button
                  onClick={() => setHistory([])}
                  className="text-[10px] text-[#556962] hover:text-red-400 transition-colors uppercase font-mono"
                >
                  Bersihkan Riwayat Sesi
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Global Minimalist Industrial Footer */}
      <footer className="border-t border-[#141C19] py-4 px-6 text-center text-xs text-[#4A5D56] bg-[#0A0E0D]">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <span>VERIFAY CRYPTOGRAPHIC SYSTEMS</span>
          <span>•</span>
          <span>NFC PROTOCOL: ISO/IEC 14443-A</span>
          <span>•</span>
          <span>NTAG213 ENCRYPTION READY</span>
        </div>
      </footer>
    </div>
  );
}
