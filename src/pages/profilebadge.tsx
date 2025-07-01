import React from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function SciFiAnimation() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const spherePositions = React.useMemo(() => {
    const positions = [];
    const radius = 4;
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[spherePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export function ProfileBadge() {
  const openForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdQjegUUUuifya2k2ek0MrqUWj7QOCqk2kGIPqkFBjtmmQmMA/viewform",
      "_blank"
    );
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "30px",
        backgroundColor: "#0f1117",
        minHeight: "100vh",
        color: "white",
        fontFamily: "'Orbitron', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Animated 3D Background */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
        camera={{ position: [0, 0, 10], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <SciFiAnimation />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Foreground Text */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            marginBottom: 30,
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff",
          }}
        >
          🧪 Join Physics Society – University of Ruhuna
        </motion.h2>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={openForm}
          style={{
            backgroundColor: "#00ffff",
            color: "#0f1117",
            border: "none",
            borderRadius: "12px",
            padding: "15px 40px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 20px #00ffff",
          }}
        >
          Open Form
        </motion.button>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            marginTop: 20,
            fontSize: "0.9rem",
            color: "#00ffffaa",
            textShadow: "0 0 6px #00ffff",
          }}
        >
          Secure • Verified by Google • Instant Join
        </motion.div>
      </div>
    </div>
  );
}
