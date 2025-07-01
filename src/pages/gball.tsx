import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Gball() {
  const ballRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.InstancedMesh>(null);

  const orbitRadius = 7.2;
  const orbitHeight = 5;

  const trailLength = 30;
  const dummy = new THREE.Object3D();
  const trailPositions = useMemo(
    () => Array(trailLength).fill(new THREE.Vector3()),
    []
  );
  const [index, setIndex] = useState(0);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 3,
        metalness: 0.4,
        roughness: 0.2,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00ffff",
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = -t * 0.6;
    const x = Math.cos(angle) * orbitRadius + 12;
    const z = Math.sin(angle) * orbitRadius - 7;
    const y = orbitHeight;

    const newPos = new THREE.Vector3(x, y, z);

    // Move ball
    if (ballRef.current) ballRef.current.position.copy(newPos);
    if (glowRef.current) glowRef.current.position.copy(newPos);

    // Update trail buffer
    trailPositions[index] = newPos.clone();
    for (let i = 0; i < trailLength; i++) {
      const pos = trailPositions[(index + i) % trailLength];
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.15 * (1 - i / trailLength));
      dummy.updateMatrix();
      trailRef.current?.setMatrixAt(i, dummy.matrix);
    }
    trailRef.current!.instanceMatrix.needsUpdate = true;

    // Update index
    setIndex((prev) => (prev + 1) % trailLength);
  });

  return (
    <group>
      {/* Main glowing ball */}
      <mesh ref={ballRef} material={material} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Trail */}
      <instancedMesh ref={trailRef} args={[undefined, undefined, trailLength]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="orange" transparent opacity={0.4} />
      </instancedMesh>
    </group>
  );
}
