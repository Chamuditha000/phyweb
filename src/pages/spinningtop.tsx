import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function SpinningTop() {
  const groupRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const laserRef = useRef<THREE.Mesh>(null);
  const panelRefL = useRef<THREE.Mesh>(null);
  const panelRefR = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const orbitRadius = 3.2;
  const baseHeight = 3;

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 3.5,
        metalness: 0.6,
        roughness: 0.2,
      }),
    []
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      }),
    []
  );

  const panelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#003344",
        emissive: "#00ffff",
        emissiveIntensity: 1.8,
        metalness: 0.3,
        roughness: 0.4,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * 0.2;

    const x = Math.cos(angle) * orbitRadius - 7;
    const z = Math.sin(angle) * orbitRadius + 2;
    const bump = Math.sin(t * 3) * 0.2;

    if (groupRef.current) {
      groupRef.current.position.set(x, baseHeight + bump, z);
      groupRef.current.rotation.y = t * 5;
    }

    if (antennaRef.current) {
      antennaRef.current.rotation.y = t * 2;
    }

    if (panelRefL.current && panelRefR.current) {
      const rotY = Math.sin(t) * 0.3;
      panelRefL.current.rotation.y = rotY;
      panelRefR.current.rotation.y = -rotY;
    }

    if (laserRef.current) {
      laserRef.current.scale.y = 1 + Math.sin(t * 8) * 0.3;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 1 + Math.sin(t * 5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI, 0, 0]} scale={0.5} castShadow>
      {/* Central Body: Sci-Fi Cylinder Core */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.4, 24, 1]} />
        <meshStandardMaterial {...material} />
      </mesh>

      {/* Top Dome */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...material} />
      </mesh>

      {/* Bottom Engine Cap */}
      <mesh position={[0, -0.25, 0]}>
        <coneGeometry args={[0.08, 0.15, 20]} />
        <meshStandardMaterial {...material} />
      </mesh>

      {/* Mid Rings (Details) */}
      {[-0.15, 0, 0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.13, 0.01, 8, 32]} />
          <meshStandardMaterial {...ringMaterial} />
        </mesh>
      ))}

      {/* Glowing Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.33, 32]} />
        <meshStandardMaterial {...ringMaterial} />
      </mesh>

      {/* Blinking Light */}
      <pointLight
        ref={lightRef}
        color="#orange"
        intensity={10}
        distance={2}
        position={[0, 0.4, 0]}
      />

      {/* Antenna */}
      <mesh ref={antennaRef} position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
      </mesh>

      {/* Left Panel */}
      <mesh ref={panelRefL} position={[-0.4, 0.1, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.3]} />
        <meshStandardMaterial {...panelMaterial} />
      </mesh>

      {/* Right Panel */}
      <mesh ref={panelRefR} position={[0.4, 0.1, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.3]} />
        <meshStandardMaterial {...panelMaterial} />
      </mesh>

      {/* Name Tag */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.18}
        color="#00ffff"
        outlineWidth={0.004}
        outlineColor="#00ffff99"
        rotation={[Math.PI, 0, 0]}
      >
        PHY-UOR
      </Text>
    </group>
  );
}
