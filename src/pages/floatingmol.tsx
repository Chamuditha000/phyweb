// src/components/FloatingAtom.tsx

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export function FloatingAtom() {
  const electron1 = useRef<THREE.Mesh>(null);
  const electron2 = useRef<THREE.Mesh>(null);
  const electron3 = useRef<THREE.Mesh>(null);
  const nucleus = useRef<THREE.Mesh>(null);

  // In each frame update, animate the electrons and apply a pulsating glow effect.
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const glow = Math.sin(t * 3) * 0.5 + 1.2;

    // Update nucleus glow
    if (nucleus.current) {
      (
        nucleus.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = glow;
    }

    // Update electrons glow
    [electron1, electron2, electron3].forEach((ref) => {
      if (ref.current) {
        (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
          glow;
      }
    });

    // Animate electrons on their respective orbits.
    if (electron1.current)
      electron1.current.position.set(Math.cos(t) * 0.8, Math.sin(t) * 0.8, 0);
    if (electron2.current)
      electron2.current.position.set(0, Math.cos(t) * 1.1, Math.sin(t) * 1.1);
    if (electron3.current)
      electron3.current.position.set(Math.sin(t) * 1.3, 0, Math.cos(t) * 1.3);
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1.5}
      floatIntensity={1.2}
      floatingRange={[-0.4, 0.4]}
    >
      <group position={[-6.5, 2.2, 2.5]} scale={0.5}>
        {/* Nucleus */}
        <mesh ref={nucleus}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color="#ff3366"
            emissive="#ff3366"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Electrons */}
        <mesh ref={electron1}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1.5}
          />
        </mesh>
        <mesh ref={electron2}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1.5}
          />
        </mesh>
        <mesh ref={electron3}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Orbits */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.005, 16, 100]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.1, 0.005, 16, 100]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.3, 0.005, 16, 100]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}
