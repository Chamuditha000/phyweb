import { Center, Text3D } from "@react-three/drei";
import * as THREE from "three";

export function GlassyText() {
  const isFileMode = window.location.protocol === "file:";
  const fontUrl = isFileMode
    ? "./fonts/helvetiker_bold.typeface.json"
    : process.env.PUBLIC_URL + "/fonts/helvetiker_bold.typeface.json";

  return (
    <>
      {/* Reflective lights */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={10}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[4, 5, 6]} intensity={150} color="white" />

      {/* Text with glass and glow */}
      <Center position={[4.8, 0.4, 4.0]} rotation={[0, 30.5, 0]}>
        <Text3D
          font={fontUrl}
          size={0.94}
          height={0.5}
          position={[0.03, -0.05, 0.01]} // Fine-tuned center
        >
          HORIZON
          <meshStandardMaterial
            color="white"
            roughness={0.15}
            metalness={0.81}
            transparent
            opacity={0.6}
          />
        </Text3D>
      </Center>
    </>
  );
}
