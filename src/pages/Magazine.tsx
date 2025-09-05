import { Canvas, useLoader } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

import { FloatingEquations } from "./FloatingEquations";
import { SpinningTop } from "./spinningtop";
import { Gball } from "./gball";
import { LuminousBeams } from "./luminousbeam";
import { PlaneTakeoffScene } from "./plane";
import { GlassyText } from "./glassyt";

const iframeSrc = process.env.PUBLIC_URL + "/Magazine.html";
// 🧱 Floor with emissive glow

function EmbeddedFlipbook() {
  return (
    <mesh position={[0, 2.1, -2.7]} castShadow>
      <boxGeometry args={[9.2, 6.7, 0.05]} />
      <meshStandardMaterial color="#111" />
      <Html
        transform
        position={[0, 0, 0.051]}
        distanceFactor={2.5}
        occlude
        style={{
          width: "1440px",
          height: "1080px",
          margin: 0,
          padding: 10,
          borderRadius: "0px",
          boxShadow: "none",
        }}
      >
        <iframe
          src={iframeSrc}
          title="Magazine Flipbook"
          style={{
            width: "1440px",
            height: "1080px",
            margin: 0,
            padding: 0,
            borderRadius: "4px",
            boxShadow: "0 0 50px rgba(0, 255, 255, 0.3)",
            overflow: "hidden",
            perspective: "1500px",
            transformStyle: "preserve-3d",
          }}
        />
      </Html>
    </mesh>
  );
}
function FloorPanels() {
  const isFileMode = window.location.protocol === "file:";

  const texture = useLoader(
    THREE.TextureLoader,
    isFileMode
      ? "/offline-texture.png" // fallback image in `public/`
      : process.env.PUBLIC_URL + "/textures/floor.png"
  );

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 3);

  return (
    <group position={[0, -1.7, -2.7]}>
      {[-3.3, 0, 3.3].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[65, 100]} />
          <meshStandardMaterial
            map={texture}
            emissiveMap={texture}
            emissive="#00ffff"
            emissiveIntensity={1.8}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Magazine() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        position: "relative",
      }}
    >
      {showIntro && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#00ffff",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "800px",
            margin: "10vh auto",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 0 20px #00ffff",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Welcome to the Horizon Magazine - 2025
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: 30 }}>
            The HORIZON, the official science magazine published by the Physics
            Society of the University of Ruhuna. This edition is more than a
            collection of articles, it is a journey into the heart of curiosity,
            where imagination meets rigorous inquiry, and ancient questions are
            explored through the lens of modern physics. As the boundaries of
            knowledge expand, we find ourselves drawn into new realms, from the
            mysteries of space to the fabric of everyday reality. Physics allows
            us to probe both the infinitely vast and the incredibly small, to
            understand how things work, why they behave the way they do, and
            what truths lie beneath the surface. This magazine reflects that
            spirit of exploration bold, reflective, and interconnected. In this
            volume, we present a diverse array of insights bridging pure
            science, technology, philosophy, health, and the natural world.
            You’ll encounter stories that challenge conventional thinking,
            unlock the beauty of unseen forces, and explore the deep connections
            between science and society. We venture into the frontier of
            emerging research while also reflecting on how physics relates to
            culture, education, and the human condition. What makes HORIZON
            unique is its dedication to making complex ideas accessible and
            meaningful to all not only to scholars but to anyone with a sense of
            wonder. This magazine is a bridge: between theory and practice,
            between students and scientists, between past understanding and
            future possibility. We invite you to turn these pages with
            curiosity, to pause and reflect, and to rediscover the universe both
            around you and within. Let HORIZON be your companion on a journey of
            discovery, where the language of physics tells stories that matter.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              backgroundColor: "#00ffff",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 12px #00ffff",
            }}
          >
            🚀 Enter 3D Magazine Space
          </button>
        </div>
      )}

      {!showIntro && (
        <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
          <ambientLight intensity={0.25} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            castShadow
          />
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />

          <ambientLight intensity={0.1} color="#ffcc33" />
          <pointLight
            position={[-6, 4, 0]}
            intensity={60.5}
            color="#ffcc33"
            distance={20}
            decay={1.5}
          />
          <FloatingEquations />
          <SpinningTop />
          <Gball />
          <FloorPanels />
          <PlaneTakeoffScene />
          <EmbeddedFlipbook />
          <GlassyText />
          <LuminousBeams
            height={19}
            baseY={-10.2}
            color="#000066"
            particleColor="white"
          />
          <OrbitControls
            enablePan={true}
            enableRotate={true}
            enableZoom={true}
            minDistance={7}
            maxDistance={13}
          />
          <FloorPanels />
        </Canvas>
      )}
    </div>
  );
}
