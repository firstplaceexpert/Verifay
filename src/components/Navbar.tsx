"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowUpRight, Menu, X } from "lucide-react";

import { VerifayLogo } from "./VerifayLogo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#F8FAF8] border-b border-[#0F1F1A]/10 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-5 flex items-center justify-between">
        {/* Official Brand Logo */}
        <a href="#" className="flex items-center group">
          <VerifayLogo variant="primary" size="lg" />
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.18em] text-[#0F1F1A]/70 uppercase">
          <a href="#masalah" className="hover:text-[#0F1F1A] transition-colors">
            Masalah
          </a>
          <a href="#cara-kerja" className="hover:text-[#0F1F1A] transition-colors">
            Cara Kerja
          </a>
          <a href="#keunggulan" className="hover:text-[#0F1F1A] transition-colors">
            Komparasi
          </a>
          <a href="#implementasi" className="hover:text-[#0F1F1A] transition-colors">
            Implementasi
          </a>
        </nav>

        {/* Right Action CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#konsultasi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F1F1A] text-white hover:bg-[#00C853] hover:text-[#0F1F1A] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4 text-[#00C853] group-hover:text-[#0F1F1A]" />
            <span>Konsultasi</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#0F1F1A] hover:bg-[#0F1F1A]/5 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8FAF8] border-b border-[#0F1F1A]/10 px-8 py-6 shadow-xl">
          <nav className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase text-[#0F1F1A]">
            <a
              href="#masalah"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#00C853] transition-colors"
            >
              Masalah
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#00C853] transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#00C853] transition-colors"
            >
              Komparasi
            </a>
            <a
              href="#implementasi"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#00C853] transition-colors"
            >
              Implementasi
            </a>
            <div className="pt-2 border-t border-[#0F1F1A]/10">
              <a
                href="#konsultasi"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 px-5 rounded-full bg-[#00C853] text-[#0F1F1A] font-extrabold text-xs tracking-wider block uppercase shadow-md"
              >
                Mulai Konsultasi Brand
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
