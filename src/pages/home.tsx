import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const GlobalHomeButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floatHome {
        0% { transform: translate(-50%, 0px) rotate(0deg); }
        25% { transform: translate(-50%, -4px) rotate(1deg); }
        50% { transform: translate(-50%, 0px) rotate(0deg); }
        75% { transform: translate(-50%, -4px) rotate(-1deg); }
        100% { transform: translate(-50%, 0px) rotate(0deg); }
      }

      @keyframes glowPulse {
        0% { box-shadow: 0 0 5px #00cfff44, 0 0 10px #00f0ff22 inset; }
        50% { box-shadow: 0 0 12px #00f0ff99, 0 0 20px #00ffff33 inset; }
        100% { box-shadow: 0 0 5px #00cfff44, 0 0 10px #00f0ff22 inset; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (location.pathname === "/") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        right: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: "4px dotted #00ffffcc",
          color: "#00ffff",
          fontSize: "34px",
          fontWeight: "bold",
          cursor: "pointer",
          animation:
            "floatHome 3s ease-in-out infinite, glowPulse 3s ease-in-out infinite",
          backdropFilter: "blur(2px)",
          textShadow: "0 0 6px #00ffff55",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Back to Home"
      >
        ⌂
      </button>
    </div>
  );
};
