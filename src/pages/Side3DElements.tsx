// src/pages/Side3DElements.tsx
import { Box, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

export function Side3DElements() {
  return (
    <>
      {/* Left Cluster */}
      <Box position={[-6, 3, -2]} args={[1, 3, 1]}>
        <meshStandardMaterial color="#ff0055" metalness={0.8} roughness={0.2} />
      </Box>
      <Sphere position={[-5, 1.5, -1]} args={[0.4, 32, 32]}>
        <meshStandardMaterial
          emissive="#ffaa00"
          emissiveIntensity={1.2}
          color="black"
        />
      </Sphere>

      {/* Right Cluster */}
      <Box position={[6, 2, -2]} args={[1.2, 2.5, 1]}>
        <meshStandardMaterial color="#00ffaa" metalness={0.5} roughness={0.3} />
      </Box>
      <Sphere position={[5.5, 3, -1]} args={[0.5, 32, 32]}>
        <meshStandardMaterial
          emissive="#00aaff"
          emissiveIntensity={1}
          color="black"
        />
      </Sphere>
    </>
  );
}
