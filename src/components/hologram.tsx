import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export const HologramCylinder = () => {
  const cylinderRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  // Create beam line geometry
  const lineGeometry = useMemo(() => {
    const points = [];
    const segments = 32;
    const height = 5;
    const radius = 1.8;

    // Vertical beam lines
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          -height / 2,
          Math.sin(angle) * radius
        ),
        new THREE.Vector3(
          Math.cos(angle) * radius,
          height / 2,
          Math.sin(angle) * radius
        )
      );
    }

    // Horizontal rings
    const ringCount = 8;
    for (let i = 0; i <= ringCount; i++) {
      const y = -height / 2 + (i / ringCount) * height;
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
          ),
          new THREE.Vector3(
            Math.cos(angle + 0.1) * radius,
            y,
            Math.sin(angle + 0.1) * radius
          )
        );
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (cylinderRef.current) {
      // Pulsing animation
      cylinderRef.current.scale.x = 1 + Math.sin(elapsedTime * 2) * 0.05;

      // Rotate around Z-axis (since cylinder is now horizontal)
    }

    if (lineMaterialRef.current) {
      // Animate line material opacity
      lineMaterialRef.current.opacity = 0.7 + Math.sin(elapsedTime * 3) * 0.3;
    }
  });

  return (
    <group>
      {/* Main hologram cylinder */}
      <mesh ref={cylinderRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 5, 64, 1, true]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Sci-fi beam lines */}
      <lineSegments ref={linesRef} position={[0, 0, 0]}>
        <primitive attach="geometry" object={lineGeometry} />
        <lineBasicMaterial
          ref={lineMaterialRef}
          color="#00ffff"
          transparent
          opacity={0.7}
        />
      </lineSegments>

      {/* Inner glow effect */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 5.1, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={7.5}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};
