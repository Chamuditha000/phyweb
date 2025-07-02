// components/Footer.tsx
import React from "react";

export const Footer: React.FC = () => {
  return (
    <>
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "0.9rem",
          fontFamily: "Orbitron, sans-serif",
          color: "#aaa",
          background: "#1c1f24",
        }}
      >
        Designed by{" "}
        <a
          href="https://www.facebook.com/share/1DESMbKhKm/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="jiggle-link"
          style={{ color: "#aaa", textDecoration: "underline" }}
        >
          Maku
        </a>
      </footer>

      {/* Jiggle animation style */}
      <style>{`
        @keyframes jiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
          75% { transform: rotate(2deg); }
        }

        .jiggle-link:hover {
          animation: jiggle 0.4s ease-in-out;
          display: inline-block;
        }
      `}</style>
    </>
  );
};
