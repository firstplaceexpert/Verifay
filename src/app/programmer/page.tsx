"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Cpu,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  ListOrdered,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Globe,
  Tag,
  Radio,
  Eye,
  Plus,
  ArrowRight,
  HelpCircle,
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
  // Navigation Mode: 'single' (iPhone / Manual copy friendly) or 'batch' (mass production)
  const [activeTab, setActiveTab] = useState<"single" | "batch">("single");

  // === SINGLE MANUAL MODE STATE (Dedicated for iPhone & Trial) ===
  const [singleBrand, setSingleBrand] = useState("Aura Leather");
  const [singleProduct, setSingleProduct] = useState("Heritage Leather Bag");
  const [singleSerialPrefix, setSingleSerialPrefix] = useState("VF-SN-");
  const [singleSerialNum, setSingleSerialNum] = useState(1);
  const [singleTargetUrl, setSingleTargetUrl] = useState("https://instagram.com");
  const [singleAutoRedirect, setSingleAutoRedirect] = useState(false);
  const [singleBatch, setSingleBatch] = useState("DEMO-01");
  const [singleCopied, setSingleCopied] = useState(false);

  // Compute Full Single URL
  const getSingleFullUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://verifay.com";
    const fullSerial = `${singleSerialPrefix}${String(singleSerialNum).padStart(3, "0")}`;
    const params = new URLSearchParams({
      id: fullSerial,
      brand: singleBrand,
      product: singleProduct,
      url: singleTargetUrl,
      batch: singleBatch,
    });
    if (singleAutoRedirect) {
      params.set("autoredirect", "true");
    }
    return `${baseUrl}/verify?${params.toString()}`;
  };

  const handleCopySingle = () => {
    const url = getSingleFullUrl();
    navigator.clipboard.writeText(url);
    setSingleCopied(true);
    playSound("success");
    setTimeout(() => setSingleCopied(false), 2000);
  };

  const handleNextTag = () => {
    setSingleSerialNum((prev) => prev + 1);
    playSound("start");
  };

  // === BATCH MODE CONFIGURATION ===
  const [brandName, setBrandName] = useState("Aura Luxury Leather");
  const [productName, setProductName] = useState("Heritage Bifold Wallet");
  const [clientWebsite, setClientWebsite] = useState("https://auraleather.com");
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
  const [statusLog, setStatusLog] = useState<string>("Siap membuat antrean tag.");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

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
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
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
      // ignore
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

  useEffect(() => {
    generateBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Web NFC Auto Programmer Loop
  const nfcAbortRef = useRef<AbortController | null>(null);

  const startNfcWriter = async () => {
    if (!isSupported) {
      alert("Web NFC hanya didukung di Google Chrome Android. Untuk iPhone, gunakan 'Mode Manual / iPhone' di tab atas.");
      return;
    }

    try {
      setIsNfcActive(true);
      setStatusLog("Menunggu stiker NFC... Tempelkan stiker pertama ke punggung HP.");
      playSound("start");

      const abortController = new AbortController();
      nfcAbortRef.current = abortController;

      const NDEFReaderClass = (window as any).NDEFReader;
      const ndef = new NDEFReaderClass();

      await ndef.scan({ signal: abortController.signal });

      ndef.onreading = async () => {
        const currentIndex = tags.findIndex((t) => t.status === "pending");
        if (currentIndex === -1) {
          setStatusLog("🎉 Semua stiker dalam antrean berhasil diprogram!");
          setIsNfcActive(false);
          playSound("success");
          return;
        }

        const currentTag = tags[currentIndex];
        setStatusLog(`⚡ Menulis ${currentTag.serialNumber}...`);

        try {
          await ndef.write(
            {
              records: [{ recordType: "url", data: currentTag.url }],
            },
            { signal: abortController.signal }
          );

          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
          playSound("success");

          const now = new Date().toLocaleTimeString("id-ID");
          setTags((prev) =>
            prev.map((t, idx) =>
              idx === currentIndex ? { ...t, status: "success", writtenAt: now } : t
            )
          );

          const nextIndex = currentIndex + 1;
          setCurrentQueueIndex(nextIndex);

          if (nextIndex < tags.length) {
            setStatusLog(`✅ ${currentTag.serialNumber} Sukses! Siap tag berikutnya.`);
          } else {
            setStatusLog("🎉 SELESAI! Seluruh batch tag berhasil ditulis.");
            setIsNfcActive(false);
          }
        } catch (writeErr: any) {
          playSound("error");
          setStatusLog(`❌ Gagal: ${writeErr.message || "Coba tempel ulang"}`);
        }
      };
    } catch (err: any) {
      setIsNfcActive(false);
      setStatusLog(`NFC Gagal: ${err.message || "Izin ditolak"}`);
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

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

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

  const totalCount = tags.length;
  const successCount = tags.filter((t) => t.status === "success").length;
  const progressPercent = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#07110E] text-[#F8FAF8] selection:bg-[#00C853] selection:text-[#07110E]">
      {/* Top Header Navigation */}
      <header className="border-b border-emerald-950 bg-[#0B1A14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
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
              <span className="font-semibold">NFC Tag Programmer</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-[#11231D] text-gray-300 hover:text-white border border-emerald-950 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden sm:inline">Portal Order</span>
            </Link>

            <Link
              href="/verify"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-[#11231D] text-emerald-400 hover:text-emerald-300 border border-emerald-900/60 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Transit</span>
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

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* TAB SWITCHER: Single Manual Mode (iPhone) vs Batch Mode */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0C1A14] border border-emerald-900/60 shadow-lg">
            <button
              onClick={() => setActiveTab("single")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "single"
                  ? "bg-[#00C853] text-[#07110E] shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mode Manual / iPhone (Uji Coba)</span>
            </button>

            <button
              onClick={() => setActiveTab("batch")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "batch"
                  ? "bg-[#00C853] text-[#07110E] shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>Mode Batch Massal (Banyak Tag)</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: SINGLE MANUAL GENERATOR (IPHONE & TRIAL FRIENDLY) */}
        {/* ============================================================== */}
        {activeTab === "single" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Info Banner for iPhone */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#122B22] to-[#0A1813] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center text-[#00C853] flex-shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    Generator Link Siap Tempel untuk iPhone
                  </h2>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Tulis data di bawah ➔ Klik Salin ➔ Buka aplikasi <strong>NFC Tools</strong> di iPhone ➔ Paste & Tulis ke stiker!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800/40 font-mono">
                  1-Click Copy
                </span>
              </div>
            </div>

            {/* Manual Form Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1F19] border border-emerald-900/40 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 text-xs">
                {/* Brand Name */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Nama Brand:
                  </label>
                  <input
                    type="text"
                    value={singleBrand}
                    onChange={(e) => setSingleBrand(e.target.value)}
                    placeholder="Contoh: Aura Leather"
                    className="w-full px-4 py-3 rounded-xl bg-[#07130F] border border-emerald-950 focus:border-emerald-500 text-white placeholder-gray-600 focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Nama Produk:
                  </label>
                  <input
                    type="text"
                    value={singleProduct}
                    onChange={(e) => setSingleProduct(e.target.value)}
                    placeholder="Contoh: Heritage Leather Bag"
                    className="w-full px-4 py-3 rounded-xl bg-[#07130F] border border-emerald-950 focus:border-emerald-500 text-white placeholder-gray-600 focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Serial Prefix & Number */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Nomor Seri Stiker Saat Ini:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={singleSerialPrefix}
                      onChange={(e) => setSingleSerialPrefix(e.target.value)}
                      className="w-28 px-3.5 py-3 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono uppercase text-sm focus:outline-none focus:border-emerald-500 text-center"
                    />
                    <input
                      type="number"
                      min={1}
                      value={singleSerialNum}
                      onChange={(e) => setSingleSerialNum(parseInt(e.target.value) || 1)}
                      className="w-24 px-3.5 py-3 rounded-xl bg-[#07130F] border border-emerald-950 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-emerald-500 text-center"
                    />
                    <button
                      onClick={handleNextTag}
                      title="Naikkan ke nomor seri berikutnya (+1)"
                      className="px-3.5 py-3 rounded-xl bg-[#142C23] hover:bg-[#1B3B30] text-emerald-300 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tag +1</span>
                    </button>
                  </div>
                </div>

                {/* Target Website */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Website Resmi / Instagram Produk Klien (Link Transit):
                  </label>
                  <input
                    type="url"
                    value={singleTargetUrl}
                    onChange={(e) => setSingleTargetUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-[#07130F] border border-emerald-950 focus:border-emerald-500 text-emerald-400 font-mono text-sm placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Auto Redirect Option */}
              <div className="mb-6 p-3.5 rounded-xl bg-[#07130F] border border-emerald-950 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={singleAutoRedirect}
                    onChange={(e) => setSingleAutoRedirect(e.target.checked)}
                    className="rounded border-emerald-950 bg-[#07130F] text-[#00C853] focus:ring-0 focus:ring-offset-0 w-4 h-4"
                  />
                  <span className="text-gray-300">
                    Otomatis pindah ke website klien setelah 5 detik (*Auto-transit*)
                  </span>
                </label>
                <span className="text-[10px] text-gray-500 hidden sm:inline">
                  (Default: Konsumen klik tombol di sertifikat)
                </span>
              </div>

              {/* GENERATED LINK BOX & BIG COPY BUTTON */}
              <div className="p-5 rounded-2xl bg-[#06100D] border-2 border-emerald-500/40 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    🔗 Link Verifikasi yang Dihasilkan:
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    Serial:{" "}
                    <strong className="text-white">
                      {singleSerialPrefix}
                      {String(singleSerialNum).padStart(3, "0")}
                    </strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0C1A14] border border-emerald-950 font-mono text-xs sm:text-sm text-emerald-300 break-all select-all mb-4">
                  {getSingleFullUrl()}
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={handleCopySingle}
                    className="sm:col-span-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#00C853] to-[#009624] text-[#07110E] font-extrabold text-sm sm:text-base shadow-[0_10px_25px_rgba(0,200,83,0.3)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {singleCopied ? (
                      <>
                        <Check className="w-5 h-5 text-[#07110E]" />
                        <span>BERHASIL DISALIN! (Tinggal Paste di NFC Tools)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>SALIN LINK KE CLIPBOARD</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getSingleFullUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-4 rounded-xl bg-[#142C23] hover:bg-[#1B3B30] text-emerald-300 border border-emerald-800/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Uji Tampilan</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 3 Steps Guide for iPhone Users */}
              <div className="p-5 rounded-2xl bg-[#0B1A14] border border-emerald-950 text-xs">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>3 Langkah Menulis di Aplikasi NFC Tools (iPhone):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-300">
                  <div className="p-3 rounded-xl bg-[#07130F] border border-emerald-950">
                    <div className="font-mono text-emerald-400 font-bold mb-1">1. Salin Link</div>
                    <p className="text-[11px] text-gray-400">
                      Klik tombol hijau <strong>&quot;SALIN LINK&quot;</strong> di atas.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#07130F] border border-emerald-950">
                    <div className="font-mono text-emerald-400 font-bold mb-1">2. Buka NFC Tools</div>
                    <p className="text-[11px] text-gray-400">
                      Pilih tab <strong>Write</strong> ➔ <strong>Add a record</strong> ➔ <strong>URL / URI</strong> ➔ Tempel (Paste) link tadi.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#07130F] border border-emerald-950">
                    <div className="font-mono text-emerald-400 font-bold mb-1">3. Tulis ke Stiker</div>
                    <p className="text-[11px] text-gray-400">
                      Tekan tombol <strong>Write</strong> lalu tempelkan stiker NFC ke ujung atas belakang iPhone Anda. Selesai!
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-950 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-400">
                    Mau lanjut ke stiker nomor berikutnya? Cukup klik:
                  </span>
                  <button
                    onClick={handleNextTag}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Lanjut ke Tag Berikutnya (+1)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: BATCH MODE (MASS PRODUCTION & CSV) */}
        {/* ============================================================== */}
        {activeTab === "batch" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* LEFT: Config Form */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-[#0E1F19] border border-emerald-900/40 shadow-xl">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-emerald-950">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#00C853]" />
                    <h2 className="text-base font-bold text-white">Batch Setup</h2>
                  </div>
                  <span className="text-[11px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded-md">
                    Mass
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">Nama Brand:</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130F] border border-emerald-950 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">Nama Produk:</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130F] border border-emerald-950 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-1.5">Website Klien:</label>
                    <input
                      type="url"
                      value={clientWebsite}
                      onChange={(e) => setClientWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130F] border border-emerald-950 text-emerald-400 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-medium mb-1.5">Prefix:</label>
                      <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-1.5">Jumlah:</label>
                      <input
                        type="number"
                        min={1}
                        max={1000}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 rounded-xl bg-[#07130F] border border-emerald-950 text-white font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={generateBatch}
                    className="w-full mt-3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Buat Antrean {quantity} Tag</span>
                  </button>
                </div>
              </div>

              {/* Export Panel */}
              <div className="p-5 rounded-2xl bg-[#0A1813] border border-emerald-950 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Download File CSV:</span>
                </div>
                <button
                  onClick={exportToCsv}
                  className="px-3.5 py-1.5 rounded-lg bg-[#122A21] hover:bg-[#18392C] text-emerald-300 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Queue Table */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 rounded-3xl bg-[#0E1F19] border border-emerald-900/40 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-950">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Antrean Tag ({tags.length} Stiker)
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Salin link pada baris yang diinginkan untuk dipaste ke NFC Tools.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-[440px] overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[11px] uppercase tracking-wider text-gray-400 bg-[#07130F] sticky top-0 z-10">
                      <tr>
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">Serial Number</th>
                        <th className="py-2.5 px-3 text-right">Aksi Salin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-950 font-mono">
                      {tags.map((tag) => (
                        <tr key={tag.id} className="hover:bg-emerald-950/20 text-gray-300">
                          <td className="py-2.5 px-3 font-bold">{tag.id}</td>
                          <td className="py-2.5 px-3 font-semibold text-white">
                            {tag.serialNumber}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => handleCopy(tag.url, tag.id)}
                                className="px-3 py-1 rounded-lg bg-[#142C23] hover:bg-[#1D4235] text-emerald-300 text-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                {copiedId === tag.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Tersalin</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Salin</span>
                                  </>
                                )}
                              </button>

                              <a
                                href={tag.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-[#142C23] text-gray-400 hover:text-white"
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
        )}
      </div>
    </div>
  );
}
