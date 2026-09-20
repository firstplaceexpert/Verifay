import React from "react";
import Image from "next/image";

interface VerifayLogoProps {
  variant?: "primary" | "dark" | "icon" | "app-icon";
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function VerifayLogo({
  variant = "primary",
  className = "",
  iconOnly = false,
  size = "md",
}: VerifayLogoProps) {
  // Height presets
  const sizeMap = {
    sm: { h: 26, w: 108, iconH: 24, iconW: 27, text: "text-lg" },
    md: { h: 32, w: 134, iconH: 30, iconW: 34, text: "text-xl" },
    lg: { h: 42, w: 176, iconH: 38, iconW: 43, text: "text-2xl" },
    xl: { h: 54, w: 226, iconH: 48, iconW: 54, text: "text-3xl" },
  };

  const { h, w, iconH, iconW, text } = sizeMap[size];

  if (iconOnly || variant === "icon") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src="/images/verifay-icon@2x.png"
          alt="Verifay Icon"
          width={iconW}
          height={iconH}
          priority
          className="object-contain"
        />
      </div>
    );
  }

  if (variant === "app-icon") {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-lg border border-slate-100 ${className}`}
      >
        <Image
          src="/images/verifay-icon@2x.png"
          alt="Verifay App Icon"
          width={iconW}
          height={iconH}
          priority
          className="object-contain"
        />
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Emerald Green Checkmark/V Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/images/verifay-icon@2x.png"
          alt="Verifay Icon"
          width={iconW}
          height={iconH}
          priority
          className="object-contain hover:scale-105 transition-transform"
        />
      </div>

      {/* Brand Wordmark */}
      <span
        className={`font-black tracking-tight leading-none ${text} ${
          isDark ? "text-white" : "text-[#0F1F1A]"
        }`}
        style={{ letterSpacing: "-0.03em" }}
      >
        Verifay
      </span>
    </div>
  );
}

export default VerifayLogo;
