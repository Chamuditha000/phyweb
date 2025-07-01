// src/components/FloatingEquations.tsx

import React from "react";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

// List of symbols/equations to float
const floatingTexts = [
  "E = mc²",
  "∇·𝐄 = ρ/ε₀",
  "E = ½mv²",

  "F = ma",
  "ΔS ≥ 0",
  "c = λν",

  "∮𝐄·d𝐬 = φ/ε₀",
  "L = r × p",
  "a² + b² = c²",
  "∂²ψ/∂x² = (1/c²)∂²ψ/∂t²",
  "S = k log Ω",
  "ħ = h / 2π",
  "γ = 1 / √(1 - v²/c²)",
  "P = IV",
  "B = μ₀I/2πr",
  "f = ma",

  "PV = nRT",
  "∫F·dx = W",
];

// Generate random positions for each floating symbol
const positions = floatingTexts.map(() => ({
  x: THREE.MathUtils.randFloatSpread(30),
  y: THREE.MathUtils.randFloatSpread(10),
  z: THREE.MathUtils.randFloatSpread(15),
}));

export function FloatingEquations() {
  return (
    <>
      {floatingTexts.map((text, idx) => (
        <Float
          key={idx}
          floatIntensity={THREE.MathUtils.randFloat(0.5, 2)}
          rotationIntensity={THREE.MathUtils.randFloat(0.5, 1.5)}
          speed={THREE.MathUtils.randFloat(1, 2.5)}
        >
          <Html
            position={[positions[idx].x, positions[idx].y, positions[idx].z]}
            transform
            distanceFactor={4}
          >
            <div style={equationStyle}>{text}</div>
          </Html>
        </Float>
      ))}
    </>
  );
}

const equationStyle: React.CSSProperties = {
  fontSize: "22px",
  color: "#00ffff",
  fontFamily: "monospace",
  background: "rgba(0, 0, 0, 0.4)",
  padding: "6px 12px",
  borderRadius: "8px",
  boxShadow: "0 0 8px #00ffff88",
  whiteSpace: "nowrap",
};
