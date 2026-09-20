import React from "react";
import { ArrowUp } from "lucide-react";
import { VerifayLogo } from "./VerifayLogo";

export function Footer() {
  return (
    <footer className="bg-[#0F1F1A] text-white/50 text-[11px] font-medium tracking-wider uppercase py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <VerifayLogo variant="dark" size="sm" />
          <span className="text-white/30 text-[10px] tracking-widest pl-3 border-l border-white/10">
            &copy; 2026 VERIFAY LAB. ALL RIGHTS RESERVED.
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of service
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[#00C853] hover:underline normal-case font-bold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
