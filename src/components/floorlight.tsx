import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const AtomModel = ({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) => {
  return (
    <group position={position}>
      {/* Nucleus */}

      {/* Electron Orbitals */}
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, i * 1.2, 0]}></group>
      ))}
    </group>
  );
};

const FloorLight = ({ position }: { position: [number, number, number] }) => {
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity =
        15 + Math.sin(clock.getElapsedTime() * 2) * 5;
    }
  });

  return (
    <spotLight
      ref={lightRef}
      position={position}
      distance={10}
      angle={0.5}
      decay={2} // Light falloff (replaces attenuation)
      intensity={15}
      color="#00aaff"
      castShadow
      penumbra={0.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
  );
};

export const DarkSciFiAtomLighting = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} color="#001122" />
      <pointLight position={[0, 10, 0]} intensity={5} color="#003366" />

      {/* Floor Lights */}
      <FloorLight position={[-3, 0, -3]} />
      <FloorLight position={[3, 0, -3]} />
      <FloorLight position={[-3, 0, 3]} />
      <FloorLight position={[3, 0, 3]} />

      {/* Sci-Fi Floor */}

      {/* Atmosphere */}
      <fog attach="fog" args={["#001122", 5, 15]} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};
