import { Float, Plane } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const SceneSetup = () => {
  // Properly typed ref with MeshStandardMaterial
  const glowRingRef =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>>(null);

  // Animation for pulsing glow
  useFrame(({ clock }) => {
    if (glowRingRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 1.5;
      glowRingRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <>
      {/* Floor */}
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#000000" roughness={0.7} metalness={0.9} />
      </Plane>

      {/* Ring System */}
      <group position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* 1. Base Energy Platform (Black) */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[2.0, 2.5, 128]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#111133"
            emissiveIntensity={0.8}
            roughness={0.7}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 2. Outer Glow Ring (Blue) */}
        <mesh position={[0, 0.1, 0]}>
          <ringGeometry args={[1.8, 1.9, 128]} />
          <meshStandardMaterial
            color="#00008B"
            emissive="#00008B"
            emissiveIntensity={1.5}
            roughness={0.2}
            metalness={0.6}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        {/* 3. Energy Barrier (Animated Yellow) */}
        <mesh position={[0, 0.2, 0]}>
          <ringGeometry args={[1.5, 1.7, 256]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.7}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        {/* 4. Core Energy Ring (Bright White-Yellow) */}
        <mesh position={[0, 0.3, 0]}>
          <ringGeometry args={[1.0, 1.4, 256]} />
          <meshStandardMaterial
            color="#00008B"
            emissive="#00008B"
            emissiveIntensity={3}
            roughness={0.05}
            metalness={0.8}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        {/* 5. Central Power Node (Sphere) */}
      </group>
    </>
  );
};
