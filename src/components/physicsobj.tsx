import { Float, Points, PointMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { HologramCylinder } from "./hologram";
import { PhysicsOrbs } from "./scidisplay";

import { CurvedSciFiTV } from "./curved";
import { DarkSciFiAtomLighting } from "./floorlight";

export const PhysicsObjects = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { clock } = useThree();

  // Particle system configuration
  const particleCount = 1500;
  const particleSize = 0.035;

  // Generate particles
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [particleCount]);

  // Create electron orbits
  const createElectronOrbit = (radius: number) => {
    const orbitCount = 8;
    const segments = 32;

    return (
      <group>
        {[...Array(orbitCount)].map((_, i) => {
          const angle = (i / orbitCount) * Math.PI * 2;
          return (
            <line key={i}>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array(
                      [...Array(segments)]
                        .map((_, j) => {
                          const theta = (j / segments) * Math.PI * 2;
                          return [
                            radius * Math.cos(theta),
                            radius * Math.sin(theta) * Math.cos(angle),
                            radius * Math.sin(theta) * Math.sin(angle),
                          ];
                        })
                        .flat()
                    ),
                    3,
                  ]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#FFD700"
                linewidth={3}
                transparent
                opacity={0.8}
              />
            </line>
          );
        })}
      </group>
    );
  };

  // Create gold ring ON THE FLOOR (Y = 0)
  const createGoldRing = (
    position: [number, number, number],
    radius: number
  ) => (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.8, radius, 64]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={2.5}
        metalness={0.95}
        roughness={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Atom */}
      <Float speed={1.5} rotationIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ADD8E6"
            emissive="#ADD8E6"
            emissiveIntensity={1.2}
          />
        </mesh>
      </Float>
      <HologramCylinder />
      <PhysicsOrbs />

      <CurvedSciFiTV />
      <DarkSciFiAtomLighting />

      {/* Particle Cloud */}
      <Points ref={particlesRef} positions={particles}>
        <PointMaterial
          color="#00ffff"
          size={particleSize}
          sizeAttenuation={true}
          transparent
          opacity={0.65}
          alphaTest={0.001}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>

      {/* Four Atoms at compass points */}
      <group>
        {[
          {
            position: [0, 1.5, 5] as [number, number, number],
            rotation: [0, 0, 0] as [number, number, number],
            label: "North",
            ringPosition: [0, 0, 5] as [number, number, number],
          },
          {
            position: [0, 1.5, -5] as [number, number, number],
            rotation: [0, Math.PI, 0] as [number, number, number],
            label: "South",
            ringPosition: [0, 0, -5] as [number, number, number],
          },
          {
            position: [5, 1.5, 0] as [number, number, number],
            rotation: [0, -Math.PI / 2, 0] as [number, number, number],
            label: "East",
            ringPosition: [5, 0, 0] as [number, number, number],
          },
          {
            position: [-5, 1.5, 0] as [number, number, number],
            rotation: [0, Math.PI / 2, 0] as [number, number, number],
            label: "West",
            ringPosition: [-5, 0, 0] as [number, number, number],
          },
        ].map((atom, index) => (
          <group key={index}>
            {/* Atom group floating above */}
            <group position={atom.position} rotation={atom.rotation}>
              {/* Gold Atom Core */}
              <mesh>
                <sphereGeometry args={[0.2, 24, 24]} />
                <meshStandardMaterial
                  color="#D4AF37"
                  emissive="#FFD700"
                  emissiveIntensity={1.5}
                  metalness={0.95}
                  roughness={0.1}
                />
              </mesh>

              {/* Electron Orbits */}
              {createElectronOrbit(1.5)}
            </group>

            {/* Gold Ring on floor directly below */}
            {createGoldRing(atom.ringPosition, 1.2)}
          </group>
        ))}
      </group>
    </group>
  );
};
