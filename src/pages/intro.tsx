import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Canvas } from "@react-three/fiber";

export const SciFiRoom = () => {
  const roomRef = useRef<THREE.Group>(null);
  const scanLineMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (scanLineMaterialRef.current) {
      const newY = Math.sin(time * 2) * 3;
      const newOpacity = 0.7 + Math.sin(time * 3) * 0.2; // Increased base opacity

      scanLineMaterialRef.current.opacity = newOpacity;

      if (roomRef.current) {
        const scanLine = roomRef.current.children.find(
          (child) => child.name === "scanLine"
        );
        if (scanLine) {
          scanLine.position.y = newY;
        }
      }
    }
  });

  return (
    <group ref={roomRef} position={[0, 0, 0]}>
      {/* Brighter Room Structure */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <boxGeometry args={[20, 10, 20]} />
        <meshStandardMaterial
          color="#222244" // Brighter color
          side={THREE.BackSide}
          metalness={0.7}
          roughness={0.5}
          emissive="#333366" // Brighter emission
          emissiveIntensity={0.5} // Increased intensity
        />
      </mesh>
      {/* More Visible Grid Floor */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial
          color="#222255" // Brighter color
          emissive="#333377" // Brighter emission
          emissiveIntensity={0.4} // Increased intensity
          wireframe={true}
          transparent
          opacity={0.9} // Increased opacity
        />
      </mesh>
      {/* More Visible Scanning Laser */}
      <mesh name="scanLine" position={[0, 0, -9]}>
        <planeGeometry args={[18, 0.2, 1]} /> {/* Thicker scan line */}
        <meshStandardMaterial
          ref={scanLineMaterialRef}
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={3} // Increased intensity
          transparent
          opacity={0.7} // Increased base opacity
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Enhanced Control Panel */}
      <group position={[-8, -3, -9]}>
        <mesh>
          <boxGeometry args={[3, 1.5, 0.2]} />
          <meshStandardMaterial
            color="#333344" // Brighter color
            emissive="#444466" // Brighter emission
            emissiveIntensity={0.8} // Increased intensity
            metalness={0.8}
          />
        </mesh>
      </group>
      {/* Brighter Floating Orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-5 + i * 2.5, 0, -5]}>
          <sphereGeometry args={[0.6, 32, 32]} /> {/* Slightly larger */}
          <meshStandardMaterial
            color="#00ccff" // Brighter color
            emissive="#00ffff"
            emissiveIntensity={1.5} // Increased intensity
            transparent
            opacity={0.9} // Increased opacity
            metalness={0.8}
          />
        </mesh>
      ))}
      {/* Stronger Lighting */}
      <ambientLight color="#556699" intensity={0.5} /> {/* Brighter ambient */}
      <pointLight color="#00ccff" intensity={1.5} position={[0, 5, 0]} />{" "}
      {/* Stronger */}
      <pointLight color="#ff55aa" intensity={0.8} position={[10, 3, 5]} />{" "}
      {/* Stronger */}
    </group>
  );
};

export const Introduction = () => (
  <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
    {/* Large "who we are" text overlay */}
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        color: "white",
        fontSize: "5rem",
        fontWeight: "bold",
        textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
        pointerEvents: "none", // Allows interaction with 3D scene behind
      }}
    >
      WHO WE ARE
    </div>

    <Canvas style={{ background: "#000033" }}>
      <SciFiRoom />
    </Canvas>
  </div>
);
