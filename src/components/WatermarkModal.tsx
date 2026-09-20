"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Smartphone, QrCode, ShieldCheck, CheckCircle2, Sparkles, Cpu, Lock, ArrowRight, Layers } from "lucide-react";

interface WatermarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WatermarkModal({ isOpen, onClose }: WatermarkModalProps) {
  const [activeProduct, setActiveProduct] = useState<"nfc" | "qr">("nfc");
  const [isTapped, setIsTapped] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  if (!isOpen) return null;

  const handleSimulateTap = () => {
    setIsTapped(false);
    setTimeout(() => {
      setIsTapped(true);
    }, 400);
  };

  const handleSimulateScan = () => {
    setIsScanned(false);
    setTimeout(() => {
      setIsScanned(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#0F1F1A]/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#0F1F1A] border border-[#2D3E37] rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2D3E37] flex items-center justify-between bg-[#142A22]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00C853]/20 border border-[#00C853]/50 flex items-center justify-center text-[#00C853]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
                Simulasi Interaktif Solusi Proteksi Verifay
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40">
                  Live Demo
                </span>
              </h3>
              <p className="text-[11px] text-white/60">
                Pilih produk untuk melihat alur kerja antara pemesanan chip, pemasangan oleh brand, dan verifikasi konsumen.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Selector Tabs */}
        <div className="px-6 pt-4 pb-2 bg-[#0F1F1A] flex gap-3 border-b border-[#2D3E37]/60">
          <button
            onClick={() => setActiveProduct("nfc")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeProduct === "nfc"
                ? "bg-[#00C853] text-[#0F1F1A] shadow-md shadow-[#00C853]/20"
                : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Produk 1: Smart NFC Di Bawah Logo</span>
          </button>

          <button
            onClick={() => setActiveProduct("qr")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeProduct === "qr"
                ? "bg-[#00C853] text-[#0F1F1A] shadow-md shadow-[#00C853]/20"
                : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Produk 2: QR ShieldTag Segel Kemasan</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {activeProduct === "nfc" ? (
            /* TAB 1: NFC SIMULATION */
            <div className="space-y-6">
              
              {/* Interactive Visual Canvas */}
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-[#2D3E37] bg-black">
                <Image
                  src="/images/nfc-under-logo.jpg"
                  alt="Simulasi Tap NFC Logo"
                  fill
                  className="object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1A] via-transparent to-[#0F1F1A]/50" />

                {/* Animated Pulse Waves on NFC Tap */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className={`w-28 h-28 rounded-full border-2 border-[#00C853] ${isTapped ? "animate-ping opacity-80" : "opacity-30"}`} />
                </div>

                {/* Floating Tag Overlay Information */}
                <div className="absolute top-4 left-4 bg-[#0F1F1A]/90 backdrop-blur-md border border-white/15 rounded-2xl p-3 max-w-xs">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00C853] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse shrink-0" />
                    <span>POSISI CHIP MIKRO NFC</span>
                  </span>
                  <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
                    Ditempelkan rahasia oleh brand Anda di balik emblem atau label logo produk.
                  </p>
                </div>

                {/* Result Pop-up Card when Tapped */}
                {isTapped ? (
                  <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bg-[#142A22]/95 backdrop-blur-xl border border-[#00C853]/60 rounded-2xl p-4 sm:min-w-[360px] shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00C853] text-[#0F1F1A] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 font-bold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase text-[#00C853]">Sertifikat Digital Terbuka</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 font-mono text-white/70">1-TAP VERIFIED</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">Produk Terverifikasi 100% Asli</h4>
                        <p className="text-[10px] font-mono text-white/60">ID Chip: #NFC-9942-VALERIUS • Token Valid</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-5 inset-x-4 flex justify-center">
                    <button
                      onClick={handleSimulateTap}
                      className="px-6 py-3 rounded-full bg-[#00C853] text-[#0F1F1A] font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#00C853]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Simulasikan Dekatkan HP ke Logo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3-Step Clear Role Distribution */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                
                {/* Step 1: Kami */}
                <div className="p-4 rounded-2xl bg-[#142A22] border border-[#2D3E37]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C853]/20 text-[#00C853] font-bold">
                      TUGAS KAMI
                    </span>
                    <Cpu className="w-4 h-4 text-[#00C853]" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Penyediaan & Pemrograman</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Kami membelikan chip micro-NFC berkualitas tinggi dan memprogram enkripsi token awan unik untuk setiap unit produk Anda.
                  </p>
                </div>

                {/* Step 2: Klien / Brand */}
                <div className="p-4 rounded-2xl bg-[#182620] border border-[#00C853]/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#00C853]/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C853] text-[#0F1F1A] font-extrabold">
                      TUGAS BRAND ANDA
                    </span>
                    <Layers className="w-4 h-4 text-[#00C853]" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Pemasangan Mandiri</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Chip dikirim siap tempel (peel & stick). Tim workshop/gudang Anda tinggal menempelkannya di balik emblem logo fisik produk.
                  </p>
                </div>

                {/* Step 3: Konsumen */}
                <div className="p-4 rounded-2xl bg-[#142A22] border border-[#2D3E37]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-bold">
                      KONSUMEN AKHIR
                    </span>
                    <Smartphone className="w-4 h-4 text-white/80" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Verifikasi 1-Tap</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Konsumen cukup menempelkan HP ke logo untuk membuka sertifikat orisinalitas tanpa perlu download aplikasi apapun.
                  </p>
                </div>

              </div>

            </div>
          ) : (
            /* TAB 2: QR SHIELDTAG SIMULATION */
            <div className="space-y-6">
              
              {/* Interactive Visual Canvas */}
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-[#2D3E37] bg-black">
                <Image
                  src="/images/qr-shieldtag.jpg"
                  alt="Simulasi Segel QR ShieldTag"
                  fill
                  className="object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1A] via-transparent to-[#0F1F1A]/50" />

                {/* Holographic Laser Sweep */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00C853] to-transparent shadow-[0_0_20px_#00C853] animate-laser pointer-events-none" />

                {/* Floating Tag Overlay Information */}
                <div className="absolute top-4 left-4 bg-[#0F1F1A]/90 backdrop-blur-md border border-white/15 rounded-2xl p-3 max-w-xs">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00C853] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse shrink-0" />
                    <span>SEGEL OPTIK ANTI-TAMPER</span>
                  </span>
                  <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
                    Ditempelkan pada bukaan box kemasan. Rusak dan meninggalkan pola VOID jika dicoba dikupas.
                  </p>
                </div>

                {/* Result Pop-up Card when Scanned */}
                {isScanned ? (
                  <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bg-[#142A22]/95 backdrop-blur-xl border border-[#00C853]/60 rounded-2xl p-4 sm:min-w-[360px] shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00C853] text-[#0F1F1A] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 font-bold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase text-[#00C853]">Segel Box Terverifikasi</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 font-mono text-white/70">ANTI-TAMPER OK</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">Kemasan Segel Utuh & Asli</h4>
                        <p className="text-[10px] font-mono text-white/60">Batch ID: #ST-7721 • Anti-Fotokopi Teruji</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-5 inset-x-4 flex justify-center">
                    <button
                      onClick={handleSimulateScan}
                      className="px-6 py-3 rounded-full bg-[#00C853] text-[#0F1F1A] font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#00C853]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Simulasikan Scan Kamera HP</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3 Keunggulan QR ShieldTag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#142A22] border border-[#2D3E37]">
                  <Lock className="w-4 h-4 text-[#00C853] mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">Anti-Fotokopi & Duplikasi</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Pola micro-optik holografik tidak dapat ditiru oleh scanner dokumen atau fotokopi printer resolusi tinggi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#142A22] border border-[#2D3E37]">
                  <ShieldCheck className="w-4 h-4 text-[#00C853] mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">Tamper-Evident Void Seal</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Begitu dilepas atau dipindahkan, lapisan segel akan hancur dan meninggalkan jejak VOID yang tidak bisa ditempel ulang.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#142A22] border border-[#2D3E37]">
                  <Sparkles className="w-4 h-4 text-[#00C853] mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">Siap Tempel di Box</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Kami cetak dan enkripsikan label segel; tim packaging brand Anda tinggal merekatkannya di penutup box kemasan.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#142A22] border-t border-[#2D3E37] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-white/70">
            Ingin memesan chip NFC terprogram atau sampel segel QR ShieldTag?
          </div>
          <a
            href="#konsultasi"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00C853] text-[#0F1F1A] font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-[#00C853]/90 transition-all"
          >
            <span>Pesan / Konsultasi Sampel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}

export default WatermarkModal;
