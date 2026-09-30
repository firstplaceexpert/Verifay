import React from "react";

interface VerifayLogoProps {
  variant?: "primary" | "dark" | "icon" | "app-icon";
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function VerifayIconSvg({
  className = "",
  width = 32,
  height = 30,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="13.0 8.0 78.8 72.8"
      width={width}
      height={height}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="verifayBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00C853" />
        </linearGradient>
      </defs>
      <path
        d="M 16.43 39.75 A 11.20 11.20 0 0 1 35.00 27.23 L 54.57 56.25 A 11.20 11.20 0 0 1 36.00 68.77 Z"
        fill="url(#verifayBrandGrad)"
      />
      <path
        d="M 65.20 10.00 L 86.82 10.00 Q 89.82 10.00 89.32 12.50 L 67.19 59.64 A 11.20 11.20 0 0 1 46.81 50.36 Z"
        fill="url(#verifayBrandGrad)"
      />
    </svg>
  );
}

export function VerifayLogo({
  variant = "primary",
  className = "",
  iconOnly = false,
  size = "md",
}: VerifayLogoProps) {
  // Height presets
  const sizeMap = {
    sm: { h: 26, w: 108, iconH: 22, iconW: 24, text: "text-lg" },
    md: { h: 32, w: 134, iconH: 26, iconW: 28, text: "text-xl" },
    lg: { h: 42, w: 176, iconH: 34, iconW: 37, text: "text-2xl" },
    xl: { h: 54, w: 226, iconH: 44, iconW: 48, text: "text-3xl" },
  };

  const { iconH, iconW, text } = sizeMap[size];

  if (iconOnly || variant === "icon") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <VerifayIconSvg width={iconW} height={iconH} />
      </div>
    );
  }

  if (variant === "app-icon") {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-2xl bg-white p-2.5 shadow-lg border border-slate-100 ${className}`}
      >
        <VerifayIconSvg width={iconW} height={iconH} />
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Razor-sharp Vector Emerald Green Checkmark/V Icon */}
      <div className="relative shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-200">
        <VerifayIconSvg width={iconW} height={iconH} />
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
