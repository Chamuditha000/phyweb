import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LuminousBeamsProps {
  color?: string;
  particleColor?: string;
  radius?: number;
  baseY?: number;
  height?: number;
}

export function LuminousBeams({
  height = 12,
  color = "black",
  particleColor = "white",
  radius = 0.24,
  baseY = -1.4,
}: LuminousBeamsProps) {
  const beamsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // === Predefined fixed positions for beams ===
  const beamPositions: { x: number; z: number }[] = [
    { x: -6, z: -12 },
    { x: -12, z: -30 },
    { x: 18, z: -34 },
    { x: 16, z: -10 },
    { x: 14, z: -18 },
    { x: 19, z: -4 },
    { x: -14, z: -16 },
    { x: 10, z: -16 },
    { x: 9, z: -7 },
  ];

  const positions: { x: number; y: number; z: number }[] = useMemo(() => {
    const arr: { x: number; y: number; z: number }[] = [];
    beamPositions.forEach(({ x, z }) => {
      for (let j = 0; j < 25; j++) {
        const y = Math.random() * height;
        arr.push({ x, y, z });
      }
    });
    return arr;
  }, [beamPositions, height]);

  const beamMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  const particleMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: particleColor,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [particleColor]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (particlesRef.current && particlesRef.current.instanceMatrix) {
      positions.forEach((pos, i) => {
        const floatY = (pos.y + t * 1.2) % height;
        dummy.position.set(pos.x, baseY + floatY, pos.z);
        dummy.scale.set(0.05, 0.05, 0.05);
        dummy.updateMatrix();
        particlesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <group ref={beamsRef}>
        {beamPositions.map(({ x, z }, i) => (
          <mesh
            key={i}
            position={[x, baseY + height / 2, z]}
            material={beamMaterial}
          >
            <cylinderGeometry args={[radius, radius, height, 16, 1, true]} />
          </mesh>
        ))}
      </group>

      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, positions.length]}
      >
        <sphereGeometry args={[0.7, 6, 6]} />
        <meshBasicMaterial {...particleMaterial} />
      </instancedMesh>
    </group>
  );
}
