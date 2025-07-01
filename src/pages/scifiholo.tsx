import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SciFiHologram() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 2) * 0.4 + 1;

    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = pulse * 1.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.2;
    }

    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + 0.05 * Math.sin(t * 4));
      const mat = auraRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.2 + 0.2 * Math.sin(t * 3.3);
    }
  });

  // Create dotted lines around the cylinder
  const dottedLines = [];
  const segments = 8;
  const heightSteps = 8;
  const radius = 0.5;

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    for (let j = 0; j < heightSteps; j++) {
      const y = -1.2 + (j * 2.4) / (heightSteps - 1); // even spacing from -1.2 to 1.2

      dottedLines.push(
        <mesh key={`dot-${i}-${j}`} position={[x, y, z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={7.9}
            transparent
            opacity={0.4}
            metalness={0.6}
          />
        </mesh>
      );
    }
  }

  return (
    <group position={[1.6, 1.2, 6.7]}>
      {/* Core Cylinder */}
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32, 1, true]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spinning Ring */}
      <mesh ref={ringRef} position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.8}
          transparent
          opacity={0.5}
          metalness={1}
        />
      </mesh>

      {/* Aura Glow */}
      <mesh ref={auraRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 2.6, 32, 1, true]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.7}
          transparent
          opacity={0.3}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dotted Inner Lines */}
      {dottedLines}
    </group>
  );
}
