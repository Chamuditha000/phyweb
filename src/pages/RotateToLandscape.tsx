import React, { useEffect, useMemo, useState } from "react";

/**
 * Shows a full-screen overlay asking the user to rotate the device to landscape.
 * - Appears only on touch/mobile-sized devices (configurable).
 * - Hides automatically when the device is in landscape.
 * - Locks body scroll while visible.
 */
type Props = {
  /** Max width (CSS px) to consider "mobile/tablet". Default 1024. */
  maxDeviceWidth?: number;
  /** Optional custom message. */
  message?: string;
};

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    (navigator as any).maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

function isPortrait() {
  if (typeof window === "undefined") return false;
  // MatchMedia is fastest & most reliable for orientation
  if (window.matchMedia) {
    return window.matchMedia("(orientation: portrait)").matches;
  }
  // Fallback
  return window.innerHeight > window.innerWidth;
}

export default function RotateToLandscape({
  maxDeviceWidth = 1024,
  message = "Please rotate your device to landscape",
}: Props) {
  const [show, setShow] = useState(false);

  const onMobileLike = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= maxDeviceWidth && isTouchDevice();
  }, [maxDeviceWidth]);

  useEffect(() => {
    // Decide when to show overlay
    const decide = () => {
      const shouldShow = onMobileLike && isPortrait();
      setShow(shouldShow);
      // Lock/unlock page scroll
      document.documentElement.style.overflow = shouldShow ? "hidden" : "";
      document.body.style.overflow = shouldShow ? "hidden" : "";
    };

    // Run once and on changes
    decide();
    const onResize = () => decide();
    const onOrientationChange = () => decide();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrientationChange);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onMobileLike]);

  if (!show) return null;

  // Fullscreen overlay styles (safe-area aware)
  const wrap: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
    color: "#fff",
    zIndex: 9999,
    padding:
      "calc(16px + env(safe-area-inset-top)) 16px calc(24px + env(safe-area-inset-bottom))",
  };

  const card: React.CSSProperties = {
    maxWidth: 480,
    textAlign: "center",
  };

  const emoji: React.CSSProperties = {
    fontSize: 56,
    lineHeight: 1,
    marginBottom: 16,
    display: "block",
  };

  const title: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 700 as const,
    marginBottom: 8,
  };

  const subtitle: React.CSSProperties = {
    opacity: 0.8,
    fontSize: 16,
  };

  return (
    <div style={wrap} aria-live="polite" role="dialog" aria-modal="true">
      <div style={card}>
        <span style={emoji} aria-hidden>
          🔄
        </span>
        <div style={title}>Rotate to Landscape</div>
        <div style={subtitle}>{message}</div>
      </div>
    </div>
  );
}
