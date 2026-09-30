"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Cpu,
  Sparkles,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Download,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ListOrdered,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Globe,
  Tag,
  Radio,
  Layers,
  ArrowRight,
  Eye,
} from "lucide-react";

interface TagItem {
  id: number;
  serialNumber: string;
  url: string;
  status: "pending" | "writing" | "success" | "failed";
  writtenAt?: string;
  error?: string;
}

export default function ProgrammerPage() {
  // Client Form Configuration
  const [brandName, setBrandName] = useState("Aura Luxury Leather");
  const [productName, setProductName] = useState("Heritage Bifold Wallet");
  const [clientWebsite, setClientWebsite] = useState("https://auraleather.com/heritage-bifold");
  const [prefix, setPrefix] = useState("VF-AL-");
  const [startNumber, setStartNumber] = useState(1);
  const [quantity, setQuantity] = useState(20);
  const [batchCode, setBatchCode] = useState("BATCH-2026-01");
  const [autoRedirect, setAutoRedirect] = useState(false);

  // System States
  const [tags, setTags] = useState<TagItem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [statusLog, setStatusLog] = useState<string>("Siap membuat batch tag.");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedTagPreview, setSelectedTagPreview] = useState<TagItem | null>(null);

  // Audio Context Ref
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize and check Web NFC support
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSupported("NDEFReader" in window);
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      } catch {
        // audio context not available
      }
    }
  }, []);

  // Play Beep feedback sound
  const playSound = (type: "success" | "error" | "start") => {
    if (!soundEnabled || !audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "success") {
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15); // E6
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // ignore audio play issues
    }
  };

  // Generate Queue List based on current parameters
  const generateBatch = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://verifay.com";
    const newTags: TagItem[] = [];

    for (let i = 0; i < quantity; i++) {
      const num = startNumber + i;
      const serial = `${prefix}${String(num).padStart(4, "0")}`;
      const params = new URLSearchParams({
        id: serial,
        brand: brandName,
        product: productName,
        url: clientWebsite,
        batch: batchCode,
      });

      if (autoRedirect) {
        params.set("autoredirect", "true");
      }

      newTags.push({
        id: i + 1,
        serialNumber: serial,
        url: `${baseUrl}/verify?${params.toString()}`,
        status: "pending",
      });
    }

    setTags(newTags);
    setCurrentQueueIndex(0);
    setStatusLog(`Berhasil membuat antrean ${newTags.length} tag untuk ${brandName}.`);
    playSound("start");
  };

  // Generate on first mount
  useEffect(() => {
    generateBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Web NFC Auto Programmer Loop
  const nfcAbortRef = useRef<AbortController | null>(null);

  const startNfcWriter = async () => {
    if (!isSupported) {
      alert("Browser ini tidak mendukung Web NFC. Gunakan Google Chrome di smartphone Android!");
      return;
    }

    if (tags.length === 0) {
      generateBatch();
    }

    try {
      setIsNfcActive(true);
      setStatusLog("Menunggu stiker NFC... Tempelkan stiker pertama ke punggung HP.");
      playSound("start");

      const abortController = new AbortController();
      nfcAbortRef.current = abortController;

      // Note: NDEFReader is the standard W3C Web NFC API in Android Chrome
      const NDEFReaderClass = (window as any).NDEFReader;
      const ndef = new NDEFReaderClass();

      // Scan event listener for reading tags and writing sequentially
      await ndef.scan({ signal: abortController.signal });

      ndef.onreading = async () => {
        // Find next pending tag
        const currentIndex = tags.findIndex((t) => t.status === "pending");
        if (currentIndex === -1) {
          setStatusLog("🎉 Semua stiker dalam antrean berhasil diprogram!");
          setIsNfcActive(false);
          playSound("success");
          return;
        }

        const currentTag = tags[currentIndex];
        setStatusLog(`⚡ Menulis ${currentTag.serialNumber}... Jangan lepas stiker.`);

        try {
          await ndef.write(
            {
              records: [
                {
                  recordType: "url",
                  data: currentTag.url,
                },
              ],
            },
            { signal: abortController.signal }
          );

          // Success feedback
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
          playSound("success");

          const now = new Date().toLocaleTimeString("id-ID");
          setTags((prev) =>
            prev.map((t, idx) =>
              idx === currentIndex
                ? { ...t, status: "success", writtenAt: now }
                : t
            )
          );

          const nextIndex = currentIndex + 1;
          setCurrentQueueIndex(nextIndex);

          if (nextIndex < tags.length) {
            setStatusLog(
              `✅ ${currentTag.serialNumber} Sukses! Siap untuk tag berikutnya (${tags[nextIndex].serialNumber}).`
            );
          } else {
            setStatusLog("🎉 SELESAI! Seluruh batch tag berhasil ditulis.");
            setIsNfcActive(false);
          }
        } catch (writeErr: any) {
          playSound("error");
          setStatusLog(`❌ Gagal menulis ${currentTag.serialNumber}: ${writeErr.message || "Error"}. Coba tempel ulang.`);
        }
      };
    } catch (err: any) {
      setIsNfcActive(false);
      setStatusLog(`Gagal mengaktifkan NFC: ${err.message || "Izin ditolak atau tidak ada sensor"}.`);
    }
  };

  const stopNfcWriter = () => {
    if (nfcAbortRef.current) {
      nfcAbortRef.current.abort();
      nfcAbortRef.current = null;
    }
    setIsNfcActive(false);
    setStatusLog("Mode pemrograman NFC dihentikan.");
  };

  // Simulate write for testing on Laptop / Desktop without physical NFC
  const simulateWriteCurrent = () => {
    const currentIndex = tags.findIndex((t) => t.status === "pending");
    if (currentIndex === -1) {
      alert("Semua tag sudah selesai ditulis!");
      return;
    }

    const currentTag = tags[currentIndex];
    const now = new Date().toLocaleTimeString("id-ID");

    setTags((prev) =>
      prev.map((t, idx) =>
        idx === currentIndex
          ? { ...t, status: "success", writtenAt: now }
          : t
      )
    );

    playSound("success");
    const nextIndex = currentIndex + 1;
    setCurrentQueueIndex(nextIndex);
    setStatusLog(`[Simulasi] ✅ ${currentTag.serialNumber} berhasil ditandai selesai!`);
  };

  // Reset entire queue
  const resetQueue = () => {
    setTags((prev) => prev.map((t) => ({ ...t, status: "pending", writtenAt: undefined })));
    setCurrentQueueIndex(0);
    setStatusLog("Antrean di-reset ke awal.");
  };

  // Copy URL to clipboard
  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Export to CSV
  const exportToCsv = () => {
    if (tags.length === 0) return;
    const headers = "ID,Serial Number,Brand,Product,Target Website,Full Verification URL,Status,Waktu Ditulis\n";
    const rows = tags
      .map(
        (t) =>
          `"${t.id}","${t.serialNumber}","${brandName}","${productName}","${clientWebsite}","${t.url}","${t.status}","${t.writtenAt || "-"}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Verifay_Batch_${brandName.replace(/\s+/g, "_")}_${batchCode}.csv`;
    link.click();
  };

  // Stats calculation
  const totalCount = tags.length;
  const successCount = tags.filter((t) => t.status === "success").length;
  const progressPercent = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;
  const currentTagInFocus = tags.find((t) => t.status === "pending") || tags[tags.length - 1];

  return (
    <div className="min-h-screen bg-[#07110E] text-[#F8FAF8] selection:bg-[#00C853] selection:text-[#07110E]">
      {/* Top Breadcrumb & Switcher between the 3 Interfaces */}
      <header className="border-b border-emerald-950 bg-[#0B1A14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center text-[#00C853]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base tracking-wide text-white">
                Verifay<span className="text-[#00C853]">.OS</span>
              </span>
            </Link>

            <span className="text-gray-600 hidden sm:inline">/</span>

            <div className="flex items-center gap-2 text-xs bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 px-2.5 py-1 rounded-full">
              <Cpu className="w-3.5 h-3.5 text-[#00C853]" />
              <span className="font-semibold">Antarmuka 2: NFC Batch Programmer</span>
            </div>
          </div>

          {/* Quick switcher to other 2 interfaces */}
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-[#11231D] text-gray-300 hover:text-white border border-emerald-950 hover:border-emerald-800 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>1. Portal Order</span>
            </Link>

            <Link
              href="/verify"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-[#11231D] text-emerald-400 hover:text-emerald-300 border border-emerald-900/60 hover:border-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3. Preview Transit</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
            </Link>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Matikan Efek Suara" : "Aktifkan Efek Suara"}
              className="p-1.5 rounded-lg bg-[#11231D] text-gray-400 hover:text-emerald-300 border border-emerald-950 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Hero Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[#0F261E] via-[#0B1A14] to-[#081510] border border-emerald-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C853]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/40 text-[#00E676] text-xs font-semibold uppercase tracking-wider mb-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Mass-Encoding Engine (2 Detik / Tag)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                NFC Tag Batch Programmer & Encoder
              </h1>
              <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                Alat bantu operasional internal untuk menulis ratusan stiker Smart NFC secara berurutan, cepat, dan otomatis tanpa repot mengetik ulang di HP.
              </p>
            </div>

            {/* Web NFC Compatibility Alert Pill */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                  isSupported
                    ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                    : "bg-amber-950/40 border-amber-500/30 text-amber-300"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>
                  {isSupported
                    ? "Web NFC Aktif (Chrome Android Didukung)"
                    : "Web NFC Tidak Terdeteksi (Gunakan Chrome Android atau Salin URL Manual)"}
                </span>
              </div>
              <span className="text-[11px] text-gray-500">
                Didukung oleh protokol ISO/IEC 14443 & NDEF
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Batch Configuration Form (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0E1F19] border border-emerald-900/40 shadow-xl">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-emerald-950">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#00C853]" />
                  <h2 className="text-base font-bold text-white">Parameter Klien & Batch</h2>
                </div>
                <span className="text-[11px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded-md">
                  Config
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Brand Name */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    Nama Brand Klien:
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Contoh: Aura Leather"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130F] border border-emerald-950 focus:border-emerald-500 text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    Nama Produk:
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Contoh: Heritage Bifold Wallet"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130F] border border-emerald-950 focus:border-emerald-500 text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Client Target Transit Website */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    Website Resmi Klien (Link Transit):
                  </label>
                  <input
                    type="url"
                    value={clientWebsite}
                    onChange={(e) => setClientWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130F] border border-emerald-950 focus:border-emerald-500 text-emerald-400 font-mono text-[11px] placeholder-gray-600 focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Konsumen akan diarahkan ke link ini setelah verifikasi asli.
                  </p>
                </div>

                {/* Prefix & Numbering */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">
                      Prefix Serial:
                    </label>
                    <input
                      type="text"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      placeholder="VF-AL-"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">
                      Nomor Awal:
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={startNumber}
                      onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Quantity & Batch Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">
                      Jumlah Stiker:
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">
                      Kode Batch:
                    </label>
                    <input
                      type="text"
                      value={batchCode}
                      onChange={(e) => setBatchCode(e.target.value)}
                      placeholder="BATCH-01"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Auto Redirect Checkbox */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoRedirect}
                      onChange={(e) => setAutoRedirect(e.target.checked)}
                      className="rounded border-emerald-950 bg-[#07130F] text-[#00C853] focus:ring-0 focus:ring-offset-0 w-4 h-4"
                    />
                    <span className="text-gray-300 text-xs">
                      Aktifkan Auto-Redirect (Transit otomatis 5 detik)
                    </span>
                  </label>
                </div>

                {/* Button to Generate / Update */}
                <button
                  onClick={generateBatch}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:brightness-110 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Update & Buat Antrean {quantity} Tag</span>
                </button>
              </div>
            </div>

            {/* Quick Export Panel */}
            <div className="p-5 rounded-2xl bg-[#0A1813] border border-emerald-950 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-300">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export data untuk printer/encoder:</span>
              </div>
              <button
                onClick={exportToCsv}
                className="px-3 py-1.5 rounded-lg bg-[#122A21] hover:bg-[#18392C] text-emerald-300 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Active Auto-Programmer Console & Queue (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Control Bar: Active Tag Monitor & Status */}
            <div className="p-6 rounded-3xl bg-[#0E1F19] border border-emerald-500/20 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-emerald-950">
                <div>
                  <div className="text-xs text-gray-400">Status Operasional Antrean:</div>
                  <div className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                    <span>
                      {successCount} dari {totalCount} Tag Selesai
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Web NFC Button (Works on Chrome Android) */}
                  {isNfcActive ? (
                    <button
                      onClick={stopNfcWriter}
                      className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer animate-pulse"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Hentikan NFC</span>
                    </button>
                  ) : (
                    <button
                      onClick={startNfcWriter}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-[#009624] text-[#07110E] font-extrabold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Mulai Auto-Program NFC</span>
                    </button>
                  )}

                  {/* Simulate Write Button (For Testing without physical NFC) */}
                  <button
                    onClick={simulateWriteCurrent}
                    title="Simulasikan penulisan satu stiker (untuk testing di laptop)"
                    className="px-3 py-2.5 rounded-xl bg-[#142C23] hover:bg-[#1B3B30] text-emerald-300 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Simulasi Sukses</span>
                  </button>

                  <button
                    onClick={resetQueue}
                    title="Reset semua status antrean ke belum ditulis"
                    className="p-2.5 rounded-xl bg-[#142C23] hover:bg-[#1B3B30] text-gray-400 hover:text-white border border-emerald-950 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#07130F] h-2.5 rounded-full overflow-hidden border border-emerald-950 mb-4">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-[#00C853] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Real-time Status Console Banner */}
              <div className="p-3.5 rounded-xl bg-[#06100D] border border-emerald-900/60 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00C853] animate-ping flex-shrink-0" />
                <p className="text-xs font-mono text-emerald-300 truncate">
                  {statusLog}
                </p>
              </div>

              {/* Current Tag In Target Focus */}
              {currentTagInFocus && currentTagInFocus.status === "pending" && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      Target Stiker Berikutnya yang Siap Ditempel:
                    </span>
                    <span className="text-base font-mono font-bold text-white">
                      {currentTagInFocus.serialNumber}
                    </span>
                    <span className="text-gray-400 text-[11px] block truncate max-w-md mt-0.5">
                      {currentTagInFocus.url}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleCopy(currentTagInFocus.url, currentTagInFocus.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#142C23] hover:bg-[#1B3B30] text-emerald-300 text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedId === currentTagInFocus.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={currentTagInFocus.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#00C853]/20 hover:bg-[#00C853]/30 text-emerald-300 text-xs flex items-center gap-1"
                    >
                      <span>Uji Buka</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* QUEUE TABLE OF TAGS */}
            <div className="p-6 rounded-3xl bg-[#0E1F19] border border-emerald-900/40 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-950">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    Daftar Antrean Tag ({tags.length} Stiker)
                  </h3>
                </div>
                <span className="text-xs text-gray-400">
                  Klik &apos;Salin&apos; jika ingin memasukkan manual ke NFC Tools
                </span>
              </div>

              <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[11px] uppercase tracking-wider text-gray-400 bg-[#07130F] sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Serial Number</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Waktu Tulis</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950 font-mono">
                    {tags.map((tag) => (
                      <tr
                        key={tag.id}
                        className={`hover:bg-emerald-950/20 transition-colors ${
                          tag.status === "success"
                            ? "bg-emerald-950/10 text-emerald-200"
                            : "text-gray-300"
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold">{tag.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-white">
                          {tag.serialNumber}
                        </td>
                        <td className="py-2.5 px-3">
                          {tag.status === "success" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-sans font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              TERTULIS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-[10px] font-sans">
                              Menunggu
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-gray-400 text-[11px]">
                          {tag.writtenAt || "-"}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(tag.url, tag.id)}
                              title="Salin URL Verifikasi"
                              className="p-1.5 rounded-lg bg-[#142C23] hover:bg-[#1D4235] text-gray-300 hover:text-white transition-colors cursor-pointer"
                            >
                              {copiedId === tag.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <a
                              href={tag.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Buka Halaman Transit Verifikasi"
                              className="p-1.5 rounded-lg bg-[#142C23] hover:bg-[#1D4235] text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
