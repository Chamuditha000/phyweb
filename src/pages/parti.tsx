import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

export function FloatingParticles({ count = 10, spread = -10 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { basePositions, phases } = useMemo(() => {
    const basePositions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(spread);
      const y = THREE.MathUtils.randFloatSpread(spread);
      const z = THREE.MathUtils.randFloatSpread(spread);
      basePositions.set([x, y, z], i * 3);
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { basePositions, phases };
  }, [count, spread]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const geom = pointsRef.current?.geometry;
    if (!geom) return;

    const pos = geom.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const yBase = basePositions[i * 3 + 1];
      pos.setY(i, yBase + Math.sin(t * 0.6 + phases[i]) * 0.5);
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive
          attach="attributes-position"
          object={new THREE.BufferAttribute(basePositions, 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.1}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.5}
      />
    </points>
  );
}
