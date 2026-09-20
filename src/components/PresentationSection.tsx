"use client";

import React, { useEffect, useRef, useState } from "react";

interface PresentationSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function PresentationSection({
  id,
  children,
  className = "",
}: PresentationSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Start inactive so slide-in entrance animation triggers on scroll
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check if section is already in viewport on mount (e.g. Hero section)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Small timeout so initial mount paints before triggering smooth slide entrance
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 80);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          } else {
            // Only reset when section is completely scrolled away
            setIsActive(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`relative ppt-section ${isActive ? "ppt-active" : "ppt-inactive"} ${className}`}
    >
      {children}
    </div>
  );
}

export default PresentationSection;
