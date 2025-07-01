import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { SceneSetup } from "./SceneSetup";
import { PhysicsObjects } from "./physicsobj";
import { useNavigate } from "react-router-dom";
import { ProfileBadge } from "../pages/profilebadge";
import { FloatingChatBot } from "../pages/floatingbot";

export const HomePage = () => {
  const navigate = useNavigate();

  const buttons = [
    { name: "About Us", path: "/about" },
    { name: "Events", path: "/project" },

    { name: "Magazine", path: "/magazine" },
    { name: "Contact Us", path: "/contact" },
    { name: "Join Us", path: "/profilebadge" },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 50 }}>
        {/* Lighting Setup */}
        <ambientLight color="#ffcc88" intensity={1.4} />
        <directionalLight
          position={[5, 8, 5]}
          color="#ffdd99"
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.001}
        />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Scene Elements */}
        <Environment preset="dawn" />
        <SceneSetup />

        <PhysicsObjects />
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={true}
          minDistance={7}
          maxDistance={13}
        />
      </Canvas>
      <FloatingChatBot />
      {/* Top Right Buttons */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "50px",
          display: "flex",
          gap: "10px",
          zIndex: 10,
          padding: "8px",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          background: "rgba(10, 20, 30, 0.3)",
          border: "1px solid rgba(0, 255, 255, 0.2)",
        }}
      >
        {buttons.map((button) => (
          <button
            key={button.name}
            style={{
              padding: "10px 20px",
              background: "rgba(0, 180, 255, 0.15)",
              color: "rgba(200, 255, 255, 0.9)",
              border: "1px solid rgba(0, 255, 255, 0.3)",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.25s ease",
              backdropFilter: "blur(4px)",
              transform: "translateY(0)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 200, 255, 0.3)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0, 200, 255, 0.2)";
              e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 180, 255, 0.15)";
              e.currentTarget.style.color = "rgba(200, 255, 255, 0.9)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.3)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 4px rgba(0, 200, 255, 0.1)";
            }}
            onClick={() => navigate(button.path)}
          >
            {button.name}
          </button>
        ))}
      </div>

      {/* Title and Subtitle */}
      <h1
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          color: "white",
          fontSize: "28px",
          fontWeight: "300",
          margin: "0",
          letterSpacing: "4px",
          textShadow: `
            0 0 10px #fff,
            0 0 20px #00ffff,
            0 0 30px #0080ff
          `,
          zIndex: "10",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        PHYSICS SOCIETY
      </h1>

      <h2
        style={{
          position: "absolute",
          top: "90px",
          left: "40px",
          color: "white",
          fontSize: "28px",
          fontWeight: "300",
          margin: "0",
          letterSpacing: "4px",
          textShadow: `
            0 0 10px #fff,
            0 0 20px #00ffff,
            0 0 30px #0080ff
          `,
          zIndex: "10",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        University Of Ruhuna
      </h2>
    </div>
  );
};
