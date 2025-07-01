import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PhysicsOrb = ({ position }: { position: [number, number, number] }) => {
  const orbPos = useRef<THREE.Vector3>(new THREE.Vector3(...position));
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Gentle floating animation
    orbPos.current.y = position[1] + Math.sin(time * 2) * 0.3;
    orbPos.current.x = position[0] + Math.sin(time * 1.5) * 0.2;

    if (orbRef.current) {
      orbRef.current.position.copy(orbPos.current);
    }
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="black"
        emissive="#111111"
        emissiveIntensity={1.2}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export const PhysicsOrbs = () => {
  // Fixed positions arranged in a grid pattern on the "floor" (y = 0)
  const positions = useRef<[number, number, number][]>([
    // Front row
    [-25, 0.3, -5],
    [-15, 0.7, -8],
    [-5, 0.2, -6],

    [25, 0.6, -10],

    // Middle row (z ~ -15 to -20)
    [-20, 0.5, -15],
    [-10, 0.9, -18],
    [0, 0.3, -16],
    [10, 0.7, -19],
    [20, 0.1, -17],

    // Back row (z ~ -25 to -30)
    [-22, 0.8, -25],
    [-12, 0.2, -28],

    [22, 0.9, -27],

    // Far background (z ~ -35 to -40)
    [-18, 0.1, -35],
    [-8, 0.5, -38],
    [8, 0.7, -36],
    [18, 0.3, -39],

    [-25, 0.3, 5],
    [-15, 0.7, 8],
    [-5, 0.2, 6],

    [25, 0.6, 10],

    // Middle row (z ~ -15 to -20)
    [-20, 0.5, 15],
    [-10, 0.9, 18],
    [0, 0.3, 16],
    [10, 0.7, 19],
    [20, 0.1, 17],
  ]);

  return (
    <>
      <ambientLight color="#333333" intensity={0.3} />

      {positions.current.map((pos, index) => (
        <PhysicsOrb key={index} position={pos} />
      ))}
    </>
  );
};
