import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07110E] text-[#F8FAF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">404 - Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-gray-400">
          Halaman atau kode verifikasi tag yang Anda tuju tidak terdaftar di sistem Verifay.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C853] text-[#07110E] font-bold text-sm hover:brightness-110 transition-all"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
